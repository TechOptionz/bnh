import { ARTICLES } from "@/lib/blog";
import { POSTS, type Post } from "@/lib/site";

/** Weight each field contributes per matched term. Title and category hits
 *  outrank body hits so a keyword in the headline always floats to the top. */
const W = { title: 12, category: 7, type: 6, excerpt: 5, heading: 4, body: 1.5 };

/** Combining accent marks left behind by NFKD normalisation (U+0300–U+036F). */
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`,
  "g"
);

/** Lowercase, fold accents and normalise the punctuation that copy tends to
 *  carry (curly quotes, en/em dashes) so "don't" matches "don’t". */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, "-")
    .replace(/…/g, "...");
}

/** Split a query into the terms every result must match. */
export function queryTerms(query: string): string[] {
  return Array.from(
    new Set(
      normalize(query)
        .split(/[^a-z0-9'$%.-]+/)
        .map((t) => t.replace(/^[.'-]+|[.'-]+$/g, ""))
        .filter((t) => t.length > 0)
    )
  );
}

type Field = { text: string; weight: number };

type Entry = {
  post: Post;
  fields: Field[];
  /** Every field joined, used for the cheap "does this post match at all" pass. */
  haystack: string;
  /** Distinct words in the post, used for prefix and one-typo tolerance. */
  tokens: string[];
  /** Body paragraphs (original + normalised) used to build result snippets. */
  paras: { raw: string; norm: string }[];
};

let INDEX: Entry[] | null = null;

function buildIndex(): Entry[] {
  return POSTS.map((post) => {
    const article = ARTICLES[post.slug];
    const source: Field[] = [
      { text: post.title, weight: W.title },
      { text: post.category, weight: W.category },
      { text: post.type, weight: W.type },
      { text: post.excerpt, weight: W.excerpt },
      { text: post.date, weight: W.type },
      { text: post.slug.replace(/-/g, " "), weight: W.body },
    ];
    const paras: { raw: string; norm: string }[] = [];

    if (article) {
      for (const p of article.intro) {
        source.push({ text: p, weight: W.body });
        paras.push({ raw: p, norm: normalize(p) });
      }
      for (const s of article.sections) {
        source.push({ text: s.h, weight: W.heading });
        paras.push({ raw: s.h, norm: normalize(s.h) });
        for (const p of s.paras) {
          source.push({ text: p, weight: W.body });
          paras.push({ raw: p, norm: normalize(p) });
        }
        for (const b of s.bullets ?? []) {
          source.push({ text: b, weight: W.body });
          paras.push({ raw: b, norm: normalize(b) });
        }
      }
      for (const t of article.takeaways) {
        source.push({ text: t, weight: W.body });
        paras.push({ raw: t, norm: normalize(t) });
      }
    }

    const fields = source.map((f) => ({
      text: normalize(f.text),
      weight: f.weight,
    }));
    const haystack = fields.map((f) => f.text).join(" · ");

    return {
      post,
      fields,
      haystack,
      tokens: Array.from(new Set(haystack.split(/[^a-z0-9']+/).filter(Boolean))),
      paras,
    };
  });
}

function index(): Entry[] {
  if (!INDEX) INDEX = buildIndex();
  return INDEX;
}

/** True when `a` and `b` are within one insert, delete or substitution. */
function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length === b.length) {
      i += 1;
      j += 1;
    } else if (a.length > b.length) {
      i += 1;
    } else {
      j += 1;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/** Resolve a typed term against one post's vocabulary: substring first, then a
 *  singular/plural trim, then a prefix, then a one-character typo. */
function resolveTerm(
  entry: Entry,
  term: string
): { term: string; exact: boolean } | null {
  if (entry.haystack.includes(term)) return { term, exact: true };

  const stem = term.replace(/ies$|es$|s$/, (m) => (m === "ies" ? "y" : ""));
  if (stem.length > 2 && stem !== term && entry.haystack.includes(stem)) {
    return { term: stem, exact: true };
  }
  for (const tok of entry.tokens) {
    if (tok.startsWith(term)) return { term: tok, exact: false };
  }
  if (term.length >= 4) {
    for (const tok of entry.tokens) {
      if (withinOneEdit(term, tok)) return { term: tok, exact: false };
    }
  }
  return null;
}

function countOccurrences(text: string, term: string): number {
  let n = 0;
  let from = 0;
  for (;;) {
    const at = text.indexOf(term, from);
    if (at === -1) return n;
    n += 1;
    from = at + term.length;
  }
}

export type SearchHit = {
  post: Post;
  score: number;
  /** The terms actually found, so the UI can highlight exactly what matched. */
  matched: string[];
  /** True when nothing on the card matched — the hit came from the article body. */
  inBodyOnly: boolean;
  /** Excerpt of the matching article passage, shown for body-only hits. */
  snippet?: string;
};

const SNIPPET_RADIUS = 90;

function buildSnippet(entry: Entry, terms: string[]): string | undefined {
  for (const term of terms) {
    for (const para of entry.paras) {
      const at = para.norm.indexOf(term);
      if (at === -1) continue;

      let start = Math.max(0, at - SNIPPET_RADIUS);
      let end = Math.min(para.raw.length, at + term.length + SNIPPET_RADIUS);
      if (start > 0) {
        const space = para.raw.indexOf(" ", start);
        if (space !== -1 && space < at) start = space + 1;
      }
      if (end < para.raw.length) {
        const space = para.raw.lastIndexOf(" ", end);
        if (space > at + term.length) end = space;
      }
      const text = para.raw.slice(start, end).trim();
      return `${start > 0 ? "…" : ""}${text}${end < para.raw.length ? "…" : ""}`;
    }
  }
  return undefined;
}

/** Rank `pool` against `query`. A post must match every term; when nothing
 *  matches them all we fall back to "any term" so the page still helps. */
export function searchPosts(
  query: string,
  pool: readonly Post[] = POSTS
): SearchHit[] {
  const terms = queryTerms(query);
  if (terms.length === 0) {
    return pool.map((post) => ({
      post,
      score: 0,
      matched: [],
      inBodyOnly: false,
    }));
  }

  const allowed = new Set(pool.map((p) => p.slug));
  const strict: SearchHit[] = [];
  const loose: SearchHit[] = [];

  for (const entry of index()) {
    if (!allowed.has(entry.post.slug)) continue;

    let score = 0;
    let cardScore = 0;
    const matched: string[] = [];

    for (const term of terms) {
      const hit = resolveTerm(entry, term);
      if (!hit) continue;
      matched.push(hit.term);

      let heaviest = 0;
      for (const field of entry.fields) {
        const n = countOccurrences(field.text, hit.term);
        if (n === 0) continue;
        // Diminishing returns on repeats, so a long article can't brute-force
        // its way past a title match.
        const fieldScore = field.weight * (1 + Math.log2(n));
        score += hit.exact ? fieldScore : fieldScore * 0.5;
        heaviest = Math.max(heaviest, field.weight);
        if (field.weight >= W.excerpt) cardScore += fieldScore;
      }
      // Word-start hits beat mid-word ones ("tax" in "tax time" > "syntax").
      const escaped = hit.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\b${escaped}`).test(entry.haystack)) {
        score += heaviest * 0.5;
      }
    }

    if (matched.length === 0) continue;

    // Nudge shorter titles up: a keyword is more central to a short headline.
    const brevity = 1 + 1 / (1 + entry.post.title.length / 40);
    const result: SearchHit = {
      post: entry.post,
      score: score * brevity,
      matched,
      inBodyOnly: cardScore === 0,
    };
    if (result.inBodyOnly) result.snippet = buildSnippet(entry, matched);

    (matched.length === terms.length ? strict : loose).push(result);
  }

  const hits = strict.length > 0 ? strict : loose;
  return hits.sort(
    (a, b) => b.score - a.score || b.post.iso.localeCompare(a.post.iso)
  );
}

/** Split `text` into alternating plain / matched chunks for highlighting. */
export function highlightParts(
  text: string,
  terms: string[]
): { text: string; hit: boolean }[] {
  if (terms.length === 0) return [{ text, hit: false }];

  const hay = normalize(text);
  const ranges: [number, number][] = [];
  for (const term of terms) {
    let from = 0;
    for (;;) {
      const at = hay.indexOf(term, from);
      if (at === -1) break;
      ranges.push([at, at + term.length]);
      from = at + term.length;
    }
  }
  if (ranges.length === 0) return [{ text, hit: false }];

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }

  const parts: { text: string; hit: boolean }[] = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) {
      parts.push({ text: text.slice(cursor, start), hit: false });
    }
    parts.push({ text: text.slice(start, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}

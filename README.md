# JCA-BNH — Next.js site

A Next.js (App Router, TypeScript) build of the JCA-BNH website design, ported
1:1 from the Claude design files in
`Website redesign analysis request/` (`*.dc.html`).

## Run

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Structure

| Path | Design file it came from |
| --- | --- |
| `app/page.tsx` | `Home.dc.html` |
| `app/financial-advice/page.tsx` | `Financial Advice.dc.html` |
| `app/accounting/page.tsx` | `Accounting.dc.html` |
| `app/about/page.tsx` | `About Us.dc.html` |
| `app/contact/page.tsx` | `Contact.dc.html` |
| `app/blog/page.tsx` | `Blog.dc.html` |
| `app/careers/page.tsx` | `Career.dc.html` |
| `app/services/[slug]/page.tsx` | `Service.dc.html` (was `?s=<slug>`) |

Shared pieces live in `components/`; content and design tokens live in `lib/`
(`site.ts`, `services.ts`, `team.ts`). Images are in `public/assets/`.

Styling follows the design exactly: inline styles carried over verbatim, with
the design's `style-hover` attributes turned into the small set of hover classes
in `app/globals.css` (`.hv-orange`, `.btn-orange`, `.btn-outline`,
`.card-hover`, `.crumb`, `.btn-white`, `.btn-cyan`). Fonts (Archivo, Public
Sans) are loaded with `next/font`.

## Chat assistant

`components/Chatbot.tsx` is the design's `jca-chatbot` widget. The design called
`window.claude.complete`, which only exists inside the Claude artifact runtime,
so it now posts to `app/api/chat/route.ts`. Set `ANTHROPIC_API_KEY` (see
`.env.example`) to enable it; without a key the widget falls back to the
"call us / book a consultation" message the design already defined.

## Forms

The Contact and Careers forms were static markup in the design. They look
identical here and compose a `mailto:` to `info@jca-bnh.com.au` on submit —
swap in a real form handler when a backend is available. A resume chosen on the
Careers form is named in the email body for the applicant to attach; the browser
cannot attach it to a `mailto` on its own.

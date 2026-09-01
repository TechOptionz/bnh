/** Design tokens taken verbatim from the source design file. */
export const C = {
  navy: "#1B2A4C",
  navyDeep: "#12203C",
  navyFooter: "#0E1B33",
  orange: "#F25C0A",
  orangeDark: "#D94F04",
  cyan: "#12B7D6",
  teal: "#0E93AC",
  body: "#46536E",
  mute: "#8A97AF",
  lightBlue: "#C9D4E8",
  footerText: "#9FAEC9",
  bgAlt: "#F4F7FA",
  border: "#E6EBF2",
  borderInput: "#DCE4EE",
  footerRule: "#22335A",
} as const;

export const BOOKING_URL =
  "https://outlook.office365.com/owa/calendar/JCABNH@jcabrehmer.com.au/bookings/?skipRedirect=1";

export const FSG_URL =
  "https://jca-bnh.com.au/wp-content/uploads/2024/02/financial-services-guide.pdf";

export const TERMS_URL = "https://jca-bnh.com.au/terms-of-engagement/";
export const BACHROB_URL = "https://bachrob.com.au/";

export const FACEBOOK_URL = "https://www.facebook.com/jcabnh/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/bnhfinance";

/** Official social profiles, in the order they should be presented. */
export const SOCIALS = [
  { name: "Facebook", href: FACEBOOK_URL, icon: "facebook" },
  { name: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin" },
] as const;

export const PHONE_BRISBANE = "1300 264 346";
export const PHONE_SUNSHINE = "07 5473 5444";
export const EMAIL = "info@jca-bnh.com.au";

export const DISCLAIMER =
  "Any investment information and general advice displayed or given on this website does not take into account any person's personal objectives or financial situation. You should consider the general advice having regard to your own circumstances.";

export const HOURS = "Monday – Friday: 8:30am to 5:00pm";

export const OFFICES = [
  {
    name: "Brisbane (Springwood)",
    address: "Level 1/67 Springwood Rd, Springwood QLD 4127",
    phone: PHONE_BRISBANE,
    tel: "1300264346",
    map: "https://maps.app.goo.gl/aF4LWkjDzYe5XEAm6",
    hours: HOURS,
  },
  {
    name: "Noosa",
    address: "1/31 Thomas Street, Noosaville QLD 4566",
    phone: PHONE_SUNSHINE,
    tel: "0754735444",
    map: "https://www.google.com/maps/place/Unit+1%2F31+Thomas+St,+Noosaville+QLD+4566,+Australia/",
    hours: HOURS,
  },
  {
    name: "Maroochydore",
    address: "2/68 Kingsford Smith Parade, Maroochydore QLD 4558",
    phone: PHONE_SUNSHINE,
    tel: "0754735444",
    map: "https://www.google.com/maps/place/2%2F68+Kingsford+Smith+Parade,+Maroochydore+QLD+4558,+Australia/",
    hours: HOURS,
  },
] as const;

export type Post = {
  slug: string;
  href: string;
  /** Card image; omitted posts render an image placeholder until assets arrive. */
  img?: string;
  alt: string;
  /** ISO date used for sorting; `date` is the display form. */
  iso: string;
  date: string;
  type: "Articles" | "News" | "Podcasts";
  category: string;
  title: string;
  excerpt: string;
};

export const POSTS: readonly Post[] = [
  {
    slug: "financial-planning-for-digital-nomads-and-remote-workers",
    href: "/blog/financial-planning-for-digital-nomads-and-remote-workers",
    img: "/assets/blog-nomads.jpg",
    alt: "Financial planning for digital nomads",
    iso: "2026-04-15",
    date: "15 Apr 2026",
    type: "Articles",
    category: "Financial Planning",
    title: "Financial planning for digital nomads and remote workers",
    excerpt:
      "Conventional employees can usually plan for their financial future knowing certain fundamental parameters will not change\u2026",
  },
  {
    slug: "are-offset-accounts-always-the-best-option-for-home-loans",
    href: "/blog/are-offset-accounts-always-the-best-option-for-home-loans",
    img: "/assets/blog-offset.jpg",
    alt: "Offset accounts and home loans",
    iso: "2026-03-28",
    date: "28 Mar 2026",
    type: "Articles",
    category: "Home Loans",
    title: "Are offset accounts always the best option for home loans?",
    excerpt:
      "Mortgage offset accounts have steadily increased in popularity since they were introduced in Australia in the late 1980s\u2026",
  },
  {
    slug: "10-step-personal-financial-audit-checklist",
    href: "/blog/10-step-personal-financial-audit-checklist",
    img: "/assets/blog-audit.jpg",
    alt: "Personal financial audit checklist",
    iso: "2026-03-26",
    date: "26 Mar 2026",
    type: "Articles",
    category: "Financial Planning",
    title: "Your 10-step personal financial audit checklist",
    excerpt:
      "Set aside an hour, work through these ten steps, and you'll know exactly where your money stands \u2014 and what to fix first\u2026",
  },
  {
    slug: "inflation-proof-your-household-budget",
    href: "/blog/inflation-proof-your-household-budget",
    img: "/assets/blog-inflation.jpg",
    alt: "Inflation-proofing a household budget",
    iso: "2026-03-24",
    date: "24 Mar 2026",
    type: "Articles",
    category: "Budgeting",
    title: "How to inflation-proof your household budget in 2026",
    excerpt:
      "Prices don't need to be surging for inflation to quietly erode your budget. Here's how to build one that holds its shape\u2026",
  },
  {
    slug: "help-your-kids-buy-a-home-without-risking-retirement",
    href: "/blog/help-your-kids-buy-a-home-without-risking-retirement",
    img: "/assets/blog-kids-home.jpg",
    alt: "Parents helping their children buy a home",
    iso: "2025-12-11",
    date: "11 Dec 2025",
    type: "Articles",
    category: "Retirement Planning",
    title: "Help Your Kids Buy a Home Without Risking Retirement",
    excerpt:
      "The Bank of Mum and Dad is now one of Australia's biggest lenders \u2014 but helping your kids into a home shouldn't cost you your retirement\u2026",
  },
  {
    slug: "the-safer-way-to-tap-and-pay",
    href: "/blog/the-safer-way-to-tap-and-pay",
    img: "/assets/blog-tap-pay.jpg",
    alt: "Contactless payment with a mobile wallet",
    iso: "2025-11-22",
    date: "22 Nov 2025",
    type: "Articles",
    category: "Banking & Security",
    title: "The Safer Way to Tap and Pay",
    excerpt:
      "Tap-and-go is wonderfully convenient, but not every way of paying is equally safe. Here's how digital wallets actually protect your card\u2026",
  },
  {
    slug: "top-5-mistakes-business-owners-make-when-applying-for-a-loan",
    href: "/blog/top-5-mistakes-business-owners-make-when-applying-for-a-loan",
    img: "/assets/blog-loans.jpg",
    alt: "Business owner preparing a loan application",
    iso: "2025-04-10",
    date: "10 Apr 2025",
    type: "Articles",
    category: "Business Lending",
    title: "Top 5 Mistakes Business Owners Make When Applying for a Loan",
    excerpt:
      "A loan application is judged long before the paperwork is lodged. These are the five mistakes we see business owners make most often\u2026",
  },
] as const;

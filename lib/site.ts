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

export const PHONE_BRISBANE = "1300 264 346";
export const PHONE_SUNSHINE = "07 5473 5444";
export const EMAIL = "info@jca-bnh.com.au";

export const DISCLAIMER =
  "Any investment information and general advice displayed or given on this website does not take into account any person's personal objectives or financial situation. You should consider the general advice having regard to your own circumstances.";

export const OFFICES = [
  {
    name: "Brisbane (Springwood)",
    address: "Level 1/67 Springwood Rd, Springwood QLD 4127",
    phone: PHONE_BRISBANE,
    tel: "1300264346",
    map: "https://maps.app.goo.gl/aF4LWkjDzYe5XEAm6",
  },
  {
    name: "Noosa",
    address: "1/31 Thomas Street, Noosaville QLD 4566",
    phone: PHONE_SUNSHINE,
    tel: "0754735444",
    map: "https://www.google.com/maps/place/Unit+1%2F31+Thomas+St,+Noosaville+QLD+4566,+Australia/",
  },
  {
    name: "Maroochydore",
    address: "2/68 Kingsford Smith Parade, Maroochydore QLD 4558",
    phone: PHONE_SUNSHINE,
    tel: "0754735444",
    map: "https://www.google.com/maps/place/2%2F68+Kingsford+Smith+Parade,+Maroochydore+QLD+4558,+Australia/",
  },
] as const;

export const POSTS = [
  {
    href: "https://jca-bnh.com.au/blog/financial-planning-for-digital-nomads-and-remote-workers/",
    img: "/assets/blog-nomads.jpg",
    alt: "Financial planning for digital nomads",
    date: "April 15, 2026",
    title: "Financial planning for digital nomads and remote workers",
    excerpt:
      "Conventional employees can usually plan for their financial future knowing certain fundamental parameters will not change\u2026",
  },
  {
    href: "https://jca-bnh.com.au/blog/smarter-way-to-respond-to-super-volatility/",
    img: "/assets/blog-super.jpg",
    alt: "Responding to super volatility",
    date: "April 12, 2026",
    title: "A smarter way to respond to super volatility",
    excerpt:
      "When markets get bumpy or household budgets feel tighter, it's common for people to start questioning their super\u2026",
  },
  {
    href: "https://jca-bnh.com.au/blog/are-offset-accounts-always-the-best-option-for-home-loans/",
    img: "/assets/blog-offset.jpg",
    alt: "Offset accounts and home loans",
    date: "March 28, 2026",
    title: "Are offset accounts always the best option for home loans?",
    excerpt:
      "Mortgage offset accounts have steadily increased in popularity since they were introduced in Australia in the late 1980s\u2026",
  },
] as const;

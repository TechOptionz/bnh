/** Team roster, ported from the design file's About Us data script and
 *  expanded into per-person profiles for the /team/[slug] pages. All profile
 *  copy is drawn from the original bio lines — no invented credentials. */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Division / firm line shown under the role on the profile hero. */
  division: string;
  photo: string;
  /** Optional LinkedIn profile URL, shown on the /team/[slug] hero. */
  linkedin?: string;
  /** Short card bio (used on the About page and team grid). */
  bio: string;
  /** "Meet {first name}" paragraphs. */
  intro: string[];
  /** "Specialisation" paragraph. */
  specialisation: string;
  /** Optional "Leadership & Contribution" paragraph. */
  leadership?: string;
  qualifications: string[];
  expertise: string[];
};

export const TEAM: TeamMember[] = [
  {
    slug: "nayyar-hayat",
    name: "Nayyar Hayat",
    role: "CEO",
    division: "JCA-BNH & BachRob QLD",
    photo: "/assets/team-nayyar.jpg",
    linkedin:
      "https://www.linkedin.com/in/nayyar-hayat-finacial-advisertax-consultant/",
    bio: "CPA (Aus), CFA (USA), FCMA (Pak), Tax Agent, FASEA qualified. Former CFO and CEO of an international airline, with deep expertise in taxation, strategic planning, corporate governance and risk management.",
    intro: [
      "Nayyar leads JCA-BNH and BachRob QLD, working with business owners, families and individuals on the decisions that carry the most weight — tax, structure, strategy and long-term financial direction.",
      "A former CFO and CEO of an international airline, he brings boardroom-level judgement to every engagement, pairing deep technical expertise with a clear, commercial view of what each client is trying to achieve.",
    ],
    specialisation:
      "Nayyar specialises in taxation, strategic planning, corporate governance and risk management, guiding clients through complex structuring and planning decisions with confidence.",
    leadership:
      "As CEO, Nayyar sets the standard for the firm's client-first, hands-on approach — staying accessible and accountable from the first conversation through to long-term strategy.",
    qualifications: [
      "CPA (Australia)",
      "CFA Charterholder (USA)",
      "FCMA (Pakistan)",
      "Registered Tax Agent",
      "FASEA qualified",
    ],
    expertise: [
      "Taxation",
      "Strategic planning",
      "Corporate governance",
      "Risk management",
    ],
  },
  {
    slug: "sajjad-ali",
    name: "Sajjad Ali",
    role: "GM Budget & Business Planning",
    division: "JCA-BNH",
    photo: "/assets/team-sajjad.jpg",
    bio: "Chartered Accountant and Certified Information Systems Auditor with extensive experience in financial management, auditing and aviation accounting, plus bookkeeping, tax advisory and SMSF work for small businesses.",
    intro: [
      "Sajjad heads budgeting and business planning at JCA-BNH, combining a Chartered Accountant's rigour with a systems auditor's eye for process and control.",
      "His background spans financial management, auditing and aviation accounting, alongside hands-on bookkeeping, tax advisory and SMSF work for small businesses.",
    ],
    specialisation:
      "Sajjad specialises in budgeting, business planning and financial management, supported by extensive audit experience and practical small-business tax and SMSF work.",
    qualifications: [
      "Chartered Accountant",
      "Certified Information Systems Auditor (CISA)",
    ],
    expertise: [
      "Budgeting & business planning",
      "Financial management",
      "Auditing",
      "Aviation accounting",
      "Bookkeeping & tax advisory",
      "Self-Managed Superannuation Funds",
    ],
  },
  {
    slug: "tony-smith",
    name: "Tony Smith",
    role: "Senior Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-tony.jpg",
    bio: "CPA and tax agent with over 30 years in taxation law and small business, specialising in Self-Managed Superannuation Funds and passionate about mentorship and client relationships.",
    intro: [
      "Tony has spent more than 30 years in taxation law and small business, building the kind of long-standing client relationships that only come from consistent, personal service.",
      "A CPA and registered tax agent, he is passionate about mentorship — both for the clients he guides and the team members he helps develop.",
    ],
    specialisation:
      "Tony specialises in Self-Managed Superannuation Funds and small-business taxation, drawing on three decades of experience in taxation law.",
    leadership:
      "Tony plays a key mentoring role within the firm, sharing his experience with the wider team and championing the client relationships at the heart of the practice.",
    qualifications: ["CPA", "Registered Tax Agent"],
    expertise: [
      "Self-Managed Superannuation Funds",
      "Taxation law",
      "Small business advisory",
      "Client mentorship",
    ],
  },
  {
    slug: "david-habermas",
    name: "David Habermas",
    role: "Senior Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-david.jpg",
    linkedin: "https://www.linkedin.com/in/david-habermas-cpa-cgma-9638092b/",
    bio: "CPA (Australia) and CPA (US, AICPA), MBA, with 20+ years in industry and taxation across the United States and Australia, including trust account compliance audits for real estate and law clients.",
    intro: [
      "David brings a rare dual perspective to the team, qualified as a CPA in both Australia and the United States with more than 20 years across industry and taxation in the two countries.",
      "His experience includes trust account compliance audits for real estate and law clients — work that demands precision, independence and deep regulatory knowledge.",
    ],
    specialisation:
      "David specialises in cross-jurisdiction taxation and trust account compliance audits, with particular experience serving real estate and legal practices.",
    qualifications: ["CPA (Australia)", "CPA (US, AICPA)", "MBA"],
    expertise: [
      "Taxation (Australia & United States)",
      "Trust account compliance audits",
      "Real estate & legal practice clients",
      "Industry accounting",
    ],
  },
  {
    slug: "yassar-hayat",
    name: "Yassar Hayat",
    role: "Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-yassar.jpg",
    bio: "Chartered Accountant with 17+ years across multiple jurisdictions, including five years with Deloitte (Big 4). Experienced in strategic financial planning, reporting, ERP implementation and taxation.",
    intro: [
      "Yassar is a Chartered Accountant with more than 17 years' experience across multiple jurisdictions, including five years with Deloitte, one of the Big 4 professional services firms.",
      "That blend of big-firm training and multi-jurisdiction experience shows in his work — structured, thorough and always focused on the numbers that matter.",
    ],
    specialisation:
      "Yassar specialises in strategic financial planning, financial reporting, ERP implementation and taxation.",
    qualifications: ["Chartered Accountant"],
    expertise: [
      "Strategic financial planning",
      "Financial reporting",
      "ERP implementation",
      "Taxation",
    ],
  },
  {
    slug: "usama-niaz",
    name: "Usama Niaz",
    role: "Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-usama.jpg",
    linkedin: "https://www.linkedin.com/in/usama-niaz-3b982a193/",
    bio: "Chartered Management Accountant (ACMA), CPA Finalist and FMVA with 5+ years in finance and taxation, skilled in QuickBooks, Xero and Zoho Books, budgeting, forecasting and payroll.",
    intro: [
      "Usama is a Chartered Management Accountant with more than five years in finance and taxation, known for turning clean books into clear decisions.",
      "He works fluently across QuickBooks, Xero and Zoho Books, supporting clients with budgeting, forecasting and payroll.",
    ],
    specialisation:
      "Usama specialises in management accounting, budgeting, forecasting and payroll, with strong cloud-accounting skills across QuickBooks, Xero and Zoho Books.",
    qualifications: [
      "Chartered Management Accountant (ACMA)",
      "CPA Finalist",
      "Financial Modeling & Valuation Analyst (FMVA)",
    ],
    expertise: [
      "Budgeting & forecasting",
      "Payroll",
      "Taxation",
      "QuickBooks, Xero & Zoho Books",
    ],
  },
  {
    slug: "amit-kumar",
    name: "Amit Kumar",
    role: "Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-amit.jpg",
    bio: "9+ years in public and corporate accounting — bookkeeping, financial reporting, budgeting, tax preparation and payroll — proficient in Xero, QuickBooks, MYOB and Tally Prime.",
    intro: [
      "Amit brings more than nine years of public and corporate accounting experience to the team, covering the full span of day-to-day financial operations.",
      "From bookkeeping and financial reporting to budgeting, tax preparation and payroll, he keeps clients' finances accurate, current and audit-ready.",
    ],
    specialisation:
      "Amit specialises in bookkeeping, financial reporting, budgeting, tax preparation and payroll, working across Xero, QuickBooks, MYOB and Tally Prime.",
    qualifications: ["9+ years in public & corporate accounting"],
    expertise: [
      "Bookkeeping",
      "Financial reporting",
      "Budgeting",
      "Tax preparation & payroll",
      "Xero, QuickBooks, MYOB & Tally Prime",
    ],
  },
  {
    slug: "haiting-yin",
    name: "Haiting Yin",
    role: "Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-haiting.jpg",
    linkedin: "https://www.linkedin.com/in/haiting-yin-269500165/",
    bio: "Member of CA ANZ with a GDipCA, Master of Professional Accounting and Master of Applied Finance, specialising in taxation law and financial reporting.",
    intro: [
      "Haiting pairs strong academic foundations — two master's degrees and a graduate diploma of chartered accounting — with practical, detail-driven client work.",
      "A member of Chartered Accountants Australia & New Zealand, she focuses on getting the technical detail right so clients can act with certainty.",
    ],
    specialisation:
      "Haiting specialises in taxation law and financial reporting.",
    qualifications: [
      "Member, Chartered Accountants ANZ",
      "Graduate Diploma of Chartered Accounting (GDipCA)",
      "Master of Professional Accounting",
      "Master of Applied Finance",
    ],
    expertise: ["Taxation law", "Financial reporting"],
  },
  {
    slug: "emelinda-albury",
    name: "Emelinda Albury",
    role: "Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-emelinda.jpg",
    bio: "Commerce (Accounting) graduate experienced across financial reporting, tax for companies, trusts, partnerships and individuals, tax planning, cashflow analysis, onboarding and bookkeeping.",
    intro: [
      "Emelinda works across the full breadth of the firm's compliance and advisory work, from financial reporting through to tax planning and cashflow analysis.",
      "She prepares tax for companies, trusts, partnerships and individuals, and often serves as the first point of contact for new clients through onboarding and bookkeeping.",
    ],
    specialisation:
      "Emelinda specialises in financial reporting, tax across all entity types, tax planning, cashflow analysis, client onboarding and bookkeeping.",
    qualifications: ["Bachelor of Commerce (Accounting)"],
    expertise: [
      "Financial reporting",
      "Tax — companies, trusts, partnerships & individuals",
      "Tax planning",
      "Cashflow analysis",
      "Onboarding & bookkeeping",
    ],
  },
  {
    slug: "naeem-anwar",
    name: "Naeem Anwar",
    role: "Accountant",
    division: "JCA-BNH",
    photo: "/assets/team-male.jpg",
    bio: "Finance professional with 30+ years in the sugar mill industry, with expertise in financial management, strategic planning and operational efficiency.",
    intro: [
      "Naeem brings more than 30 years of industry finance experience to the team, forged in the demanding operational environment of the sugar mill industry.",
      "That background gives him a grounded, practical understanding of how businesses actually run — and where the financial levers really are.",
    ],
    specialisation:
      "Naeem specialises in financial management, strategic planning and operational efficiency.",
    qualifications: ["30+ years in industry finance"],
    expertise: [
      "Financial management",
      "Strategic planning",
      "Operational efficiency",
    ],
  },
  {
    slug: "saqib-ahmed",
    name: "Saqib Ahmed",
    role: "Tax & Accounting Consultant",
    division: "JCA-BNH",
    photo: "/assets/team-male.jpg",
    bio: "MBA in Finance with expertise in ledger, asset, payroll and risk management, skilled in Xero, SAP, Oracle, MYOB and QuickBooks; certified in Oracle Payables and Lean Six Sigma.",
    intro: [
      "Saqib is a tax and accounting consultant with an MBA in Finance and broad systems expertise spanning Xero, SAP, Oracle, MYOB and QuickBooks.",
      "His process-improvement mindset — backed by Lean Six Sigma certification — means clients get books that are not just accurate, but efficient to maintain.",
    ],
    specialisation:
      "Saqib specialises in ledger, asset, payroll and risk management, with deep multi-platform accounting systems experience.",
    qualifications: [
      "MBA in Finance",
      "Certified, Oracle Payables",
      "Certified, Lean Six Sigma",
    ],
    expertise: [
      "Ledger & asset management",
      "Payroll",
      "Risk management",
      "Xero, SAP, Oracle, MYOB & QuickBooks",
    ],
  },
  {
    slug: "mariam-bintehassan",
    name: "Mariam Bintehassan",
    role: "Ops, Marketing & CX Manager",
    division: "JCA-BNH",
    photo: "/assets/team-female.jpg",
    bio: "20+ years in digital marketing, customer experience, tech product development and project management across SaaS, BPO and healthcare.",
    intro: [
      "Mariam runs operations, marketing and client experience at JCA-BNH, making sure every interaction with the firm is as considered as the advice itself.",
      "She brings more than 20 years of experience across digital marketing, customer experience, tech product development and project management, spanning SaaS, BPO and healthcare.",
    ],
    specialisation:
      "Mariam specialises in operations, digital marketing, customer experience and project management.",
    qualifications: [
      "20+ years across SaaS, BPO & healthcare",
    ],
    expertise: [
      "Digital marketing",
      "Customer experience",
      "Tech product development",
      "Project management",
    ],
  },
];

export const teamMember = (slug: string) =>
  TEAM.find((m) => m.slug === slug);

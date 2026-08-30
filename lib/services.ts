/**
 * Service detail content, ported from the design file's `Service.dc.html` data
 * script. The `?s=<slug>` query param became the `/services/<slug>` route.
 */

export const FA = "Financial Advice";
export const ACC = "Accounting, Taxation & Advisory";

export type Service = {
  division: typeof FA | typeof ACC;
  title: string;
  tagline: string;
  paras: string[];
  offer: string[];
  sections: { h: string; p: string }[];
};

export const SERVICES: Record<string, Service> = {
  "life-insurances": {
    division: FA,
    title: "Life & Other Personal Insurances",
    tagline:
      "Protect your family, income and lifestyle with cover that matches your circumstances.",
    paras: [
      "The right personal insurance keeps your family and finances secure when life doesn't go to plan. We review your circumstances, existing cover and superannuation-held policies, then recommend the mix of protection that suits your commitments and budget.",
    ],
    offer: [
      "Life cover, TPD, trauma and income protection advice",
      "Reviewing existing policies and cover held inside super",
      "Structuring premiums tax-effectively",
      "Claims support when you need it most",
    ],
    sections: [
      {
        h: "Cover that keeps pace with your life",
        p: "Marriage, children, a new mortgage or a business — each changes how much cover you need. We review your protection regularly so you're neither under-insured nor paying for cover you no longer need.",
      },
    ],
  },
  "retirement-plan": {
    division: FA,
    title: "Retirement Planning",
    tagline: "A clear, staged plan for the retirement lifestyle you want to fund.",
    paras: [
      "Retirement planning is about knowing the lifestyle you want and building a realistic path to fund it. We model your income needs, super balance, entitlements and investments to show exactly where you stand and what to adjust.",
    ],
    offer: [
      "Retirement income modelling and gap analysis",
      "Super contribution and drawdown strategies",
      "Transition-to-retirement planning",
      "Age Pension and entitlement guidance",
    ],
    sections: [
      {
        h: "Start earlier than you think",
        p: "The most powerful retirement decisions are made 10–20 years out — contribution top-ups, investment mix and debt reduction all compound. Wherever you're starting from, we build a plan you can act on this year.",
      },
    ],
  },
  "retirement-savings": {
    division: FA,
    title: "Retirement Savings Accounts Advice",
    tagline: "Advice on RSA products and how they fit your retirement strategy.",
    paras: [
      "Retirement Savings Accounts (RSAs) are simple, capital-guaranteed accounts offered by banks and building societies. They can suit savers who want low-risk, low-fee retirement savings — but they aren't right for everyone. We help you weigh RSAs against super fund alternatives.",
    ],
    offer: [
      "Comparing RSAs with superannuation fund options",
      "Assessing fees, returns and guarantees",
      "Fitting an RSA into your broader retirement plan",
    ],
    sections: [
      {
        h: "Simple doesn't always mean best",
        p: "Capital security comes at the cost of long-term growth. We'll show you the trade-offs in plain terms so you can decide with confidence.",
      },
    ],
  },
  "smsf-advice": {
    division: FA,
    title: "SMSF Advice",
    tagline:
      "Guidance on establishing and running a self-managed super fund with confidence.",
    paras: [
      "A self-managed super fund gives you control over how your retirement savings are invested — along with real responsibilities as trustee. We advise on whether an SMSF suits you, and support you through setup, investment strategy and ongoing obligations.",
    ],
    offer: [
      "Is an SMSF right for you? Honest suitability advice",
      "Fund establishment and trustee structure",
      "Investment strategy development",
      "Ongoing compliance and administration support",
    ],
    sections: [
      {
        h: "Advice plus accounting, under one roof",
        p: "Our Financial Advice and Accounting divisions work together, so your SMSF's strategy, administration, accounts and audit are coordinated rather than scattered across providers.",
      },
    ],
  },
  "managed-investments": {
    division: FA,
    title: "Managed Investment Schemes Advice",
    tagline: "Advice on managed funds aligned to your goals and risk profile.",
    paras: [
      "Managed investment schemes pool your money with other investors under professional management — a practical way to diversify across assets and markets. We help you choose schemes that match your goals, time horizon and appetite for risk.",
    ],
    offer: [
      "Selecting managed funds suited to your risk profile",
      "Portfolio diversification across asset classes",
      "Fee and performance comparison",
      "Ongoing portfolio reviews",
    ],
    sections: [
      {
        h: "Understand what you own",
        p: "We explain each recommendation — what the fund holds, what it costs and the role it plays in your portfolio — so you're never invested in something you don't understand.",
      },
    ],
  },
  "stocks-bonds": {
    division: FA,
    title: "Stocks, Bonds & Government Debentures Advice",
    tagline:
      "Direct investment advice across equities and fixed-interest securities.",
    paras: [
      "Direct investment in shares, bonds and government debentures can offer growth, income and capital security in different measures. We advise on building and managing a direct portfolio that balances all three against your goals.",
    ],
    offer: [
      "Direct share portfolio construction and review",
      "Fixed-interest and debenture selection",
      "Income vs growth balancing",
      "Tax-aware investment structuring",
    ],
    sections: [
      {
        h: "Advice grounded in strategy, not tips",
        p: "Every recommendation ties back to your documented risk profile and financial plan — not market noise.",
      },
    ],
  },
  "super-advice": {
    division: FA,
    title: "Super Advice",
    tagline:
      "Make the most of superannuation contributions, structure and strategy.",
    paras: [
      "Superannuation remains one of the most tax-effective ways to build wealth in Australia — if it's set up well. We advise on contributions, investment options, consolidation and beneficiary arrangements so your super works as hard as you do.",
    ],
    offer: [
      "Contribution strategies (concessional and non-concessional)",
      "Fund and investment option review",
      "Consolidating multiple accounts",
      "Death benefit nominations and structure",
    ],
    sections: [
      {
        h: "Small changes, big outcomes",
        p: "A contribution top-up or investment-mix change made today can be worth tens of thousands at retirement. We find the adjustments that matter for your situation.",
      },
    ],
  },
  "margin-lending": {
    division: FA,
    title: "Standard Margin Lending Facilities",
    tagline: "Understand the opportunities and risks of borrowing to invest.",
    paras: [
      "Margin lending lets you borrow against your portfolio to increase your investment exposure — magnifying gains, but also losses. We give you clear-eyed advice on whether gearing suits your circumstances and how to manage the risks if it does.",
    ],
    offer: [
      "Suitability assessment for geared investing",
      "Facility selection and loan-to-value settings",
      "Margin call risk management",
      "Tax considerations of investment borrowing",
    ],
    sections: [
      {
        h: "Gearing is a strategy, not a shortcut",
        p: "We model downside scenarios before you borrow a dollar, so you know exactly how the facility behaves in a falling market.",
      },
    ],
  },
  "estate-planning": {
    division: FA,
    title: "Estate Planning",
    tagline: "Ensure your wealth passes to the right people, the right way.",
    paras: [
      "Estate planning is more than a will — it's making sure your assets, super and business interests pass to the people you choose, tax-effectively and without dispute. We work alongside your legal adviser to structure an estate plan that holds up.",
    ],
    offer: [
      "Estate structure and beneficiary planning",
      "Super death benefits and binding nominations",
      "Testamentary trust considerations",
      "Business succession coordination",
    ],
    sections: [
      {
        h: "Coordinated with your whole plan",
        p: "Because we also handle your tax and financial advice, your estate plan reflects your real asset structure — not a snapshot that's out of date the moment circumstances change.",
      },
    ],
  },
  "business-advisory": {
    division: ACC,
    title: "Business Advisory",
    tagline:
      "Practical guidance on structure, growth and performance for your business.",
    paras: [
      "Good numbers are only useful if they lead to good decisions. Our business advisory team helps you read what the figures are saying — about structure, pricing, cashflow and growth — and act on them with confidence.",
      "We also advise on bigger moves: mergers and acquisitions, capital restructuring, and business review and analysis.",
    ],
    offer: [
      "Business structure and restructuring advice",
      "Performance review and benchmarking",
      "Mergers, acquisitions and exit planning",
      "Cashflow and profitability improvement",
    ],
    sections: [
      {
        h: "An adviser who knows your whole picture",
        p: "Because your accounting, tax and advisory sit with one firm, our recommendations account for the tax and compliance consequences from day one.",
      },
    ],
  },
  "business-planning": {
    division: ACC,
    title: "Business Planning & Forecasting",
    tagline: "Budgets, forecasts and plans that turn ambitions into numbers.",
    paras: [
      "A plan turns ambition into something you can manage. We build budgets, cashflow forecasts and business plans that give you a working financial roadmap — and we review them with you as conditions change.",
    ],
    offer: [
      "Annual budgets and rolling forecasts",
      "Cashflow projections and scenario modelling",
      "Business plans for lenders and investors",
      "Regular plan-vs-actual reviews",
    ],
    sections: [
      {
        h: "Forecasts you actually use",
        p: "We keep models practical and readable, built in tools your team already uses, so the forecast becomes part of running the business — not a document that gathers dust.",
      },
    ],
  },
  "business-software": {
    division: ACC,
    title: "Business Software Advice & Implementation",
    tagline:
      "Xero, MYOB, QuickBooks and more — chosen and set up for your workflow.",
    paras: [
      "The right accounting software saves hours every week; the wrong setup costs them. As partners of Xero, MYOB and Intuit QuickBooks, we help you choose the platform that fits your business and implement it properly — chart of accounts, payroll, integrations and training.",
    ],
    offer: [
      "Software selection across Xero, MYOB and QuickBooks",
      "Migration and clean setup",
      "Payroll, invoicing and bank-feed configuration",
      "Team training and ongoing support",
    ],
    sections: [
      {
        h: "Certified partners, independent advice",
        p: "We're accredited across the major platforms, so our recommendation is based on your workflow — not a single vendor relationship.",
      },
    ],
  },
  "business-support": {
    division: ACC,
    title: "Business Support",
    tagline: "Day-to-day support so you can focus on running the business.",
    paras: [
      "From ASIC obligations to ad-hoc questions about hiring, GST or a new venture, our business support service gives you a responsive team to lean on — so small questions get answered before they become big problems.",
    ],
    offer: [
      "Company secretarial and ASIC compliance",
      "Registrations: ABN, GST, PAYG, TFN",
      "Ad-hoc advice on everyday business decisions",
      "Liaison with the ATO on your behalf",
    ],
    sections: [
      {
        h: "A team on call, not a ticket queue",
        p: "Clients deal with a dedicated accountant who knows their business — Monday to Friday, 8am to 5pm.",
      },
    ],
  },
  "process-improvement": {
    division: ACC,
    title: "Computerisation & Business Process Improvement",
    tagline: "Streamline and digitise processes to cut cost and error.",
    paras: [
      "Manual processes cost time and invite errors. We review how information moves through your business — from sales to books to reporting — and redesign it with automation and integrated software, so the numbers are timely and trustworthy.",
    ],
    offer: [
      "Process review and bottleneck analysis",
      "Automation of bookkeeping and reporting workflows",
      "System integration across sales, inventory and accounts",
      "Internal controls that scale with growth",
    ],
    sections: [
      {
        h: "Improvement measured in hours saved",
        p: "Every engagement targets specific, measurable outcomes: fewer manual entries, faster month-end close, cleaner data for decisions.",
      },
    ],
  },
  "internal-audit": {
    division: ACC,
    title: "Internal Audit & Risk Management",
    tagline: "Independent assurance over controls, compliance and risk.",
    paras: [
      "Strong internal controls protect your business from error, fraud and compliance failures. Our internal audit and risk management services give owners and boards independent assurance that key processes are working — and clear recommendations where they aren't.",
    ],
    offer: [
      "Internal control review and testing",
      "Risk assessment and risk register development",
      "Fraud risk and compliance reviews",
      "Practical remediation recommendations",
    ],
    sections: [
      {
        h: "Assurance sized for your business",
        p: "You don't need a corporate audit department to benefit from internal audit discipline. We scale the approach to SMEs, not-for-profits and growing groups.",
      },
    ],
  },
  "audit-services": {
    division: ACC,
    title: "Audit Services",
    tagline:
      "Statutory and special-purpose audits, including trust account compliance.",
    paras: [
      "We provide independent audit services for companies, not-for-profits and trust accounts — delivered efficiently, with findings explained in plain language. Our team's experience includes trust account compliance audits for real estate and law practices.",
    ],
    offer: [
      "Statutory and special-purpose financial audits",
      "Real estate and legal trust account audits",
      "Not-for-profit and association audits",
      "SMSF audit coordination",
    ],
    sections: [
      {
        h: "An audit that adds value",
        p: "Beyond the opinion, we report what we see: control gaps, process improvements and risks worth your attention.",
      },
    ],
  },
  "taxation-advisory": {
    division: ACC,
    title: "Taxation Advisory",
    tagline:
      "Simplifying the complexities of taxes for individuals and businesses.",
    paras: [
      "Managing tax is crucial for minimising costs and maximising benefits — it's not only about compliance, but about taking advantage of tax-effective options. With laws changing constantly, the right advice avoids penalties and losses.",
      "Our advisory team provides far more than lodgement: choosing the right tax structure, implementing legal tax-efficient strategies, and custom advice for high-net-worth individuals and businesses operating across borders.",
    ],
    offer: [
      "Income tax returns for individuals, companies, trusts and partnerships",
      "BAS and IAS preparation and lodgement",
      "Capital gains tax planning and structuring",
      "Payroll tax, FBT, fuel tax and stamp duty",
      "ATO dispute resolution and litigation support",
      "Tax consolidation, thin capitalisation and TOFA advice",
    ],
    sections: [
      {
        h: "Expert advice, real savings",
        p: "A good tax adviser identifies deductions and credits you'd miss on your own, streamlines your tax processes, and gives you peace of mind that your affairs are compliant and efficient.",
      },
      {
        h: "Support when the ATO comes calling",
        p: "From audits to assessments in dispute, we prepare evidence, negotiate with the ATO and represent you through conciliation or mediation — minimising liabilities, penalties and stress.",
      },
    ],
  },
  "tax-audit-insurance": {
    division: ACC,
    title: "Tax Audit Insurance",
    tagline: "Cover for the professional costs of responding to an ATO audit.",
    paras: [
      "Even a perfectly compliant taxpayer can be selected for an ATO audit or review — and responding properly takes professional time that isn't free. Tax audit insurance covers those professional fees, so an audit doesn't become a financial burden.",
    ],
    offer: [
      "Cover for accounting fees during audits and reviews",
      "Protection across income tax, GST, payroll tax and more",
      "Simple annual premiums for individuals and businesses",
    ],
    sections: [
      {
        h: "Small premium, real protection",
        p: "Audit activity is increasingly data-driven and random. For a modest annual cost, you remove the risk of a five-figure professional bill.",
      },
    ],
  },
  "grants-advice": {
    division: ACC,
    title: "Grants Advice",
    tagline: "Identify and apply for grants your business may be eligible for.",
    paras: [
      "Government grants and incentives go unclaimed every year simply because businesses don't know they exist. We help you identify federal, state and local programs you're eligible for, and prepare applications that meet the criteria.",
    ],
    offer: [
      "Grant and incentive eligibility review",
      "Application preparation and financials",
      "R&D tax incentive guidance",
      "Post-award reporting and compliance",
    ],
    sections: [
      {
        h: "Funding you don't have to pay back",
        p: "A successful grant can fund equipment, hiring or expansion at no dilution and no debt — worth a conversation before your next investment decision.",
      },
    ],
  },
  "smsf-accounting": {
    division: ACC,
    title: "Self-Managed Super Funds",
    tagline: "SMSF accounting, administration and compliance handled end to end.",
    paras: [
      "Running an SMSF comes with strict accounting, reporting and audit obligations. Our SMSF specialists — including senior accountants with decades of SMSF experience — handle the administration so your fund stays compliant while you stay in control.",
    ],
    offer: [
      "Annual SMSF financial statements and tax returns",
      "Independent audit coordination",
      "Pension establishment and compliance",
      "Trustee obligation guidance",
    ],
    sections: [
      {
        h: "Specialists, not generalists",
        p: "SMSF rules change frequently and penalties for breaches are real. Our team lives in this space, so your fund is always a step ahead of its obligations.",
      },
    ],
  },
  "virtual-cfo": {
    division: ACC,
    title: "Virtual CFO",
    tagline: "Senior financial leadership on demand, without the full-time cost.",
    paras: [
      "Growing businesses need CFO-level thinking long before they can justify a CFO salary. Our Virtual CFO service gives you senior financial leadership — reporting, strategy, cashflow discipline and board-ready insight — on a fractional basis.",
    ],
    offer: [
      "Monthly management reporting and KPI dashboards",
      "Cashflow management and funding strategy",
      "Budgeting, forecasting and scenario planning",
      "Board and stakeholder reporting",
    ],
    sections: [
      {
        h: "Led by real CFO experience",
        p: "Our team includes advisers who have served as CFO and CEO of major organisations — you get judgement built on operating experience, not just reports.",
      },
    ],
  },
  "bookkeeping-payroll": {
    division: ACC,
    title: "Bookkeeping & Payroll",
    tagline: "Accurate, on-time books and payroll on Xero, MYOB or QuickBooks.",
    paras: [
      "Clean books are the foundation of every good financial decision — and every stress-free tax time. We take bookkeeping and payroll off your plate entirely: transactions coded, accounts reconciled, staff paid correctly and on time.",
    ],
    offer: [
      "Day-to-day bookkeeping and bank reconciliation",
      "Payroll processing, STP and superannuation",
      "Accounts payable and receivable management",
      "BAS-ready books, every quarter",
    ],
    sections: [
      {
        h: "Your books, always current",
        p: "Cloud platforms mean your numbers are live, not months behind — so decisions, lodgements and lending applications never wait on the bookkeeping.",
      },
    ],
  },
};

export const DEFAULT_SLUG = "taxation-advisory";

/** Up to six other services in the same division, in declaration order. */
export function relatedServices(slug: string) {
  const current = SERVICES[slug];
  if (!current) return [];
  return Object.entries(SERVICES)
    .filter(
      ([, v]) => v.division === current.division && v.title !== current.title,
    )
    .slice(0, 6)
    .map(([k, v]) => ({ title: v.title, href: `/services/${k}` }));
}

export function divisionHref(division: Service["division"]) {
  return division === FA ? "/financial-advice" : "/accounting";
}

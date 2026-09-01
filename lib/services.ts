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

/** Sub-category groupings used by the navigation menus, in display order. */
const SERVICE_GROUPS: {
  division: typeof FA | typeof ACC;
  label: string;
  slugs: string[];
}[] = [
  {
    division: FA,
    label: "Retirement & Super",
    slugs: ["retirement-plan", "retirement-savings", "super-advice", "smsf-advice"],
  },
  {
    division: FA,
    label: "Investments",
    slugs: ["managed-investments", "stocks-bonds", "margin-lending"],
  },
  {
    division: FA,
    label: "Protection & Estate",
    slugs: ["life-insurances", "estate-planning"],
  },
  {
    division: ACC,
    label: "Business",
    slugs: [
      "business-advisory",
      "business-planning",
      "business-software",
      "business-support",
      "process-improvement",
    ],
  },
  {
    division: ACC,
    label: "Taxation",
    slugs: ["taxation-advisory", "tax-audit-insurance", "grants-advice"],
  },
  {
    division: ACC,
    label: "Audit",
    slugs: ["internal-audit", "audit-services"],
  },
  {
    division: ACC,
    label: "Accounting",
    slugs: ["smsf-accounting", "virtual-cfo", "bookkeeping-payroll"],
  },
];

/** A division's services grouped by sub-category, resolved to nav links. */
export function serviceGroups(division: typeof FA | typeof ACC) {
  return SERVICE_GROUPS.filter((g) => g.division === division).map((g) => ({
    label: g.label,
    links: g.slugs.map((slug) => ({
      href: `/services/${slug}`,
      label: SERVICES[slug].title,
    })),
  }));
}

export type Faq = { q: string; a: string };

/** Per-service FAQ content shown in the accordion at the bottom of each
 *  service detail page. */
export const FAQS: Record<string, Faq[]> = {
  "life-insurances": [
    {
      q: "What types of personal insurance should I consider?",
      a: "The four core covers are life insurance, total and permanent disability (TPD), trauma cover and income protection. Most people need a mix of these rather than one policy — we assess your commitments, debts and dependants to recommend the right combination and amounts.",
    },
    {
      q: "Can I hold insurance inside my superannuation?",
      a: "Yes. Life, TPD and some income protection cover can be held inside super, which can make premiums more affordable and tax-effective. It isn't always the best structure for every cover type, so we review what you hold in super and what belongs outside it.",
    },
    {
      q: "How much cover do I actually need?",
      a: "It depends on your debts, income, dependants and existing assets. We model what your family would need to clear the mortgage, replace income and fund education, then match cover to that figure — so you're neither under-insured nor paying for cover you don't need.",
    },
    {
      q: "Will you help me at claim time?",
      a: "Absolutely. Claim time is when advice matters most. We manage the claims process with the insurer on your behalf — paperwork, evidence and follow-up — so you can focus on your family rather than forms.",
    },
  ],
  "retirement-plan": [
    {
      q: "When should I start planning for retirement?",
      a: "Earlier than you think. The most powerful retirement decisions — contribution top-ups, investment mix and debt reduction — compound over 10 to 20 years. That said, meaningful improvements can be made at any stage, even within a few years of retiring.",
    },
    {
      q: "How much do I need to retire comfortably?",
      a: "There's no single number — it depends on the lifestyle you want, your home ownership status and how long your savings need to last. We model your income needs against your super, investments and entitlements to show the real figure for your situation.",
    },
    {
      q: "What is a transition-to-retirement strategy?",
      a: "It lets you draw a pension from your super while still working — often used to reduce hours without reducing income, or to boost super tax-effectively in the final working years. We'll advise whether it suits your circumstances.",
    },
    {
      q: "Will I still be eligible for the Age Pension?",
      a: "Possibly — many part-pensions and concession entitlements go unclaimed. We assess your position against the income and assets tests and structure your affairs to make the most of what you're entitled to.",
    },
  ],
  "retirement-savings": [
    {
      q: "What is a Retirement Savings Account (RSA)?",
      a: "An RSA is a simple, capital-guaranteed retirement savings product offered by banks and building societies. Your balance can't fall with markets, and fees are typically low — but long-term growth is limited compared with superannuation funds.",
    },
    {
      q: "How does an RSA compare with a super fund?",
      a: "An RSA prioritises capital security; a super fund prioritises long-term growth through market investments. Which is right depends on your age, risk tolerance and time to retirement. We compare both against your circumstances before recommending anything.",
    },
    {
      q: "Who does an RSA suit?",
      a: "Typically savers close to retirement who value certainty over growth, or those with small balances where simplicity and low fees matter most. For most long-horizon savers, a diversified super fund usually offers better outcomes.",
    },
    {
      q: "Can I move my RSA into super later?",
      a: "Yes — RSA balances can generally be rolled into a superannuation fund. We'll advise on timing and the right receiving fund so the move supports your broader retirement strategy.",
    },
  ],
  "smsf-advice": [
    {
      q: "Is an SMSF right for me?",
      a: "Not for everyone. An SMSF offers control and investment flexibility, but it comes with real trustee responsibilities, costs and time. We give you an honest suitability assessment before anything is set up — and we'll tell you plainly if you're better off elsewhere.",
    },
    {
      q: "How much super do I need to start an SMSF?",
      a: "There's no legal minimum, but as a guide, an SMSF generally becomes cost-competitive with larger balances, often when combining family members' super. We'll model the costs against your balance so you can decide with real numbers.",
    },
    {
      q: "What are my responsibilities as a trustee?",
      a: "Trustees are legally responsible for the fund: maintaining an investment strategy, keeping records, lodging returns, arranging the annual audit and complying with super law. We support you through each obligation so nothing is missed.",
    },
    {
      q: "Can you handle my SMSF's accounting and audit as well?",
      a: "Yes. Our Financial Advice and Accounting divisions work under one roof, so your SMSF's strategy, administration, financial statements, tax return and audit coordination are managed together rather than scattered across providers.",
    },
  ],
  "managed-investments": [
    {
      q: "What is a managed investment scheme?",
      a: "A managed fund pools your money with other investors under professional management, giving you access to diversified portfolios across shares, property, fixed interest and other assets — often with smaller amounts than direct investment would require.",
    },
    {
      q: "How do you choose funds for me?",
      a: "We start with your goals, time horizon and risk profile, then assess funds on strategy, underlying holdings, fees, performance history and the quality of the manager. Every recommendation is explained — what the fund holds, what it costs and the role it plays.",
    },
    {
      q: "What fees are involved?",
      a: "Managed funds charge management fees and sometimes performance fees; our advice fees are disclosed separately and agreed up front. We compare total costs across options because fees compound just like returns do.",
    },
    {
      q: "How often will my portfolio be reviewed?",
      a: "We conduct scheduled reviews — typically annually or more often for complex portfolios — and we'll also review when your circumstances or market conditions change materially.",
    },
  ],
  "stocks-bonds": [
    {
      q: "Should I invest directly or through managed funds?",
      a: "Both have a place. Direct shares and bonds give you control, transparency and tax flexibility; managed funds give diversification and professional management. Many clients hold a blend — we'll recommend the mix that fits your goals and portfolio size.",
    },
    {
      q: "How do bonds and debentures fit into a portfolio?",
      a: "Fixed-interest investments provide predictable income and help cushion a portfolio against sharemarket falls. The right allocation depends on your income needs, risk profile and stage of life.",
    },
    {
      q: "Do you provide share tips?",
      a: "No — and we'd caution against anyone who does. Every recommendation we make ties back to your documented risk profile and financial plan, not market noise or speculation.",
    },
    {
      q: "How is tax handled on my investments?",
      a: "Dividends, franking credits, interest and capital gains all have different tax treatments. Because our advisers work alongside our accounting division, your portfolio is structured tax-aware from the start — not untangled at tax time.",
    },
  ],
  "super-advice": [
    {
      q: "What contribution strategies can reduce my tax?",
      a: "Concessional contributions (like salary sacrifice) are taxed at 15% rather than your marginal rate, and catch-up rules may let you use unused caps from prior years. Non-concessional contributions, spouse contributions and co-contributions can also help — we'll find what applies to you.",
    },
    {
      q: "Should I consolidate my super accounts?",
      a: "Usually holding multiple accounts means multiple sets of fees and lost track of insurance. But consolidation can cancel valuable cover, so we check insurance and exit costs before recommending a rollover.",
    },
    {
      q: "How do I choose the right investment option inside super?",
      a: "Your investment mix should match your age, risk tolerance and retirement timeline — not just the default option. A small change in investment mix today can be worth tens of thousands at retirement.",
    },
    {
      q: "What is a death benefit nomination and do I need one?",
      a: "Super doesn't automatically follow your will. A valid binding nomination directs who receives your super and insurance if you die. We make sure your nominations are valid, current and tax-effective for your beneficiaries.",
    },
  ],
  "margin-lending": [
    {
      q: "What is margin lending?",
      a: "A margin loan lets you borrow against your investment portfolio to increase your market exposure. Gearing magnifies gains — and losses — so it suits investors with the income, time horizon and temperament to manage the risk.",
    },
    {
      q: "What is a margin call?",
      a: "If your portfolio's value falls below the lender's required loan-to-value ratio, you must add funds or sell assets. Before you borrow a dollar, we model exactly how your facility behaves in a falling market so a margin call never takes you by surprise.",
    },
    {
      q: "Is gearing right for me?",
      a: "Only if you have stable income to service the loan, a long investment horizon and a genuine tolerance for volatility. We give clear-eyed suitability advice — and we'll tell you plainly if gearing isn't appropriate for your circumstances.",
    },
    {
      q: "What are the tax implications of borrowing to invest?",
      a: "Interest on investment loans is generally tax-deductible, which is part of gearing's appeal — but tax should never be the sole reason to borrow. We weigh the after-tax outcome across realistic market scenarios.",
    },
  ],
  "estate-planning": [
    {
      q: "Isn't estate planning just having a will?",
      a: "A will is only one piece. Superannuation, jointly held assets and family trusts don't automatically follow your will — and each needs its own arrangements. Proper estate planning covers all of it, tax-effectively and without ambiguity.",
    },
    {
      q: "Does my super automatically go to my estate?",
      a: "No. Super is paid at the trustee's discretion unless you have a valid binding death benefit nomination. We make sure your nominations are in place, current, and structured so benefits reach the right people with the least tax.",
    },
    {
      q: "What is a testamentary trust?",
      a: "A trust created by your will that can protect assets for beneficiaries and provide significant tax advantages, particularly for minor children. We'll advise whether one belongs in your plan and coordinate with your solicitor to implement it.",
    },
    {
      q: "Do you work with my solicitor?",
      a: "Yes. Legal documents are drafted by your lawyer; our role is to make sure the plan reflects your real asset structure, super and tax position — so the documents actually achieve what you intend.",
    },
  ],
  "business-advisory": [
    {
      q: "What does a business adviser do for my business?",
      a: "A business adviser helps you read what your numbers are saying — about structure, pricing, cashflow and growth — and turn them into decisions. That spans everyday performance reviews through to bigger moves like restructuring, acquisitions and exit planning.",
    },
    {
      q: "What's the difference between accounting and business advisory?",
      a: "Accounting records and reports what has happened; advisory is about what happens next. Compliance keeps you out of trouble — advisory helps you grow, improve margins and make confident decisions with the numbers in front of you.",
    },
    {
      q: "Do I need advisory services if I already have an accountant?",
      a: "If your accountant only lodges returns, you're missing the value in your own data. Because our advisory and accounting teams work together, our recommendations account for tax and compliance consequences from day one.",
    },
    {
      q: "Can advisers help with business transformation or restructuring?",
      a: "Yes — structure reviews, mergers and acquisitions, capital restructuring and succession are core to what we do. We model each option's commercial and tax outcomes before you commit.",
    },
  ],
  "business-planning": [
    {
      q: "Why do I need a budget and forecast?",
      a: "A plan turns ambition into something you can manage. Budgets and forecasts show you the cash effect of decisions before you make them — hiring, pricing, equipment, expansion — and give you an early warning when reality drifts from plan.",
    },
    {
      q: "What's the difference between a budget and a cashflow forecast?",
      a: "A budget sets profit targets for the year; a cashflow forecast maps when money actually moves. A profitable business can still run out of cash — you need both, and we build them to work together.",
    },
    {
      q: "Can you prepare plans for lenders or investors?",
      a: "Yes. We prepare business plans, budgets and projections in the format banks and investors expect, backed by assumptions you can defend in the meeting.",
    },
    {
      q: "How often should my forecast be reviewed?",
      a: "Monthly or quarterly plan-vs-actual reviews are ideal. We keep models practical and built in tools your team already uses, so reviewing the forecast becomes part of running the business — not a document that gathers dust.",
    },
  ],
  "business-software": [
    {
      q: "Which accounting software is best — Xero, MYOB or QuickBooks?",
      a: "The honest answer: it depends on your workflow. We're accredited across all three platforms, so our recommendation is based on your business — invoicing volume, payroll, inventory, integrations — not a single vendor relationship.",
    },
    {
      q: "Can you migrate my existing data?",
      a: "Yes. We handle migration and a clean setup: chart of accounts, opening balances, payroll records, bank feeds and integrations — so you start on the new platform with accurate, trustworthy numbers.",
    },
    {
      q: "Do you provide training for my team?",
      a: "We do. Implementation includes hands-on training for the people who'll use the software daily, plus ongoing support when questions come up later.",
    },
    {
      q: "Will new software really save me time?",
      a: "Set up properly, yes — bank feeds, automated invoicing and integrated payroll routinely save hours every week. Set up poorly, software costs time. Proper implementation is where the value is.",
    },
  ],
  "business-support": [
    {
      q: "What does business support include?",
      a: "Everything from ASIC company secretarial obligations and registrations (ABN, GST, PAYG, TFN) to ad-hoc questions about hiring, GST or a new venture — a responsive team to lean on so small questions get answered before they become big problems.",
    },
    {
      q: "Can you deal with the ATO on my behalf?",
      a: "Yes. As your registered agent we liaise with the ATO directly — lodgements, payment arrangements, queries and disputes — so you don't spend hours on hold.",
    },
    {
      q: "What registrations can you set up for me?",
      a: "ABN, GST, PAYG withholding and TFN registrations, plus company incorporations and ASIC compliance. We make sure new ventures start with the right registrations from day one.",
    },
    {
      q: "Who answers when I have a quick question?",
      a: "A dedicated accountant who knows your business — not a ticket queue. We're available Monday to Friday, 8am to 5pm.",
    },
  ],
  "process-improvement": [
    {
      q: "What is business process improvement?",
      a: "We review how information moves through your business — from sales to books to reporting — and redesign it with automation and integrated software, so your numbers are timely, trustworthy and cheaper to produce.",
    },
    {
      q: "How do you identify where the problems are?",
      a: "We map your current processes end to end and look for bottlenecks: double entry, manual reconciliations, spreadsheet handoffs and delays. Then we target the fixes with the biggest payoff first.",
    },
    {
      q: "What parts of my bookkeeping can be automated?",
      a: "More than most owners expect — bank feeds, invoice capture, payment reminders, payroll and management reporting can all run with minimal manual touch on today's cloud platforms.",
    },
    {
      q: "How do you measure success?",
      a: "Every engagement targets specific, measurable outcomes: fewer manual entries, a faster month-end close, cleaner data for decisions. Improvement is measured in hours saved and errors eliminated.",
    },
  ],
  "internal-audit": [
    {
      q: "What is internal audit?",
      a: "An independent review of your business's controls and processes — checking that key processes work as intended and flagging where error, fraud or compliance failure could slip through, with clear recommendations to fix gaps.",
    },
    {
      q: "Is my business too small for internal audit?",
      a: "No. You don't need a corporate audit department to benefit from internal audit discipline. We scale the approach to SMEs, not-for-profits and growing groups — focusing on the controls that matter most at your size.",
    },
    {
      q: "How is internal audit different from an external audit?",
      a: "An external audit gives an opinion on your financial statements for outside parties. Internal audit works for you — testing controls, assessing risk and recommending improvements so problems are caught before they become losses.",
    },
    {
      q: "What does a risk assessment involve?",
      a: "We identify the events that could hurt your business — financial, operational, compliance and fraud risks — rate their likelihood and impact, and build a practical risk register with clear ownership and mitigation steps.",
    },
  ],
  "audit-services": [
    {
      q: "What types of audits do you perform?",
      a: "Statutory and special-purpose financial audits for companies, not-for-profit and association audits, real estate and legal trust account compliance audits, and SMSF audit coordination.",
    },
    {
      q: "Do you audit real estate and legal trust accounts?",
      a: "Yes — trust account compliance audits for real estate agencies and law practices are a specialty of our team, delivered efficiently and lodged on time with the relevant authority.",
    },
    {
      q: "How disruptive will the audit be to my business?",
      a: "Minimal, with planning. We agree a timetable and information list up front, work in your systems where possible, and keep queries batched — so your team isn't interrupted all day, every day.",
    },
    {
      q: "What do I get beyond the audit opinion?",
      a: "An audit that adds value. Beyond the opinion, we report what we see: control gaps, process improvements and risks worth your attention — explained in plain language, not audit jargon.",
    },
  ],
  "taxation-advisory": [
    {
      q: "What does a tax adviser do beyond lodging returns?",
      a: "Far more than lodgement: choosing the right tax structure, implementing legal tax-efficient strategies, capital gains planning, and custom advice for high-net-worth individuals and businesses operating across borders.",
    },
    {
      q: "How can I legally reduce my tax?",
      a: "Through structure, timing and entitlements — the right entity structure, well-timed transactions, and deductions and credits you'd miss on your own. Good tax planning happens before June, not after.",
    },
    {
      q: "Can you help if the ATO audits or disputes my return?",
      a: "Yes. From audits to assessments in dispute, we prepare evidence, negotiate with the ATO and represent you through conciliation or mediation — minimising liabilities, penalties and stress.",
    },
    {
      q: "What returns and lodgements do you prepare?",
      a: "Income tax returns for individuals, companies, trusts and partnerships; BAS and IAS; payroll tax, FBT, fuel tax credits and stamp duty matters — plus specialist advice on consolidation, thin capitalisation and TOFA.",
    },
  ],
  "tax-audit-insurance": [
    {
      q: "What is tax audit insurance?",
      a: "Cover for the professional fees involved in responding to an ATO audit or review — accountant time, specialist advice and representation — so an audit doesn't become a financial burden.",
    },
    {
      q: "I'm fully compliant. Why would I need it?",
      a: "Even perfectly compliant taxpayers get selected — audit activity is increasingly data-driven and random. Responding properly takes professional time that isn't free, whatever the outcome.",
    },
    {
      q: "What does the cover include?",
      a: "Professional fees for audits and reviews across income tax, GST, BAS, payroll tax, superannuation guarantee and more. We'll walk you through the policy inclusions before you commit.",
    },
    {
      q: "How much does it cost?",
      a: "Premiums are modest annual amounts scaled to your situation — for individuals through to business groups. For a small annual cost, you remove the risk of a five-figure professional bill.",
    },
  ],
  "grants-advice": [
    {
      q: "What grants might my business be eligible for?",
      a: "Federal, state and local programs cover equipment, hiring, export, innovation, energy efficiency and more — and many go unclaimed simply because businesses don't know they exist. We review your eligibility across current programs.",
    },
    {
      q: "What is the R&D tax incentive?",
      a: "A federal program that refunds a share of eligible research and development costs. Many businesses doing genuine product or process development don't realise their work qualifies — we help you assess and register properly.",
    },
    {
      q: "Do you prepare the application for me?",
      a: "Yes — we prepare applications and the supporting financials so your submission meets the criteria, and we handle post-award reporting and compliance so funding isn't clawed back.",
    },
    {
      q: "Why bother with grants when applications take time?",
      a: "Because it's funding you don't have to pay back. A successful grant can fund equipment, hiring or expansion with no dilution and no debt — worth a conversation before your next investment decision.",
    },
  ],
  "smsf-accounting": [
    {
      q: "What are my SMSF's annual obligations?",
      a: "Every year your fund needs financial statements, a tax return, member statements and an independent audit — plus ongoing records like investment strategy reviews and minutes. We handle the lot, end to end.",
    },
    {
      q: "Does my SMSF really need an audit every year?",
      a: "Yes — an annual independent audit is a legal requirement before your return is lodged. We coordinate the audit with an approved SMSF auditor and resolve any queries on your behalf.",
    },
    {
      q: "Can you help me start a pension from my SMSF?",
      a: "Yes. We establish account-based pensions correctly — minimum drawdowns, documentation and tax treatment — and keep them compliant year after year.",
    },
    {
      q: "What happens if my fund breaches the rules?",
      a: "Penalties for breaches are real, which is why prevention matters. If an issue arises, we manage rectification and ATO engagement early — most breaches are fixable when caught quickly.",
    },
  ],
  "virtual-cfo": [
    {
      q: "What is a Virtual CFO?",
      a: "Senior financial leadership on a fractional basis — reporting, strategy, cashflow discipline and board-ready insight — without the cost of a full-time CFO hire.",
    },
    {
      q: "How is a Virtual CFO different from my accountant?",
      a: "Your accountant reports what happened; a CFO drives what happens next — pricing, funding, cash discipline and growth decisions. Our Virtual CFO service adds that forward-looking leadership on top of clean numbers.",
    },
    {
      q: "What will I actually receive each month?",
      a: "Monthly management reports and KPI dashboards, cashflow management, budget-vs-actual analysis and a working session to turn the numbers into decisions — plus board and stakeholder reporting where needed.",
    },
    {
      q: "Who does the work?",
      a: "Advisers with real operating experience — our team includes people who have served as CFO and CEO of major organisations. You get judgement built on operating experience, not just reports.",
    },
  ],
  "bookkeeping-payroll": [
    {
      q: "What's included in your bookkeeping service?",
      a: "Day-to-day transaction coding, bank reconciliation, accounts payable and receivable management, and BAS-ready books every quarter — clean numbers that decisions and lodgements never have to wait on.",
    },
    {
      q: "Do you handle payroll and Single Touch Payroll?",
      a: "Yes — payroll processing, STP lodgement and superannuation obligations, so your staff are paid correctly and on time and you stay compliant automatically.",
    },
    {
      q: "Which software do you work with?",
      a: "Xero, MYOB and Intuit QuickBooks — we're partners across all three. If you're not on cloud software yet, we'll recommend and implement the platform that fits your workflow.",
    },
    {
      q: "How up to date will my books be?",
      a: "Live, not months behind. Cloud platforms with bank feeds mean your numbers are always current — so decisions, lodgements and lending applications never wait on the bookkeeping.",
    },
  ],
};

export const DEFAULT_SLUG = "taxation-advisory";

/** Themed photography for the service detail page: wide hero, side portrait
 *  and insight portrait. Services in the same topic share a theme set. */
export type ServiceImages = {
  hero: string;
  side: string;
  insight: string;
  alt: string;
};

function themeImages(theme: string, alt: string): ServiceImages {
  return {
    hero: `/assets/svc-${theme}-wide.jpg`,
    side: `/assets/svc-${theme}-a.jpg`,
    insight: `/assets/svc-${theme}-b.jpg`,
    alt,
  };
}

const THEME_BY_SLUG: Record<string, [theme: string, alt: string]> = {
  "life-insurances": ["protection", "Adviser helping a family protect what matters"],
  "retirement-plan": ["retirement", "Planning for a confident retirement"],
  "retirement-savings": ["retirement", "Reviewing retirement savings options"],
  "super-advice": ["retirement", "Superannuation strategy discussion"],
  "smsf-advice": ["invest", "Reviewing an SMSF investment portfolio"],
  "managed-investments": ["invest", "Analysing managed fund performance"],
  "stocks-bonds": ["invest", "Share market and bond analysis"],
  "margin-lending": ["invest", "Assessing a margin lending strategy"],
  "smsf-accounting": ["invest", "SMSF administration and reporting"],
  "estate-planning": ["estate", "Planning a family's estate and legacy"],
  "business-advisory": ["business", "Business strategy meeting"],
  "business-planning": ["business", "Business planning and forecasting session"],
  "business-support": ["business", "Day-to-day business support"],
  "virtual-cfo": ["business", "Virtual CFO reviewing business performance"],
  "grants-advice": ["business", "Exploring grant opportunities for a business"],
  "business-software": ["tech", "Implementing cloud business software"],
  "process-improvement": ["tech", "Digitising and streamlining business processes"],
  "internal-audit": ["audit", "Internal audit and risk review"],
  "audit-services": ["audit", "Independent audit of financial reports"],
  "taxation-advisory": ["audit", "Tax advisers reviewing a client position"],
  "tax-audit-insurance": ["audit", "Preparing for an ATO audit response"],
  "bookkeeping-payroll": ["books", "Bookkeeper managing accounts and payroll"],
};

export function serviceImages(slug: string): ServiceImages | undefined {
  const entry = THEME_BY_SLUG[slug];
  return entry ? themeImages(entry[0], entry[1]) : undefined;
}

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

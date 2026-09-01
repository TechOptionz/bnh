import { POSTS, type Post } from "@/lib/site";

export type ArticleSection = {
  h: string;
  paras: string[];
  bullets?: string[];
};

export type Article = {
  /** Opening paragraphs shown before the first section heading. */
  intro: string[];
  sections: ArticleSection[];
  /** Rendered as the "Key takeaways" card near the end of the article. */
  takeaways: string[];
  /** Mid-article visual break shown after the second section. */
  midImg?: string;
  midAlt?: string;
};

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Full article bodies, keyed by post slug. Copy is placeholder-quality
 *  general information — swap for the final approved copy when it arrives. */
export const ARTICLES: Record<string, Article> = {
  "financial-planning-for-digital-nomads-and-remote-workers": {
    midImg: "/assets/blog-nomads-mid.jpg",
    midAlt: "Remote worker with a laptop at a seaside cafe",
    intro: [
      "Conventional employees can usually plan for their financial future knowing certain fundamental parameters will not change: a predictable salary, a fixed home base, employer-paid super and a tax return that mostly takes care of itself. Digital nomads and remote workers enjoy freedoms that office-bound workers can only envy — but those freedoms remove most of the guard rails that traditional financial planning relies on.",
      "If your income arrives from multiple countries, your \"home\" changes with the seasons and your work happens wherever the Wi-Fi is strongest, your financial plan needs to be deliberately built rather than left to default settings.",
    ],
    sections: [
      {
        h: "Get clear on your tax residency first",
        paras: [
          "Tax residency is the foundation everything else sits on, and it is far more complicated than counting days out of the country. Australia's residency tests look at where your \"domicile\" is, your ongoing ties to Australia — property, family, bank accounts, memberships — and your intention to return.",
          "Getting residency wrong can mean being taxed in two jurisdictions, missing lodgement obligations, or losing access to concessions such as the CGT main residence exemption. Before you commit to an extended period abroad, get specific advice on how the move affects your residency status and what records you should keep along the way.",
        ],
      },
      {
        h: "Keep your superannuation working while you roam",
        paras: [
          "When you stop being a conventional employee, compulsory super contributions usually stop with you. It is remarkably easy for a few years of travel to become a permanent hole in your retirement savings.",
          "Remote workers who remain Australian tax residents can generally continue making personal deductible contributions, and even non-residents can usually keep their fund open and invested. The key is to make contributions a scheduled habit rather than an afterthought — treat them like rent, not like a tip.",
        ],
      },
      {
        h: "Build a buffer sized for an irregular income",
        paras: [
          "The standard advice of a three-month emergency fund assumes a stable salary and a fixed cost base. Nomadic incomes are lumpier, and emergencies abroad — a medical evacuation, a cancelled visa, a laptop theft — tend to be more expensive and less insured.",
          "A more realistic target for location-independent workers is six to twelve months of core expenses, held in a currency and institution you can access from anywhere.",
        ],
      },
      {
        h: "Don't let insurance and estate planning lapse",
        paras: [
          "Income protection and life insurance policies often contain residency and overseas-travel conditions, and cover held inside super can lapse if contributions stop. Review your policies before you leave, not after something goes wrong.",
          "Similarly, a will, enduring power of attorney and binding super nominations matter more when your assets and your person are spread across borders. Make sure the documents exist, are current, and that someone at home knows where they are.",
        ],
      },
    ],
    takeaways: [
      "Confirm your tax residency position before you leave — it drives everything else.",
      "Schedule regular super contributions so travel years don't become a retirement gap.",
      "Hold a larger emergency buffer than a conventional employee would — six to twelve months of core costs.",
      "Review insurance and estate planning documents before departure, and revisit them annually.",
    ],
  },

  "are-offset-accounts-always-the-best-option-for-home-loans": {
    midImg: "/assets/blog-offset-mid.jpg",
    midAlt: "Model house beside coins and mortgage documents",
    intro: [
      "Mortgage offset accounts have steadily increased in popularity since they were introduced in Australia in the late 1980s. The pitch is compelling: every dollar sitting in the offset reduces the loan balance your interest is calculated on, effectively earning you your mortgage rate, tax-free, while staying fully accessible.",
      "For many borrowers that is exactly how it plays out. But \"popular\" and \"always best\" are not the same thing, and for some households an offset account quietly costs more than it saves.",
    ],
    sections: [
      {
        h: "How an offset actually earns its keep",
        paras: [
          "Interest on a home loan is calculated daily on the net balance — the loan amount minus whatever sits in the linked offset account. With a $500,000 loan at 6% and $30,000 in the offset, you pay interest as though you owed $470,000. That saving compounds because your repayments stay the same, so more of each repayment reduces the principal.",
          "The benefit is real, but it scales with the balance you actually keep in the account. An offset holding a few thousand dollars saves only a few hundred dollars a year — often less than the cost of having the feature.",
        ],
      },
      {
        h: "The catch: offsets are rarely free",
        paras: [
          "Offset accounts usually come attached to package loans carrying annual fees of $300–$400, or to interest rates slightly higher than a no-frills equivalent. If your average offset balance is modest, a basic loan with a redraw facility and a lower rate can leave you ahead.",
          "As a rough rule, the fee only pays for itself once your average offset balance clears a meaningful threshold — for many products, somewhere in the $20,000–$40,000 range. Below that, you may simply be paying for a feature you can't use.",
        ],
      },
      {
        h: "Offset vs redraw: the tax wrinkle",
        paras: [
          "For owner-occupiers who will never rent out their home, offset and redraw feel interchangeable. But if there is any chance your current home becomes an investment property later, the difference matters enormously.",
          "Money withdrawn from an offset doesn't change the loan balance, so the full loan can remain deductible once the property is rented. Money redrawn from the loan itself, however, creates a new borrowing whose deductibility depends on what you spend it on. Choosing the wrong structure now can permanently shrink your future tax deductions.",
        ],
      },
      {
        h: "So who should — and shouldn't — have one?",
        paras: [
          "Offsets tend to suit borrowers with healthy and stable cash balances, salaries paid directly into the account, or plans to convert their home to an investment property. They suit disciplined spenders, because the money remains only a tap away.",
          "They are a poorer fit for borrowers with small savings balances, those prone to spending accessible cash, and those for whom a lower headline rate on a basic loan simply saves more. The honest answer is that it depends on your numbers — which is exactly the kind of comparison a broker or adviser can run for you in minutes.",
        ],
      },
    ],
    takeaways: [
      "An offset saves you your mortgage rate, tax-free — but only on the balance you actually keep in it.",
      "Package fees and rate loadings mean small offset balances often cost more than they save.",
      "If your home might become a rental, offset beats redraw for preserving tax deductibility.",
      "Compare the offset package against a basic low-rate loan using your real average balances.",
    ],
  },

  "10-step-personal-financial-audit-checklist": {
    midImg: "/assets/blog-audit-mid.jpg",
    midAlt: "Reviewing bank statements during a personal financial audit",
    intro: [
      "Most people can tell you their salary. Far fewer can tell you their net worth, their true monthly spend, or how long they could last if their income stopped tomorrow. A personal financial audit closes that gap — and it takes about an hour, once a year.",
      "Work through the ten steps below in order. You don't need to fix everything today; the goal of the audit is a clear, honest picture and a short list of what to tackle first.",
    ],
    sections: [
      {
        h: "Steps 1–3: Know your position",
        paras: [
          "Start with the facts before you make any judgements.",
        ],
        bullets: [
          "1. Calculate your net worth — list everything you own (property, super, investments, cash, vehicles) and everything you owe. The single number matters less than whether it's moving in the right direction year on year.",
          "2. Track your actual spending — pull 90 days of bank and card statements and categorise them. Almost everyone finds a category that surprises them.",
          "3. Measure your savings rate — the percentage of after-tax income you keep. This one number predicts your financial future better than your salary does.",
        ],
      },
      {
        h: "Steps 4–6: Stress-test your foundations",
        paras: [
          "Next, check the structures that protect you when life doesn't go to plan.",
        ],
        bullets: [
          "4. Check your emergency fund — three to six months of essential expenses in an account you can reach quickly. If it's short, make topping it up your first priority.",
          "5. Review your debts — list every balance, rate and minimum repayment. Flag anything above home-loan rates for accelerated repayment or consolidation.",
          "6. Audit your insurance — life, TPD, income protection, health, home and car. Look for gaps and for cover you're paying for twice, especially inside super.",
        ],
      },
      {
        h: "Steps 7–10: Point everything at the future",
        paras: [
          "Finally, make sure the long-term machinery is working for you.",
        ],
        bullets: [
          "7. Open your super statement — check the balance, the investment option, the fees and who your nominated beneficiaries are. Many people are still in a default option chosen a decade ago.",
          "8. Review your tax position — are you claiming what you're entitled to, and are salary sacrifice or deductible contributions worth using before 30 June?",
          "9. Check your estate documents — a current will, enduring power of attorney and super death benefit nominations. Out-of-date documents can be worse than none.",
          "10. Set (or reset) your goals — one for the next 12 months, one for five years, one for retirement, each with a dollar figure and a date. An audit without goals is just accounting.",
        ],
      },
      {
        h: "What to do with what you find",
        paras: [
          "Score each of the ten areas red, amber or green, then pick the two reddest items and fix those first — trying to fix everything at once is the fastest way to fix nothing. Diarise the next audit for twelve months' time.",
          "And if steps 7 to 10 raised more questions than answers, that's normal. Those are exactly the areas where an hour with an adviser tends to pay for itself many times over.",
        ],
      },
    ],
    takeaways: [
      "One hour a year is enough to know your net worth, spending, savings rate and risk cover.",
      "Fix the two weakest areas first rather than attempting everything at once.",
      "Super settings, tax strategy and estate documents are the most commonly neglected steps.",
      "Repeat the audit annually — the trend matters more than any single year's numbers.",
    ],
  },

  "inflation-proof-your-household-budget": {
    midImg: "/assets/blog-inflation-mid.jpg",
    midAlt: "Comparing household bills and quotes at a laptop",
    intro: [
      "Inflation doesn't need to be making headlines to be eroding your budget. Even at moderate rates, prices quietly compound: a 3% rise every year turns $100 of groceries into $116 within five years, while a budget written in 2023 and never revisited slowly stops matching reality.",
      "Inflation-proofing a household budget isn't about heroic frugality. It's about building a budget that automatically adjusts, targeting the costs that rise fastest, and making sure your savings and income keep pace.",
    ],
    sections: [
      {
        h: "Rebuild the budget on today's prices, not memory",
        paras: [
          "Start by re-basing your budget on the last three months of actual statements rather than what categories used to cost. Most households discover their \"set and forget\" numbers for groceries, insurance and utilities are 10–20% out of date.",
          "Then split every expense into three buckets: fixed essentials (mortgage or rent, rates, insurance), variable essentials (food, fuel, power) and discretionary. Inflation attacks each bucket differently, and each needs a different defence.",
        ],
      },
      {
        h: "Attack the re-priceable costs once a year",
        paras: [
          "A handful of household bills are quietly repriced upward every year on the assumption you won't notice: insurance premiums, energy plans, phone and internet, streaming subscriptions and loan interest rates. These are also the easiest wins.",
          "Diarise one \"re-shop day\" annually. Get comparison quotes on every insurance policy, check your energy plan against the market, ask your lender for a rate review — and be genuinely prepared to switch. An hour of calls routinely recovers $1,000–$2,000 a year for an average household.",
        ],
      },
      {
        h: "Blunt the grocery and fuel creep",
        paras: [
          "Variable essentials respond best to habits rather than one-off decisions: planning meals around what's on special instead of writing the list first, buying home brands for staples where quality is identical, and using fuel apps to time fill-ups.",
          "None of these feel dramatic individually. Together they typically trim 8–12% from the fastest-inflating part of the budget — permanently.",
        ],
      },
      {
        h: "Make sure your money grows at least as fast as prices",
        paras: [
          "A budget is only half the defence; the other half is making sure your income and savings aren't standing still. Cash in a transaction account earning nothing goes backwards every single year in real terms — move working savings to a genuinely competitive high-interest account.",
          "Over longer horizons, growth assets and superannuation are the classic inflation hedges. And don't forget the income side: reviewing your salary against the market, or your prices if you run a business, is as much a part of inflation-proofing as any spending cut.",
        ],
      },
    ],
    takeaways: [
      "Re-base your budget on the last three months of real statements — old numbers understate today's costs.",
      "Hold an annual \"re-shop day\" for insurance, energy, phone and your mortgage rate.",
      "Small permanent habits on groceries and fuel beat one-off austerity drives.",
      "Keep savings in accounts and assets that at least match inflation — idle cash goes backwards.",
    ],
  },

  "help-your-kids-buy-a-home-without-risking-retirement": {
    midImg: "/assets/blog-kids-home-mid.jpg",
    midAlt: "Family signing a documented loan agreement with an adviser",
    intro: [
      "With deposits stretching beyond what most young Australians can save in under a decade, the \"Bank of Mum and Dad\" has become one of the country's biggest lenders. For many families, helping the kids into a home is one of the most meaningful things their money will ever do.",
      "But there is a hard truth underneath the generosity: your children can borrow for a house, while you cannot borrow for your retirement. Help that is structured badly — or sized emotionally rather than mathematically — can undo decades of careful planning.",
    ],
    sections: [
      {
        h: "Start with what you can genuinely afford",
        paras: [
          "Before discussing how to help, work out how much help your retirement can absorb. That means modelling your projected income and capital through retirement — including aged care and health contingencies — and only then seeing what surplus exists.",
          "This is the step families most often skip. A gift that feels affordable at 58, while salaries are still flowing, can look very different at 78. An adviser can model the long-term impact of a specific dollar figure in an afternoon; guessing gets expensive.",
        ],
      },
      {
        h: "Know your options — they carry very different risks",
        paras: [
          "The main ways parents help each have distinct trade-offs:",
        ],
        bullets: [
          "Cash gift — simplest, but the money is gone, and gifts above Centrelink's allowable limits can affect Age Pension entitlements for five years.",
          "Family loan — keeps the money recoverable and protects it if your child's relationship breaks down, but only if it's properly documented with terms and, ideally, security.",
          "Guarantor arrangement — costs nothing upfront but puts your own home on the line if repayments fail; insist on a limited guarantee and an exit plan.",
          "Joint purchase or co-ownership — shares the upside but tangles stamp duty, land tax, CGT and estate planning together; get advice before, not after.",
        ],
      },
      {
        h: "Document everything, even within family",
        paras: [
          "The most painful outcomes we see are rarely caused by markets — they're caused by handshake arrangements meeting divorce, death or insolvency. An undocumented \"loan\" is legally a gift, and in a property settlement half of it can walk out the door with a former in-law.",
          "A simple loan agreement, a registered second mortgage or caveat, and updated wills for everyone involved turn goodwill into something that survives bad luck. It isn't a sign of distrust; it's what protects the family relationship when circumstances change.",
        ],
      },
      {
        h: "Mind the pension and aged care flow-ons",
        paras: [
          "Money given away doesn't just leave your balance sheet — it can change your Age Pension assessment, your aged care means testing and the estate you eventually leave. Centrelink's gifting rules count excess gifts as deprived assets for five years, and lump sums out of super have their own timing considerations.",
          "The order and timing of help — before or after retirement, from super or from savings, as a gift or as a loan — can change the outcome by tens of thousands of dollars. This is precisely where personalised advice earns its fee.",
        ],
      },
    ],
    takeaways: [
      "Model your own retirement first — only give what the projections say you'll never need back.",
      "A documented family loan protects the money from relationship breakdowns; a handshake doesn't.",
      "Guarantees put your home at risk — cap them, and agree an exit trigger upfront.",
      "Check Centrelink gifting rules and aged care flow-ons before money changes hands.",
    ],
  },

  "the-safer-way-to-tap-and-pay": {
    midImg: "/assets/blog-tap-pay-mid.jpg",
    midAlt: "Smartwatch tapped on a contactless payment terminal",
    intro: [
      "Tapping a card — or a phone, or a watch — has become the default way Australians pay for almost everything. It's fast, it's frictionless, and by and large it's safe. But not every way of tapping is equally safe, and a few small habits separate an inconvenience from a genuinely bad week.",
      "Here's how contactless payments actually protect you, where the real risks are, and the safer way to set yourself up.",
    ],
    sections: [
      {
        h: "Your phone is safer than your card",
        paras: [
          "It sounds backwards, but paying with a mobile wallet — Apple Pay, Google Wallet or Samsung Wallet — is more secure than tapping the physical card it's linked to. The wallet never transmits your real card number; it sends a one-off encrypted token, useless to anyone who intercepts it.",
          "On top of that, every phone payment requires your face, fingerprint or PIN, while a stolen physical card can be tapped by anyone for transactions under $100 until you cancel it. If your phone is stolen, the wallet locks with the device — and you can wipe it remotely.",
        ],
      },
      {
        h: "The real risks aren't what people fear",
        paras: [
          "The popular fear — someone \"skimming\" your card through your pocket with a hidden reader — is largely a myth: contactless range is a few centimetres, transactions need a merchant terminal tied to a bank account, and card schemes reverse fraudulent taps.",
          "The genuine risks are more mundane: a lost card tapped before you notice, a phone without a passcode, card details typed into a fake website, or a scammer talking you into reading out a one-time code. Contactless isn't the weak point — the surrounding habits are.",
        ],
      },
      {
        h: "Five habits that close the gap",
        paras: [
          "A few minutes of setup buys most of the available protection:",
        ],
        bullets: [
          "Use the mobile wallet rather than the physical card wherever possible, and leave rarely-used cards at home.",
          "Turn on transaction notifications so every tap pings your phone in real time — fraud gets caught in minutes, not at statement time.",
          "Set daily tap limits or card controls in your banking app, and lock cards instantly from the app the moment one goes missing.",
          "Protect the phone itself: a strong passcode, biometrics on, and \"find my device\" enabled.",
          "Never share one-time codes with anyone — your bank will never ask for them.",
        ],
      },
      {
        h: "If something does go wrong",
        paras: [
          "Australian cardholders are well protected: report unauthorised transactions promptly and, under the ePayments Code, you generally aren't liable for fraud you didn't contribute to. Lock the card in your app first, then call the bank — the sooner it's flagged, the cleaner the reversal.",
          "The takeaway isn't to fear the tap. It's that thirty minutes spent setting up your wallet, notifications and card controls makes the most convenient way to pay also the safest one.",
        ],
      },
    ],
    takeaways: [
      "Mobile wallets tokenise your card number — tapping your phone is safer than tapping the card.",
      "Real-time transaction notifications are the single best early-warning system for fraud.",
      "Lock a missing card from your banking app immediately; don't wait until you're sure.",
      "You're generally not liable for unauthorised transactions you report promptly — but never share one-time codes.",
    ],
  },

  "top-5-mistakes-business-owners-make-when-applying-for-a-loan": {
    midImg: "/assets/blog-loans-mid.jpg",
    midAlt: "Cash flow forecast charts and reports on a desk",
    intro: [
      "Whether it's funding new equipment, smoothing seasonal cash flow or buying a premises, most businesses will need finance at some point. Yet a surprising share of loan applications fail — or get approved on worse terms than necessary — for reasons that have nothing to do with the health of the business itself.",
      "Lenders assess an application long before the paperwork is lodged. These are the five mistakes we see business owners make most often, and how to avoid each one.",
    ],
    sections: [
      {
        h: "1. Applying with messy or outdated financials",
        paras: [
          "Lenders read your financial statements the way a buyer reads a building inspection. Accounts that are months behind, unreconciled or full of miscoded transactions don't just slow the process — they signal management risk, and risk prices into your rate.",
          "Before applying, have your accountant bring lodgements up to date and prepare current interim figures. Clean, timely financials are the cheapest interest-rate discount available.",
        ],
      },
      {
        h: "2. Blurring personal and business finances",
        paras: [
          "Personal expenses running through the business account — and business costs on personal cards — make your true profitability impossible to demonstrate. Assessors either spend weeks untangling it or, more commonly, take the conservative view and lend less.",
          "Separate accounts, a documented owner's wage and a clean loan account for any money you've put in or drawn out let the lender see the business as it really performs.",
        ],
      },
      {
        h: "3. Having no cash flow forecast — or an unbelievable one",
        paras: [
          "The lender's core question is simple: can this business service the repayments? A business that can't produce a cash flow forecast can't answer it, and a hockey-stick forecast with no assumptions behind it answers it badly.",
          "A credible 12–24 month forecast, with stated assumptions and the loan repayments built in, shows the debt is serviceable even in a slower quarter. It's also, not incidentally, how you find out whether the loan is actually a good idea.",
        ],
      },
      {
        h: "4. Choosing the wrong product or structure",
        paras: [
          "Funding long-term assets with short-term facilities — or worse, an overdraft — creates a permanent repayment squeeze; equipment usually belongs on asset finance matched to its useful life, and working capital on flexible lines of credit. The borrowing entity matters too, affecting tax, asset protection and personal guarantees.",
          "Also resist the scattergun approach: multiple applications lodged across lenders in quick succession leave enquiries on your credit file and make every subsequent lender warier.",
        ],
      },
      {
        h: "5. Leaving it until the money is urgent",
        paras: [
          "The worst time to apply for finance is when you desperately need it. Urgency compresses your preparation, eliminates your negotiating position and pushes you toward whichever lender says yes fastest — usually the most expensive one.",
          "Strong applications are prepared months ahead, ideally with an accountant or broker who knows which lenders suit your industry and can present your story properly. Arrange the umbrella before it rains.",
        ],
      },
    ],
    takeaways: [
      "Up-to-date, clean financials are the cheapest way to a better rate.",
      "Keep business and personal money strictly separated well before you apply.",
      "Bring a realistic cash flow forecast that already includes the proposed repayments.",
      "Match the loan product to the asset's life, and apply once — well — rather than everywhere at once.",
      "Start the process months before you need the funds, with professional help on your side.",
    ],
  },
};

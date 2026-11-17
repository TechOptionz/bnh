import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";
import { C } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How JCA-BNH Accountants & Financial Advisers collects, uses, shares and protects your personal information, and how you can access or correct it.",
  path: "/privacy-policy",
});

/** Shown under the hero and in the page's structured wording. Update this
 *  whenever the policy text below changes. */
const LAST_UPDATED = "November 2026";

const PRIVACY_EMAIL = "nayyarh@jca-bnh.com.au";
const PRIVACY_PHONE = "(07) 5473 5444";
const PRIVACY_TEL = "0754735444";

type Block =
  | { p: React.ReactNode }
  | { ul: React.ReactNode[] };

type Section = { id: string; title: string; blocks: Block[] };

/** The policy, clause for clause as approved (November 2026). Section numbers
 *  are derived from the order here. */
const SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        p: (
          <>
            BNH Financial Services Pty Ltd (ABN 79 649 150 774), trading as JCA-BNH
            Accountants &amp; Financial Advisers (&ldquo;JCA-BNH&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;), respects your privacy. This policy explains what personal
            information we collect, why we collect it, how we use and protect it, and how
            you can see or correct it.
          </>
        ),
      },
      {
        p: (
          <>
            We are bound by the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
            Principles. As a registered tax agent we also follow the rules that apply to tax
            file numbers, and the Code of Professional Conduct under the{" "}
            <em>Tax Agent Services Act 2009</em> (Cth).
          </>
        ),
      },
      {
        p: "Our financial advice is provided as an authorised representative of MASU Financial Management (AFSL 231140). If you receive financial advice from us, the licensee’s privacy policy also applies to you.",
      },
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    blocks: [
      {
        p: "We collect only the information we need to act for you. Depending on the service, this may include:",
      },
      {
        ul: [
          "your name, date of birth, address, phone number and email address",
          "identity documents, such as a driver licence, passport or Medicare card",
          "your tax file number, ABN, ACN and other government identifiers",
          "financial information, such as income, expenses, assets, debts, investments, superannuation, insurance and bank account details",
          "employment, business and family details that affect your tax or financial position",
          "details of companies, trusts, partnerships and super funds you are involved in, including directors, shareholders, trustees and beneficiaries",
          "records of our dealings with you, including emails, messages and file notes.",
        ],
      },
      {
        p: (
          <>
            <strong>Sensitive information.</strong> Some services, such as personal
            insurance advice, need health information. We collect sensitive information only
            with your consent and only when it is needed for the service.
          </>
        ),
      },
      {
        p: (
          <>
            <strong>Other people&rsquo;s information.</strong> If you give us information
            about another person, such as a spouse, child, employee or business partner,
            please make sure they know you have done so and that this policy applies to it.
          </>
        ),
      },
    ],
  },
  {
    id: "how-we-collect-it",
    title: "How we collect it",
    blocks: [
      {
        p: "We collect most information directly from you: in person, by phone, by email, through forms, through our website and through our secure client portal.",
      },
      {
        p: "We may also collect information from others where you have authorised it or the law allows it, including:",
      },
      {
        ul: [
          "the Australian Taxation Office, ASIC and other government agencies",
          "your previous accountant, bookkeeper or adviser",
          "your bank, super fund, insurer, employer or share registry",
          "your accounting software, where you have given us access",
          "another person you have authorised to deal with us.",
        ],
      },
      {
        p: "When you visit our website, standard technical information may be recorded, such as your browser type and the pages you view. This does not identify you unless you send us your details through the website.",
      },
    ],
  },
  {
    id: "why-we-collect-it",
    title: "Why we collect, hold and use it",
    blocks: [
      { p: "We use your personal information to:" },
      {
        ul: [
          "provide the accounting, tax, audit, business advisory and financial advice services you have asked for",
          "confirm your identity, as the law requires",
          "prepare and lodge returns, statements and forms with the ATO, ASIC and other agencies on your behalf",
          "communicate with you about your affairs",
          "bill you and manage our relationship with you",
          "meet our legal, regulatory and professional obligations, including record keeping, quality review and insurance",
          "tell you about services or changes in the law that may be relevant to you.",
        ],
      },
      {
        p: "If you do not give us the information we ask for, we may not be able to act for you or may not be able to complete the work.",
      },
    ],
  },
  {
    id: "tax-file-numbers",
    title: "Tax file numbers",
    blocks: [
      {
        p: "We collect, use and disclose your tax file number only for purposes permitted by tax, superannuation and personal assistance law. You are not required to give us your tax file number, but we may not be able to lodge returns or other forms for you without it. We keep tax file numbers secure and restrict who can see them.",
      },
    ],
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    blocks: [
      {
        p: "We share personal information only where it is needed to provide our services, where you have agreed, or where the law requires or permits it. This may include:",
      },
      {
        ul: [
          "the ATO, ASIC, the Tax Practitioners Board and other government agencies and regulators",
          "banks, super funds, insurers, product issuers, share registries and other parties we deal with on your behalf",
          "our financial services licensee, for financial advice",
          "auditors, lawyers and other professional advisers engaged by you or by us",
          "our professional body and our insurers, for quality review, complaints and claims",
          "service providers who support our business, such as providers of practice management, accounting, document storage, electronic signing, email and IT services",
          "anyone else you ask or authorise us to share it with.",
        ],
      },
      { p: "We do not sell personal information." },
    ],
  },
  {
    id: "where-your-information-is-held",
    title: "Where your information is held",
    blocks: [
      {
        p: "Your information is stored in Australia on a range of secure cloud systems used by our firm.",
      },
      {
        p: "Some members of our team and some of our service providers are located outside Australia. They may access your information to help us do your work. They can only use it for our purposes, they work under our direction, and they are bound by confidentiality obligations. We take reasonable steps to make sure anyone who accesses your information from overseas handles it in line with the Australian Privacy Principles.",
      },
    ],
  },
  {
    id: "technology-and-ai",
    title: "Technology and artificial intelligence",
    blocks: [
      {
        p: "Like most modern firms, we use software to help us work accurately and efficiently. This includes tools that use artificial intelligence, for example to sort documents, draft correspondence, check figures and prepare workpapers.",
      },
      {
        p: "These tools assist our staff. They do not replace them. A qualified member of our team reviews the work and remains responsible for the advice and services we give you. We do not use computer programs on their own to make decisions that significantly affect you.",
      },
      {
        p: "We select technology providers carefully and require them to keep your information confidential and secure.",
      },
    ],
  },
  {
    id: "direct-marketing",
    title: "Direct marketing",
    blocks: [
      {
        p: "We may send you newsletters, updates and information about our services. You can opt out at any time by using the unsubscribe link in the message or by contacting us. We do not give your details to other organisations for their marketing.",
      },
    ],
  },
  {
    id: "how-we-protect-it",
    title: "How we protect it",
    blocks: [
      {
        p: "We take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access, change or disclosure. These include secure systems with restricted access, a secure client portal for exchanging documents, confidentiality obligations for all staff and contractors, and secure storage and disposal of paper records.",
      },
      {
        p: "No method of sending or storing information is completely secure. Please use our client portal, rather than email, to send us sensitive documents.",
      },
    ],
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    blocks: [
      {
        p: "We keep personal information for as long as we need it for the purposes in this policy and to meet our legal and professional obligations. This is generally at least seven years after our work for you ends. After that we securely destroy or de-identify it.",
      },
    ],
  },
  {
    id: "data-breaches",
    title: "Data breaches",
    blocks: [
      {
        p: "If your personal information is involved in a data breach that is likely to result in serious harm, we will tell you and the Office of the Australian Information Commissioner, as required by the Notifiable Data Breaches scheme.",
      },
    ],
  },
  {
    id: "access-and-correction",
    title: "Access and correction",
    blocks: [
      {
        p: (
          <>
            You may ask to see the personal information we hold about you, and ask us to
            correct it if it is inaccurate, out of date or incomplete. Contact us using the{" "}
            <a href="#contact-us" className="pp-link">
              details below
            </a>
            . We will need to confirm your identity first.
          </>
        ),
      },
      {
        p: "We will respond within 30 days. There is no fee for making a request. If access involves significant time or cost, we may charge a reasonable fee and will tell you the amount beforehand. If we cannot give access or make a correction, we will explain why in writing.",
      },
    ],
  },
  {
    id: "dealing-with-us-anonymously",
    title: "Dealing with us anonymously",
    blocks: [
      {
        p: "You may make a general enquiry without telling us who you are. We cannot provide accounting, tax or financial advice services anonymously or under a pseudonym, because the law requires us to identify our clients.",
      },
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    blocks: [
      {
        p: "If you believe we have not handled your personal information properly, please contact our Privacy Officer first. We will acknowledge your complaint promptly and respond within 30 days.",
      },
      {
        p: "If you are not satisfied with our response, you may complain to the Office of the Australian Information Commissioner:",
      },
      {
        ul: [
          <>
            Website:{" "}
            <a
              href="https://www.oaic.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              www.oaic.gov.au
            </a>
          </>,
          <>
            Phone:{" "}
            <a href="tel:1300363992" className="pp-link">
              1300 363 992
            </a>
          </>,
          "Post: GPO Box 5288, Sydney NSW 2001",
        ],
      },
    ],
  },
  {
    id: "contact-us",
    title: "Contact us",
    blocks: [],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to this policy",
    blocks: [
      {
        p: "We may update this policy from time to time. The current version is always available on our website, and the date at the top shows when it was last updated.",
      },
    ],
  },
];

const lexend = "var(--font-lexend), Lexend, sans-serif";

/** Section 16 — the Privacy Officer's details, set as a card so the one
 *  actionable part of the policy is easy to find. */
function ContactCard() {
  return (
    <address className="pp-contact">
      <div
        style={{
          fontSize: 11.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.teal,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Privacy Officer
      </div>
      <div
        style={{
          fontFamily: lexend,
          fontWeight: 600,
          color: C.navy,
          fontSize: 18,
          marginBottom: 4,
        }}
      >
        JCA-BNH Accountants &amp; Financial Advisers
      </div>
      <div style={{ marginBottom: 16 }}>1/31 Thomas Street, Noosaville QLD 4566</div>
      <dl className="pp-contact-rows">
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${PRIVACY_TEL}`} className="pp-link">
              {PRIVACY_PHONE}
            </a>
          </dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${PRIVACY_EMAIL}`} className="pp-link">
              {PRIVACY_EMAIL}
            </a>
          </dd>
        </div>
        <div>
          <dt>Website</dt>
          <dd>
            <Link href="/" className="pp-link">
              www.jca-bnh.com.au
            </Link>
          </dd>
        </div>
      </dl>
    </address>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        title="Privacy Policy"
        intro="What personal information we collect, why we collect it, how we use and protect it, and how you can see or correct it."
        padding="160px 5vw 56px"
        maxWidth={1140}
        introMaxWidth="60ch"
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 13.5,
            color: C.lightBlue,
            border: "1px solid rgba(201,212,232,0.28)",
            borderRadius: 999,
            padding: "7px 16px",
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: 7, height: 7, borderRadius: 999, background: C.cyan }}
          />
          Last updated: {LAST_UPDATED}
        </div>
      </PageHero>

      <section style={{ padding: "clamp(44px,7vw,76px) 5vw", background: "#FFFFFF" }}>
        <div className="pp-layout">
          <nav className="pp-toc" aria-label="Privacy policy contents">
            <div className="pp-toc-title">On this page</div>
            <ol>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span aria-hidden="true">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="pp-body">
            {SECTIONS.map((s, i) => (
              <div key={s.id} id={s.id} className="pp-section">
                <h2>
                  <span className="pp-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="pp-sr-only">{i + 1}. </span>
                    {s.title}
                  </span>
                </h2>
                {s.blocks.map((b, j) =>
                  "ul" in b ? (
                    <ul key={j}>
                      {b.ul.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{b.p}</p>
                  ),
                )}
                {s.id === "contact-us" && <ContactCard />}
              </div>
            ))}
          </article>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

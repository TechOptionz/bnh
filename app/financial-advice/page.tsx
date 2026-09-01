import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import ServiceGroups, { type ServiceGroup } from "@/components/ServiceGroups";
import SiteFooter from "@/components/SiteFooter";
import { BOOKING_URL, C } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financial Planning & Advice",
  description:
    "Strategic financial advice and solutions — retirement planning, superannuation and SMSF, personal insurance, investments and estate planning.",
};

const GROUPS: ServiceGroup[] = [
  {
    heading: "Life & Retirement",
    dot: C.cyan,
    cards: [
      {
        slug: "life-insurances",
        title: "Life & Other Personal Insurances",
        blurb:
          "Protect what matters with cover tailored to your life stage and commitments.",
      },
      {
        slug: "retirement-plan",
        title: "Retirement Planning",
        blurb:
          "A clear, staged plan for the retirement lifestyle you want to fund.",
      },
      {
        slug: "retirement-savings",
        title: "Retirement Savings Accounts",
        blurb:
          "Advice on RSA products and how they fit your retirement strategy.",
      },
      {
        slug: "smsf-advice",
        title: "SMSF Advice",
        blurb:
          "Guidance on establishing and running a self-managed super fund with confidence.",
      },
    ],
  },
  {
    heading: "Investments",
    dot: C.orange,
    cards: [
      {
        slug: "managed-investments",
        title: "Managed Investment Schemes",
        blurb: "Advice on managed funds aligned to your goals and risk profile.",
      },
      {
        slug: "stocks-bonds",
        title: "Stocks, Bonds & Government Debentures",
        blurb:
          "Direct investment advice across equities and fixed-interest securities.",
      },
      {
        slug: "margin-lending",
        title: "Standard Margin Lending Facilities",
        blurb: "Understand the opportunities and risks of borrowing to invest.",
      },
    ],
  },
  {
    heading: "Super & Estate",
    dot: C.navy,
    cards: [
      {
        slug: "super-advice",
        title: "Super Advice",
        blurb:
          "Make the most of superannuation contributions, structure and strategy.",
      },
      {
        slug: "estate-planning",
        title: "Estate Planning",
        blurb: "Ensure your wealth passes to the right people, the right way.",
      },
    ],
    showHelpCard: true,
  },
];

export default function FinancialAdvicePage() {
  return (
    <>
      <PageHero
        active="financial-advice"
        crumbs={[{ label: "Home", href: "/" }, { label: "Financial Advice" }]}
        title="Financial Planning & Advice"
        titleMaxWidth="16ch"
        intro="Our Financial Advice Division offers strategic financial advice and solutions to meet your objectives — from budgeting and retirement planning to estate planning, superannuation, insurance and investment advice."
      >
        <a
          href={BOOKING_URL}
          className="btn-orange"
          style={{
            background: C.orange,
            color: "#FFFFFF",
            padding: "14px 28px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            display: "inline-block",
          }}
        >
          Book a Free 30-Min Consultation
        </a>
      </PageHero>

      <ServiceGroups groups={GROUPS} helpCard="partner" />

      <CtaBand
        heading="Talk to a financial adviser today"
        body="Every strategy starts with a conversation. Book a free, no-obligation 30-minute consultation with one of our FASEA-qualified advisers."
      />

      <SiteFooter omit={["financial-advice"]} />
    </>
  );
}

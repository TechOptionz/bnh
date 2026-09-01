import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import KeyobPartnerStrip from "@/components/partners/KeyobPartnerStrip";
import PageHero from "@/components/PageHero";
import ServiceGroups, { type ServiceGroup } from "@/components/ServiceGroups";
import SiteFooter from "@/components/SiteFooter";
import { BOOKING_URL, C } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting, Taxation & Advisory Services",
  description:
    "Taxation strategy, bookkeeping and payroll, audit, SMSF, Virtual CFO and business advisory for clients Australia-wide.",
};

const GROUPS: ServiceGroup[] = [
  {
    heading: "Business Advisory",
    dot: C.orange,
    cards: [
      {
        slug: "business-advisory",
        title: "Business Advisory",
        blurb:
          "Practical guidance on structure, growth and performance for your business.",
      },
      {
        slug: "business-planning",
        title: "Business Planning & Forecasting",
        blurb: "Budgets, forecasts and plans that turn ambitions into numbers.",
      },
      {
        slug: "business-software",
        title: "Business Software Advice & Implementation",
        blurb:
          "Xero, MYOB, QuickBooks and more — chosen and set up for your workflow.",
      },
      {
        slug: "business-support",
        title: "Business Support",
        blurb: "Day-to-day support so you can focus on running the business.",
      },
      {
        slug: "process-improvement",
        title: "Computerisation & Process Improvement",
        blurb: "Streamline and digitise processes to cut cost and error.",
      },
    ],
  },
  {
    heading: "Taxation",
    dot: C.cyan,
    cards: [
      {
        slug: "taxation-advisory",
        title: "Taxation Advisory",
        blurb:
          "Tax strategies suited to your unique situation, individual or corporate.",
      },
      {
        slug: "tax-audit-insurance",
        title: "Tax Audit Insurance",
        blurb:
          "Cover for the professional costs of responding to an ATO audit.",
      },
      {
        slug: "grants-advice",
        title: "Grants Advice",
        blurb:
          "Identify and apply for grants your business may be eligible for.",
      },
    ],
  },
  {
    heading: "Accounting",
    dot: C.navy,
    cards: [
      {
        slug: "smsf-accounting",
        title: "Self-Managed Super Funds",
        blurb:
          "SMSF accounting, administration and compliance handled end to end.",
      },
      {
        slug: "virtual-cfo",
        title: "Virtual CFO",
        blurb:
          "Senior financial leadership on demand, without the full-time cost.",
      },
      {
        slug: "bookkeeping-payroll",
        title: "Bookkeeping & Payroll",
        blurb:
          "Accurate, on-time books and payroll on Xero, MYOB or QuickBooks.",
      },
    ],
  },
  {
    heading: "Audit",
    dot: C.orange,
    cards: [
      {
        slug: "internal-audit",
        title: "Internal Audit & Risk Management",
        blurb: "Independent assurance over controls, compliance and risk.",
      },
      {
        slug: "audit-services",
        title: "Audit Services",
        blurb:
          "Statutory and special-purpose audits, including trust account compliance.",
      },
    ],
    showHelpCard: true,
  },
];

export default function AccountingPage() {
  return (
    <>
      <PageHero
        active="accounting"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Accounting, Taxation & Advisory" },
        ]}
        title="Accounting, Taxation & Advisory Services"
        titleMaxWidth="20ch"
        introMaxWidth="66ch"
        intro="Our mission is to provide advice on taxation strategies that best suit your unique situation. We also offer a comprehensive range of corporate services — mergers & acquisitions, capital restructuring, business review & analysis, budgeting & forecasting, and more."
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

      <ServiceGroups groups={GROUPS} />

      {/* Technology partner — slim strip above the closing CTA */}
      <KeyobPartnerStrip />

      <CtaBand
        heading="Let's take tax time off your plate"
        body="CPA-qualified accountants, Australia-wide service, and partners across Xero, MYOB and QuickBooks. It starts with a free 30-minute consultation."
      />

      <SiteFooter omit={["accounting"]} />
    </>
  );
}

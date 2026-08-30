import type { Metadata } from "next";
import { Lexend, Public_Sans } from "next/font/google";
import Chatbot from "@/components/Chatbot";
import { EMAIL, FACEBOOK_URL, LINKEDIN_URL, PHONE_BRISBANE } from "@/lib/site";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JCA-BNH — Better at Money Matters",
    template: "%s | JCA-BNH",
  },
  description:
    "JCA-BNH Accountants & Financial Advisers deliver tailored accounting, taxation, advisory and financial advice for businesses and individuals across Australia.",
};

/** Organisation structured data — `sameAs` points search engines at our
 *  verified social profiles. */
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "JCA-BNH Accountants & Financial Advisers",
  url: "https://jca-bnh.com.au/",
  email: EMAIL,
  telephone: PHONE_BRISBANE,
  slogan: "Better at Money Matters",
  sameAs: [FACEBOOK_URL, LINKEDIN_URL],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${lexend.variable} ${publicSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}

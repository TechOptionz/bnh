import SiteFooter from "@/components/SiteFooter";

/** The home page uses the same redesigned site-wide footer. */
export default function HomeFooter() {
  return <SiteFooter omit={["home"]} showTerms />;
}

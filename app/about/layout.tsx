import { getSEOTags } from "@/lib/seo";
import config from "@/configs/configuration";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata = getSEOTags({
  title: `About | ${config.appName}`,
  canonicalUrlRelative: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

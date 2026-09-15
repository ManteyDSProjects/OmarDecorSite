import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy | Omar Decor",
  description: "How Omar Decor collects, uses, and protects your personal information when you get in touch about home improvement work.",
  openGraph: {
    title: "Privacy Policy | Omar Decor",
    description: "How Omar Decor collects, uses, and protects your personal information when you get in touch about home improvement work.",
    images: ["/assets/images/hero-carousel-01-airbnb.webp"],
  },
};

export default function Page() {
  return <LegalPage title={PRIVACY.title} updated={PRIVACY.updated} intro={PRIVACY.intro} sections={PRIVACY.sections} current="Privacy Policy" />;
}

import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy | Omar Decor",
  description: "How Omar Decor collects, uses, and protects your personal information when you get in touch about home improvement work.",
  openGraph: {
    title: "Privacy Policy | Omar Decor",
    description: "How Omar Decor collects, uses, and protects your personal information when you get in touch about home improvement work.",
    images: [{ url: "/assets/images/og-omar-decor.jpg", width: 1200, height: 630, alt: "Bright bedroom with a grey feature wall, finished by Omar Decor" }],
  },
};

export default function Page() {
  return <LegalPage title={PRIVACY.title} updated={PRIVACY.updated} intro={PRIVACY.intro} sections={PRIVACY.sections} current="Privacy Policy" />;
}

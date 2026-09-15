import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/lib/content";

export const metadata = {
  title: "Terms & Conditions | Omar Decor",
  description: "The terms covering home improvement and handyman work carried out by Omar Decor for private homeowners in London.",
  openGraph: {
    title: "Terms & Conditions | Omar Decor",
    description: "The terms covering home improvement and handyman work carried out by Omar Decor for private homeowners in London.",
    images: ["/assets/images/hero-carousel-01-airbnb.webp"],
  },
};

export default function Page() {
  return <LegalPage title={TERMS.title} updated={TERMS.updated} intro={TERMS.intro} sections={TERMS.sections} current="Terms & Conditions" />;
}

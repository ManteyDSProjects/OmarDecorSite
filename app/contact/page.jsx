import ContactClient from "@/components/ContactClient";
import { FAQS } from "@/lib/content";

export const metadata = {
  title: "Contact Omar Decor | Book a Free Site Visit",
  description: "Get in touch with Omar Decor for a free site visit and transparent quote. Handyman and home improvement services across Vauxhall and Central London.",
  openGraph: {
    title: "Contact Omar Decor | Book a Free Site Visit",
    description: "Get in touch with Omar Decor for a free site visit and transparent quote. Handyman and home improvement services across Vauxhall and Central London.",
    images: ["/assets/images/hero-carousel-01-airbnb.webp"],
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Omar Decor",
  image: "https://omardecor.co.uk/assets/images/hero-carousel-01-airbnb.webp",
  telephone: "+447766355099",
  email: "hello@omardecor.co.uk",
  address: { "@type": "PostalAddress", addressLocality: "Vauxhall", addressRegion: "London", addressCountry: "GB" },
  areaServed: "Central London",
  url: "https://omardecor.co.uk/contact/",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ContactClient />
    </>
  );
}

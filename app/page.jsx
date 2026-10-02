import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Omar Decor | Home Renovations & Handyman Services around Vauxhall and across Central London",
  description: "Kitchens, bathrooms, flooring and carpentry across Central London. Free site visit, clear fixed quote.",
  openGraph: {
    title: "Omar Decor | Home Renovations & Handyman Services around Vauxhall and across Central London",
    description: "Kitchens, bathrooms, flooring and carpentry across Central London. Free site visit, clear fixed quote.",
    images: [{ url: "/assets/images/og-omar-decor-flooring.jpg", width: 1200, height: 630, alt: "Bright living room with oak flooring, finished by Omar Decor" }],
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
  url: "https://omardecor.co.uk/",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      <HomeClient />
    </>
  );
}

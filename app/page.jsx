import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Omar Decor | Home Improvements & Handyman Services in London",
  description: "Reliable handyman and home improvement services across Central London and surrounding areas. Free site visits, transparent quotes, quality work done properly.",
  openGraph: {
    title: "Omar Decor | Home Improvements & Handyman Services in London",
    description: "Reliable handyman and home improvement services across Central London and surrounding areas. Free site visits, transparent quotes, quality work done properly.",
    images: [{ url: "/assets/images/og-omar-decor.jpg", width: 1200, height: 630, alt: "Bright bedroom with a grey feature wall, finished by Omar Decor" }],
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

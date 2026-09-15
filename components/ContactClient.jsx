"use client";
import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import { BackToTop, CookieBanner } from "@/components/Strips";
import { CategoryCard, Lightbox } from "@/components/Gallery";
import { FaqItem } from "@/components/Markers";
import { odShell, odBand, odMain, odEyebrow, odH2, odSubline, odBody } from "@/lib/styles";
import { CATEGORIES } from "@/lib/galleries";
import { ABOUT, FAQS } from "@/lib/content";

const aboutP = { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, lineHeight: 1.5, color: "var(--od-navy)", margin: 0 };

const ABOUT_SLIDES = [
  ["/uploads/omar-decor-owner-chandelier-installation.webp", "Omar installing a chandelier fitting"],
  ["/uploads/omar-decor-owner-laminate-flooring-installation.webp", "Omar fitting laminate flooring"],
  ["/uploads/omar-decor-owner-gym-equipment-installation.webp", "Omar installing home gym equipment", "center 20%"],
  ["/uploads/omar-decor-owner-gym-fit-out-shelving.webp", "Omar on site at a gym fit-out"],
  ["/uploads/omar-decor-owner-commercial-fit-out-yellow-wall.webp", "Omar on site at a commercial fit-out"],
];

function AboutCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ABOUT_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="od-photo-wrap od-about-portrait" style={{ position: "relative", width: 560, height: 420, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "var(--od-navy-deep)" }}>
      {ABOUT_SLIDES.map(([src, alt, pos], n) => (
        <img key={src} src={src} alt={alt} decoding="async" fetchPriority={n === 0 ? "high" : "auto"} loading={n === 0 ? "eager" : "lazy"} className={"od-hero-carousel-img" + (n === i ? " is-active" : "")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center" }} />
      ))}
    </div>
  );
}

function ContactGallerySection() {
  const pages = Math.ceil(CATEGORIES.length / 3);
  const [page, setPage] = useState(0);
  const [cat, setCat] = useState(null);
  const [shot, setShot] = useState(0);
  const [expandedCat, setExpandedCat] = useState(null);
  const shown = CATEGORIES.slice(page * 3, page * 3 + 3);
  return (
    <div id="gallery" className="od-band od-section-pad" style={{ ...odBand, height: 1272, background: "var(--od-white)", display: "flex", flexDirection: "column", gap: 64, padding: "120px 80px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "stretch", flexShrink: 0 }}>
        <span style={odEyebrow}>Our Work</span>
        <h2 className="od-h2" style={odH2}>See The Difference Quality Work Makes</h2>
        <span className="od-fluid" style={{ ...odSubline, width: 760 }}>A selection of home improvement projects completed across Central London.</span>
      </div>
      <div className="od-cat-row" style={{ display: "flex", gap: 24, alignSelf: "stretch", flexShrink: 0 }}>
        {shown.map(([name, cover]) => (
          <CategoryCard key={name} name={name} cover={cover} expanded={expandedCat === name} onToggle={() => setExpandedCat(expandedCat === name ? null : name)} onOpen={() => { setCat(CATEGORIES.findIndex(([c]) => c === name)); setShot(0); }} />
        ))}
      </div>
      <div className="od-steps-carousel" style={{ display: "flex", justifyContent: "center" }}>
        <Carousel index={page} count={pages} onChange={(n) => setPage(((n % pages) + pages) % pages)} labels={Array.from({ length: pages }, (_, i) => "Gallery " + (i + 1))} />
      </div>
      {cat !== null ? (
        <Lightbox
          srcs={CATEGORIES[cat][2]}
          alts={CATEGORIES[cat][2].map((_, i) => CATEGORIES[cat][0] + " project photo " + (i + 1) + " by Omar Decor")}
          index={shot}
          onIndex={setShot}
          onClose={() => setCat(null)}
        />
      ) : null}
    </div>
  );
}

export default function ContactPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="od-shell" style={{ ...odShell, background: "var(--od-off-white)" }}>
      <div className="od-nav-spacer" style={{ alignSelf: "stretch" }}>
        <SiteNav variant="light" current="Contact" />
      </div>
      <main id="main" style={odMain}>
        <ContactSection heading="h1" />

        <div className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-off-white)", display: "flex", flexDirection: "column", gap: 32, padding: 80, alignItems: "center" }}>
          <div className="od-fluid" style={{ width: 1440, maxWidth: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <span style={odEyebrow}>About us</span>
            <h2 className="od-h2" style={odH2}>Meet Your Handyman</h2>
          </div>
          <div className="od-fluid od-stack" style={{ width: 1440, maxWidth: "100%", boxSizing: "border-box", display: "flex", gap: 32, flexShrink: 0 }}>
            <AboutCarousel />
            <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={aboutP}>{ABOUT[0]}</p>
              <p style={{ ...odBody, margin: 0 }}>{ABOUT[1]}</p>
              <p style={{ ...odBody, margin: 0 }}>{ABOUT[2]}</p>
            </div>
          </div>
        </div>

        <ContactGallerySection />

        <div className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-off-white)", display: "flex", flexDirection: "column", gap: 32, padding: 80, alignItems: "center" }}>
          <div className="od-fluid" style={{ width: 1280, maxWidth: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
            <h2 className="od-h2" style={odH2}>Frequently Asked Questions</h2>
          </div>
          <div className="od-fluid" style={{ width: 1280, maxWidth: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            {FAQS.map(([q, a], i) => (
              <div key={q} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid var(--od-border)" : "none" }}>
                <FaqItem className={"od-faq" + (open === i ? " is-open" : "")} question={q} open={open === i} onToggle={() => setOpen(open === i ? null : i)} style={{ width: "100%", backgroundColor: "transparent", minHeight: 54, height: "auto", padding: "22px 0" }} />
                {open === i ? <p className="od-legal-body" style={{ ...odBody, maxWidth: 760, fontSize: 15, padding: "0 0 20px", margin: 0 }}>{a}</p> : null}
              </div>
            ))}
          </div>
        </div>

        <CtaBanner variant="call" />
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  );
}

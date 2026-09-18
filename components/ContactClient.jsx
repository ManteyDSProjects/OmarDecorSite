"use client";
import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import { BackToTop, CookieBanner } from "@/components/Strips";
import { Lightbox } from "@/components/Gallery";
import Icon from "@/components/Icon";
import { FaqItem } from "@/components/Markers";
import { odShell, odBand, odMain, odEyebrow, odH2, odSubline, odBody } from "@/lib/styles";
import { ABOUT, FAQS } from "@/lib/content";

const MIXED_GALLERY_NAMES = [
  "omar-decor-beige-tile-bathroom-shower-oak-vanity",
  "omar-decor-hallway-to-ensuite-bathroom-oak-flooring",
  "omar-decor-bedroom-corner-grey-walls-air-vent",
  "omar-decor-bedroom-round-mirror-grey-walls",
  "omar-decor-bedroom-balcony-door-city-view",
  "omar-decor-living-room-damask-wallpaper-feature-wall",
  "omar-decor-electrician-fitting-sockets-installation",
  "omar-decor-dark-tile-bathroom-black-vanity-01",
  "omar-decor-dark-tile-bathroom-led-niche-shower-02",
  "omar-decor-white-fitted-media-unit-grey-flooring",
  "omar-decor-bathroom-wood-vanity-round-sink",
  "omar-decor-white-fitted-storage-unit-oak-flooring",
  "omar-decor-living-room-fireplace-alcove-cabinets",
  "omar-decor-brass-fittings-bathroom-vanity-01",
  "omar-decor-brass-fittings-bathroom-bath-shower-02",
  "omar-decor-grey-tile-bathroom-toilet-sink-03",
  "omar-decor-grey-tile-bathroom-bath-toilet-04",
  "omar-decor-herringbone-parquet-bedroom-wardrobes-01",
  "omar-decor-herringbone-parquet-bedroom-drawers-02",
  "omar-decor-bedroom-headboard-wall-art-lamps",
  "omar-decor-dark-kitchen-marble-countertop-01",
  "omar-decor-dark-kitchen-gas-hob-marble-worktop-02",
  "omar-decor-dark-kitchen-sink-window-03",
  "omar-decor-bedroom-fitted-wardrobe-tv-unit",
  "omar-decor-open-plan-living-kitchen-grey-cabinets",
  "omar-decor-terrazzo-tile-cloakroom-sink",
  "omar-decor-bedroom-white-fitted-wardrobes-round-mirror",
  "omar-decor-dark-tile-shower-led-niche-01",
  "omar-decor-dark-tile-bathroom-vanity-towel-rail-02",
  "omar-decor-dark-tile-bathroom-bath-toilet-vanity-03",
  "omar-decor-living-room-tv-alcove-unit-01",
  "omar-decor-living-room-tv-alcove-unit-02",
  "omar-decor-living-room-alcove-shelving-led-lighting-01",
  "omar-decor-living-room-alcove-shelving-fireplace-02",
  "modern-bedroom-white-gloss-wardrobe-wood-slat-accent-wall",
  "omar-decor-styled-bedroom-rust-cushions-headboard-01",
  "omar-decor-styled-bedroom-breakfast-tray",
  "omar-decor-styled-bedroom-teal-cushions-nightstand-01",
  "omar-decor-styled-bedroom-dark-feature-wall-02",
  "omar-decor-styled-living-room-city-view",
];
const MIXED_GALLERY = MIXED_GALLERY_NAMES.map((n) => "/uploads/" + n + ".webp");
const MIXED_GALLERY_ALTS = MIXED_GALLERY_NAMES.map((_, i) => "Omar Decor project photo " + (i + 1) + " of " + MIXED_GALLERY_NAMES.length);

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
  const [open, setOpen] = useState(false);
  const [shot, setShot] = useState(0);
  const [expanded, setExpanded] = useState(false);
  return (
    <div id="gallery" className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-white)", display: "flex", flexDirection: "column", gap: 58, padding: "120px 80px", alignItems: "center" }}>
      <div className="od-fluid" style={{ width: 1100, maxWidth: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16, alignSelf: "center", flexShrink: 0 }}>
        <span style={odEyebrow}>Our Work</span>
        <h2 className="od-h2" style={{ ...odH2, lineHeight: 1.25 }}>View Our Mixed Gallery Below and See The Difference Quality Work Makes</h2>
        <span className="od-fluid" style={{ ...odSubline, width: 760, fontSize: 20 }}>A selection of home improvement projects completed across Central London.</span>
      </div>
      <div
        className={"od-category-card od-work-hero" + (expanded ? " is-expanded" : "")}
        role="button"
        tabIndex={0}
        aria-label="Open Selected Works gallery"
        onClick={() => { setOpen(true); setShot(0); }}
        onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setOpen(true); setShot(0); } }}
      >
        <div className="od-category-img od-work-img" style={{ backgroundImage: "url(/uploads/modern-bedroom-white-gloss-wardrobe-wood-slat-accent-wall.webp)" }} />
        <div className="od-category-content">
          <div className="od-category-heading-row">
            <span className="od-category-name">Selected Works</span>
            <button type="button" className="od-category-toggle" aria-expanded={expanded} aria-label={(expanded ? "Hide" : "Show") + " Selected Works description"} onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}>
              <Icon name="plus" size={14} style={{ color: "var(--od-white)", transform: expanded ? "rotate(45deg)" : "none" }} />
            </button>
          </div>
          <span className="od-category-caption">A curated mix of completed projects, showcasing thoughtful spaces across a range of styles and needs.</span>
        </div>
      </div>
      {open ? (
        <Lightbox srcs={MIXED_GALLERY} alts={MIXED_GALLERY_ALTS} index={shot} onIndex={setShot} onClose={() => setOpen(false)} />
      ) : null}
    </div>
  );
}

export default function ContactPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="od-shell" style={{ ...odShell, background: "var(--od-off-white)" }}>
      <div className="od-nav-spacer" style={{ alignSelf: "stretch" }}>
        <SiteNav variant="light" current="Contact" galleryLabel="View Mixed Gallery" galleryHref="#gallery" />
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
              <p style={{ ...odBody, margin: 0, fontSize: 20 }}>{ABOUT[1]}</p>
              <p style={{ ...odBody, margin: 0, fontSize: 20 }}>{ABOUT[2]}</p>
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
                {open === i ? <p className="od-legal-body" style={{ ...odBody, maxWidth: 760, fontSize: 16, padding: "0 0 20px", margin: 0 }}>{a}</p> : null}
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

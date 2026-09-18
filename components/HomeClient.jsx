"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { md } from "@/lib/img";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import { TrustBar, BackToTop, CookieBanner } from "@/components/Strips";
import { CategoryCard, Lightbox } from "@/components/Gallery";
import ReviewsSection from "@/components/ReviewsSection";
import CtaBanner from "@/components/CtaBanner";
import { ChecklistItem, ProcessStep, ServiceCard } from "@/components/Markers";
import { odShell, odBand, odMain, odEyebrow, odH2, odBody } from "@/lib/styles";
import { CATEGORIES } from "@/lib/galleries";
import { HOME_BENEFITS, SERVICES, STEPS, AREA_ROWS_HOME, AREA_HALVES_HOME } from "@/lib/content";

const HERO_SLIDES = [
  ["/assets/images/hero-carousel-01-airbnb.webp", "Airbnb-ready interior styled by Omar Decor"],
  ["/assets/images/hero-carousel-02-bathrooms.webp", "Bathroom renovation by Omar Decor"],
  ["/assets/images/hero-carousel-03-carpentry.webp", "Carpentry project by Omar Decor"],
  ["/assets/images/hero-carousel-04-commercials.webp", "Commercial fit-out by Omar Decor"],
  ["/assets/images/hero-carousel-05-fashion-studios.webp", "Fashion studio fit-out by Omar Decor"],
  ["/assets/images/hero-carousel-06-flooring.webp", "Flooring installation by Omar Decor"],
  ["/assets/images/hero-carousel-07-full-renovation.webp", "Full renovation by Omar Decor"],
  ["/assets/images/hero-carousel-08-kitchens.webp", "Kitchen renovation by Omar Decor"],
  ["/assets/images/hero-carousel-09-painting.webp", "Painting and decorating by Omar Decor"],
];

function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="od-hero-carousel" style={{ position: "relative", width: 600, height: 480, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "var(--od-navy-deep)" }}>
      {HERO_SLIDES.map(([src, alt], n) => (
        <img key={src} src={md(src)} alt={alt} decoding="async" fetchPriority={n === 0 ? "high" : "low"} loading={n === 0 ? "eager" : "lazy"} className={"od-hero-carousel-img" + (n === i ? " is-active" : "")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div className="od-hero-static" style={{ ...odBand, position: "relative", background: "var(--od-white)", padding: "96px 0", boxSizing: "border-box" }}>
      <div className="od-stack od-hero-w1440" style={{ width: 1440, maxWidth: "100%", margin: "0 auto", padding: "0 48px", boxSizing: "border-box", display: "flex", gap: 80, alignItems: "center" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 28, justifyContent: "center", alignItems: "flex-start", flexGrow: 1, alignSelf: "stretch" }}>
          <h1 className="od-h1" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1.1, color: "var(--od-navy)", margin: 0, alignSelf: "stretch" }}>Quality Home Improvements, Done Properly.</h1>
          <span className="od-hero-subline" style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 20, lineHeight: 1.6, color: "var(--od-text-muted)", alignSelf: "stretch" }}>Reliable handyman and home improvement services across Central London and surrounding areas.</span>
          <div className="od-btn-row" style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <Button as={Link} href="/contact/" variant="primary" ground="dark" style={{ width: 220, height: 45, letterSpacing: "0.05em", color: "var(--od-white)", textDecoration: "none" }}>Book a Site Visit</Button>
            <Button as="a" href="https://wa.me/447766355099" target="_blank" rel="noopener" variant="ghost" ground="light" style={{ width: 220, height: 45, padding: "11px 16px", gap: 10, letterSpacing: "0.05em", fontSize: 16, color: "var(--od-navy)", textDecoration: "none" }}>
              <Icon name="whatsapp" style={{ fontSize: "calc(22px / 2.2)" }} />+447766 355099
            </Button>
          </div>
        </div>
        <HeroCarousel />
      </div>
    </div>
  );
}

function ServicesSection() {
  const [idx, setIdx] = useState(0);
  const touchX = useRef(null);
  const count = SERVICES.length;
  const advance = (n) => setIdx(((n % count) + count) % count);

  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) advance(idx + (dx < 0 ? 1 : -1));
  }

  return (
    <div id="services" className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-off-white)", padding: "120px 80px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 64 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", alignSelf: "stretch", flexShrink: 0 }}>
        <span style={odEyebrow}>What we do</span>
        <h2 className="od-h2" style={{ ...odH2, textAlign: "center" }}>Home Improvement Services For Every Project</h2>
      </div>
      <div className="od-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, alignSelf: "stretch" }}>
        {SERVICES.map(([icon, title, body]) => (
          <ServiceCard key={title} icon={icon} title={title} body={body} />
        ))}
      </div>
      <div className="od-services-mobile">
        <div className="od-services-touch" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <ServiceCard icon={SERVICES[idx][0]} title={SERVICES[idx][1]} body={SERVICES[idx][2]} style={{ width: "100%" }} />
        </div>
        <div className="od-services-carousel od-steps-carousel" style={{ display: "flex", justifyContent: "center" }}>
          <Carousel index={idx} count={count} onChange={advance} labels={SERVICES.map(([, t]) => t)} />
        </div>
      </div>
    </div>
  );
}

function LocationTag({ name, solo }) {
  return (
    <div style={{ flex: solo ? "0 1 calc(50% - 6px)" : "1 1 0%", minWidth: 0, alignSelf: "stretch", borderRadius: 10, background: "var(--od-navy-tag)", boxShadow: "inset 0 0 0 1px var(--od-brass-tag-border)", display: "flex", gap: 10, padding: "14px 16px", alignItems: "center", boxSizing: "border-box", minHeight: 46 }}>
      <Icon name="location-pin" size={18} style={{ color: "var(--od-brass)", flexShrink: 0 }} />
      <span style={{ flexGrow: 1, fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 16, lineHeight: "100%", color: "var(--od-white)" }}>{name}</span>
    </div>
  );
}

export default function HomePage() {
  const [cat, setCat] = useState(null);
  const [shot, setShot] = useState(0);
  const [areaHalf, setAreaHalf] = useState(0);
  const [expandedCat, setExpandedCat] = useState(null);

  return (
    <div className="od-shell" style={odShell}>
      <div className="od-nav-spacer" style={{ alignSelf: "stretch" }}>
        <SiteNav variant="navy" current="Home" galleryLabel="View Before & After Gallery" galleryHref="/#work" />
      </div>
      <main id="main" style={odMain}>
        <Hero />
        <TrustBar items={["Based In Vauxhall", "12+ Years Trading", "Free Site Viewing", "Fast Response By Text"]} />

        <div className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-white)", padding: "120px 0", boxSizing: "border-box" }}>
          <div className="od-stack od-why-row" style={{ width: 1440, maxWidth: "100%", margin: "0 auto", padding: "0 80px", boxSizing: "border-box", display: "flex", gap: 80, alignItems: "center" }}>
            <div className="od-detail-media" style={{ width: 520, alignSelf: "stretch", position: "relative", flexShrink: 0 }}>
              <div className="od-photo-wrap" style={{ width: 480, height: 520, borderRadius: 16, overflow: "hidden" }}>
                <img className="od-photo od-photo-tall od-photo-cell" src={md("/uploads/omar-decor-owner-slat-wall-socket-detail.webp")} width="480" height="520" loading="lazy" alt="Slat wall and socket detail, finished by Omar Decor" style={{ width: 480, height: 520, objectFit: "cover", display: "block" }} />
              </div>
              <div className="od-quote-card" style={{ position: "absolute", left: 200, top: 415, width: 320, height: 145, borderRadius: 12, background: "var(--od-navy)", boxShadow: "var(--shadow-lift)", display: "flex", flexDirection: "column", gap: 16, padding: 28, boxSizing: "border-box" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, lineHeight: 1.3, color: "var(--od-white)", alignSelf: "stretch" }}>&ldquo;Done properly, every time.&rdquo;</span>
                <span style={{ fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 16, lineHeight: "100%", letterSpacing: "2px", textTransform: "uppercase", color: "var(--od-brass)", whiteSpace: "nowrap" }}>The Omar Decor approach</span>
              </div>
            </div>
            <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 40 }}>
              <span style={odEyebrow}>Why Omar Decor</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, alignSelf: "stretch" }}>
                <h2 className="od-h2" style={odH2}>Small Details. Big Difference.</h2>
                <span style={{ ...odBody, fontSize: 20 }}>A home improvement should feel considered &mdash; planned properly, executed cleanly, and finished to a standard you&rsquo;re happy to live with every day.</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, alignSelf: "stretch" }}>
                {HOME_BENEFITS.map((row, i) => (
                  <div key={i} className={"od-grid2" + (i === 2 ? " od-benefit-row-3" : "") + (i === 1 ? " od-benefit-row-2" : "")} style={{ display: "flex", gap: 24 }}>
                    {row.map((b) => (
                      <ChecklistItem key={b} style={{ flex: "1 1 0%", minWidth: 0, alignSelf: "stretch" }}>{b}</ChecklistItem>
                    ))}
                  </div>
                ))}
              </div>
              <div className="od-btn-row od-btn-row-wide" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <Button as={Link} href="/contact/" variant="primary" ground="light" style={{ width: 189, height: 49, borderRadius: 6, fontWeight: 700, letterSpacing: "normal", textDecoration: "none" }}>Request a Quote</Button>
                <a href="https://wa.me/447766355099" target="_blank" rel="noopener" className="od-white-btn" style={{ height: 48, borderRadius: 6, background: "var(--od-white)", boxShadow: "var(--hairline-soft)", display: "inline-flex", gap: 10, padding: "15px 24px", alignItems: "center", boxSizing: "border-box", whiteSpace: "nowrap", fontFamily: "var(--font-text)", fontWeight: 700, fontSize: 15, lineHeight: "100%", color: "var(--od-navy)", textDecoration: "none" }}>
                  <Icon name="whatsapp" style={{ fontSize: "calc(18px / 2.2)" }} />+44 7766 355099
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="work" className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-navy)", display: "flex", flexDirection: "column", gap: 48, padding: "96px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "stretch", flexShrink: 0 }}>
            <h2 className="od-h2" style={{ ...odH2, fontSize: 32, color: "var(--od-white)" }}>Explore Our Before and After Gallery</h2>
            <span style={{ ...odBody, color: "var(--od-text-muted-dark)", fontSize: 20 }}>Browse recent projects by category. Tap a card to view the full gallery for that room or space.</span>
          </div>
          <div className="od-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, alignSelf: "stretch" }}>
            {CATEGORIES.map(([c, cover], i) => (
              <CategoryCard key={c} name={c} cover={cover} expanded={expandedCat === c} onToggle={() => setExpandedCat(expandedCat === c ? null : c)} onOpen={() => { setCat(i); setShot(0); }} />
            ))}
          </div>
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

        <ServicesSection />

        <div className="od-band od-section-pad" style={{ ...odBand, height: 557, background: "var(--od-white)", display: "flex", flexDirection: "column", gap: 64, padding: "120px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", alignSelf: "stretch", flexShrink: 0 }}>
            <span style={odEyebrow}>How it works</span>
            <h2 className="od-h2" style={odH2}>Simple, Transparent Process</h2>
          </div>
          <div className="od-steps" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignSelf: "stretch", flexShrink: 0 }}>
            {STEPS.map(([n, t, b]) => (
              <ProcessStep key={n} accent number={n} title={t} body={b} style={{ flex: "1 1 260px", minWidth: 0, height: 161, "--type-heading-s-size": "21px" }} />
            ))}
          </div>
        </div>

        <div id="areas" className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-navy)", padding: "120px 0", boxSizing: "border-box" }}>
          <div className="od-stack od-areas-w1280" style={{ width: 1280, maxWidth: "100%", margin: "0 auto", padding: "0 80px", boxSizing: "border-box", display: "flex", gap: 80, alignItems: "center" }}>
            <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, alignSelf: "stretch", flexShrink: 0 }}>
                <span style={odEyebrow}>Service Areas</span>
                <h2 className="od-h2" style={{ ...odH2, color: "var(--od-white)", lineHeight: 1.15 }}>Serving Homeowners Across Central London</h2>
                <span style={{ ...odBody, color: "var(--od-text-muted-dark)", fontSize: 20 }}>Omar Decor works with homeowners across Central London and the surrounding areas &mdash; bringing careful, considered improvements to homes throughout the city.</span>
              </div>
              <Button as={Link} href="/contact/" variant="primary" ground="dark" style={{ width: 267, height: 49, gap: 12, padding: "16px 32px", fontWeight: 700, letterSpacing: "1px", color: "var(--od-white)", textDecoration: "none" }}>
                Discuss Your Project<Icon name="arrow-right" size={16} />
              </Button>
            </div>
            <div className="od-fluid od-areas-col" style={{ width: 580, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              {AREA_ROWS_HOME.map((row, i) => (
                <div key={i} className="od-areas-row-desktop" style={{ minHeight: 46, display: "flex", gap: 12, alignSelf: "stretch", flexShrink: 0 }}>
                  {row.map((a) => (
                    <LocationTag key={a} name={a} solo={row.length === 1} />
                  ))}
                </div>
              ))}
              <div className="od-areas-mobile">
                {AREA_HALVES_HOME.map((half, hi) => (
                  <div key={hi} className={"od-areas-half" + (hi === areaHalf ? " is-active" : "")} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {Array.from({ length: Math.ceil(half.length / 2) }, (_, ri) => half.slice(ri * 2, ri * 2 + 2)).map((row, ri) => (
                      <div key={ri} style={{ minHeight: 46, display: "flex", gap: 12, alignSelf: "stretch", flexShrink: 0 }}>
                        {row.map((a) => (
                          <LocationTag key={a} name={a} solo={row.length === 1} />
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="od-areas-carousel od-steps-carousel" style={{ display: "flex", justifyContent: "center" }}>
                  <Carousel dark index={areaHalf} count={AREA_HALVES_HOME.length} onChange={(n) => setAreaHalf(((n % AREA_HALVES_HOME.length) + AREA_HALVES_HOME.length) % AREA_HALVES_HOME.length)} labels={["Areas 1", "Areas 2"]} />
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.5)" }}>...and surrounding areas.</span>
            </div>
          </div>
        </div>

        <ReviewsSection />
        <CtaBanner />
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  );
}

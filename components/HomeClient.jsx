"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import { TrustBar, BackToTop, CookieBanner } from "@/components/Strips";
import { CategoryCard, Lightbox } from "@/components/Gallery";
import ReviewsSection from "@/components/ReviewsSection";
import CtaBanner from "@/components/CtaBanner";
import { ChecklistItem, ProcessStep } from "@/components/Markers";
import { odShell, odBand, odMain, odEyebrow, odH2, odBody } from "@/lib/styles";
import { CATEGORIES } from "@/lib/galleries";
import { HOME_BENEFITS, STEPS, AREA_ROWS_HOME, AREA_HALVES_HOME } from "@/lib/content";

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
    <div className="od-hero-carousel" style={{ position: "relative", flex: "0 0 56%", width: "auto", aspectRatio: "600/480", borderRadius: 8, overflow: "hidden", background: "var(--od-navy-deep)" }}>
      {HERO_SLIDES.map(([src, alt], n) => (
        <img key={src} src={src} alt={alt} decoding="async" fetchPriority={n === 0 ? "high" : "auto"} loading={n === 0 ? "eager" : "lazy"} className={"od-hero-carousel-img" + (n === i ? " is-active" : "")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div className="od-hero-static od-stack" style={{ position: "relative", height: 672, display: "flex", gap: 80, padding: "96px 48px", alignItems: "center", boxSizing: "border-box", flexShrink: 0, alignSelf: "stretch", background: "var(--od-white)" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 28, justifyContent: "center", alignItems: "flex-start", flex: "1 1 44%", minWidth: 0, alignSelf: "stretch" }}>
        <h1 className="od-h1" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 64, lineHeight: 1.1, color: "var(--od-navy)", margin: 0, alignSelf: "stretch" }}>Quality Home Improvements, Done Properly.</h1>
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "var(--od-text-muted)", alignSelf: "stretch" }}>Reliable handyman and home improvement services across Central London and surrounding areas.</span>
        <div className="od-btn-row" style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <Button as={Link} href="/contact/" variant="primary" ground="dark" style={{ width: 220, height: 45, letterSpacing: "0.05em", color: "var(--od-white)", textDecoration: "none" }}>Book a Site Visit</Button>
          <Button as="a" href="https://wa.me/447766355099" target="_blank" rel="noopener" variant="ghost" ground="light" style={{ width: 220, height: 45, padding: "11px 16px", gap: 10, letterSpacing: "0.05em", fontSize: 16, color: "var(--od-navy)", textDecoration: "none" }}>
            <Icon name="whatsapp" size={22} />+447766 355099
          </Button>
        </div>
      </div>
      <HeroCarousel />
    </div>
  );
}

function LocationTag({ name }) {
  return (
    <div style={{ flex: "1 1 0%", minWidth: 0, alignSelf: "stretch", borderRadius: 10, background: "var(--od-navy-tag)", boxShadow: "inset 0 0 0 1px var(--od-brass-tag-border)", display: "flex", gap: 10, padding: "14px 16px", alignItems: "center", boxSizing: "border-box", minHeight: 46 }}>
      <Icon name="location-pin" size={18} style={{ color: "var(--od-brass)", flexShrink: 0 }} />
      <span style={{ flexGrow: 1, fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 15, lineHeight: "100%", color: "var(--od-white)" }}>{name}</span>
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
        <SiteNav variant="navy" current="Home" />
      </div>
      <main id="main" style={odMain}>
        <Hero />
        <TrustBar items={["Based In Vauxhall", "12+ Years Trading", "Free Site Viewing", "Fast Response By Text"]} />

        <div className="od-band od-section-pad od-stack" style={{ ...odBand, height: 800, background: "var(--od-white)", display: "flex", gap: 80, padding: "120px 80px", alignItems: "center" }}>
          <div className="od-detail-media" style={{ width: 520, alignSelf: "stretch", position: "relative", flexShrink: 0 }}>
            <div className="od-photo-wrap" style={{ width: 480, height: 520, borderRadius: 16, overflow: "hidden" }}>
              <img className="od-photo od-photo-tall od-photo-cell" src="/uploads/omar-decor-owner-slat-wall-socket-detail.webp" width="480" height="520" loading="lazy" alt="Slat wall and socket detail, finished by Omar Decor" style={{ width: 480, height: 520, objectFit: "cover", display: "block" }} />
            </div>
            <div className="od-quote-card" style={{ position: "absolute", left: 200, top: 415, width: 320, height: 145, borderRadius: 12, background: "var(--od-navy)", boxShadow: "var(--shadow-lift)", display: "flex", flexDirection: "column", gap: 16, padding: 28, boxSizing: "border-box" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, lineHeight: 1.3, color: "var(--od-white)", alignSelf: "stretch" }}>&ldquo;Done properly, every time.&rdquo;</span>
              <span style={{ fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 12, lineHeight: "100%", letterSpacing: "2px", textTransform: "uppercase", color: "var(--od-brass)", whiteSpace: "nowrap" }}>The Omar Decor approach</span>
            </div>
          </div>
          <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 40 }}>
            <span style={{ ...odEyebrow, fontSize: 13 }}>Why Omar Decor</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, alignSelf: "stretch" }}>
              <h2 className="od-h2" style={odH2}>Small Details. Big Difference.</h2>
              <span style={odBody}>A home improvement should feel considered &mdash; planned properly, executed cleanly, and finished to a standard you&rsquo;re happy to live with every day.</span>
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
              <a href="https://wa.me/447766355099" target="_blank" rel="noopener" className="od-white-btn" style={{ width: 185, height: 48, borderRadius: 6, background: "var(--od-white)", boxShadow: "var(--hairline-soft)", display: "inline-flex", gap: 10, padding: "15px 24px", alignItems: "center", boxSizing: "border-box", fontFamily: "var(--font-text)", fontWeight: 700, fontSize: 15, lineHeight: "100%", color: "var(--od-navy)", textDecoration: "none" }}>
                <Icon name="whatsapp" size={18} />07766 355099
              </a>
            </div>
          </div>
        </div>

        <div id="work" className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-white)", display: "flex", flexDirection: "column", gap: 48, padding: "96px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "stretch", flexShrink: 0 }}>
            <h2 className="od-h2" style={{ ...odH2, fontSize: 32 }}>Explore Our Work By Category</h2>
            <span style={odBody}>Browse recent projects by category. Tap a card to view the full gallery for that room or space.</span>
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

        <div className="od-band od-section-pad" style={{ ...odBand, height: 557, background: "var(--od-white)", display: "flex", flexDirection: "column", gap: 64, padding: "120px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", alignSelf: "stretch", flexShrink: 0 }}>
            <span style={{ ...odEyebrow, fontSize: 14 }}>How it works</span>
            <h2 className="od-h2" style={odH2}>Simple, Transparent Process</h2>
          </div>
          <div className="od-steps" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignSelf: "stretch", flexShrink: 0 }}>
            {STEPS.map(([n, t, b]) => (
              <ProcessStep key={n} accent number={n} title={t} body={b} style={{ flex: "1 1 260px", minWidth: 0, height: 161, "--type-heading-s-size": "21px" }} />
            ))}
          </div>
        </div>

        <div className="od-band od-section-pad" style={{ ...odBand, height: 622, background: "var(--od-navy)", display: "flex", flexDirection: "column", padding: "120px 80px", boxSizing: "border-box" }}>
          <div className="od-stack" style={{ display: "flex", gap: 80, alignItems: "center", alignSelf: "stretch", flexShrink: 0 }}>
            <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, alignSelf: "stretch", flexShrink: 0 }}>
                <span style={{ ...odEyebrow, fontSize: 14 }}>Service Areas</span>
                <h2 className="od-h2" style={{ ...odH2, color: "var(--od-white)", lineHeight: 1.15 }}>Serving Homeowners Across Central London</h2>
                <span style={{ ...odBody, color: "var(--od-text-muted-dark)" }}>Omar Decor works with homeowners across Central London and the surrounding areas &mdash; bringing careful, considered improvements to homes throughout the city.</span>
              </div>
              <Button as={Link} href="/contact/" variant="primary" ground="dark" style={{ width: 267, height: 49, gap: 12, padding: "16px 32px", fontWeight: 700, letterSpacing: "1px", color: "var(--od-white)", textDecoration: "none" }}>
                Discuss Your Project<Icon name="arrow-right" size={16} />
              </Button>
            </div>
            <div className="od-fluid od-areas-col" style={{ width: 580, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              {AREA_ROWS_HOME.map((row, i) => (
                <div key={i} className="od-areas-row-desktop" style={{ minHeight: 46, display: "flex", gap: 12, alignSelf: "stretch", flexShrink: 0 }}>
                  {row.map((a) => (
                    <LocationTag key={a} name={a} />
                  ))}
                </div>
              ))}
              <div className="od-areas-mobile">
                {AREA_HALVES_HOME.map((half, hi) => (
                  <div key={hi} className={"od-areas-half" + (hi === areaHalf ? " is-active" : "")} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {Array.from({ length: Math.ceil(half.length / 2) }, (_, ri) => half.slice(ri * 2, ri * 2 + 2)).map((row, ri) => (
                      <div key={ri} style={{ minHeight: 46, display: "flex", gap: 12, alignSelf: "stretch", flexShrink: 0 }}>
                        {row.map((a) => (
                          <LocationTag key={a} name={a} />
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="od-areas-carousel od-steps-carousel" style={{ display: "flex", justifyContent: "center" }}>
                  <Carousel dark index={areaHalf} count={AREA_HALVES_HOME.length} onChange={(n) => setAreaHalf(((n % AREA_HALVES_HOME.length) + AREA_HALVES_HOME.length) % AREA_HALVES_HOME.length)} labels={["Areas 1", "Areas 2"]} />
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.5)" }}>...and surrounding areas.</span>
            </div>
          </div>
        </div>

        <ReviewsSection google />
        <CtaBanner />
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  );
}

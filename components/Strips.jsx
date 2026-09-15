"use client";
import { useEffect, useState } from "react";
import { odBand } from "@/lib/styles";
import { TrustItem } from "./Markers";
import Icon from "./Icon";

export function TrustBar({ items }) {
  const list = items || ["Based in Vauxhall", "13+ years trading", "Free site viewing", "Fast response by text"];
  return (
    <div className="od-band od-strip" style={{ ...odBand, height: 73, background: "var(--od-cream)", display: "grid", gridTemplateColumns: `repeat(${list.length}, 1fr)`, padding: "24px 80px", justifyItems: "center", alignItems: "center" }}>
      {list.map((t) => (
        <TrustItem key={t}>{t}</TrustItem>
      ))}
    </div>
  );
}

export function ContactStrip() {
  return (
    <div className="od-band od-strip od-strip-contact" style={{ ...odBand, height: 73, overflow: "hidden", background: "var(--od-cream)", display: "flex", gap: 60, padding: "24px 80px", justifyContent: "center", alignItems: "center" }}>
      <TrustItem>
        Email us today <a href="mailto:hello@omardecor.co.uk" className="od-inline-link" style={{ color: "inherit", textDecoration: "none" }}>hello@omardecor.co.uk</a>
      </TrustItem>
      <TrustItem>
        Call us today <a href="https://wa.me/447766355099" target="_blank" rel="noopener" className="od-inline-link" style={{ color: "inherit", textDecoration: "none" }}>07766 355099</a>
      </TrustItem>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      className={"od-to-top" + (show ? " is-shown" : "")}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
    >
      <Icon name="chevron-left" size={16} style={{ width: 10, height: 16, color: "var(--od-white)", transform: "rotate(90deg)" }} />
    </button>
  );
}

export function CookieBanner() {
  const [seen, setSeen] = useState(true);
  useEffect(() => {
    setSeen(window.localStorage.getItem("od-cookie-consent") === "dismissed");
  }, []);
  if (seen) return null;
  const accept = () => {
    window.localStorage.setItem("od-cookie-consent", "dismissed");
    setSeen(true);
  };
  return (
    <div className="od-cookie" role="region" aria-label="Cookie notice">
      <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "var(--od-text-muted-dark)", maxWidth: 760 }}>
        We use only the cookies needed to make this site work and to understand how it is used. Read our{" "}
        <a href="/privacy/" style={{ color: "var(--od-brass)" }}>Privacy Policy</a>.
      </span>
      <div style={{ display: "flex", gap: 12 }}>
        <button type="button" className="od-btn od-btn-ghost-dark" onClick={accept} style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", height: 45, padding: "14px 28px", borderRadius: "var(--radius-sm)", border: "none", background: "none", fontFamily: "var(--font-text)", fontWeight: 600, fontSize: "var(--type-button-size)", letterSpacing: "var(--type-button-ls)", textTransform: "uppercase", cursor: "pointer", boxShadow: "inset 0 0 0 1px var(--od-border-ghost-on-navy)", color: "var(--od-white)" }}>Decline</button>
        <button type="button" className="od-btn od-btn-primary-dark" onClick={accept} style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", height: 45, padding: "14px 28px", borderRadius: "var(--radius-sm)", border: "none", fontFamily: "var(--font-text)", fontWeight: 600, fontSize: "var(--type-button-size)", letterSpacing: "var(--type-button-ls)", textTransform: "uppercase", cursor: "pointer", backgroundColor: "var(--od-brass)", color: "var(--od-navy)" }}>Accept</button>
      </div>
    </div>
  );
}

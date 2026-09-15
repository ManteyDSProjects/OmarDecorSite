"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ODLogo from "./ODLogo";
import Button from "./Button";
import { odBand } from "@/lib/styles";

const NAV_LINKS = [
  ["Home", "/"],
  ["Services", "/#work"],
  ["Gallery", "/contact/#gallery"],
  ["Contact", "/contact/"],
];

export default function SiteNav({ variant = "light", current }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const overlay = variant === "overlay";
  const navy = variant === "navy" || overlay;
  const ink = navy || open ? "var(--od-white)" : "var(--od-navy)";
  const link = { fontFamily: "var(--font-text)", fontWeight: 500, fontSize: 16, lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap" };

  useEffect(() => {
    let idleTimer;
    function onScroll() {
      if (window.scrollY < 40) {
        setVisible(true);
        clearTimeout(idleTimer);
        return;
      }
      setVisible(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setVisible(false), 1200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <a href="#main" className="od-skip">Skip to content</a>
      <div
        className={"od-nav" + (navy ? "" : " od-nav-light") + (overlay ? " od-nav-overlay" : "") + (visible ? " is-nav-visible" : "") + (open ? " is-drawer-open" : "")}
        style={{ ...odBand, position: overlay ? "absolute" : "relative", left: overlay ? 0 : undefined, top: overlay ? 0 : undefined, width: overlay ? "100%" : undefined, height: 110, background: overlay ? "rgba(0,0,0,0.35)" : navy ? "var(--od-navy)" : "var(--od-off-white)", display: "flex", padding: "12px 80px", justifyContent: "space-between", alignItems: "center" }}
      >
        <Link href="/" className="od-logo-link" aria-label="Omar Decor home" style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <ODLogo style={{ width: 61, height: 62 }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, lineHeight: "normal", color: ink, whiteSpace: "nowrap" }}>Omar Decor</span>
        </Link>
        <nav className="od-nav-links" aria-label="Primary" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(([l, href]) => (
            <Link key={l} href={href} className="od-navlink" aria-current={current === l ? "page" : undefined} style={{ ...link, color: ink }}>{l}</Link>
          ))}
        </nav>
        <Button className="od-nav-cta" as={Link} href="/contact/" variant="primary" ground="dark" style={{ width: 177, letterSpacing: "0.05em", color: "var(--od-white)", textDecoration: "none" }}>Book a Site Visit</Button>
        <button className={"od-burger" + (open ? " is-open" : "")} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <div className={"od-drawer" + (open ? " is-open" : "")} style={{ padding: "24px 40px" }}>
          <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", justifyContent: "center", minHeight: "100%" }}>
            {NAV_LINKS.map(([l, href]) => (
              <Link key={l} href={href} onClick={() => setOpen(false)} className="od-navlink od-drawer-link" style={{ ...link, color: "var(--od-white)", fontSize: 20, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>{l}</Link>
            ))}
            <Button as={Link} href="/contact/" onClick={() => setOpen(false)} variant="primary" ground="dark" style={{ marginTop: 24, color: "var(--od-white)", textDecoration: "none" }}>Book a Site Visit</Button>
          </nav>
        </div>
      </div>
    </>
  );
}

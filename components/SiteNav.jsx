"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ODLogo from "./ODLogo";
import Button from "./Button";
import Icon from "./Icon";
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
  const [mounted, setMounted] = useState(false);
  const overlay = variant === "overlay";
  const navy = variant === "navy" || overlay;
  const ink = navy ? "var(--od-white)" : "var(--od-navy)";
  const link = { fontFamily: "var(--font-text)", fontWeight: 500, fontSize: 16, lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap" };

  useEffect(() => {
    setMounted(true);
  }, []);

  const hoveringRef = useRef(false);
  const idleTimerRef = useRef();
  const startIdleRef = useRef(() => {});

  useEffect(() => {
    function startIdle() {
      clearTimeout(idleTimerRef.current);
      if (hoveringRef.current) return;
      idleTimerRef.current = setTimeout(() => setVisible(false), 1200);
    }
    startIdleRef.current = startIdle;
    function onScroll() {
      if (window.scrollY < 40) {
        setVisible(true);
        clearTimeout(idleTimerRef.current);
        return;
      }
      setVisible(true);
      startIdle();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleNavEnter = () => {
    hoveringRef.current = true;
    clearTimeout(idleTimerRef.current);
    setVisible(true);
  };
  const handleNavLeave = () => {
    hoveringRef.current = false;
    if (window.scrollY >= 40) startIdleRef.current();
  };

  return (
    <>
      <a href="#main" className="od-skip">Skip to content</a>
      <div
        className={"od-nav" + (navy ? "" : " od-nav-light") + (overlay ? " od-nav-overlay" : "") + (visible ? " is-nav-visible" : "") + (open ? " is-drawer-open" : "")}
        onMouseEnter={handleNavEnter}
        onMouseLeave={handleNavLeave}
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
      </div>
      {mounted
        ? createPortal(
            <div
              className={"od-drawer" + (open ? " is-open" : "")}
              style={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                paddingTop: "max(24px, env(safe-area-inset-top))",
                paddingRight: "max(40px, env(safe-area-inset-right))",
                paddingBottom: "max(24px, env(safe-area-inset-bottom))",
                paddingLeft: "max(40px, env(safe-area-inset-left))",
              }}
            >
              <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  {NAV_LINKS.map(([l, href]) => (
                    <Link key={l} href={href} onClick={() => setOpen(false)} className="od-navlink od-drawer-link" style={{ ...link, color: "var(--od-white)", fontSize: 20, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "flex-start", textAlign: "left" }}>{l}</Link>
                  ))}
                </div>
                <div style={{ alignSelf: "stretch", height: 1, background: "var(--od-border-on-navy)", margin: "24px 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", marginTop: "auto", marginBottom: 24 }}>
                  <a href="https://wa.me/447766355099" target="_blank" rel="noopener" onClick={() => setOpen(false)} className="od-inline-link" style={{ display: "flex", gap: 10, alignItems: "center", fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 16, lineHeight: 1.3, color: "var(--od-white)", textDecoration: "none" }}>
                    <Icon name="whatsapp" size={18} style={{ color: "var(--od-brass)", flexShrink: 0 }} />
                    +44 7766 355099
                  </a>
                  <a href="mailto:hello@omardecor.co.uk" onClick={() => setOpen(false)} className="od-inline-link" style={{ display: "flex", gap: 10, alignItems: "center", fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 16, lineHeight: 1.3, color: "var(--od-white)", textDecoration: "none" }}>
                    <Icon name="contact-mail" size={18} style={{ color: "var(--od-brass)", flexShrink: 0 }} />
                    hello@omardecor.co.uk
                  </a>
                </div>
                <Button as={Link} href="/contact/" onClick={() => setOpen(false)} variant="primary" ground="dark" style={{ width: "100%", color: "var(--od-white)", textDecoration: "none" }}>Book a Site Visit</Button>
              </nav>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

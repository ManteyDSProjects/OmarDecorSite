import Link from "next/link";
import ODLogo from "./ODLogo";
import { odBand } from "@/lib/styles";

const head = { fontFamily: "var(--font-text)", fontWeight: 700, fontSize: 14, lineHeight: "normal", color: "var(--od-white)" };
const item = { fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 14, lineHeight: "normal", color: "rgba(255,255,255,0.7)", textDecoration: "none" };
const fine = { fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 13, lineHeight: "normal", color: "rgba(255,255,255,0.7)" };

const QUICK_LINKS = [
  ["Home", "/"],
  ["Services", "/#services"],
  ["Contact", "/contact/"],
];
const AREAS = ["Vauxhall", "Clapham", "Pimlico", "Battersea", "Chelsea"];

export default function Footer({ style, ...rest }) {
  return (
    <div {...rest} className="od-footer" style={{ ...odBand, backgroundColor: "var(--od-navy)", display: "flex", flexDirection: "column", gap: 64, padding: "80px 80px 40px", boxSizing: "border-box", ...style }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
          <Link href="/" aria-label="Omar Decor home" style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center", textDecoration: "none" }}>
            <ODLogo style={{ width: 69, height: 70 }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, lineHeight: "normal", color: "var(--od-white)" }}>Omar Decor</span>
          </Link>
          <span style={{ alignSelf: "stretch", ...item }}>Handyman & Home Improvement Services</span>
          <span style={{ alignSelf: "stretch", whiteSpace: "nowrap", ...fine }}>Established 2011</span>
        </div>
        <div style={{ width: 180, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <span style={head}>Quick Links</span>
          {QUICK_LINKS.map(([l, href]) => (
            <Link key={l} href={href} style={item}>{l}</Link>
          ))}
          <Link href="/privacy/" style={item}>Privacy Policy</Link>
          <Link href="/terms/" style={item}>Terms & Conditions</Link>
        </div>
        <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <span style={head}>Service Areas</span>
          {AREAS.map((a) => (
            <span key={a} style={item}>{a}</span>
          ))}
          <Link href="/contact/#areas" style={{ ...item, fontWeight: 700, color: "var(--od-brass)" }}>See All Areas &rarr;</Link>
        </div>
        <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <span style={head}>Direct Contact</span>
          <span style={item}>hello@omardecor.co.uk</span>
          <span className="od-footer-phone" style={item}>+44 7766 355099</span>
          <span style={fine}>Based in Vauxhall, London</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
        <div style={{ alignSelf: "stretch", height: 1, backgroundColor: "var(--od-border-on-navy)" }} />
        <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <span style={fine}>&copy; 2026 Omar Decor. All rights reserved.</span>
          <span style={fine}>
            <Link href="/terms/" style={{ color: "inherit", textDecoration: "underline" }}>Terms & Conditions</Link> &bull; <Link href="/privacy/" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

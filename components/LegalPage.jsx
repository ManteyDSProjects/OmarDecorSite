import SiteNav from "./SiteNav";
import Footer from "./Footer";
import { ContactStrip, BackToTop, CookieBanner } from "./Strips";
import { odShell, odBand, odMain, odEyebrow, odH2, odSubline, odBody } from "@/lib/styles";

export default function LegalPage({ title, updated, intro, sections, current }) {
  return (
    <div style={{ ...odShell, background: "var(--od-off-white)" }} className="od-shell">
      <div className="od-nav-spacer" style={{ alignSelf: "stretch" }}>
        <SiteNav variant="light" current={current} />
      </div>
      <main id="main" style={odMain}>
        <div className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-off-white)", display: "flex", flexDirection: "column", gap: 24, padding: "96px 80px 64px" }}>
          <span style={odEyebrow}>Legal</span>
          <h1 className="od-h2" style={odH2}>{title}</h1>
          <span style={odSubline}>Last updated {updated}</span>
        </div>
        <div className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-white)", display: "flex", flexDirection: "column", gap: 40, padding: "80px 80px 120px" }}>
          <p className="od-fluid od-legal-body" style={{ ...odBody, width: 760, margin: 0 }}>{intro}</p>
          {sections.map(([h, paras]) => (
            <section key={h} className="od-fluid" style={{ width: 760, display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, lineHeight: 1.3, color: "var(--od-navy)", margin: 0 }}>{h}</h2>
              {paras.map((p, i) => (
                <p key={i} className="od-legal-body" style={{ ...odBody, margin: 0 }}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <ContactStrip />
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  );
}

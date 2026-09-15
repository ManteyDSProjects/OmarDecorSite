import Link from "next/link";
import Button from "./Button";
import Icon from "./Icon";
import { odBand } from "@/lib/styles";

export default function CtaBanner({ variant = "visit" }) {
  const call = variant === "call";
  return (
    <div className="od-band od-cta" style={{ ...odBand, height: 220, background: "var(--od-navy)", display: "flex", padding: "64px 80px", justifyContent: "space-between", alignItems: "center", boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.14)" }}>
      <div className="od-fluid" style={{ width: 800, display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        <span className="od-h-lg" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, lineHeight: "100%", color: "var(--od-white)" }}>{call ? "Prefer To Talk It Through?" : "Need quality renovation work?"}</span>
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 15, lineHeight: 1.4, color: "var(--od-text-muted-dark)" }}>{call ? "Give us a call and we’ll talk through exactly what you need, no forms required." : "Let us transform your home with precision. Get scheduled for a free site viewing this week."}</span>
      </div>
      {call ? (
        <Button as="a" href="https://wa.me/447766355099" target="_blank" rel="noopener" variant="primary" ground="dark" style={{ width: 196, height: 48, gap: 10, color: "var(--od-white)", textDecoration: "none" }}>
          <Icon name="chat-bubble" size={20} />07766 355099
        </Button>
      ) : (
        <Button as={Link} href="/contact/" variant="primary" ground="dark" style={{ width: 199, color: "var(--od-white)", textDecoration: "none" }}>Book a Free Visit</Button>
      )}
    </div>
  );
}

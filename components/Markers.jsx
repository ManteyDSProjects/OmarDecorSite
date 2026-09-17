import Icon from "./Icon";

export function TrustItem({ children, style, ...rest }) {
  return (
    <div {...rest} style={{ display: "inline-flex", flexDirection: "row", gap: 16, alignItems: "center", ...style }}>
      <span style={{ fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 21, lineHeight: "normal", color: "var(--od-navy)", whiteSpace: "nowrap" }}>{children}</span>
    </div>
  );
}

export function ChecklistItem({ children, style, ...rest }) {
  return (
    <div {...rest} style={{ display: "inline-flex", flexDirection: "row", gap: 12, alignItems: "center", ...style }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(176,141,87,0.13)", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
        <Icon name="tick" size={10} style={{ color: "var(--od-brass)" }} />
      </div>
      <span style={{ fontFamily: "var(--font-text)", fontWeight: 500, fontSize: 15, lineHeight: "normal", color: "var(--od-navy)" }}>{children}</span>
    </div>
  );
}

export function ProcessStep({ number, title, body, accent = false, style, ...rest }) {
  const edge = accent ? "var(--od-brass)" : "var(--od-border)";
  return (
    <div {...rest} style={{ width: 296, padding: "16px 24px", borderLeft: "2px solid " + edge, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", boxSizing: "border-box", ...style }}>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--type-numeral-size)", lineHeight: "normal", letterSpacing: "1px", textTransform: "uppercase", color: "var(--od-brass)", whiteSpace: "nowrap" }}>{number}</span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--type-heading-s-size)", lineHeight: "normal", color: "var(--od-navy)", whiteSpace: "nowrap" }}>{title}</span>
      <span style={{ alignSelf: "stretch", fontFamily: "var(--font-text)", fontWeight: 400, fontSize: "var(--type-body-xs-size)", lineHeight: 1.5, color: "var(--od-text-muted)" }}>{body}</span>
    </div>
  );
}

export function ServiceCard({ icon, title, body, className, style, ...rest }) {
  return (
    <div {...rest} className={"od-service-card" + (className ? " " + className : "")} style={{ background: "var(--od-cream)", borderRadius: 6, padding: 32, minHeight: 240, display: "flex", flexDirection: "column", gap: 24, boxSizing: "border-box", ...style }}>
      <div style={{ width: "100%", height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={48} style={{ color: "var(--od-brass)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, lineHeight: 1.3, color: "var(--od-navy)", margin: 0 }}>{title}</h3>
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: "var(--od-text-muted)" }}>{body}</span>
      </div>
    </div>
  );
}

export function ReviewCard({ quote, name, location, rating = 5, className, style, ...rest }) {
  return (
    <div {...rest} className={className} style={{ width: 404, minHeight: 237, borderRadius: "var(--radius-md)", backgroundColor: "var(--od-cream)", display: "flex", flexDirection: "column", gap: 16, padding: "var(--space-7)", alignItems: "flex-start", boxSizing: "border-box", ...style }}>
      <div style={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name={i < rating ? "star" : "star-outline"} size={16} style={{ flexShrink: 0, color: "var(--od-brass)" }} />
        ))}
      </div>
      <span style={{ alignSelf: "stretch", fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "var(--od-text-muted)" }}>{quote}</span>
      <div style={{ marginTop: "auto", alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 14, lineHeight: "normal", color: "var(--od-navy)" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 13, lineHeight: "normal", color: "var(--od-text-muted)" }}>{location}</span>
      </div>
    </div>
  );
}

export function FaqItem({ question, open = false, onToggle, className, style, ...rest }) {
  return (
    <div
      {...rest}
      className={className}
      onClick={onToggle}
      style={{ width: 900, backgroundColor: "rgba(255,255,255,0.67)", display: "flex", flexDirection: "row", padding: "16px 0", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box", cursor: onToggle ? "pointer" : "default", ...style }}
    >
      <span style={{ flexGrow: 1, fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 18, lineHeight: "normal", color: "var(--od-navy)" }}>{question}</span>
      <Icon name="plus" size={14} style={{ flexShrink: 0, color: "var(--od-navy)", transform: open ? "rotate(45deg)" : "none", transition: "transform .15s ease" }} />
    </div>
  );
}

import Icon from "./Icon";

export default function Carousel({ index, count, onChange, labels, dark }) {
  const arrow = { width: 48, height: 48, borderRadius: 24, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "none", padding: 0, cursor: "pointer", flexShrink: 0 };
  return (
    <div className={"od-carousel" + (dark ? " od-carousel-dark" : "")} style={{ height: 80, display: "flex", padding: "16px 0", justifyContent: "center", alignItems: "center", boxSizing: "border-box", alignSelf: "stretch", flexShrink: 0 }}>
      <div className="od-carousel-inner" style={{ height: 48, display: "flex", gap: 32, justifyContent: "center", alignItems: "center" }}>
        <button type="button" className="od-arrow od-arrow-ghost" aria-label="Previous project" style={{ ...arrow, boxShadow: "inset 0 0 0 1.5px rgba(27,42,64,0.2)" }} onClick={() => onChange((index + count - 1) % count)}>
          <Icon name="chevron-left" size={16} style={{ width: 10, height: 16, color: "var(--od-navy)" }} />
        </button>
        <span className="od-carousel-count" aria-hidden="true" style={{ color: dark ? "var(--od-white)" : "var(--od-navy)" }}>{index + 1} / {count}</span>
        <div className="od-dots" style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          {Array.from({ length: count }).map((_, n) => (
            <button key={n} type="button" className="od-dot" onClick={() => onChange(n)} aria-label={labels[n]} aria-current={n === index ? "true" : undefined} style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "none", padding: 0, cursor: "pointer" }}>
              <span style={{ width: n === index ? 12 : 10, height: n === index ? 12 : 10, borderRadius: "50%", background: n === index ? "var(--od-brass)" : dark ? "rgba(255,255,255,0.3)" : "rgba(27,42,64,0.15)", display: "block" }} />
            </button>
          ))}
        </div>
        <button type="button" className="od-arrow od-arrow-brass" aria-label="Next project" style={{ ...arrow, background: "var(--od-brass)" }} onClick={() => onChange((index + 1) % count)}>
          <Icon name="chevron-right" size={16} style={{ width: 10, height: 16, color: "var(--od-white)" }} />
        </button>
      </div>
    </div>
  );
}

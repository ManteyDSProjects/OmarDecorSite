const base = {
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: 45,
  padding: "14px 28px",
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "none",
  fontFamily: "var(--font-text)",
  fontWeight: 600,
  fontSize: "var(--type-button-size)",
  lineHeight: "normal",
  letterSpacing: "var(--type-button-ls)",
  textTransform: "uppercase",
  cursor: "pointer",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
};
const buttonVariants = {
  "primary|light": { backgroundColor: "var(--od-navy)", color: "var(--od-white)" },
  "ghost|light": { boxShadow: "inset 0 0 0 1px var(--od-border-ghost)", color: "var(--od-navy)" },
  "primary|dark": { backgroundColor: "var(--od-brass)", color: "var(--od-navy)" },
  "ghost|dark": { boxShadow: "inset 0 0 0 1px var(--od-border-ghost-on-navy)", color: "var(--od-white)" },
};

export default function Button({ variant = "primary", ground = "light", children = "Book a site visit", as = "button", className, style, ...rest }) {
  const Tag = as;
  const cls = ["od-btn", "od-btn-" + variant + "-" + ground, className].filter(Boolean).join(" ");
  return (
    <Tag
      {...rest}
      className={cls}
      style={{ ...base, ...(buttonVariants[variant + "|" + ground] || buttonVariants["primary|light"]), ...style }}
    >
      {children}
    </Tag>
  );
}

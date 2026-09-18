"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { odBand, odH2 } from "@/lib/styles";

const FIELD_MSG = { name: "Enter your name", phone: "Enter a phone number we can reach you on", email: "Enter a valid email address" };
const ODSubmitted = createContext(false);

function Field({ label, name, type = "text", placeholder, required, autoComplete }) {
  const [err, setErr] = useState("");
  const submitted = useContext(ODSubmitted);
  const check = (e) => {
    if (!submitted) return;
    setErr(e.target.validity.valid ? "" : FIELD_MSG[name] || "This field is required");
  };
  const flag = (e) => setErr(e.target.validity.valid ? "" : FIELD_MSG[name] || "This field is required");
  useEffect(() => {
    if (!submitted) setErr("");
  }, [submitted]);
  const clear = (e) => {
    if (err && e.target.validity.valid) setErr("");
  };
  const box = { height: type === "textarea" ? 120 : 48, width: "100%", borderRadius: "var(--radius-sm)", backgroundColor: "var(--od-form-field)", boxShadow: "inset 0 0 0 1px var(--od-border-field-on-navy)", border: "none", outline: "none", padding: 14, fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 14, lineHeight: type === "textarea" ? 1.5 : "100%", color: "var(--od-white)", boxSizing: "border-box", resize: "none", display: "block" };
  const id = "f-" + name;
  const fieldProps = { id, name, placeholder, required, style: box, className: "od-field" + (err ? " is-error" : ""), onBlur: check, onInvalid: flag, onInput: clear, "aria-invalid": err ? "true" : undefined, "aria-describedby": err ? id + "-msg" : undefined };
  return (
    <div className={"od-field-wrap" + (err ? " has-error" : "")} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-2)", alignItems: "flex-start", flex: 1, minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: "var(--font-text)", fontWeight: 500, fontSize: "var(--type-label-size)", lineHeight: "normal", color: "var(--od-white)" }}>{label}</label>
      {type === "textarea" ? <textarea {...fieldProps} /> : <input {...fieldProps} type={type} autoComplete={autoComplete} />}
      <span id={id + "-msg"} className={"od-field-msg" + (err ? " is-shown" : "")} role="alert">{err}</span>
    </div>
  );
}

export default function ContactSection({ heading = "h2" }) {
  const H = heading;
  const [sending, setSending] = useState(false);
  const [tried, setTried] = useState(false);
  return (
    <div id="contact" className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-navy)", padding: "120px 0", boxSizing: "border-box" }}>
      <div className="od-stack od-contact-w1280" style={{ width: 1440, maxWidth: "100%", margin: "0 auto", padding: "0 80px", boxSizing: "border-box", display: "flex", gap: 120, alignItems: "center" }}>
        <div className="od-contact-text" style={{ flexGrow: 1, minWidth: 0, height: 375, display: "flex", flexDirection: "column", gap: 32, justifyContent: "center" }}>
          <H className="od-h2 od-contact-heading" style={{ ...odH2, color: "var(--od-white)", whiteSpace: "pre-line" }}>{"Have A Project in\nMind?"}</H>
          <span className="od-contact-subline" style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 20, lineHeight: 1.6, color: "var(--od-text-muted-dark)" }}>Whether you need a small repair, a home improvement project, or help transforming a room, get in touch with Omar Decor to discuss what you need.</span>
          <div className="od-contact-details" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              ["contact-mail", "hello@omardecor.co.uk", "mailto:hello@omardecor.co.uk"],
              ["whatsapp", "+44 7766 355099", "https://wa.me/447766355099"],
              ["contact-location", "Based in Vauxhall, London", null],
            ].map(([ic, t, href]) => (
              <div key={t} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {/* Fixed 20px, not the em-based default: this row's icons
                    must match their siblings, not scale off the 18px text. */}
                <Icon name={ic} size={20} style={{ color: "var(--od-brass)", flexShrink: 0 }} />
                {href ? (
                  <a href={href} target={href.indexOf("wa.me") !== -1 ? "_blank" : undefined} rel={href.indexOf("wa.me") !== -1 ? "noopener" : undefined} className="od-inline-link" style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 18, lineHeight: 1.4, color: "var(--od-white)", textDecoration: "none" }}>{t}</a>
                ) : (
                  <span style={{ fontFamily: "var(--font-text)", fontWeight: 400, fontSize: 18, lineHeight: 1.4, color: "var(--od-white)" }}>{t}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={() => setSending(true)}
          onInvalidCapture={() => setTried(true)}
          onClickCapture={(e) => {
            if (e.target.closest && e.target.closest("[type=submit]")) setTried(true);
          }}
          className="od-fluid od-form"
          style={{ width: 600, minHeight: 668, height: "auto", borderRadius: 8, boxShadow: "var(--hairline-on-navy)", display: "flex", flexDirection: "column", gap: 24, padding: 48, boxSizing: "border-box", flexShrink: 0 }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <ODSubmitted.Provider value={tried}>
            <p hidden>
              <label>
                Do not fill this in: <input name="bot-field" />
              </label>
            </p>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, lineHeight: "100%", color: "var(--od-white)" }}>Book a Free Visit</span>
            <div className="od-form-row" style={{ display: "flex", gap: 16, alignSelf: "stretch" }}>
              <Field label="Name" name="name" placeholder="Your name" autoComplete="name" required />
              <Field label="Phone Number" name="phone" type="tel" placeholder="e.g. 07700 900077" autoComplete="tel" required />
            </div>
            <Field label="Email Address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <Field label="Postcode" name="location" placeholder="e.g. Clapham, Pimlico, Vauxhall" />
            <Field label="Project Details" name="details" type="textarea" placeholder="Briefly describe what you need done..." />
            <div style={{ padding: "12px 0", alignSelf: "stretch" }}>
              <Button as="button" type="submit" variant="primary" ground="dark" disabled={sending} aria-disabled={sending} style={{ width: "100%" }}>{sending ? "Sending" : "Send Enquiry"}</Button>
            </div>
          </ODSubmitted.Provider>
        </form>
      </div>
    </div>
  );
}

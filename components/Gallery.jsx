"use client";
import { useEffect, useRef } from "react";
import Icon from "./Icon";
import { altFor, GALLERY_IMG, CATEGORY_LABELS, CATEGORY_CAPTIONS } from "@/lib/galleries";

/* The wrapper owns the layout rect and clips; the image inside is what scales on
   hover. A real <img> (not a CSS background) carries the alt text and benefits
   from native lazy-loading, per the site's SEO/accessibility requirements. */
export function Photo({ name, style, radius = 8, eager, onOpen, alt }) {
  const { objectPosition, ...box } = style || {};
  const label = alt || altFor(name);
  const src = name.includes("/") ? name : GALLERY_IMG + name + ".webp";
  const Tag = onOpen ? "button" : "div";
  const open = onOpen ? { type: "button", onClick: onOpen, "aria-label": "View larger: " + label } : {};
  return (
    <Tag className={"od-photo-wrap" + (onOpen ? " od-photo-btn" : "")} style={{ overflow: "hidden", borderRadius: radius, position: "relative", ...box }} {...open}>
      <img
        className="od-photo-cell"
        src={src}
        alt={label}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: objectPosition || "center", backgroundColor: "var(--od-cream)" }}
      />
    </Tag>
  );
}

export function CategoryCard({ name, cover, onOpen, expanded, onToggle }) {
  const label = CATEGORY_LABELS[name] || name;
  const caption = CATEGORY_CAPTIONS[name];
  const toggle = (e) => {
    e.stopPropagation();
    onToggle();
  };
  return (
    <div className={"od-category-card" + (expanded ? " is-expanded" : "")} role="button" tabIndex={0} onClick={onOpen} onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(); } }} aria-label={"View " + label + " gallery"}>
      <img className="od-category-img" src={cover} alt={label + " project by Omar Decor"} loading="lazy" decoding="async" />
      <div className="od-category-content">
        <div className="od-category-heading-row">
          <span className="od-category-name">{label}</span>
          <button type="button" className="od-category-toggle" aria-expanded={expanded} aria-label={(expanded ? "Hide" : "Show") + " " + label + " description"} onClick={toggle}>
            <Icon name="plus" size={14} style={{ color: "var(--od-white)", transform: expanded ? "rotate(45deg)" : "none" }} />
          </button>
        </div>
        {caption ? <span className="od-category-caption">{caption}</span> : null}
      </div>
    </div>
  );
}

export function Lightbox({ names, srcs, alts, index, onIndex, onClose }) {
  const closeRef = useRef(null);
  const count = (srcs || names).length;
  const srcFor = (i) => (srcs ? srcs[i] : names[i].includes("/") ? names[i] : GALLERY_IMG + names[i] + ".webp");
  const altFor2 = (i) => (alts ? alts[i] : altFor(names[i]));

  useEffect(() => {
    if (closeRef.current) closeRef.current.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onIndex((index + 1) % count);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onIndex((index + count - 1) % count);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, count, onIndex, onClose]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const im = new window.Image();
      im.src = srcFor(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const arrow = { width: 48, height: 48, borderRadius: 24, border: "none", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };

  return (
    <div className="od-lightbox" role="dialog" aria-modal="true" aria-label="Project photograph" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="od-lb-inner">
        <div className="od-lb-top">
          <span className="od-lb-count">{index + 1} of {count}</span>
          <button ref={closeRef} type="button" className="od-arrow od-arrow-brass od-lb-close" aria-label="Close" onClick={onClose} style={{ ...arrow, background: "var(--od-brass)" }}>
            <Icon name="plus" size={18} style={{ color: "var(--od-white)", transform: "rotate(45deg)" }} />
          </button>
        </div>
        <div className="od-lb-stage">
          {count > 1 ? (
            <button type="button" className="od-arrow od-arrow-lb od-lb-prev" aria-label="Previous photograph" onClick={() => onIndex((index + count - 1) % count)} style={arrow}>
              <Icon name="chevron-left" size={16} style={{ width: 10, height: 16, color: "var(--od-white)" }} />
            </button>
          ) : null}
          <img key={index} className="od-lb-img" src={srcFor(index)} alt={altFor2(index)} decoding="async" />
          {count > 1 ? (
            <button type="button" className="od-arrow od-arrow-lb od-lb-next" aria-label="Next photograph" onClick={() => onIndex((index + 1) % count)} style={arrow}>
              <Icon name="chevron-right" size={16} style={{ width: 10, height: 16, color: "var(--od-white)" }} />
            </button>
          ) : null}
        </div>
        <div className="od-lb-bottom">
          <span className="od-lb-caption">{altFor2(index)}</span>
          {count > 1 ? (
            <div className="od-lb-thumbs" role="tablist" aria-label="Photographs in this project">
              {(srcs || names).map((n, i) => (
                <button key={i} type="button" role="tab" aria-selected={i === index} aria-label={altFor2(i)} className={"od-lb-thumb" + (i === index ? " is-current" : "")} onClick={() => onIndex(i)} style={{ backgroundImage: "url(" + srcFor(i) + ")" }} />
              ))}
            </div>
          ) : null}
          {count > 1 ? (
            <div className="od-lb-ticker" aria-hidden="true">
              <div className="od-lb-ticker-track">
                {Array.from({ length: count }).map((_, i) => (
                  <span key={i} className={"od-lb-tick" + (i === index ? " is-current" : "")} />
                ))}
              </div>
              <span className="od-lb-ticker-count">{index + 1} / {count}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

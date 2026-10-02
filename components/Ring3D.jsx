import { useEffect, useRef } from "react";
import { md } from "@/lib/img";

// Rotating 3D photo ring (home hero, contact "Meet Your Handyman"). Pure CSS motion,
// see .od-hero3d-* in styles/site.css. `slides` = [src, alt, objectPosition?][]; the
// stage keeps whatever className/style the caller had on the old slideshow box so
// existing breakpoint rules keep applying. `vars` overrides card size/radius/speed
// (--w, --h, --r, --dur) per instance. Children render on top of the ring.
//
// The stage's pixel height is published as --sh so CSS can keep the cards inside a box
// whose height is set by flex layout (container height units are unreliable there).
export default function Ring3D({ slides, label, className, style, vars, children }) {
  const stage = useRef(null);
  useEffect(() => {
    const el = stage.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => el.style.setProperty("--sh", el.clientHeight + "px"));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={stage} className={"od-hero3d-stage" + (className ? " " + className : "")} style={style}>
      <div className="od-hero3d" role="group" aria-label={label} style={{ "--n": slides.length, ...vars }}>
        <div className="od-hero3d-ring">
          {slides.map(([src, alt, pos], i) => (
            <div key={src} className="od-hero3d-card" style={{ "--i": i }}>
              <img src={md(src)} alt={alt} decoding="async" fetchPriority={i === 0 ? "high" : "low"} loading={i === 0 ? "eager" : "lazy"} style={pos ? { objectPosition: pos } : undefined} />
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

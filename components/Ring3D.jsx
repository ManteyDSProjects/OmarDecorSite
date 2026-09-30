import { md } from "@/lib/img";

// Rotating 3D photo ring (home hero, contact "Meet Your Handyman"). Pure CSS motion,
// see .od-hero3d-* in styles/site.css. `slides` = [src, alt, objectPosition?][]; the
// stage keeps whatever className/style the caller had on the old slideshow box so
// existing breakpoint rules keep applying. `vars` overrides card size/radius/speed
// (--w, --h, --r, --dur) per instance. Children render on top of the ring.
export default function Ring3D({ slides, label, className, style, vars, children }) {
  return (
    <div className={"od-hero3d-stage" + (className ? " " + className : "")} style={style}>
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

"use client";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { md } from "@/lib/img";
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
      <img className="od-category-img" src={md(cover)} alt={label + " project by Omar Decor"} loading="lazy" decoding="async" />
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

/* Waits for a scroll (however it was triggered — smooth CSS scroll or
   scrollIntoView) to come to rest, then fires the callback. Polls via rAF
   instead of relying on the "scrollend" event, which some browsers still
   don't support, so the loop-snap trick below works everywhere. */
function whenScrollSettles(el, cb) {
  let hasMoved = false;
  let last = el.scrollLeft;
  let stableFrames = 0;
  let framesWaited = 0;
  const maxWaitFrames = 12;
  function tick() {
    framesWaited++;
    const cur = el.scrollLeft;
    if (cur !== last) {
      hasMoved = true;
      stableFrames = 0;
      last = cur;
    } else if (hasMoved || framesWaited > maxWaitFrames) {
      stableFrames++;
      if (stableFrames >= 3) {
        cb();
        return;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Memoised so the arrow/close glyphs aren't torn down and rebuilt (innerHTML) on every photo change,
// which flashed both arrows.
const LbChevron = memo(function LbChevron({ dir }) {
  return <Icon name={"chevron-" + dir} size={16} style={{ width: 10, height: 16, color: "var(--od-white)" }} />;
});
const LbClose = memo(function LbClose() {
  return <Icon name="plus" size={18} style={{ color: "var(--od-white)", transform: "rotate(45deg)" }} />;
});

// Touch-first device (phone, tablet, desktop-site mode on either): any size. Mouse-first
// devices, including touch laptops, keep the arrows.
function isTouchDevice() {
  const mq = (q) => window.matchMedia(q).matches;
  return mq("(pointer: coarse)") || mq("(hover: none)") || (navigator.maxTouchPoints > 0 && !mq("(pointer: fine)"));
}

export function Lightbox({ names, srcs, alts, index, onIndex, onClose, variant }) {
  const clean = variant === "clean";
  const [touch] = useState(isTouchDevice);
  const closeRef = useRef(null);
  const thumbsRef = useRef(null);
  const prevIndexRef = useRef(index);
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const commitTimer = useRef(null);
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
    for (const i of [(index + 1) % count, (index + count - 1) % count]) {
      const im = new window.Image();
      im.src = srcFor(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  useLayoutEffect(() => {
    // The strip's DOM starts with a leading clone-of-last thumb (for the
    // loop illusion), so a natural scrollLeft of 0 would show a sliver of
    // that clone instead of the real first thumb. Jump instantly (no
    // animation, no flash) to the real thumb at mount.
    const container = thumbsRef.current;
    if (container && count > 1) container.scrollLeft = container.children[index + 1].offsetLeft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const prev = prevIndexRef.current;
    prevIndexRef.current = index;
    if (count < 2) return;

    // Thumbs render as [clone-of-last, ...real 0..count-1, clone-of-first],
    // so real index i lives at DOM position i+1.
    const forwardWrap = prev === count - 1 && index === 0;
    const backwardWrap = prev === 0 && index === count - 1;

    if (forwardWrap) {
      // Scroll into the trailing clone-of-first (looks identical to the
      // real one) so the strip appears to keep sliding forward past the
      // last thumb, then snap invisibly back to the real first thumb.
      const clone = container.children[count + 1];
      const real = container.children[1];
      clone.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      whenScrollSettles(container, () => {
        container.scrollLeft -= clone.offsetLeft - real.offsetLeft;
      });
    } else if (backwardWrap) {
      const clone = container.children[0];
      const real = container.children[count];
      clone.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      whenScrollSettles(container, () => {
        container.scrollLeft += real.offsetLeft - clone.offsetLeft;
      });
    } else {
      const active = container.children[index + 1];
      if (active) active.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }, [index, count]);

  // Touch swipe carousel (any touch device, any screen size, plus narrow windows <=768px): the
  // photo sits between its neighbours on a track that follows the finger, then slides fully
  // across and snaps in. Mouse users on wider windows keep the arrows.
  const swipeMode = () => touch || window.matchMedia("(max-width: 768px)").matches;
  const setTrack = (x, ms) => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = ms ? "transform " + ms + "ms ease-out" : "none";
    t.style.transform = "translate3d(" + x + ",0,0)";
  };
  const onTouchStart = (e) => {
    if (commitTimer.current || e.touches.length !== 1 || count < 2 || !swipeMode()) {
      dragRef.current = null;
      return;
    }
    dragRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), axis: null, dx: 0 };
  };
  const onTouchMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    if (e.touches.length !== 1) {
      dragRef.current = null;
      setTrack("-100%", 180);
      return;
    }
    const dx = e.touches[0].clientX - d.x;
    const dy = e.touches[0].clientY - d.y;
    if (!d.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (d.axis !== "x") return;
    d.dx = dx;
    setTrack("calc(-100% + " + dx + "px)", 0);
  };
  const onTouchEnd = (e) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || d.axis !== "x") return;
    const w = trackRef.current.parentElement.clientWidth;
    const velocity = Math.abs(d.dx) / Math.max(1, Date.now() - d.t);
    const commit = e.type === "touchend" && (Math.abs(d.dx) > w * 0.2 || (velocity > 0.4 && Math.abs(d.dx) > 30));
    if (!commit) {
      setTrack("-100%", 220);
      return;
    }
    const dir = d.dx < 0 ? 1 : -1;
    const track = trackRef.current;
    // Swap the index when the slide animation actually ends (timer is only a fallback).
    const finish = () => {
      if (!commitTimer.current) return;
      clearTimeout(commitTimer.current);
      commitTimer.current = null;
      track.removeEventListener("transitionend", finish);
      onIndex((index + dir + count) % count);
    };
    commitTimer.current = setTimeout(finish, 400);
    track.addEventListener("transitionend", finish);
    setTrack(dir === 1 ? "-200%" : "0%", 240);
  };
  useLayoutEffect(() => {
    // New photo is now the middle slide: put the track back with no animation, same frame.
    setTrack("-100%", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  useEffect(() => () => clearTimeout(commitTimer.current), []);

  const slides = count > 1 ? [(index + count - 1) % count, index, (index + 1) % count] : [index];

  const arrow = { width: 48, height: 48, borderRadius: 24, border: "none", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };

  return (
    <div className={"od-lightbox" + (clean ? " od-lightbox-clean" : "") + (touch ? " od-lb-touch" : "")} role="dialog" aria-modal="true" aria-label="Project photograph" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="od-lb-inner">
        <div className="od-lb-top">
          {clean ? <span /> : <span className="od-lb-count">{index + 1} of {count}</span>}
          <button ref={closeRef} type="button" className="od-arrow od-arrow-brass od-lb-close" aria-label="Close" onClick={onClose} style={{ ...arrow, background: "var(--od-brass)" }}>
            <LbClose />
          </button>
        </div>
        <div className="od-lb-stage" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}>
          {count > 1 ? (
            <button type="button" className="od-arrow od-arrow-lb od-lb-prev" aria-label="Previous photograph" onClick={() => onIndex((index + count - 1) % count)} style={arrow}>
              <LbChevron dir="left" />
            </button>
          ) : null}
          <div className="od-lb-viewport">
          <div ref={trackRef} className="od-lb-track">
            {slides.map((i, pos) => {
              const current = i === index && (slides.length === 1 || pos === 1);
              return (
                <div key={i + "-" + (count < 3 ? pos : "")} className="od-lb-slide" aria-hidden={current ? undefined : "true"}>
                  <img className="od-lb-img" src={srcFor(i)} alt={current ? altFor2(i) : ""} decoding="async" fetchPriority={current ? "high" : "low"} />
                </div>
              );
            })}
          </div>
          </div>
          {count > 1 ? (
            <button type="button" className="od-arrow od-arrow-lb od-lb-next" aria-label="Next photograph" onClick={() => onIndex((index + 1) % count)} style={arrow}>
              <LbChevron dir="right" />
            </button>
          ) : null}
        </div>
        <div className="od-lb-bottom">
          <span className="od-lb-caption">{altFor2(index)}</span>
          {count > 1 && !clean ? (
            <div ref={thumbsRef} className="od-lb-thumbs" role="tablist" aria-label="Photographs in this project">
              {/* Leading/trailing clones create the infinite-loop illusion (see the
                  index effect above) — hidden from a11y/tab order since the real
                  thumbs already cover every photo. */}
              <button type="button" tabIndex={-1} aria-hidden="true" className="od-lb-thumb" onClick={() => onIndex(count - 1)} style={{ backgroundImage: "url(" + srcFor(count - 1) + ")" }} />
              {(srcs || names).map((n, i) => (
                <button key={i} type="button" role="tab" aria-selected={i === index} aria-label={altFor2(i)} className={"od-lb-thumb" + (i === index ? " is-current" : "")} onClick={() => onIndex(i)} style={{ backgroundImage: "url(" + srcFor(i) + ")" }} />
              ))}
              <button type="button" tabIndex={-1} aria-hidden="true" className="od-lb-thumb" onClick={() => onIndex(0)} style={{ backgroundImage: "url(" + srcFor(0) + ")" }} />
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

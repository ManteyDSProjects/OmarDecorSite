"use client";
import { useState } from "react";
import { odBand, odH2 } from "@/lib/styles";
import { ReviewCard } from "./Markers";
import Carousel from "./Carousel";
import { REVIEWS } from "@/lib/content";

export default function ReviewsSection({ google }) {
  const pages = Math.ceil(REVIEWS.length / 3);
  const [page, setPage] = useState(0);
  const shown = REVIEWS.slice(page * 3, page * 3 + 3);
  return (
    <div className="od-band od-section-pad" style={{ ...odBand, background: "var(--od-off-white)", display: "flex", flexDirection: "column", gap: 40, padding: 48, alignItems: "center" }}>
      <h2 className="od-h2" style={odH2}>Client Reviews</h2>
      <div className="od-reviews" style={{ minHeight: 237, display: "flex", gap: 20, alignSelf: "stretch", flexShrink: 0, alignItems: "stretch" }}>
        {shown.map(([q, n, l, r], i) => (
          <ReviewCard key={n + i} quote={q} name={n} location={l} rating={r} className={i === 0 ? "od-review-primary" : "od-review-extra"} style={{ flex: 1, width: "auto", height: "auto", minHeight: 237 }} />
        ))}
      </div>
      <div className="od-steps-carousel" style={{ display: "flex", justifyContent: "center" }}>
        <Carousel index={page} count={pages} onChange={(n) => setPage(((n % pages) + pages) % pages)} labels={Array.from({ length: pages }, (_, i) => "Reviews " + (i + 1))} />
      </div>
      {google ? (
        <a className="od-inline-link" href="#" aria-disabled="true" onClick={(e) => e.preventDefault()} style={{ alignSelf: "stretch", fontFamily: "var(--font-text)", fontWeight: 500, fontSize: 16, lineHeight: 1, textAlign: "center", color: "var(--od-navy)", textDecoration: "underline", cursor: "default" }}>
          See Our Google Reviews &rarr;
        </a>
      ) : null}
    </div>
  );
}

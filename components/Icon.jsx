"use client";
import { ICONS } from "@/lib/icons";

export default function Icon({ name = "check", size = 24, color = "currentColor", title, style, ...rest }) {
  const g = ICONS[name];
  if (!g) return null;
  return (
    <svg
      {...rest}
      viewBox={g.viewBox}
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
      aria-label={title}
      style={{ display: "block", color, overflow: "visible", ...style }}
      dangerouslySetInnerHTML={{ __html: g.body }}
    />
  );
}

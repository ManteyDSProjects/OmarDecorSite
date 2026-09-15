"use client";
import { ICONS } from "@/lib/icons";

export default function Icon({ name = "check", size, color = "currentColor", title, style, ...rest }) {
  const g = ICONS[name];
  if (!g) return null;
  // No numeric size: the icon scales off its own font-size (inherited from
  // whatever text sits next to it) at 2.2x, instead of a fixed pixel value.
  const dim = size != null ? size : "2.2em";
  return (
    <svg
      {...rest}
      viewBox={g.viewBox}
      width={dim}
      height={dim}
      role={title ? "img" : "presentation"}
      aria-label={title}
      style={{ display: "block", color, overflow: "visible", flexShrink: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: g.body }}
    />
  );
}

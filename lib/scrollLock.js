// iOS Safari ignores `overflow:hidden` on <body> for background touch-scroll -- the page
// behind a modal/drawer still scrolls under the user's finger. Pin the body at its current
// scroll offset instead (the standard iOS-safe technique), and restore it on unlock. A
// counter supports the drawer and a lightbox both being "open" without one unlock clobbering
// the other.
let savedY = 0;
let lockCount = 0;

export function lockBodyScroll() {
  if (lockCount++ > 0) return;
  savedY = window.scrollY;
  const s = document.body.style;
  s.position = "fixed";
  s.top = -savedY + "px";
  s.left = "0";
  s.right = "0";
  s.width = "100%";
}

export function unlockBodyScroll() {
  if (lockCount === 0 || --lockCount > 0) return;
  const s = document.body.style;
  s.position = "";
  s.top = "";
  s.left = "";
  s.right = "";
  s.width = "";
  window.scrollTo(0, savedY);
}

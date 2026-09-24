import "@/styles/tokens.css";
import "@/styles/site.css";

// viewportFit:"cover" lets the page draw under the iPhone notch/Dynamic Island and home
// indicator instead of leaving black bars there, which is also what makes the
// env(safe-area-inset-*) values used in site.css report anything other than 0. Zoom is left
// enabled (no maximumScale/userScalable) -- restricting pinch-zoom is an accessibility issue,
// not a fix.
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata = {
  metadataBase: new URL("https://omardecor.co.uk"),
  title: { default: "Omar Decor", template: "%s" },
  description: "Reliable handyman and home improvement services across Central London and surrounding areas.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preload" href="/assets/fonts/Fraunces-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

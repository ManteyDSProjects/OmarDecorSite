import "@/styles/tokens.css";
import "@/styles/site.css";

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
      <body>{children}</body>
    </html>
  );
}

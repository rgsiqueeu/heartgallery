import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anton = localFont({
  src: "../../public/fonts/anton.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

const fraunces = localFont({
  src: "../../public/fonts/fraunces.woff2",
  variable: "--font-fraunces",
  display: "swap",
});

const archivo = localFont({
  src: "../../public/fonts/archivo.woff2",
  variable: "--font-archivo",
  display: "swap",
});

const grotesk = localFont({
  src: "../../public/fonts/space-grotesk.woff2",
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heartgallery.siklab.me"),
  title: "HeartGallery Tattoo & Piercing — Porto",
  description:
    "Estúdio de tatuagem e piercing no coração do Porto, desde 2010. Tatuadores residentes Paulo Rui & Marcus, piercings com joalharia premium, walk-ins bem-vindos. Marcações por DM ou email.",
  keywords: [
    "tattoo",
    "tatuagem",
    "piercing",
    "Porto",
    "tattoo Porto",
    "tattoo studio",
    "walk-ins",
    "HeartGallery",
    "Paulo Rui",
  ],
  authors: [{ name: "HeartGallery Tattoo Piercing" }],
  openGraph: {
    title: "HeartGallery Tattoo & Piercing — Porto",
    description:
      "Tatuagem e piercing no coração do Porto, desde 2010. Walk-ins bem-vindos.",
    type: "website",
    locale: "pt_PT",
    images: [{ url: "/images/hg/s-02.webp", width: 1400, height: 787 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${fraunces.variable} ${archivo.variable} ${grotesk.variable} antialiased bg-ink text-bone noise`}
      >
        {children}
      </body>
    </html>
  );
}

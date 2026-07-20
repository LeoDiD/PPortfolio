import type { Metadata } from "next";
import { Press_Start_2P, Silkscreen } from "next/font/google";
import "./globals.css";

const pixelHeading = Press_Start_2P({
  variable: "--font-pixel-heading",
  weight: "400",
  subsets: ["latin"],
});

const pixelBody = Silkscreen({
  variable: "--font-pixel-body",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leovi Garcia | Student Developer",
  description:
    "Minimalist, pixel-themed portfolio website of Leovi Garcia, a 4th-year student developer building modern web & mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelHeading.variable} ${pixelBody.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

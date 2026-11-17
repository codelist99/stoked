import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "STOKED Check-In",
  description: "Notice the drift and choose connection.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="topbar"><Link className="brand" href="/"><span className="brandMark">S</span> STOKED</Link><span className="privacy">Private by design</span></header>{children}</body></html>;
}

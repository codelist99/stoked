import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import "./header.css";

export const metadata: Metadata = {
  title: "STOKED Check-In",
  description: "Notice the drift and choose connection.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="topbar"><Link className="brand" href="/" aria-label="STOKED home"><Image className="brandLogo" src="/stoked-logo.png" alt="STOKED" width={300} height={100} priority /></Link><span className="privacy">Private by design</span></header>{children}</body></html>;
}

import type { Metadata } from "next";
import "./globals.css";
import "@/styles/theme.css";
import GsapSetup from "./gsap-setup";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Sriram's IAS - Penacea",
  description: "40 Years of Excellence in Shaping Officers. Start Your UPSC CSE Journey with Sriram's IAS.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GsapSetup />
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

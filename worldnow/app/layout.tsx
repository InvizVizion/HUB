import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldNow - Real-time Global Events & Conflicts",
  description: "Interactive world map showing real-time conflicts, news, and global events with stunning visualizations",
  keywords: ["world news", "conflicts", "global events", "real-time", "interactive map"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

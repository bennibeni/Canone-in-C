import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brani al pianoforte — impara a suonarli",
  description: "App didattica per imparare brani al pianoforte divisi in parti: note che scendono, spartito, diteggiature e video sincronizzati.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}

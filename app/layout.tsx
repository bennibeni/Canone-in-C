import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canone in Do — impara a suonarlo",
  description: "App didattica per imparare il Canone di Pachelbel al pianoforte, diviso in quattro parti.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}

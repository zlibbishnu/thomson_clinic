import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Thomson Clinic | Mental Health & Neuroscience",
    template: "%s | Thomson Clinic",
  },

  description:
    "Thomson Clinic is a mental health, neuroscience and multispecialty healthcare platform connecting patients with trusted doctors and services.",

  keywords: [
    "Thomson Clinic",
    "mental health",
    "psychiatry",
    "neuroscience",
    "doctor consultation",
    "online consultation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
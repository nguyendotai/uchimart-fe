import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import NavService from "./components/NavService";
import FadeIn from "./components/Animation/FadeIn";
import StaggerFadeIn from "./components/Animation/StaggerFadeIn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-800">
        {/* Header */}
          <header className="fixed top-0 left-0 right-0 px-4 bg-[efefefef] z-100">
            <Header></Header>
          </header>

          <nav className="mt-[121px] px-2 bg-[efefefef]">
            <NavService></NavService>
          </nav>

        {/* Main */}
        <main className="flex-1 container mx-auto py-2 bg-[efefefef]">
          <StaggerFadeIn>
            {children}
          </StaggerFadeIn>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow p-4"></footer>
      </body>
    </html>
  );
}

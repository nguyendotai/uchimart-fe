"use client";
import "./globals.css";
import Header from "./components/layout/Header";
import NavService from "./components/layout/NavService";
import { createPortal } from "react-dom";
import { ReduxProvider } from "./components/layout/ReduxProvider";
import Footer from "./components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dropdownRoot =
    typeof window !== "undefined"
      ? document.getElementById("dropdown-root")
      : null;

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-800">
        <ReduxProvider>
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 px-4 bg-[efefefef] z-40">
            <Header />
          </header>

          <nav className="fixed top-[120px] left-0 right-0 px-2 bg-[#efefefef] z-90">
            <NavService />
          </nav>

          {/* Main content */}
          <main className="flex-1 container mx-auto pt-[180px] py-2 bg-[#efefefef] overflow-visible">
            {children}
          </main>

          {/* Dropdown portal */}
          <div id="dropdown-root" className="absolute z-30"></div>

          {/* Footer */}
          <footer className="bg-white shadow p-4">
            <Footer />
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}

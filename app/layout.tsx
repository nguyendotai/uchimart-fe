"use client";
import "./globals.css";
import Header from "./components/layout/Header";
import NavService from "./components/layout/NavService";
import { ReduxProvider } from "./components/layout/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-800">
        <ReduxProvider>
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 px-4 bg-[efefefef] z-100">
            <Header></Header>
          </header>

          <nav className="fixed top-[120px] left-0 right-0 px-2 bg-[#efefefef] z-90">
            <NavService />
          </nav>

          {/* Main */}
          <main className="flex-1 container mx-auto pt-[185px] py-2 bg-[#efefefef]">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white shadow p-4"></footer>
        </ReduxProvider>
      </body>
    </html>
  );
}

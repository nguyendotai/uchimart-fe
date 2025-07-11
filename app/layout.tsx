"use client";
import "./globals.css";
import Header from "./components/layout/Header";
import { ReduxProvider } from "./components/layout/ReduxProvider";

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
          <header className=" px-4 bg-[efefefef] z-50">
            <Header />
          </header>

          {/* Main content */}
          <main className="flex-1 container mx-auto py-2 bg-[#efefefef] overflow-visible">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white shadow p-4"></footer>
        </ReduxProvider>
        {/* Dropdown portal */}
        <div id="dropdown-root"></div>
      </body>
    </html>
  );
}

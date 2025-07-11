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
      <body className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-800 overflow-x-hidden">
        <ReduxProvider>
          {/* Header */}
          <header className="bg-[#efefef] z-50">
            <Header />
          </header>

          {/* Main content */}
          <main className="w-full max-w-[1720px] mx-auto px-2">{children}</main>

          {/* Footer */}
          <footer className="bg-white shadow p-4 w-full max-w-[1440px] mx-auto px-2"></footer>
        </ReduxProvider>

        <div id="dropdown-root"></div>
      </body>
    </html>
  );
}

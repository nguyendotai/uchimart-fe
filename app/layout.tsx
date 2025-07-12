"use client";
import "./globals.css";
import Header from "./components/layout/Header";
import { ReduxProvider } from "./components/layout/ReduxProvider";
import Footer from "./components/layout/Footer";
import ShowSidebar from "./components/layout/ShowSidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hasSidebar =
    pathname === "/" ||
    pathname === "/product" ||
    pathname === "/search" ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search");;

  return (
    <html lang="en">
      <body className="font-sans bg-gray-100 text-gray-800 overflow-x-hidden">
        <ReduxProvider>
          {/* Header */}
          <Header />

          <div className="flex">
            {/* Sidebar cố định bên trái */}
            {hasSidebar && (
              <aside className="hidden lg:block w-[250px] fixed top-0 left-0 bottom-0 z-40 overflow-y-auto bg-white shadow">
                <ShowSidebar />
              </aside>
            )}

            {/* Nội dung chính dịch sang phải nếu có sidebar */}
            <main
              className={`flex-1 min-h-screen pt-[120px] px-4 ${
                hasSidebar ? "ml-[250px]" : ""
              }`}
            >
              <div
                className={`mx-auto ${
                  hasSidebar ? "max-w-[1300px]" : "max-w-[1600px]"
                }`}
              >
                {children}
                <Footer />
              </div>
            </main>
          </div>

          {/* Portal cho dropdown */}
          <div id="dropdown-root"></div>
        </ReduxProvider>
      </body>
    </html>
  );
}

"use client";
import "./globals.css";

// 🧩 Providers
import { ReduxProvider } from "./components/layout/ReduxProvider";
import I18nProvider from "./components/layout/I18nProvider";

// 🌐 Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ShowSidebar from "./components/layout/ShowSidebar";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import { usePathname } from "next/navigation";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastWrapper from "./components/ui/ToastWrapper";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";
import "react-toastify/dist/ReactToastify.css";

// 🔍 Next.js hooks
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
    pathname.startsWith("/search");

  return (
    <html lang="en">
      <body className="font-sans bg-gray-100 text-gray-800 overflow-x-hidden">
        <ReduxProvider>
          <I18nProvider>
            <ToastWrapper />
            {/* Header */}
            <Header />

            <div className="flex">
              {/* Sidebar cố định bên trái */}
              {hasSidebar && (
                <aside className="hidden lg:block w-[250px] fixed top-0 left-0 bottom-0 h-screen z-40 overflow-y-auto bg-white shadow">
                  <ShowSidebar />
                </aside>
              )}

              {/* Nội dung chính dịch sang phải nếu có sidebar */}
              <main
                className={`flex-1 min-h-screen pt-[120px] px-4 ${
                  hasSidebar ? "ml-[250px]" : ""
                }`}
              >
                {/* Nội dung chính */}
                <div
                  className={`mx-auto ${
                    hasSidebar ? "max-w-[1300px]" : "max-w-[1600px]"
                  }`}
                >
                  {children}
                </div>
              </main>
            </div>
            <div
              className={`${
                hasSidebar ? "ml-[322px] max-w-[1300px] mx-auto" : "w-full"
              }`}
            >
              <Footer />
            </div>

            {/* Portal cho dropdown */}
            <div id="dropdown-root"></div>
            <div id="sidebar-hover-root" />
            <LanguageSwitcher />
            <ScrollToTopButton />
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

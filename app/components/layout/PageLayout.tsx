"use client";

import { ReduxProvider } from "./ReduxProvider";
import I18nProvider from "./I18nProvider";
import ToastWrapper from "../ui/ToastWrapper";
import Header from "./Header";
import Footer from "./Footer";
import ShowSidebar from "./ShowSidebar";
import ScrollToTopButton from "./ScrollToTopButton";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { usePathname } from "next/navigation";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hasSidebar =
    pathname === "/" ||
    pathname === "/product" ||
    pathname === "/search" ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search");

  const isAccountPage = pathname.startsWith("/account");

  return (
    <ReduxProvider>
      <I18nProvider>
        <ToastWrapper />
        <Header />

        <div className="flex">
          {/* Sidebar: Chỉ hiện ở màn hình lớn */}
          {hasSidebar && (
            <aside className="hidden lg:block w-[250px] fixed top-0 left-0 bottom-0 h-screen z-40 overflow-y-auto bg-white shadow">
              <ShowSidebar />
            </aside>
          )}

          {/* Main content */}
          <main
            className={`flex-1 min-h-screen pt-[120px] px-4 md:px-6 ${
              hasSidebar ? "lg:ml-[250px]" : ""
            } ${isAccountPage ? "bg-[#edf2f78a]" : "bg-white"}`}
          >
            <div
              className={`mx-auto w-full ${
                hasSidebar ? "lg:max-w-[1300px]" : "lg:max-w-[1600px]"
              }`}
            >
              {children}
            </div>
          </main>
        </div>

        {/* Footer */}
        <div
          className={`w-full ${
            hasSidebar ? "lg:ml-[250px]" : ""
          } lg:max-w-[1300px] mx-auto px-4 sm:px-6`}
        >
          <Footer />
        </div>

        {/* Portals */}
        <div id="dropdown-root" />
        <div id="sidebar-hover-root" />
        <LanguageSwitcher />
        <ScrollToTopButton />
      </I18nProvider>
    </ReduxProvider>
  );
}

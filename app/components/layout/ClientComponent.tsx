// app/components/layout/PageLayout.tsx
"use client";

import { useState, useEffect } from "react";
import { ReduxProvider } from "./ReduxProvider";
import I18nProvider from "./I18nProvider";
import ToastWrapper from "../ui/ToastWrapper";
import PageLoader from "../ui/PageLoader";
import Header from "./Header";
import Footer from "./Footer";
import ShowSidebar from "./ShowSidebar";
import ScrollToTopButton from "./ScrollToTopButton";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { usePathname } from "next/navigation";
import GlobalRouteLoader from "../ui/GlobalRouteLoader";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const hasSidebar =
    pathname === "/" ||
    pathname === "/product" ||
    pathname === "/search" ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <ReduxProvider>
      <I18nProvider>
        <GlobalRouteLoader />
        <ToastWrapper />
        <Header />

        <div className="flex">
          {hasSidebar && (
            <aside className="hidden lg:block w-[250px] fixed top-0 left-0 bottom-0 h-screen z-40 overflow-y-auto bg-white shadow">
              <ShowSidebar />
            </aside>
          )}

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

        <div id="dropdown-root" />
        <div id="sidebar-hover-root" />
        <LanguageSwitcher />
        <ScrollToTopButton />
      </I18nProvider>
    </ReduxProvider>
  );
}

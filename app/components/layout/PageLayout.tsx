"use client";

import { ReduxProvider } from "./ReduxProvider";
import I18nProvider from "./I18nProvider";
import ToastWrapper from "../ui/ToastWrapper";
import Header from "./Header";
import Footer from "./Footer";
import ShowSidebar from "./ShowSidebar";
import ScrollToTopButton from "./ScrollToTopButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaTags, FaClipboardList, FaStore, FaUser } from "react-icons/fa";

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
          {/* Sidebar desktop */}
          {hasSidebar && (
            <aside className="hidden lg:block w-[250px] fixed top-0 left-0 bottom-0 h-screen z-40 overflow-y-auto bg-white shadow">
              <ShowSidebar />
            </aside>
          )}

          {/* Main content */}
          <main
            className={`flex-1 min-h-screen pt-[80px] md:pt-[120px] pb-[60px] px-2 sm:px-4 md:px-6 overflow-x-hidden
              ${hasSidebar ? "lg:ml-[250px]" : ""}
              ${isAccountPage ? "bg-[#edf2f78a]" : "bg-white"}`}
          >
            <div
              className={`w-full mx-auto
                ${hasSidebar ? "lg:max-w-[1300px]" : "lg:max-w-[1600px]"}`}
            >
              {children}
            </div>
          </main>
        </div>

        {/* Footer desktop */}
        <div
          className={`w-full ${hasSidebar ? "lg:ml-[250px]" : ""} lg:max-w-[1300px] mx-auto px-4 sm:px-6 hidden md:block`}
        >
          <Footer />
        </div>

        {/* Bottom nav mobile */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around py-2 md:hidden">
          <Link href="/sale" className="flex flex-col items-center text-[#921573] text-sm">
            <FaTags size={20} />
            <span>Khuyến mãi</span>
          </Link>
          <Link href="/posts" className="flex flex-col items-center text-[#921573] text-sm">
            <FaClipboardList size={20} />
            <span>Bài viết</span>
          </Link>
          <Link href="/" className="flex flex-col items-center text-[#921573] text-sm">
            <FaStore size={20} />
            <span>Cửa hàng</span>
          </Link>
          <Link href="/account" className="flex flex-col items-center text-[#921573] text-sm">
            <FaUser size={20} />
            <span>Tài khoản</span>
          </Link>
        </nav>

        {/* Portals */}
        <div id="dropdown-root" />
        <div id="sidebar-hover-root" />
        <ScrollToTopButton />
      </I18nProvider>
    </ReduxProvider>
  );
}

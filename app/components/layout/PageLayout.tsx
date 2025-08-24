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
import {
  FaTags,
  FaClipboardList,
  FaStore,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { AddressProvider } from "../../Address-context/page";

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
    pathname === "/brand" ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search/") ||
    pathname.startsWith("/brand/");

  const isAccountPage = pathname.startsWith("/account");

  return (
    <ReduxProvider>
      <I18nProvider>
        <ToastWrapper />
        <AddressProvider>
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
              className={`flex-1 min-h-screen pt-[110px] md:pt-[120px] pb-[60px] px-2 sm:px-4 md:px-6 overflow-x-hidden
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
            className={`w-full ${
              hasSidebar ? "lg:ml-[180px] lg:max-w-[1000px]" : ""
            } lg:max-w-[1600px] mx-auto hidden md:block`}
          >
            <div className="border-t border-gray-200">
              <Footer />
            </div>
          </div>

          {/* Bottom nav mobile */}
          <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 md:hidden">
            <div className="grid grid-cols-5 items-center relative">
              {/* Left items */}
              <Link
                href="/sale"
                className="flex flex-col items-center text-[#921573] text-sm py-2"
              >
                <FaTags size={20} />
                <span>Khuyến mãi</span>
              </Link>

              <Link
                href="/posts"
                className="flex flex-col items-center text-[#921573] text-sm py-2"
              >
                <FaClipboardList size={20} />
                <span>Bài viết</span>
              </Link>

              {/* Middle notch + home */}
              <div className="relative flex justify-center items-center">
                {/* SVG notch */}
                <div className="absolute -top-4 w-full h-12 pointer-events-none">
                  <svg
                    viewBox="0 0 100 50"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M0,0 C25,80 75,80 100,0 L100,50 L0,50 Z"
                      fill="#0000"
                    />
                  </svg>
                </div>
                {/* Floating home */}
                <div className="absolute -top-10 bg-white rounded-full p-3 shadow-lg">
                  <Link
                    href="/"
                    className="flex flex-col items-center text-[#921573]"
                  >
                    <FaHome size={24} />
                  </Link>
                </div>
              </div>

              {/* Right items */}
              <Link
                href="/product"
                className="flex flex-col items-center text-[#921573] text-sm py-2"
              >
                <FaStore size={20} />
                <span>Cửa hàng</span>
              </Link>

              <Link
                href="/account"
                className="flex flex-col items-center text-[#921573] text-sm py-2"
              >
                <FaUser size={20} />
                <span>Tài khoản</span>
              </Link>
            </div>
          </nav>

          {/* Portals */}
          <div id="dropdown-root" />
          <div id="sidebar-hover-root" />
        </AddressProvider>
        <ScrollToTopButton />
      </I18nProvider>
    </ReduxProvider>
  );
}

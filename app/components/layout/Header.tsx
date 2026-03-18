"use client";

import React, { useEffect, useState } from "react";

import { AddressItem } from "../../types/address";
import { useAddress } from "@/app/Address-context/AddressProvider";
// 🔍 Functional Components
import Search from "../ui/Search";
import UserAccount from "../ui/UserAccount";
import Cart from "../ui/Cart";

// 🖼️ Next.js Modules
import Image from "next/image";
import Link from "next/link";

// 🌐 Quốc tế hóa (i18n)
import { useTranslation } from "react-i18next";

// 🎨 Style & Utility
import clsx from "clsx";

// 🧩 Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { RiBankCardFill } from "react-icons/ri";
import { HiMiniPercentBadge } from "react-icons/hi2";
import { MdArticle } from "react-icons/md";

const Header = () => {
  const { defaultAddress } = useAddress();
  const [showHeader, setShowHeader] = useState(true);

  const { t } = useTranslation();
  // const [lastScrollY, setLastScrollY] = useState(0);

  const formatAddress = (addr: AddressItem) => {
    if (!addr.ward || !addr.district || !addr.province) return "";
    return `${addr.address_line}, P.${addr.ward.name}, Q.${addr.district.name}, TP.${addr.province.name}`;
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (diff > 10) {
        // Cuộn xuống: ẩn header
        setShowHeader(false);
      } else if (diff < -5 || currentScrollY < 10) {
        // Cuộn lên nhẹ hoặc đang ở đầu trang: hiện header
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 w-full z-50 bg-white shadow transition-all duration-300 ease-in-out",
        {
          "-translate-y-full opacity-0 pointer-events-none": !showHeader,
          "translate-y-0 opacity-100": showHeader,
        }
      )}
    >
      {/* Mobile layout */}
      <div className="sm:hidden w-full bg-white">
        {/* Hàng 1: Logo + Địa chỉ + Voucher + Cart */}
        <div className="flex items-center justify-between px-2 py-2 gap-2">
          {/* Logo */}
          <Link href="/" className="relative w-[65px] h-[50px] shrink-0">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </Link>

          {/* Địa chỉ nhận hàng */}
          <div className="flex items-center bg-[#f3e5f5] rounded-full px-2 py-1 gap-1 flex-1 min-w-0">
            <FaMapMarkerAlt className="text-[#921573] text-base shrink-0" />
            <span className="text-xs font-medium text-gray-800 truncate">
              P.Thạnh Xuân, Q.12
            </span>
          </div>

          {/* Voucher */}
          <Link href="/voucher" className="p-1 shrink-0">
            <HiMiniPercentBadge className="text-xl text-[#FFA629]" />
          </Link>

          {/* Cart */}
          <div className="shrink-0">
            <Cart />
          </div>
        </div>

        {/* Hàng 2: Search full width */}
        <div className="px-2 pb-2">
          <Search isMobile />
        </div>
      </div>

      {/* --- Tablet & Desktop layout (≥768px) --- */}
      <div className="hidden sm:flex items-center justify-around gap-6 p-2">
        {/* Logo - 20% */}
        <Link href="/" className="relative h-[60px] basis-[20%]">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </Link>

        {/* Search - 40% */}
        <div className="basis-[40%]">
          <Search />
        </div>
        {/* Bài viết + User + Cart + Location - 40% */}
        <div className="flex items-center gap-4 basis-[40%] justify-between">
          {/* Bài viết */}
          <Link
            href="/posts"
            className="flex items-center gap-2 text-gray-700 h-10 border-r border-gray-300 pr-4"
          >
            <div className="bg-[#f3e5f5] rounded-full p-2">
              <MdArticle className="text-2xl shrink-0 text-[#921573]" />
            </div>
            <span className="text-sm font-medium truncate">{t("posts")}</span>
          </Link>

          {/* UserAccount */}
          <div className="border-r border-gray-300 pr-4">
            <UserAccount />
          </div>

          {/* Cart */}
          <div className="border-r border-gray-300 pr-4">
            <Cart />
          </div>

          {/* Location - không cần border phải */}
          <div className="flex items-center bg-[#f3e5f5] rounded-full px-3 py-1 gap-2">
            <FaMapMarkerAlt className="text-[#921573] text-xl" />
            <div className="flex flex-col text-xs">
              <span className="text-[#921573] font-semibold">Giao hàng</span>
              <span className="text-gray-800 font-medium whitespace-nowrap">
                {/* P.Thạnh Xuân, Q.12, TP.Hồ Chí Minh */}
                {!localStorage.getItem("token")
                  ? "Vui lòng đăng nhập"
                  : defaultAddress
                  ? formatAddress(defaultAddress)
                  : "Chưa có địa chỉ "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex text-sm justify-between items-center rounded-b-lg bg-white border-t-2 border-gray-200 px-4 py-2">
        <nav className="ml-12 flex justify-start items-center gap-4">
          <a href="/account" className="flex items-center font-medium">
            <span style={{ color: "#FFA629" }}>Cam kết</span>
          </a>
          <Link
            href="/policy/chinh-sach-bao-mat"
            className="flex items-center font-medium"
          >
            <HiBadgeCheck
              className="mr-1 text-xl"
              style={{ color: "#FFA629" }}
            />
            <span>Chính sách</span>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/settings" className="flex items-center font-medium">
            <RiBankCardFill
              className="mr-1 text-xl"
              style={{ color: "#FFA629" }}
            />
            <span>Liên hệ</span>
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/website-reviews"
            className="flex items-center font-medium"
          >
            <HiMiniPercentBadge
              className="mr-1 text-xl"
              style={{ color: "#FFA629" }}
            />
            <span>Đánh giá Website</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;

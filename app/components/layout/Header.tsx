"use client";
import React, { useEffect, useState } from "react";
import Search from "../ui/Search";
import Image from "next/image";
import UserAccount from "../ui/UserAccount";
import Cart from "../ui/Cart";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { RiBankCardFill } from "react-icons/ri";
import { HiMiniPercentBadge } from "react-icons/hi2";
import MainNav from "../ui/MainNav";
import { mainNavItems } from "@/public/Data/nav";
import Link from "next/link";
import clsx from "clsx";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Kéo xuống
        setShowHeader(false);
      } else {
        // Kéo lên
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={clsx(
        "container mx-auto rounded-t-md bg-white transition-transform duration-300",
        {
          "transform -translate-y-full": !showHeader,
          "transform translate-y-0": showHeader,
        }
      )}
    >
      {/* --- Mobile layout (<768px) --- */}
      <div className="flex sm:hidden items-center justify-between py-3">
        <Link href="/" className="relative w-[100px] h-[40px]">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </Link>

        <div className="flex gap-4 items-center">
          <UserAccount />
          <Cart />
        </div>
      </div>

      {/* --- Tablet & Desktop layout (≥768px) --- */}
      <div className="hidden sm:flex justify-between items-center pt-4 pb-2 gap-4">
        <Link className="relative w-full h-[60px] flex-[2]" href="/">
          <Image src="/logo.png" alt="Ảnh" fill className="object-contain" />
        </Link>

        <div className="flex-[5] flex flex-col gap-6">
          <Search />
          <MainNav items={mainNavItems} />
        </div>

        <div className="flex-[2] flex flex-col gap-2 px-2">
          <div className="flex justify-around items-center pr-4">
            <div className="flex-[6]">
              <UserAccount />
            </div>

            <div className="w-px h-6 bg-gray-300" />

            <div className="flex-[2]">
              <Cart />
            </div>
          </div>

          <div className="w-[97%] h-px bg-gray-300 mx-auto" />

          <div className="flex items-center bg-[#f3e5f5] rounded-full px-2 py-1 gap-2 max-w-[250px]">
            <FaMapMarkerAlt className="text-[#921573] text-2xl" />
            <div className="flex flex-col text-xs">
              <span className="text-[#921573] font-semibold">Giao hàng</span>
              <span className="text-gray-800 font-medium">
                P.Thạnh Xuân, Q.12, TP.Hồ Chí Minh
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* --- Dịch vụ nav (gộp vào header) --- */}
      <div className="text-sm flex justify-between items-center rounded-b-lg bg-white border-t-2 border-gray-200 px-4 py-2">
        <nav className="flex justify-start items-center gap-4">
          <a href="/account" className="flex items-center font-medium">
            <span style={{ color: "#FFA629" }}>Cam kết</span>
          </a>
          <a href="/history" className="flex items-center font-medium">
            <HiBadgeCheck
              className="mr-1 text-xl"
              style={{ color: "#FFA629" }}
            />
            <span>Chính sách</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="/settings" className="flex items-center font-medium">
            <RiBankCardFill
              className="mr-1 text-xl"
              style={{ color: "#FFA629" }}
            />
            <span>30 ngày đổi trả</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="/settings" className="flex items-center font-medium">
            <HiMiniPercentBadge
              className="mr-1 text-xl"
              style={{ color: "#FFA629" }}
            />
            <span>Giá siêu rẻ</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Header;

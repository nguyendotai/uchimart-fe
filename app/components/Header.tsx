import React from "react";
import Search from "./UI/Search";
import Image from "next/image";
import UserAccount from "./UI/UserAccount";
import Cart from "./UI/Cart";
import { FaMapMarkerAlt } from "react-icons/fa";
import MainNav from "./UI/MainNav";
import { mainNavItems } from "../../public/Data/nav";

const Header = () => {
  return (
    <div className="container mx-auto flex justify-between items-center pt-4 pb-2 gap-4 rounded-t-md bg-white">
      {/* Logo */}
      <a className="flex-[2] relative w-full h-[60px]" href="/">
        <Image src="/logo.png" alt="Ảnh" fill className="w-full" />
      </a>

      {/* Search + Nav */}
      <div className="flex-[5] flex flex-col gap-6">
        <Search />
        <MainNav items={mainNavItems} />
      </div>

      {/* Account + Cart + Follow Info */}
      <div className="flex-[2] flex flex-col h-full gap-2 px-2">
        {/* UserAccount + Cart */}
        <div className="flex justify-around items-center flex-[7] pr-4">
          <div className="flex-[6]">
            <UserAccount />
          </div>

          <div className="w-px h-6 bg-gray-300 " />

          <div className="flex-[2]">
            <Cart />
          </div>
        </div>

        <div className="w-[97%] h-px bg-gray-300 mx-auto" />

        {/* Follow info -> Giao hàng */}
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
  );
};

export default Header;

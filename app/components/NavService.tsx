"use client"
import React from "react";
import { FaUser, FaHistory, FaCog } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { RiBankCardFill } from "react-icons/ri";
import { HiMiniPercentBadge } from "react-icons/hi2";

const NavService = () => {
  return (
    <div className="container mx-auto text-sm flex justify-between items-center p-4 rounded-b-lg bg-white border-t-2 border-gray-200">
      <nav className="flex justify-start items-center gap-4">
        <a href="/account" className="flex items-center font-medium">
          <span style={{ color: "#FFA629" }}>Cam kết</span>
        </a>

        <a href="/history" className="flex items-center font-medium">
          <HiBadgeCheck className="mr-1 text-xl" style={{ color: "#FFA629" }} />
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
  );
};

export default NavService;

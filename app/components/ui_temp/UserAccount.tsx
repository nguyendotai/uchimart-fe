"use client";
import { useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { User } from "@/app/types/User";

export default function UserAccount() {
  const [user, setUser] = useState<User | null>(null);

  const fakeLogin = () => {
    setUser({
      name: "Nguyễn Đỗ Tài",
      email: "nguyendotai11@gmail.com",
      avatar: "/1743665864604-483395787.jpg",
    });
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer w-[160px] overflow-hidden"
      onClick={fakeLogin}
    >
      {!user ? (
        <div className="flex items-center gap-2 text-gray-700 w-full h-10">
          {/* Icon trong nền tròn tím nhạt */}
          <div className="bg-[#f3e5f5] rounded-full p-2">
            <FaUser className="text-2xl shrink-0 text-[#921573]" />
          </div>

          <span className="text-sm font-medium truncate">Đăng nhập</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 w-full min-w-0">
          <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-300 shrink-0">
            <Image
              src={user.avatar}
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold truncate">{user.name}</span>
            <span className="text-xs text-gray-500 truncate">{user.email}</span>
          </div>
        </div>
      )}
    </div>
  );
}

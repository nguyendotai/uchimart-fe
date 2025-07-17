"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { User } from "@/app/types/User";
import Link from "next/link";

export default function UserAccount() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex items-center gap-3 cursor-pointer overflow-hidden">
      {!user ? (
        <Link
          href="/login"
          className="flex items-center gap-2 text-gray-700 w-full h-10"
        >
          <div className="bg-[#f3e5f5] rounded-full p-2">
            <FaUser className="text-2xl shrink-0 text-[#921573]" />
          </div>
          <span className="text-sm font-medium truncate">Đăng nhập</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3 w-full min-w-0">
          <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-300 shrink-0">
            <Link href="/account">
              <Image
                src={user.avatar}
                alt="User avatar"
                fill
                className="object-cover"
              />
            </Link>
          </div>
          <div className="flex flex-col overflow-hidden">
            <Link href="/account" className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">{user.name}</span>
              <span className="text-xs text-gray-500 truncate">{user.email}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

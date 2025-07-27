"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { User } from "@/app/types/User";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function UserAccount() {
  const [user, setUser] = useState<User | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://127.0.0.1:8000/api/users/${parsedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
        });

        if (!res.ok) {
          const text = await res.text(); // để hiển thị thông báo lỗi
          console.error("Lỗi phản hồi từ server:", res.status, text);
          return;
        }

        const latestUser = await res.json();
        setUser(latestUser);
        localStorage.setItem("user", JSON.stringify(latestUser));
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
      }
    };


    // Gọi lần đầu
    fetchUser();

    // Gọi lại mỗi 5s
    const interval = setInterval(fetchUser, 3000);
    return () => clearInterval(interval);
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
          <span className="text-sm font-medium truncate">{t("login")}</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3 w-full min-w-0">
          <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-300 shrink-0">
            <Link href="/account">
              <Image
                src={user.avatar}
                alt="User avatar"
                fill
                // width={100}
                // height={100}
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

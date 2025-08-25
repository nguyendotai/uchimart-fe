"use client";
import { User } from "@/app/types/User";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronRight, FaClipboardList, FaTicketAlt } from "react-icons/fa";
import { IoCard, IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineBook, MdOutlineSecurity } from "react-icons/md";

import { useDispatch } from "react-redux";
import { resetCart } from "@/store/slices/cartSlice"; // import action resetCart

// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import SmolModel from "../components/Animation/smol/components/smol";

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [completion, setCompletion] = useState(0);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Xóa dữ liệu user khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch(resetCart());

    // Xóa cookie token bằng cách gọi API logout
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // bắt buộc để xoá cookie httpOnly
    });
    // Optionally: chuyển hướng về trang chủ hoặc trang đăng nhập
    window.location.href = "/";
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const userData: User = JSON.parse(data);
      setUser(userData);

      // Tính % hoàn thiện
      const total = 4;
      let done = 0;
      if (userData.name) done++;
      if (userData.email) done++;
      if (userData.phone_number) done++;
      if (userData.birthday) done++;

      setCompletion(Math.floor((done / total) * 100));
    }
  }, []);

  return (
    <div className="">
      <main className="my-[50px] sm:my-[100px]">
        <div className="w-[95%]  sm:w-[80%] mx-auto flex flex-col lg:flex-row lg:justify-between gap-6">
          {/* <!-- info right --> */}
          <div className="w-full mx-auto lg:w-[70%] flex flex-col gap-7">

            {/* <!-- row1 --> */}
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <div className="w-full sm:w-[48%] flex bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] items-center p-4">
                <Link
                  href="./profile"
                  className="w-full flex items-center gap-4"
                >
                  <img
                    className="w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] rounded-full object-cover cursor-pointer"
                    src={user?.avatar || "/img/login.jpg"}
                    alt=""
                  />
                  <p className="text-xl sm:text-3xl font-bold cursor-pointer">
                    {user?.name || "User"}
                  </p>
                </Link>
              </div>

              <div className="w-full sm:w-[48%] bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                <div className="p-5">
                  <div className="flex justify-between mb-3">
                    <strong>Hoàn thiện hồ sơ của bạn</strong>
                    <p className="text-green-500 font-bold">{completion}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${completion ?? 0}%` }}
                    ></div>
                  </div>
                  {completion === 100 && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm font-semibold text-center">
                      🎉 Hồ sơ của bạn đã hoàn thành! <br /> Mua sắm ngay thôi!
                    </div>
                  )}
                  {completion !== 100 && (
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0">
                      <p className="w-full sm:w-[70%] text-sm">
                        Bổ sung các thông tin giúp bạn thanh toán nhanh chóng và an toàn hơn
                      </p>
                      <Link
                        href="/profile"
                        className="px-5 py-2 bg-[#327FF6] text-[#F5F5FA] rounded-full hover:bg-blue-700 transition duration-300 text-center"
                      >
                        Tiếp tục
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <!-- row2 --> */}
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <div className="w-full sm:w-[30%] p-5 bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer">
                <Link href="/order" className="flex items-center">
                  <FaClipboardList className="text-2xl text-[#327FF6]" />
                  <p className="p-2 font-medium text-[rgb(45,55,72)]">Đơn hàng</p>
                </Link>
              </div>
              <div className="w-full sm:w-[30%] p-5 bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer">
                <div className="flex items-center">
                  <FaTicketAlt className="text-2xl text-[#921573c2]" />
                  <Link href="/voucher" className="p-2 font-medium text-[rgb(45,55,72)]">
                    Voucher
                  </Link>
                </div>
              </div>
              <div className="w-full sm:w-[30%] p-5 bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer">
                <div className="flex items-center">
                  <IoCard className="text-2xl text-[#921573c2]" />
                  <p className="p-2 font-medium text-[rgb(45,55,72)]">Thẻ Gopoint</p>
                </div>
              </div>
            </div>

            {/* <!-- row3 --> */}
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <Link
                href="/addressBook"
                className="w-full sm:w-[48%] px-5 py-2 bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MdOutlineBook className="text-2xl" />
                    <p className="p-2 text-[rgb(45,55,72)]">Sổ địa chỉ</p>
                  </div>
                  <FaChevronRight className="text-xl" />
                </div>
              </Link>

              <Link
                href="/clause"
                className="w-full sm:w-[48%] px-5 py-2 bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IoDocumentTextOutline className="text-2xl" />
                    <p className="p-2 text-[rgb(45,55,72)]">Điều khoản</p>
                  </div>
                  <FaChevronRight className="text-xl" />
                </div>
              </Link>
            </div>

            {/* <!-- row4 --> */}
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <div className="w-full sm:w-[48%] px-5 py-2 bg-white rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MdOutlineSecurity className="text-2xl" />
                    <p className="p-2 text-[rgb(45,55,72)]">Chính sách bảo mật</p>
                  </div>
                  <FaChevronRight className="text-xl" />
                </div>
              </div>
              <div
                className="w-full sm:w-[48%] flex items-center justify-center px-5 py-2 bg-[#921573] rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer"
                onClick={handleLogout}
              >
                <button className="text-[#F5F5FA] text-lg">Đăng xuất</button>
              </div>
            </div>
          </div>

          {/* <!-- info left -->
    <div className="w-full lg:w-[25%] rounded-xl p-4 h-[300px] sm:h-auto">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        <SmolModel scale={1.4} position={[-0.2, 0, 0]} />
        <Environment preset="sunset" />
      </Canvas>
    </div> */}
        </div>
      </main>

    </div>
  );
};

export default Account;

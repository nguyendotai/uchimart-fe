"use client";
import { User } from "@/app/types/User";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaClipboardList, FaTicketAlt } from "react-icons/fa";
import { FaBookBookmark } from 'react-icons/fa6';
import { IoCard, IoDocument } from 'react-icons/io5';
import { MdOutlineSecurity } from 'react-icons/md';
const Account = () => {

    const [user, setUser] = useState<User | null>(null);
    const [completion, setCompletion] = useState(0);

    const handleLogout = () => {
        // Xóa dữ liệu user khỏi localStorage
        localStorage.removeItem("user");

        // console.log("Đã đăng xuất thành công!");

        // Optionally: chuyển hướng về trang chủ hoặc trang đăng nhập
        window.location.href = "/";
    };

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
            const userData: User = JSON.parse(data);
            setUser(userData);

            // Tính % hoàn thiện
            const total = 5;
            let done = 0;
            if (userData.name) done++;
            if (userData.email) done++;
            if (userData.phone_number) done++;
            if (userData.birthday) done++;
            if (userData.avatar) done++;

            setCompletion(Math.floor((done / total) * 100));
        }
    }, []);

    return (
        <div>
            <main className="my-[100px]">
                <div className="w-[80%] mx-auto flex justify-between ">
                    {/* <!-- info right --> */}
                    <div className="w-[70%]">
                        {/* <!-- row1 --> */}
                        <div className="w-full flex justify-between mb-7">
                            <div className="w-[48%] flex bg-white rounded-[5px] items-center ">
                                <div className=" w-full ml-5  flex  items-center ">
                                    <img className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                                        src={user?.avatar || "/img/default-avatar.jpg"} alt="" />
                                    <p className=" text-3xl font-bold cursor-pointer ml-4">{user?.name || "User"}</p>
                                </div>
                            </div>

                            <div className="w-[48%] bg-white rounded-[5px]">
                                <div className="p-5">
                                    <div className=" flex justify-between mb-3">
                                        <strong>Hoàn thiện hồ sơ của bạn</strong>
                                        <p className="text-green-500 font-bold">{completion}%</p>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completion ?? 0}%` }}></div>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="w-[70%] text-sm">Bổ sung các thông tin giúp bạn thanh toán nhanh chóng và an
                                            toàn hơn</p>
                                        <Link href="/profile"
                                            className=" px-5 py-2 bg-[#327FF6] text-[#F5F5FA] rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out">Tiếp
                                            tục</Link>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* <!-- row2 --> */}
                        <div className="w-full flex justify-between mb-7">
                            {/* <!-- Đơn hàng --> */}
                            <div className="w-[30%] p-5 bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center">

                                    {/* <i className="fa-regular fa-file-lines p-1 text-xl text-[#327FF6]"></i> */}
                                    <FaClipboardList className=' text-2xl text-[#327FF6]' />
                                    <p className="p-2 font-medium text-[rgb(45,55,72)]">Đơn hàng</p>
                                </div>
                            </div>

                            {/* <!-- Voucher --> */}
                            <div className="w-[30%] p-5 bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center">

                                    <FaTicketAlt className=' text-2xl text-[#921573c2]' />

                                    <p className="p-2 font-medium text-[rgb(45,55,72)]">Voucher</p>
                                </div>
                            </div>

                            {/* <!-- Gopoint --> */}
                            <div className="w-[30%] p-5 bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center">

                                    <IoCard className=' text-2xl text-[#921573c2]' />
                                    <p className="p-2 font-medium text-[rgb(45,55,72)]">Thẻ Gopoint</p>
                                </div>
                            </div>
                        </div>



                        {/* <!-- row3 --> */}
                        <div className="w-full flex justify-between mb-7">
                            <Link href="/addressBook" className="w-[48%] px-5 py-2 bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <FaBookBookmark className=' text-xl' />
                                        <p className="p-2 text-[rgb(45,55,72)]">Sổ địa chỉ</p>
                                    </div>

                                    <FaChevronRight className=' text-xl' />

                                </div>
                            </Link>


                            <Link href="/clause" className="w-[48%] px-5 py-2 bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <IoDocument className=' text-xl' />

                                        <p className="p-2 text-[rgb(45,55,72)]">Điều khoản</p>
                                    </div>
                                    <FaChevronRight className=' text-xl' />

                                </div>
                            </Link>
                        </div>



                        {/* <!-- row4 --> */}
                        <div className="w-full flex justify-between ">
                            <div className="w-[48%] px-5 py-2  bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <MdOutlineSecurity className=' text-xl' />

                                        <p className="p-2 text-[rgb(45,55,72)]">Chính sách bảo mật</p>
                                    </div>
                                    <FaChevronRight className=' text-xl' />

                                </div>
                            </div>


                            <div
                                className="w-[48%] flex items-center justify-center px-5 py-2 bg-[#921573] rounded-[5px] cursor-pointer" onClick={handleLogout}>
                                <button className="text-[#F5F5FA] text-lg cursor-pointer">
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* <!-- info left --> */}
                    <div className="w-[25%] bg-white rounded-xl p-4 shadow-sm max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Lịch sử đơn hàng</h3>

                        <div className="space-y-3 text-sm text-gray-700">
                            {/* <!-- Đơn hàng 1 --> */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <img src="./public/svg/milk-svgrepo-com.svg" alt="Sữa rửa mặt" className="w-6 h-6 " />
                                    <span>Thùng sữa Milo 4 hộp...</span>
                                </div>
                                <span className="text-green-600 text-xs font-medium">Đã giao</span>
                            </div>

                            {/* <!-- Đơn hàng 2 --> */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <img src="./public/svg/egg-svgrepo-com.svg" alt="Trà thảo mộc" className="w-5 h-5 object-contain" />
                                    <span>Trứng gà nướng Tafa 6...</span>
                                </div>
                                <span className="text-yellow-600 text-xs font-medium">Đang xử lý</span>
                            </div>

                            {/* <!-- Đơn hàng 3 --> */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <img src="./public/svg/meat-food-eat-cooking-bbq-svgrepo-com.svg" alt="Viên sủi vitamin C" className="w-5 h-5 object-contain" />
                                    <span>Thịt đùi khay 400G</span>
                                </div>
                                <span className="text-red-500 text-xs font-medium">Đã hủy</span>
                            </div>
                        </div>

                        <div className="mt-4 text-right">
                            <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Xem chi tiết</a>
                        </div>
                    </div>



                </div>
            </main>
        </div>
    );
};

export default Account;
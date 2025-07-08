"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { FaChevronRight, FaClipboardList, FaTicketAlt } from "react-icons/fa";
import { FaBookBookmark } from 'react-icons/fa6';
import { IoCard, IoDocument } from 'react-icons/io5';
import { MdOutlineSecurity } from 'react-icons/md';
const Account = () => {
    return (
        <div>
            <main className="my-[50px]">
                <div className="w-[80%] mx-auto flex justify-between ">
                    {/* <!-- info right --> */}
                    <div className="w-[70%]">
                        {/* <!-- row1 --> */}
                        <div className="w-full flex justify-between mb-7">
                            <div className="w-[48%] flex bg-white rounded-[5px] items-center ">
                                <div className=" w-[48%] ml-5  flex  items-center justify-between ">
                                    <Image className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                                        src="/img/avt1.jpg" alt="" width={80} height={80} />
                                    <p className=" text-3xl font-bold cursor-pointer">Tuaneli</p>
                                </div>
                            </div>

                            <div className="w-[48%] bg-white rounded-[5px]">
                                <div className="p-5">
                                    <div className=" flex justify-between mb-3">
                                        <strong>Hoàn thiện hồ sơ của bạn</strong>
                                        <p className="text-green-500 font-bold">70%</p>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                        <div className="bg-green-500 h-2 rounded-full w-[70%]"></div>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="w-[70%] text-sm">Bổ sung các thông tin giúp bạn thanh toán nhanh chóng và an
                                            toàn hơn</p>
                                        <button
                                            className=" px-6 bg-[#327FF6] text-[#F5F5FA] rounded-full cursor-pointer">Tiếp
                                            tục</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* <!-- row2 --> */}
                        <div className="w-full flex justify-between mb-7">
                            {/* <!-- Đơn hàng --> */}
                            <Link href="/order" className="w-[30%] p-5 bg-white rounded-[5px] cursor-pointer">
                                <div className="flex items-center">

                                    <FaClipboardList className=' text-2xl text-[#327FF6]' />
                                    <p className="p-2 font-medium text-[rgb(45,55,72)]">Đơn hàng</p>
                                </div>
                            </Link>

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
                                className="w-[48%] flex items-center justify-center px-5 py-2 bg-[#921573] rounded-[5px] cursor-pointer">
                                <button className="text-[#F5F5FA] text-lg">
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
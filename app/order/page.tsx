"use client";
import React from 'react';
import { FaTruck, FaWalking } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { IoMdDoneAll } from 'react-icons/io';
import { IoStorefrontSharp } from 'react-icons/io5';

const Order = () => {
    return (
        <div>
            <main className="my-[30px]">
                <div className="w-[80%] mx-auto  rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4">Đơn hàng của tôi</h2>

                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium bg-white border-gray-300 mb-4 rounded-lg">
                        <div className=" w-full p-3 flex justify-around text-[16px]">
                            <button className="border-b-2 pb-1 border-[#921573]">Tất cả</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Chờ thanh toán</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Chờ xác nhận</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Chờ soạn hàng</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Chờ giao hàng</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Đang giao hàng</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Đã hoàn tất</button>
                            <button className="hover:text-[#4DCB44] cursor-pointer">Đã hủy</button>
                        </div>
                    </div>


                    <div className="flex gap-2 mb-4">
                        <button className="border-2 border-[#4DCB44] bg-[#EBFAEA] rounded-full px-3 py-1 cursor-pointer">Tất
                            cả</button>
                        <button className="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">1
                            tháng</button>
                        <button className="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">3
                            tháng</button>
                        <button className="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">6
                            tháng</button>
                    </div>


                    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
                        {/* <!-- Trạng thái đơn --> */}
                        <div
                            className="pb-2 text-right text-sm text-[#DC9E48] flex justify-between items-center border-b-1 border-[#898991]">
                            <p className="text-[#898991]">Thương hiệu: <span className="text-[#327FF6] font-semibold">Pepsi</span></p>
                            <span className='flex items-center'><FaTruck className='mr-2 text-xl' /> Đơn hàng đang chờ xác nhận</span>
                        </div>

                        <div className="">
                            <p className="flex gap-1 items-center font-medium text-[#545458]">Thứ 7, 7/52025</p>
                            <span className="flex items-center text-[14px]"><FaWalking className='text-[#4DCB44] text-xl ml-2' /> Tự đến nhận</span>

                        </div>
                        <div className="flex gap-4 mt-2 ml-2">
                            {/* <!-- Hình ảnh sản phẩm --> */}
                            <img src="https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2024%2F3%2F27%2F56200-8934588670114.jpg&w=1920&q=75"
                                className="w-[8%] border-2 border-[#898991] object-cover rounded-2xl" alt="product image" />


                            {/* <!-- Cột thông tin + giá --> */}
                            {/* <!-- Thông tin sản phẩm --> */}
                            <div className="flex-1 text-sm text-gray-700">
                                <p className="font-medium mt-1 mb-2">Thùng nước ngọt vị chanh zero calo Pepsi 320ml (24 Lon)</p>
                                <p className="text-[#898991] mb-2">Phân loại hàng: thùng</p>
                                <p className="font-medium mb-2">Số lượng: 1</p>
                            </div>

                            {/* <!-- Giá --> */}
                            <div className="text-right text-lg ">
                                <p className="text-gray-600">Giá: <span className="text-[#921573] font-bold">194.000đ</span></p>
                                <p className="font-medium mt-1">Thành tiền: <span className="text-[#921573] font-bold">210.000đ</span></p>
                            </div>
                        </div>


                        {/* <!-- Hành động --> */}
                        <div className="flex justify-between gap-3 mt-4">
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center justify-center w-[35px] h-[35px] text-[#4DCB44] rounded-full bg-[#EBFAEA]'>
                                    
                                <IoStorefrontSharp className="text-xl"/>
                                </div>
                                <span className="text-[14px]">Nhận tại <span className="font-medium">UchiMart - 308 Thạnh Xuân, Quận 12</span></span>
                            </div>

                            <div className="w-[30%] flex justify-between">
                                <button className="w-[48%] bg-[#4DCB44] text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer">Mua lại</button>
                                <button className=" w-[48%] border border-[#921573] text-[#921573] px-4 py-1 rounded-md hover:bg-pink-50 cursor-pointer">Chi tiết
                                    đơn hàng</button>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
                        {/* <!-- Trạng thái đơn --> */}
                        <div
                            className="pb-2 text-right text-sm text-[#4DCB44] flex justify-between items-center border-b-1 border-[#898991]">
                            <p className="text-[#898991]">Thương hiệu: <span className="text-[#327FF6] font-semibold">Pepsi</span></p>
                            <span className='flex items-center'><IoMdDoneAll className='mr-2 text-xl' /> Đơn hàng đã được giao</span>
                        </div>

                        <div className="">
                            <p className="flex gap-1 items-center font-medium text-[#545458]">Thứ 7, 7/52025</p>
                            <span className="flex items-center text-[14px]"><FaWalking className='text-[#4DCB44] text-xl ml-2' /> Tự đến nhận</span>


                        </div>
                        <div className="flex gap-4 mt-2 ml-2">
                            {/* <!-- Hình ảnh sản phẩm --> */}
                            <img src="https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2024%2F3%2F27%2F56200-8934588670114.jpg&w=1920&q=75"
                                className="w-[8%] border-2 border-[#898991] object-cover rounded-2xl" alt="product image" />


                            {/* <!-- Cột thông tin + giá --> */}
                            {/* <!-- Thông tin sản phẩm --> */}
                            <div className="flex-1 text-sm text-gray-700">
                                <p className="font-medium mt-1 mb-2">Thùng nước ngọt vị chanh zero calo Pepsi 320ml (24 Lon)</p>
                                <p className="text-[#898991] mb-2">Phân loại hàng: thùng</p>
                                <p className="font-medium mb-2">Số lượng: 1</p>
                            </div>

                            {/* <!-- Giá --> */}
                            <div className="text-right text-lg ">
                                <p className="text-gray-600">Giá: <span className="text-[#921573] font-bold">194.000đ</span></p>
                                <p className="font-medium mt-1">Thành tiền: <span className="text-[#921573] font-bold">210.000đ</span></p>
                            </div>
                        </div>


                        {/* <!-- Hành động --> */}
                        <div className="flex justify-between gap-3 mt-4">
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center justify-center w-[35px] h-[35px] text-[#4DCB44] rounded-full bg-[#EBFAEA]'>
                                    
                                <IoStorefrontSharp className="text-xl"/>
                                </div>
                                <span className="text-[14px]">Nhận tại <span className="font-medium">UchiMart - 308 Thạnh Xuân, Quận 12</span></span>
                            </div>

                            <div className="w-[30%] flex justify-between">
                                <button className="w-[48%] bg-[#4DCB44] text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer">Mua lại</button>
                                <button className=" w-[48%] border border-[#921573] text-[#921573] px-4 py-1 rounded-md hover:bg-pink-50 cursor-pointer">Chi tiết
                                    đơn hàng</button>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
                        {/* <!-- Trạng thái đơn --> */}
                        <div
                            className="pb-2 text-right text-sm text-[#EE1D1D] flex justify-between items-center border-b-1 border-[#898991]">
                            <p className="text-[#898991]">Thương hiệu: <span className="text-[#327FF6] font-semibold">Pepsi</span></p>
                            <span className='flex items-center'><FcCancel className='mr-2 text-xl' /> Đã hủy</span>

                        </div>

                        <div className="">
                            <p className="flex gap-1 items-center font-medium text-[#545458]">Thứ 7, 7/52025</p>
                            <span className="flex items-center text-[14px]"><FaWalking className='text-[#4DCB44] text-xl ml-2' /> Tự đến nhận</span>


                        </div>
                        <div className="flex gap-4 mt-2 ml-2">
                            {/* <!-- Hình ảnh sản phẩm --> */}
                            <img src="https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2024%2F3%2F27%2F56200-8934588670114.jpg&w=1920&q=75"
                                className="w-[8%] border-2 border-[#898991] object-cover rounded-2xl" alt="product image" />


                            {/* <!-- Cột thông tin + giá --> */}
                            {/* <!-- Thông tin sản phẩm --> */}
                            <div className="flex-1 text-sm text-gray-700">
                                <p className="font-medium mt-1 mb-2">Thùng nước ngọt vị chanh zero calo Pepsi 320ml (24 Lon)</p>
                                <p className="text-[#898991] mb-2">Phân loại hàng: thùng</p>
                                <p className="font-medium mb-2">Số lượng: 1</p>
                            </div>

                            {/* <!-- Giá --> */}
                            <div className="text-right text-lg ">
                                <p className="text-gray-600">Giá: <span className="text-[#921573] font-bold">194.000đ</span></p>
                                <p className="font-medium mt-1">Thành tiền: <span className="text-[#921573] font-bold">210.000đ</span></p>
                            </div>
                        </div>


                        {/* <!-- Hành động --> */}
                        <div className="flex justify-between gap-3 mt-4">
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center justify-center w-[35px] h-[35px] text-[#4DCB44] rounded-full bg-[#EBFAEA]'>
                                    
                                <IoStorefrontSharp className="text-xl"/>
                                </div>
                                <span className="text-[14px]">Nhận tại <span className="font-medium">UchiMart - 308 Thạnh Xuân, Quận 12</span></span>
                            </div>

                            <div className="w-[30%] flex justify-between">
                                <button className="w-[48%] bg-[#4DCB44] text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer">Mua lại</button>
                                <button className=" w-[48%] border border-[#921573] text-[#921573] px-4 py-1 rounded-md hover:bg-pink-50 cursor-pointer">Chi tiết
                                    đơn hàng</button>
                            </div>
                        </div>
                    </div>



                </div>
            </main>
        </div>
    );
};

export default Order;
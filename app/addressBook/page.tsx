import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaBookBookmark, FaMap } from 'react-icons/fa6';

const AddressBook = () => {
    return (
        <div>
            <main className="my-[50px]">
                <div className="w-[80%] mx-auto">
                    <div className="w-[70%] flex justify-between mb-7">
                        {/* <!-- column left --> */}
                        <div className="w-[48%] bg-white rounded-[5px] shadow-sm flex">
                            <div className="py-5 ml-5 flex items-center">
                                <FaBookBookmark className=' text-4xl text-[#01BF61]' />

                                <p className="pl-4 font-bold text-2xl">Sổ địa chỉ</p>
                            </div>
                        </div>


                        {/* <!-- column right --> */}
                        <div className="w-[48%] bg-white rounded-[5px] shadow-sm">
                            <div className="p-2">

                                <div className=" p-2 ">
                                    <Link href="/addressBook-map" className="flex items-center">
                                        <i className="fa-solid fa-map text-[#327FF6]"></i>
                                        <FaMap className='text-[#327FF6]' />
                                        <p className="pl-2 text-[#327FF6] font-medium">Tạo địa chỉ bằng cách dùng bản đồ</p></Link>
                                </div>
                                <div className=" p-2 ">
                                    <Link href="/addressBook-hand" className="flex items-center">
                                        <FaPlus className='text-[#327FF6]' />
                                        <p className="pl-2 text-[#327FF6] font-medium">Tạo địa chỉ bằng cách nhập tay</p></Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="w-[70%] flex justify-between">
                        {/* <!-- column left --> */}
                        <div className="w-[48%] bg-white rounded-[5px] relative  shadow-sm">
                            <div className="absolute right-2 top-1 cursor-pointer">

                                <i className="fas fa-ellipsis-v text-gray-600"></i>
                            </div>
                            <div className="py-5 ml-5 flex items-center">
                                <input type="radio" name="address" checked className="mt-1 accent-blue-600 w-8 h-8" />
                                <div className="ml-2 ">
                                    <p className=" font-bold text-xl">Nhà</p>
                                    <p className="text-[#A29E9E] font-medium">Anh <span className="font-bold ">Tuaneli</span></p>
                                    <p className="text-[#A29E9E] font-medium mb-2">382/15 Đường Tân Kỳ Tân Quý, Phường Sơn Kỳ, Quận Tân
                                        Phú, Thành phố Hồ Chí Minh</p>
                                    <span className=" border-2 border-green-500 text-green-500 px-2 py-1 rounded-full text-xs font-medium">Mặc định</span>

                                </div>
                            </div>
                        </div>


                        {/* <!-- column right --> */}
                        <div
                            className="w-[48%] h-min flex items-center justify-center px-5 py-2 bg-[#921573] rounded-[5px] cursor-pointer">
                            <button className="text-[#F5F5FA] text-lg cursor-pointer">
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddressBook;
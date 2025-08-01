"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaBookBookmark, FaMap } from 'react-icons/fa6';
import axios from 'axios';
import { AddressItem } from "../types/address";
const API_BASE = "http://127.0.0.1:8000/api";
const AddressBook = () => {
    const [addresses, setAddresses] = useState<AddressItem[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get(`${API_BASE}/addresses`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.data.success) {
                    setAddresses(res.data.data);
                }
            })
            .catch((err) => {
                console.error("Lỗi lấy địa chỉ:", err);
            });
    }, []);

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


                    <div className="w-[70%] flex flex-col gap-5">
                        {addresses.length > 0 ? (
                            addresses.map((address) => (
                                <div key={address.id} className="w-[48%]  bg-white rounded-[5px] relative shadow-sm">
                                    <div className="absolute right-2 top-1 cursor-pointer">
                                        <i className="fas fa-ellipsis-v text-gray-600"></i>
                                    </div>
                                    <div className="py-5 mx-5 flex items-center">
                                        <input
                                            type="radio"
                                            name="address"
                                            checked={address.is_default}
                                            className="mt-1 accent-blue-600"
                                            readOnly
                                        />
                                        <div className="ml-2">
                                            <p className="w-[90%] font-medium text-[15px]">{address.address_line}</p>
                                            <p className="text-[#718096] font-medium">
                                                {address.name}
                                            </p>
                                            <p className="text-[#718096]  font-medium mb-2">
                                                {address.address_line}, {address.ward?.name}, Quận {address.district?.name}, {address.province?.name}
                                            </p>
                                            {address.is_default && (
                                                <span className="border-2 border-green-500 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
                                                    Mặc định
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Bạn chưa có địa chỉ nào.</p>
                        )}
                    </div>


                </div>
            </main>
        </div>
    );
};

export default AddressBook;
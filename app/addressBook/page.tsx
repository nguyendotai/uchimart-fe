"use client";
import React, { useEffect, useState } from 'react';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import { FaBookBookmark, FaMap } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AddressItem } from "../types/address";
import ModalAddressBookHand from './components/ModalAddressBookHand';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDelete } from 'react-icons/md';
import ModalAddressBookMap from './components/ModalAddressBookMap';

const API_BASE = "http://127.0.0.1:8000/api";

export default function AddressBook() {
    const [addresses, setAddresses] = useState<AddressItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [addressToEdit, setAddressToEdit] = useState<AddressItem | null>(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);



    const fetchAddresses = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get(`${API_BASE}/addresses`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;

                    let result;
                    if (data.length >= 6) {
                        // ≥ 6 địa chỉ → đưa mặc định lên đầu
                        result = [...data].sort((a, b) => b.is_default - a.is_default);
                    } else {
                        // < 6 địa chỉ → giữ nguyên thứ tự
                        result = data;
                    }

                    setAddresses(result);
                }

            })
            .catch(() => {
                toast.error("Lỗi lấy danh sách địa chỉ");
            });
    };

    const handleSetDefault = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Bạn chưa đăng nhập");
            return;
        }

        try {
            await axios.post(`${API_BASE}/addresses/${id}/default`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Đã đặt làm địa chỉ mặc định");

            // Cập nhật lại danh sách
            fetchAddresses();

        } catch (error) {
            console.error("Lỗi cập nhật mặc định:", error);
            toast.error("Không thể cập nhật mặc định");
        }
    };



    useEffect(() => {
        fetchAddresses();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Nếu click bên ngoài menu thì đóng menu
            if (!(event.target as HTMLElement).closest(".menu-container")) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <main className="my-[50px]">
            <div className="w-[80%] mx-auto">
                {/* Header */}
                <div className="w-[70%] flex justify-between mb-7">
                    <div className="w-[48%] bg-white rounded-[5px] shadow-sm flex">
                        <div className="py-5 ml-5 flex items-center">
                            <FaBookBookmark className='text-4xl text-[#01BF61]' />
                            <p className="pl-4 font-bold text-2xl">Sổ địa chỉ</p>
                        </div>
                    </div>
                    <div className="w-[48%] bg-white rounded-[5px] shadow-sm">
                        <div className="p-2">
                            <div className="p-2">
                                <button
                                    onClick={() => setIsMapModalOpen(true)}
                                    className="flex items-center">
                                    <FaMap className='text-[#327FF6]' />
                                    <p className="pl-2 text-[#327FF6] font-medium">Tạo địa chỉ bằng bản đồ</p>
                                </button>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center"
                                >
                                    <FaPlus className='text-[#327FF6]' />
                                    <p className="pl-2 text-[#327FF6] font-medium cursor-pointer">Tạo địa chỉ nhập tay</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danh sách địa chỉ */}
                <div className="w-[70%] flex flex-col gap-3">
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className="relative w-[48%] bg-white border border-gray-200 rounded-lg p-4 flex gap-3 items-center hover:shadow-sm transition"
                            >
                                <div className="absolute right-2 top-2 cursor-pointer  menu-container">
                                    <FaEllipsisV
                                        className="text-[#718096]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === address.id ? null : address.id);
                                        }}
                                    />

                                    {/* Menu sửa & xóa */}
                                    {openMenuId === address.id && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-50">
                                            <button
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    setAddressToEdit(address); // gán địa chỉ đang sửa
                                                    setIsModalOpen(true); // mở modal
                                                }}
                                                className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                <HiPencilSquare className='text-lg mr-1' /> Sửa
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    // handleDeleteAddress(address.id);
                                                }}
                                                className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <MdDelete className='text-lg mr-1' /> Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Radio chọn địa chỉ */}
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="address"
                                        checked={address.is_default == 1} // dùng == cho chắc, tránh case boolean
                                        onChange={() => handleSetDefault(address.id)}
                                        className="hidden peer"
                                    />
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition
      peer-checked:border-blue-700 peer-checked:bg-blue-700 border-gray-400`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-white"></span>
                                    </span>
                                </label>





                                {/* Nội dung địa chỉ */}
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{address.address_line}</p>
                                    <p className="text-[#718096]">{address.name}</p>
                                    <p className="text-[#718096] text-sm leading-snug">
                                        {address.address_line}, {address.ward?.name}, Quận {address.district?.name}, {address.province?.name}
                                    </p>
                                    {address.is_default && (
                                        <span className="inline-block mt-2 bg-green-50 border border-green-400 text-green-600 px-2 py-0.5 rounded text-xs font-medium">
                                            Mặc định
                                        </span>
                                    )}
                                </div>


                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Bạn chưa có địa chỉ nào.</p>
                    )}
                </div>
            </div>

            {/* Modal nhập tay */}
            {isModalOpen && (
                <ModalAddressBookHand
                    onClose={() => {
                        setIsModalOpen(false);
                        setAddressToEdit(null); // reset sau khi đóng
                    }}
                    onSuccess={() => {
                        setIsModalOpen(false);
                        setAddressToEdit(null);
                        fetchAddresses();
                    }}
                    addressToEdit={addressToEdit} // 👈 truyền dữ liệu xuống
                />
            )}


            {/* // Hiển thị modal */}
            {isMapModalOpen && (
                <ModalAddressBookMap
                    onClose={() => setIsMapModalOpen(false)}
                    onSuccess={() => {
                        setIsMapModalOpen(false);
                        fetchAddresses();
                    }}
                    addressToEdit={addressToEdit} // có thể truyền vào khi sửa
                />
            )}



        </main>
    );
}

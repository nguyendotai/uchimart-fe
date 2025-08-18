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
            .catch((err) => {
                console.error("API lỗi:", err.response?.data || err);
                toast.error(err.response?.data?.message || "Lỗi lấy danh sách địa chỉ");

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
            <div className="w-full sm:w-[80%] mx-auto">
                {/* Header */}
                <div className="w-full sm:w-[70%] flex flex-col gap-3 sm:flex-row sm:justify-between mb-7">
                    {/* Box 1 */}
                    <div className="w-full sm:w-[48%] bg-white rounded-[5px] shadow-sm flex">
                        <div className="py-5 ml-5 flex items-center">
                            <FaBookBookmark className="text-4xl" />
                            <p className="pl-4 font-bold text-2xl">Sổ địa chỉ</p>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="w-full sm:w-[48%] bg-white rounded-[5px] shadow-sm">
                        <div className="p-2">
                            <div className="p-2">
                                <button
                                    onClick={() => setIsMapModalOpen(true)}
                                    className="flex items-center"
                                >
                                    <FaMap className="text-[#327FF6]" />
                                    <p className="pl-2 text-[#327FF6] font-medium">
                                        Tạo địa chỉ bằng bản đồ
                                    </p>
                                </button>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center"
                                >
                                    <FaPlus className="text-[#327FF6]" />
                                    <p className="pl-2 text-[#327FF6] font-medium cursor-pointer">
                                        Tạo địa chỉ nhập tay
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danh sách địa chỉ */}
                <div className="w-full sm:w-[70%] flex flex-col gap-3">
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className="relative w-full sm:w-[48%] bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-sm transition"
                            >
                                {/* Menu */}
                                <div className="absolute right-2 top-2 cursor-pointer menu-container">
                                    <FaEllipsisV
                                        className="text-[#718096]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === address.id ? null : address.id);
                                        }}
                                    />
                                    {openMenuId === address.id && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-50">
                                            <button
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    setAddressToEdit(address);
                                                    setIsModalOpen(true);
                                                }}
                                                className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                <HiPencilSquare className="text-lg mr-1" /> Sửa
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    // handleDeleteAddress(address.id);
                                                }}
                                                className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <MdDelete className="text-lg mr-1" /> Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Radio chọn địa chỉ */}
                                <label className="flex items-center gap-2 cursor-pointer mb-2 sm:mb-0">
                                    <input
                                        type="radio"
                                        name="address"
                                        checked={address.is_default == 1}
                                        onChange={() => handleSetDefault(address.id)}
                                        className="hidden peer"
                                    />
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition
                            peer-checked:border-blue-700 peer-checked:bg-blue-700 border-gray-400`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-white"></span></span>
                                </label>

                                {/* Nội dung địa chỉ */}
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        {address.address_line}
                                    </p>
                                    <p className="text-[#718096]">{address.name}</p>
                                    <p className="text-[#718096] text-sm leading-snug">
                                        {address.address_line}, {address.ward?.name}, Quận{" "}
                                        {address.district?.name}, {address.province?.name}
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
                        setAddressToEdit(null);
                    }}
                    onSuccess={() => {
                        setIsModalOpen(false);
                        setAddressToEdit(null);
                        fetchAddresses();
                    }}
                    addressToEdit={addressToEdit}
                />
            )}

            {/* Modal bản đồ */}
            {isMapModalOpen && (
                <ModalAddressBookMap
                    onClose={() => setIsMapModalOpen(false)}
                    onSuccess={() => {
                        setIsMapModalOpen(false);
                        fetchAddresses();
                    }}
                    addressToEdit={addressToEdit}
                />
            )}
        </main>
    );
}

'use client';
import React, { useEffect, useState } from 'react';
import type { Voucher } from '../types/Voucher';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDiscount } from 'react-icons/md';
import axios from 'axios';
import { ModalVoucherDetail } from './components/ModalVoucherDetail';
import Link from 'next/link';
const Voucher = () => {

    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);


    const [showModal, setShowModal] = useState(false);

    const handleShowDetail = (voucher: Voucher) => {
        setSelectedVoucher(voucher);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVoucher(null);
    };


    const formatCurrency = (value?: number) => {
        if (value === undefined) return '';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };


    const getDaysLeft = (endDate?: string): number | null => {
        if (!endDate) return null;
        const end = new Date(endDate);
        const now = new Date();

        // Tính số mili giây chênh lệch rồi chuyển sang ngày
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= 0 ? diffDays : 0; // Nếu đã hết hạn thì trả về 0
    };



    useEffect(() => {
        const fetchVoucher = async () => {
            const token = localStorage.getItem("token"); // hoặc từ context/state
            if (!token) return console.error("Chưa có token");

            axios.get("http://localhost:8000/api/coupons", {
                params: { per_page: 1000 },
                headers: {
                    Authorization: `Bearer ${token}`, // gửi token
                },
            })
                .then(res => {
                    setVouchers(res.data.data); // data từ backend
                })
                .catch(err => {
                    console.error("Lỗi khi lấy voucher:", err);
                });
        };


        // Gọi lần đầu
        fetchVoucher();

        // Gọi lại mỗi 2s
        const interval = setInterval(fetchVoucher, 3000);
        return () => clearInterval(interval);

    }, []);
    return (
        <div>
      <main className="my-6 sm:my-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-2xl mb-6">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/account">
                  <IoIosArrowBack className="text-2xl sm:text-3xl cursor-pointer" />
                </Link>
                <h1 className="text-xl sm:text-2xl font-semibold">Ưu đãi của bạn</h1>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3 sm:ml-10">
                <input
                  type="text"
                  placeholder="Nhập mã khuyến mãi của bạn tại đây"
                  className="w-full sm:w-[85%] bg-gray-100 p-2 rounded-lg outline-none border border-transparent focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 ease-in-out hover:shadow-sm"
                />
                <button className="w-full sm:w-[15%] text-white rounded-lg bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
                  Áp dụng
                </button>
              </div>

              <div className="w-full sm:w-1/4 sm:ml-10">
                <ul className="flex justify-between gap-4 text-sm">
                  <li className="pb-1 border-b-2 border-purple-700 cursor-pointer">Tất cả</li>
                  <li className="cursor-pointer hover:text-green-600">Chưa dùng</li>
                  <li className="cursor-pointer hover:text-green-600">Đã dùng / Hết hạn</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {vouchers.map((voucher) => (
                <li
                  key={voucher.id}
                  className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleShowDetail(voucher)}
                >
                  <div className="px-3 pt-3 pb-2">
                    <div className="flex gap-3 pb-2 border-b-2 border-gray-200">
                      <div className="relative bg-green-100 rounded-2xl overflow-hidden w-24 sm:w-28">
                        <div className="p-2">
                          <p className="text-xs text-green-700 font-medium">PHIẾU GIẢM GIÁ</p>
                          <div className="absolute bottom-[-8px] right-[-8px] rounded-full bg-green-200 p-2 sm:p-3">
                            <MdDiscount className="text-lg sm:text-xl text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-medium text-gray-500 mb-1">UCHIMART</p>
                        <h3 className="text-green-700 truncate text-sm sm:text-base">
                          {voucher.title}
                        </h3>
                        <p className="text-xs sm:text-sm">
                          Áp dụng cho đơn hàng từ {formatCurrency(voucher.min_order_value)}
                        </p>
                        <p className="text-xs sm:text-sm text-green-700">
                          Hết hạn trong {getDaysLeft(voucher.end_date)} ngày
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pb-2 text-xs sm:text-sm text-gray-500 font-medium">
                    Áp dụng cho tất cả sản phẩm
                  </div>
                </li>
              ))}
            </ul>
            <ModalVoucherDetail
              open={showModal}
              onClose={handleCloseModal}
              voucher={selectedVoucher}
            />
          </div>
        </div>
      </main>
    </div>
    );
};

export default Voucher;
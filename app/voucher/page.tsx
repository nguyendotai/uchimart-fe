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
            axios.get('http://localhost:8000/api/coupons', {
                params: {
                    per_page: 1000 // Đảm bảo lấy hết, nếu backend có phân trang
                }
            })
                .then(res => {
                    setVouchers(res.data.data); // cấu trúc response là: { data: { data: [...] } }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy voucher:', error);
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
            <main className="my-[30px]">

                <div className="w-[80%] mx-auto">

                    <div className='bg-white shadow-[0_4px_10px_rgba(0,0,0,0.08)] rounded-2xl mb-6'>
                        <div className='p-4'>

                            <div className='flex items-center gap-2 mb-4'>
                                <Link href='/account'>
                                    <IoIosArrowBack className='text-3xl cursor-pointer' />
                                </Link>
                                <h1 className='text-2xl'>Ưu đãi của bạn</h1>
                            </div>

                            <div className='flex justify-between ml-10 mb-4'>
                                <input
                                    type="text"
                                    placeholder="Nhập mã khuyến mãi của bạn tại đây"
                                    className="w-[87%] bg-[#F5F5FA] p-1.5 rounded-lg outline-none border border-transparent focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 ease-in-out hover:shadow-sm"
                                />
                                <button
                                    className="w-[12%] text-white rounded-lg bg-[#4DCB44] cursor-pointer hover:bg-[#3db634] active:scale-95 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
                                    Áp dụng
                                </button>


                            </div>

                            <div className='w-[27%] ml-10'>
                                <ul className='flex justify-between '>
                                    <li className='pb-1 border-b-2 border-[#921573] cursor-pointer'>Tất cả</li>
                                    <li className='cursor-pointer'>Chưa dùng</li>
                                    <li className='cursor-pointer'>Đã dùng / Hết hạn</li>
                                </ul>
                            </div>

                        </div>

                    </div>



                    <div className=''>
                        <ul className='flex flex-wrap gap-5.5'>
                            {vouchers.map((voucher) => (
                                <li key={voucher.id} className='w-[32%]  bg-white shadow-[0_4px_10px_rgba(0,0,0,0.08)] rounded-lg cursor-pointer' onClick={() => handleShowDetail(voucher)}>
                                    <div className='px-3 pt-3 pb-2'>
                                        <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>
                                            <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                                <div className='p-2'>
                                                    <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>
                                                    <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                        <MdDiscount className='text-xl text-[#38A169]' />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-[70%] pb-4'>
                                                <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                                <h3 className='text-[#299361] truncate'>{voucher.title}</h3>
                                                <p className='text-[12px]'>Áp dụng cho đơn hàng từ {formatCurrency(voucher.min_order_value)}</p>
                                                <p className='text-[12px] text-[#299361]'>
                                                    Hết hạn trong {getDaysLeft(voucher.end_date)} ngày
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>
                                        Áp dụng cho tất cả sản phẩm
                                    </div>
                                </li>

                            ))}
                            <ModalVoucherDetail
                                open={showModal}
                                onClose={handleCloseModal}
                                voucher={selectedVoucher}
                            />

                        </ul>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Voucher;
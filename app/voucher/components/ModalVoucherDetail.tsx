'use client';
// components/ModalVoucherDetail.tsx
import React, { useEffect, useRef } from 'react';
import type { Voucher } from '../../types/Voucher';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    open: boolean;
    onClose: () => void;
    voucher: Voucher | null;
};



export const ModalVoucherDetail: React.FC<Props> = ({ open, onClose, voucher }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    if (!open || !voucher) return null;

    return (

        // <div className="prose">
        //     <div dangerouslySetInnerHTML={{ __html: voucher.terms }} />
        // </div>
        <AnimatePresence>
            {open && voucher && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center ">
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#F3F4F6] w-full max-w-[400px] rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-hide"
                    >
                        <div className='mb-5'>
                            <div className='bg-white p-4 shadow-sm'>

                                <div className='flex relative mb-4'>
                                    <div className='w-full text-center'>
                                        <h1 className='font-medium text-xl'>Chi tiết ưu đãi</h1>
                                    </div>

                                    <div className='absolute right-0'>
                                        <button aria-label="Close" onClick={onClose}>
                                            <IoClose className='text-2xl cursor-pointer' />
                                        </button>
                                    </div>

                                </div>

                                <div className='w-[90%] mx-auto text-center shadow p-4 mb-2 rounded-sm'>
                                    <div className='flex items-center justify-center mb-4'>
                                        <img src="/logok.png" alt="" width={90} height={90} />
                                        {/* <h2 className='text-[11px] ml-2 font-medium text-[#898991] mt-1'>UCHIMART</h2> */}
                                    </div>

                                    <div className='mb-4'>
                                        <p className='text-xl font-medium text-[#4DCB44]'>{voucher.title}</p>
                                        <p className='text-sm text-[#7180A4]'>Áp dụng cho đơn hàng online</p>
                                    </div>

                                    <div className='w-[90%] mx-auto bg-[#F8FAFC] shadow-sm rounded-sm'>
                                        <div className='p-3'>

                                            <p className='text-sm text-[#7180A4] mb-1'>Hạn dùng</p>
                                            <p className='text-sm text-[#7180A4] mb-2'>{voucher.start_date} - {voucher.end_date}</p>
                                            <div className='w-full flex justify-center'>
                                                <p className='w-[30%]  text-[13px] border rounded-full border-[#4DCB44] bg-[#EBFAEA] text-[#4DCB44]'>Giao hàng</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>


                        <div>
                            <div className='bg-white shadow-sm'>

                                <div className=' p-3'>
                                    <h2 className='text-xl text-[#7180A4]'>Chi tiết</h2>
                                </div>


                                <div className=' px-6 py-4 mb-2 '>
                                    <strong>Đối tượng áp dụng</strong>
                                    <p>{voucher.target}</p>
                                </div>
                            </div>

                            <div className='px-6 py-4 bg-white p-3 mb-2 shadow-sm'>
                                <strong>Phạm vi áp dụng</strong>
                                <p>{voucher.scope}</p>
                            </div>

                            <div className='px-6 py-4 bg-white p-3 shadow-sm'>
                                <strong>Nội dung</strong>
                                <div dangerouslySetInnerHTML={{ __html: voucher.content }} />
                            </div>

                            {/* Dùng button */}
                            <div className="bg-white  text-center p-4">
                                <button
                                    className="w-[90%] bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                                    onClick={onClose}
                                >
                                    Dùng
                                </button>
                            </div>
                        </div>




                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

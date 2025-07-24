'use client';
{/* <div dangerouslySetInnerHTML={{ __html: voucher.terms }} /> */ }
// components/ModalVoucherDetail.tsx
import React from 'react';
import type { Voucher } from '../../types/Voucher';

type Props = {
    open: boolean;
    onClose: () => void;
    voucher: Voucher | null;
};

export const VoucherDetailModal: React.FC<Props> = ({ open, onClose, voucher }) => {
    if (!open || !voucher) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 relative">


                

                {/* Dùng button */}
                <div className="mt-4">
                    <button
                        className="bg-blue-600 text-white w-full py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                        onClick={onClose}
                    >
                        Dùng
                    </button>
                </div>
            </div>
        </div>
    );
};

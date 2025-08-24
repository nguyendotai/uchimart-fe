"use client";
import React, { useState, useEffect } from "react";
import VoucherModal from "./VoucherModal";
import type { Voucher } from "../../types/Voucher";
import axios from "axios";

type Props = {
  selectedVoucher: Voucher | null;
  onChange: (voucher: Voucher | null) => void;
};

export default function VoucherSelect({ selectedVoucher, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  // Fetch danh sách voucher
  useEffect(() => {
  const token = localStorage.getItem("token"); // hoặc lấy token từ state/context

  axios
    .get("http://localhost:8000/api/coupons", {
      headers: {
        Authorization: `Bearer ${token}`, // thêm token vào header
      },
    })
    .then((res) => {
      setVouchers(res.data.data);
    })
    .catch((err) => {
      console.error("Lỗi khi fetch voucher:", err);
    });
}, []);


  // Xử lý nhập thủ công
  const handleApply = () => {
    if (input.trim()) {
      const foundVoucher = vouchers.find(
        (v) => v.code.toLowerCase() === input.trim().toLowerCase()
      );
      if (foundVoucher) {
        onChange(foundVoucher); // ✅ truyền Voucher object
        setInput("");
      } else {
        alert("Mã voucher không hợp lệ");
      }
    }
  };

  return (
    <>
      <div className="bg-teal-50 p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-full text-sm font-bold">
              4
            </span>
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              Chọn khuyến mãi
            </h2>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
          >
            Xem tất cả
          </button>
        </div>

        {/* Input mã */}
        <div className="flex bg-gray-100 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Nhập mã khuyến mãi của bạn tại đây"
            className="flex-1 px-4 py-3 text-sm bg-white text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 py-3 text-sm font-medium text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors"
            onClick={handleApply}
          >
            Áp dụng
          </button>
        </div>

       {selectedVoucher ? (
  <div className="flex items-center justify-between mt-3 p-3 rounded-lg border border-green-300 bg-green-50 shadow-sm">
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-green-700">
        Voucher đã chọn
      </span>
      <span className="text-sm text-gray-700">
        {selectedVoucher.title} <span className="text-gray-500">({selectedVoucher.code})</span>
      </span>
    </div>
    <button
      onClick={() => onChange(null)}
      className="ml-4 px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition"
    >
      Hủy
    </button>
  </div>
) : (
  <div className="mt-3 p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 text-sm text-center">
    ❌ Chưa chọn voucher
  </div>
)}


      </div>

      {/* Modal chọn mã */}
      <VoucherModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(code) => { // ⚡ nhận string
          const foundVoucher = vouchers.find((v) => v.code === code);
          if (foundVoucher) {
            onChange(foundVoucher);
          }
          setOpen(false);
        }}
        vouchers={vouchers}
      />

    </>
  );
}

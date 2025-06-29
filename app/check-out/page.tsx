"use client";
import React, { useState, useEffect } from "react";
import DeliveryMethod from "./components/DeliveryMethod";
import DeliveryAddress from "./components/DeliveryAddress";
import DeliveryTime from "./components/DeliveryTime";
import OrderItems from "./components/OrderItems";
import VoucherSelect from "./components/VoucherSelect";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedItems");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="w-[1300px] mx-auto py-6 flex flex-col lg:flex-row gap-6">
      {/* CỘT TRÁI - THÔNG TIN GIAO HÀNG */}
      <div className="lg:w-[65%] w-full space-y-6">
        <h2 className="font-bold text-3xl">Thanh toán</h2>
        <DeliveryMethod value={deliveryMethod} onChange={setDeliveryMethod} />
        <DeliveryAddress />
        <DeliveryTime selectedTime={selectedTime} onChange={setSelectedTime} />
      </div>

      {/* CỘT PHẢI - SẢN PHẨM, VOUCHER, ĐẶT HÀNG */}
      <div className="lg:w-[35%] w-full space-y-4 mt-15">
        <OrderItems items={items} />
        <VoucherSelect selectedVoucher={selectedVoucher} onChange={setSelectedVoucher} />
        <button className="w-full bg-[#921573] text-white py-3 rounded-full text-lg font-semibold hover:opacity-90">
          Đặt hàng
        </button>
      </div>
    </div>
  );
}

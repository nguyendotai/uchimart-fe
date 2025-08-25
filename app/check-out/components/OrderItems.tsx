"use client";
import React, { useState } from "react";
import { CartItem } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { Voucher } from "../../types/Voucher";
import { toast } from "react-toastify";
import axios from "axios";
import { AddressItem } from "../../types/address";

type Props = {
  items: CartItem[];
  voucher?: Voucher | null;
  selectedAddress?: AddressItem | null; // 👈 nhận object thay vì number
  paymentMethod: "cod" | "online";
};

export default function OrderSummary({ items, voucher, selectedAddress, paymentMethod }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  // --- Tính tổng tạm tính ---
  const subTotal = items.reduce((sum, item) => {
    const salePrice = formatCurrencyToNumber(item.sale_price);
    const offerPrice = formatCurrencyToNumber(item.offer_price ?? "0");
    const price =
      offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;
    return sum + price * item.quantity;
  }, 0);

  // --- Phí vận chuyển ---
  const shippingFee = 0;

  // --- Hàm tính giảm giá voucher ---
  const calculateDiscount = (
    voucher: Voucher | null,
    total: number,
    shippingFee: number
  ) => {
    if (!voucher) return 0;

    const discountValue = Number(voucher.discount_value ?? 0);
    if (total < Number(voucher.min_order_value ?? 0)) return 0;

    if (voucher.discount_type === 1) {
      // Giảm theo %
      return Math.floor((total * discountValue) / 100);
    } else if (voucher.discount_type === 2) {
      // Giảm số tiền cố định
      return discountValue;
    } else if (voucher.discount_type === 3) {
      // Giảm phí vận chuyển
      return Math.min(shippingFee, discountValue);
    }
    return 0;
  };

  // --- Giảm giá từ voucher ---
  const voucherDiscount = calculateDiscount(voucher ?? null, subTotal, shippingFee);

  // Nếu voucher là loại giảm phí vận chuyển → shippingDiscount = voucherDiscount
  const shippingDiscount =
    voucher?.discount_type === 3 ? voucherDiscount : 0;

  // --- Tổng khuyến mãi ---
  const totalDiscount = shippingDiscount + voucherDiscount;

  // --- Tổng cuối cùng ---
  const finalTotal = subTotal + shippingFee - totalDiscount;



  const handlePlaceOrder = async () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) {
    toast.error("Vui lòng đăng nhập trước khi đặt hàng");
    return;
  }

  if (!selectedAddress) {
    toast.error("Vui lòng chọn địa chỉ giao hàng");
    return;
  }

  setLoading(true);

  // Chuẩn bị payload
  const payload = {
    user_id: user.id,
    cart_items: items.map(item => ({
      inventory_id: item.inventory_id,
      quantity: item.quantity,
    })),
    fullname: selectedAddress.name,
    email: user.email,
    phone: selectedAddress.phone,
    address_id: selectedAddress.id,
    province_code: selectedAddress.province?.code,
    district_code: selectedAddress.district?.code,
    ward_code: selectedAddress.ward?.code,
    address_line: selectedAddress.address_line,
    user_note: "",
    shipping_option_id: 1,
    payment_option_id: paymentMethod === "cod" ? 1 : 2,
    coupon_code: voucher?.code ?? null,
  };

  console.log("Payload gửi lên API:", payload);

  const token = localStorage.getItem("token");

  try {
    if (paymentMethod === "cod") {
      // Gọi API tạo order cho COD
      const res = await axios.post(
        "http://localhost:8000/api/orders",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Đặt hàng thành công!");
      console.log("Order created:", res.data);
      console.log("Payment status:", res.data.data.payment_status ?? "unknown");
    } 
    else if (paymentMethod === "online") {
      // Gọi API tạo payment cho VNPAY
      const res = await axios.post(
        "http://localhost:8000/api/payment/create-session",
        payload,
        
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } },
        
      );

      console.log("VNPAY payment response:", res.data);

      if (res.data && res.data.url) {
        // Redirect sang VNPAY để thanh toán
        window.location.href = res.data.url;
      } else {
        toast.error("Không nhận được đường dẫn thanh toán VNPAY");
      }
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Đặt hàng thất bại");
      console.error("Axios error:", err.response);
    } else {
      toast.error("Có lỗi không xác định");
      console.error("Unknown error:", err);
    }
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="bg-teal-50 rounded-xl shadow-sm text-sm p-5 space-y-5">
      {/* Tóm tắt đơn hàng */}
      <div className="bg-white p-4 rounded-lg space-y-4 border border-gray-200 shadow-sm">
        <p className="font-semibold text-gray-900 text-base">Tóm tắt đơn hàng</p>

        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tạm tính</span>
          <span className="text-gray-800 font-medium">
            {subTotal.toLocaleString()} đ
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="text-gray-800 font-medium">
            {shippingFee.toLocaleString()} đ
          </span>
        </div>

        {/* Tổng khuyến mãi */}
        {totalDiscount > 0 && (
          <div>
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span className="text-gray-600 flex items-center gap-1">
                Tổng khuyến mãi{" "}
                <span className="transform text-xs">
                  {showDetails ? "▲" : "▼"}
                </span>
              </span>
              <span className="text-teal-600 font-medium">
                -{totalDiscount.toLocaleString()} đ
              </span>
            </div>

            {/* Chi tiết khuyến mãi */}
            {showDetails && (
              <div className="ml-2 mt-2 text-gray-600 text-xs space-y-1">
                {shippingDiscount > 0 && (
                  <div>
                    Giảm giá phí vận chuyển: -{shippingDiscount.toLocaleString()} đ
                  </div>
                )}
                {voucherDiscount > 0 && voucher?.discount_type !== 3 && (
                  <div>
                    Giảm giá voucher ({voucher?.code}): -
                    {voucherDiscount.toLocaleString()} đ
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tổng tiền */}
      <div className="pt-3 border-t border-gray-200">
        {totalDiscount > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-teal-600 text-sm font-medium">
              Tiết kiệm {(totalDiscount / 1000).toFixed(0)}K
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-4">
          <span>Tổng tiền</span>
          <span className="text-orange-600">
            {finalTotal.toLocaleString()} đ
          </span>
        </div>

        <button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition-colors duration-200"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đặt đơn"}
        </button>
      </div>
    </div>
  );
}

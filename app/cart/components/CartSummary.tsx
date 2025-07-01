"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function CartSummary({
  selectedIds,
}: {
  selectedIds: number[];
}) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  if (selectedItems.length === 0) return null;

  const subTotal = selectedItems.reduce(
    (sum, item) =>
      sum + (item.promotion_price ?? item.price) * item.cartQuantity,
    0
  );

  const shipping = 0;
  const taxes = 0;
  const couponDiscount = 10000; // 10.000đ
  const total = subTotal + shipping + taxes - couponDiscount;

  const formatVND = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    router.push("/check-out");
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 w-full max-w-sm text-sm text-gray-700">
      <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
      <hr className="mb-4" />
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span>Số lượng sản phẩm</span>
          <span>{selectedItems.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{formatVND(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{formatVND(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Thuế</span>
          <span>{formatVND(taxes)}</span>
        </div>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between text-base font-semibold mb-6">
        <span>Tổng cộng</span>
        <span>{formatVND(total)}</span>
      </div>

      <button
        className="w-full bg-green-600 text-white py-2 rounded-full text-center font-medium hover:bg-green-700 transition"
        onClick={handleCheckout}
        disabled={selectedItems.length === 0}
      >
        Tiến hành thanh toán
      </button>
    </div>
  );
}

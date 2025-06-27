"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function CartSummary({
  selectedIds,
}: {
  selectedIds: number[];
}) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  const total = selectedItems.reduce(
    (sum, item) =>
      sum + (item.promotion_price ?? item.price) * item.cartQuantity,
    0
  );

  return (
    <div className="w-full bg-white shadow rounded p-4 h-fit">
      <p className="text-sm text-gray-600 mb-1">Tạm tính giỏ hàng:</p>
      <p className="text-right font-medium text-gray-700 mb-1">
        {total.toLocaleString()} đ
      </p>
      <p className="text-sm text-gray-600 mb-1">Thành tiền:</p>
      <p className="text-right font-medium text-gray-700 mb-2">
        {total.toLocaleString()} đ
      </p>
      <p className="text-sm text-gray-500 mb-2">(Giá đã bao gồm VAT)</p>
      <p className="text-sm mb-2">Tổng sản phẩm ({selectedItems.length} món)</p>
      <p className="text-xl font-bold text-green-600 mb-4">
        Tổng tiền: {total.toLocaleString()} đ
      </p>
      {selectedItems.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-1 text-gray-600">
            Sản phẩm đã chọn:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {selectedItems.map((item) => (
              <li key={item.id}>
                {item.name} × {item.cartQuantity}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className={`w-full bg-[#921573] text-white py-2 rounded-full hover:opacity-90 ${
          selectedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={selectedItems.length === 0}
      >
        Thanh toán
      </button>
    </div>
  );
}

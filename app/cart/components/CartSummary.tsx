"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import type { CartItem } from "@/app/types/Product";

export default function CartSummary({ selectedIds }: { selectedIds: number[] }) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const selectedItems: CartItem[] = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  if (selectedItems.length === 0) return null;

  // Helper: chuyển giá chuỗi sang số
  const parsePrice = (priceStr: string | number | null | undefined) => {
    if (!priceStr) return 0;
    if (typeof priceStr === "number") return priceStr;
    return Number(priceStr.replace(/[₫,.]/g, "")) || 0;
  };

  const subTotal = selectedItems.reduce((sum, item) => {
    const price = parsePrice(item.purchase_price ?? item.sale_price);
    return sum + price * item.cartQuantity;
  }, 0);

  const shipping = 0;
  const taxes = 0;
  const total = subTotal + shipping + taxes;

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
      <div className="mb-4">
        <h3 className="font-medium mb-2">Sản phẩm đã chọn</h3>
        <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {selectedItems.map((item) => {
            const unitPrice = parsePrice(item.purchase_price ?? item.sale_price);
            return (
              <li key={item.id} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image
                    src={item.image || "/fallback.jpg"}
                    alt={item.title}
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{item.title}</div>
                  <div className="text-xs text-gray-500">
                    Đơn giá: {formatVND(unitPrice)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Số lượng: {item.cartQuantity}
                  </div>
                </div>
                <div className="font-medium whitespace-nowrap">
                  {formatVND(unitPrice * item.cartQuantity)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <hr className="mb-4" />

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span>Số lượng sản phẩm</span>
          <span>
            {selectedItems.reduce((sum, item) => sum + item.cartQuantity, 0)}
          </span>
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

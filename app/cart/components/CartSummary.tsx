"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import type { CartItem } from "@/app/types/Product";
import { formatCurrencyToNumber, formatNumberToCurrency } from "@/app/utils/helpers";

type Props = {
  selectedIds: number[];
};

export default function CartSummary({ selectedIds }: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // Lọc các sản phẩm được chọn
  const selectedItems: CartItem[] = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  if (selectedItems.length === 0) return null;

  // Tính subtotal
  const subTotal = selectedItems.reduce((sum, item) => {
    const salePrice = formatCurrencyToNumber(item.sale_price ?? item.inventory?.sale_price ?? "0");
    const offerPrice = formatCurrencyToNumber(item.offer_price ?? item.inventory?.offer_price ?? "0");
    const unitPrice = offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;
    const quantity = item.quantity ?? item.quantity ?? 1;
    return sum + unitPrice * quantity;
  }, 0);

  const shipping = 0;
  const taxes = 0;
  const total = subTotal + shipping + taxes;

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;

    // Lưu selectedItems vào localStorage
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
            const title = item.title ?? item.inventory?.title ?? "Sản phẩm";
            const image = item.image ?? item.inventory?.image ?? "/fallback.jpg";
            const salePrice = formatCurrencyToNumber(item.sale_price ?? item.inventory?.sale_price ?? "0");
            const offerPrice = formatCurrencyToNumber(item.offer_price ?? item.inventory?.offer_price ?? "0");
            const quantity = item.quantity ?? item.quantity ?? 1;
            const unitPrice = offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;

            return (
              <li key={item.id} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image src={image} alt={title} fill className="object-contain rounded" />
                </div>
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{title}</div>
                  <div className="text-xs text-gray-500">
                    Đơn giá: {formatNumberToCurrency(unitPrice)}₫
                  </div>
                  <div className="text-xs text-gray-500">Số lượng: {quantity}</div>
                </div>
                <div className="font-medium whitespace-nowrap">
                  {formatNumberToCurrency(unitPrice * quantity)}₫
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
            {selectedItems.reduce(
              (sum, item) => sum + (item.quantity ?? item.quantity ?? 1),
              0
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{formatNumberToCurrency(subTotal)}₫</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{formatNumberToCurrency(shipping)}₫</span>
        </div>
        <div className="flex justify-between">
          <span>Thuế</span>
          <span>{formatNumberToCurrency(taxes)}₫</span>
        </div>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between text-base font-semibold mb-6">
        <span>Tổng cộng</span>
        <span>{formatNumberToCurrency(total)}₫</span>
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

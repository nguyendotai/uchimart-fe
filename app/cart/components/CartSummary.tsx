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
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-gray-700 text-sm font-sans transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">Tóm tắt đơn hàng</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 text-base">Sản phẩm đã chọn</h3>
        <ul className="space-y-4 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {selectedItems.map((item) => {
            const title = item.title ?? item.inventory?.title ?? "Sản phẩm";
            const image = item.image ?? item.inventory?.image ?? "/fallback.jpg";
            const salePrice = formatCurrencyToNumber(item.sale_price ?? item.inventory?.sale_price ?? "0");
            const offerPrice = formatCurrencyToNumber(item.offer_price ?? item.inventory?.offer_price ?? "0");
            const quantity = item.quantity ?? item.quantity ?? 1;
            const unitPrice = offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;

            return (
              <li key={item.id} className="flex gap-4 items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image src={image} alt={title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 line-clamp-1">{title}</div>
                  <div className="text-xs text-gray-500 mt-1">Đơn giá: {formatNumberToCurrency(unitPrice)}₫</div>
                  <div className="text-xs text-gray-500">Số lượng: {quantity}</div>
                </div>
                <div className="font-semibold text-gray-800 whitespace-nowrap">
                  {formatNumberToCurrency(unitPrice * quantity)}₫
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <hr className="border-gray-200 mb-6" />

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Số lượng sản phẩm</span>
          <span className="font-semibold text-gray-800">
            {selectedItems.reduce(
              (sum, item) => sum + (item.quantity ?? item.quantity ?? 1),
              0
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Tạm tính</span>
          <span className="font-semibold text-gray-800">{formatNumberToCurrency(subTotal)}₫</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Phí vận chuyển</span>
          <span className="font-semibold text-gray-800">{formatNumberToCurrency(shipping)}₫</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Thuế</span>
          <span className="font-semibold text-gray-800">{formatNumberToCurrency(taxes)}₫</span>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      <div className="flex justify-between items-center text-base font-bold text-gray-800 mb-6">
        <span>Tổng cộng</span>
        <span className="text-green-600">{formatNumberToCurrency(total)}₫</span>
      </div>

      <button
        className="w-full bg-green-600 text-white py-3 rounded-full text-base font-semibold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleCheckout}
        disabled={selectedItems.length === 0}
      >
        Tiến hành thanh toán
      </button>
    </div>
  );
}

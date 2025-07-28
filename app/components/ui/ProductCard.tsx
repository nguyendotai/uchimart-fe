  "use client";
  import React, { useState } from "react";
  import { MdOutlineAddShoppingCart, MdEventAvailable } from "react-icons/md";
  import { GoDotFill } from "react-icons/go";
  import Image from "next/image";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { useDispatch } from "react-redux";
  import { useTranslation } from "react-i18next";
  import { toast } from "react-toastify";

  import { addToCart } from "@/store/slices/cartSlice";
  import QuantityModal from "./QuantityModal";
  import type {
    Product as InventoryProduct,
    CartItem,
  } from "@/app/types/Product";
  import { formatCurrencyToNumber } from "@/app/utils/helpers";

  const ProductCard = ({ product }: { product: InventoryProduct }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState<"addToCart" | "buyNow" | null>(
      null
    );

    const salePrice = formatCurrencyToNumber(product.sale_price);
  const offerPrice = formatCurrencyToNumber(product.offer_price ?? "0");

  const hasSale = offerPrice > 0 && offerPrice < salePrice;


    const discount = hasSale
      ? Math.round(((salePrice - offerPrice) / salePrice) * 100)
      : 0;

    const handleConfirm = (quantity: number) => {
      const selectedItem: CartItem = {
        ...product,
        cartQuantity: quantity,
      };

      if (actionType === "buyNow") {
        localStorage.setItem("selectedItems", JSON.stringify([selectedItem]));
        router.push("/check-out");
      } else {
        dispatch(addToCart(selectedItem));
        toast.success("Đã thêm vào giỏ hàng!");
      }

      setShowModal(false);
      setActionType(null);
    };
    console.log("🧪 ProductCard:", {
    title: product.title,
    sale_price: product.sale_price,
    offer_price: product.offer_price,
    salePrice,
    offerPrice,
    hasSale,
  });


    return (
      <div className="relative group">
        {/* Modal */}
        <QuantityModal
          key={actionType}
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
          productName={product.title}
          productImage={product.image}
          productPrice={salePrice}
          productPromotionPrice={hasSale ? offerPrice : undefined}
          productStock={product.stock_quantity}
        />

        {/* Tag giảm giá */}
        {hasSale && (
          <div className="absolute top-[-9px] left-[-8px] z-10 overflow-hidden">
            <div className="w-[80px] h-5 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center rounded-tl-md rounded-br-md shadow">
              GIẢM {discount}%
            </div>
          </div>
        )}

        {/* Hình ảnh */}
        <Link
          href={`/product/${product.slug}`}
          className="w-full h-[150px] bg-white flex items-center justify-center overflow-hidden"
        >
          <Image
            src={product.image || "/fallback.jpg"}
            alt={product.title}
            width={230}
            height={230}
            className="w-[90%] h-[80%] object-contain rounded max-w-[200px] max-h-[200px] transition-transform duration-300 ease-in-out group-hover:scale-105"
            unoptimized
          />
        </Link>

        {/* Nút hành động */}
        <div className="flex justify-between gap-2 py-1">
          <button
            onClick={() => {
              setActionType("buyNow");
              setShowModal(true);
            }}
            className="flex justify-center items-center bg-white border border-[#921573] text-[#921573] rounded-full p-1 w-[79%] transition-all duration-200 ease-in-out hover:bg-[#921573] hover:text-white"
          >
            {t("buyNow")}
          </button>

          <button
            onClick={() => {
              setActionType("addToCart");
              setShowModal(true);
            }}
            className="flex justify-center items-center bg-white border border-[#921573] text-[#921573] rounded-full p-1 w-[20%] transition-all duration-200 ease-in-out hover:bg-[#921573] hover:text-white"
          >
            <MdOutlineAddShoppingCart />
          </button>
        </div>

        {/* Nội dung */}
        <div className="mt-2">
          <a
            href={`/product/${product.slug}`}
            className="block max-w-full p-1 font-normal text-[14px] truncate"
          >
            {product.title}
          </a>

          {/* Giá */}
          <div>
            {hasSale ? (
              <>
                <span className="p-1 text-[#FB5D08] font-medium">
                  {offerPrice.toLocaleString()}đ
                </span>
                <del className="text-[#999999] text-[14px]">
                  {salePrice.toLocaleString()}đ
                </del>
              </>
            ) : (
              <span className="p-1 text-[#FB5D08] font-medium">
                {salePrice.toLocaleString()}đ
              </span>
            )}
          </div>

          {/* Tình trạng + đã bán */}
          <div className="flex gap-2 items-center text-[14px]">
            <div className="flex items-center gap-1 text-[#26AA99]">
              <MdEventAvailable
                className={product.status_name !== "Active" ? "text-red-500" : ""}
              />
              <span
                className={product.status_name !== "Active" ? "text-red-500" : ""}
              >
                {product.status_name === "Active" ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <GoDotFill className="text-[8px]" />
              <span className="text-[12px]">Đã bán {product.sold_count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;

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

import QuantityModal from "./QuantityModal";
import type { Inventory, CartItem } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { addToCartLocal, addToCartApi } from "@/store/slices/cartSlice";
import { AppDispatch } from "@/store";

const ProductCard = ({ product }: { product: Inventory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"addToCart" | "buyNow" | null>(
    null
  );

  const isLoggedIn = !!localStorage.getItem("token");

  const salePrice = formatCurrencyToNumber(product.sale_price);
  const offerPrice = formatCurrencyToNumber(product.offer_price ?? "0");
  const hasSale = offerPrice > 0 && offerPrice < salePrice;
  const discount = hasSale
    ? Math.round(((salePrice - offerPrice) / salePrice) * 100)
    : 0;

  const handleConfirm = async (quantity: number) => {
    try {
      if (isLoggedIn) {
        await dispatch(
          addToCartApi({
            inventory_id: product.id, // product ở đây là inventory
            quantity,
          })
        ).unwrap();
        toast.success("Đã thêm vào giỏ hàng (API)!");
      } else {
        const selectedItem: CartItem = {
          id: product.id,
          inventory_id: product.id,
          quantity,
          sale_price: product.sale_price ?? "0₫",
          offer_price: product.offer_price ?? null,
          image: product.image ?? "",
          title: product.title ?? "",
          total_price:
            quantity *
            formatCurrencyToNumber(product.offer_price ?? product.sale_price),
          inventory: product, // optional
        };

        dispatch(addToCartLocal(selectedItem));
        toast.success("Đã thêm vào giỏ hàng (Local)!");
      }

      if (actionType === "buyNow") {
        localStorage.setItem(
          "selectedItems",
          JSON.stringify([
            {
              id: product.id,
              inventory_id: product.id,
              quantity,
              inventory: { ...product },
            },
          ])
        );
        router.push("/check-out");
      }
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ!");
    }

    setShowModal(false);
    setActionType(null);
  };

  return (
    <div className="relative group w-full max-w-[200px] mx-auto">
      <QuantityModal
        key={actionType ?? "modal"}
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        productName={product.title}
        productImage={product.image}
        productPrice={salePrice}
        productPromotionPrice={hasSale ? offerPrice : undefined}
        productStock={product.stock_quantity}
      />

      {hasSale && (
        <div className="absolute top-[-8px] left-[-8px] z-10">
          <div className="w-[70px] h-5 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center rounded-tl-md rounded-br-md shadow">
            GIẢM {discount}%
          </div>
        </div>
      )}

      <Link
        href={`/product/${product.slug}`}
        className="w-full h-[120px] sm:h-[150px] bg-white flex items-center justify-center overflow-hidden"
      >
        <Image
          src={product.image || "/fallback.jpg"}
          alt={product.title}
          width={200}
          height={200}
          className="w-[85%] h-[85%] object-contain rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
          unoptimized
        />
      </Link>

      <div className="flex justify-between gap-2 py-1 px-1">
        <button
          onClick={() => {
            setActionType("buyNow");
            setShowModal(true);
          }}
          className="flex justify-center items-center bg-white border border-[#921573] text-[#921573] text-xs sm:text-sm rounded-full px-2 py-1 w-[80%] hover:bg-[#921573] hover:text-white transition"
        >
          {t("buyNow")}
        </button>

        <button
          onClick={() => {
            setActionType("addToCart");
            setShowModal(true);
          }}
          className="flex justify-center items-center bg-white border border-[#921573] text-[#921573] text-sm rounded-full px-2 py-1 w-[20%] hover:bg-[#921573] hover:text-white transition"
        >
          <MdOutlineAddShoppingCart size={16} />
        </button>
      </div>

      <div className="mt-2 px-1">
        <Link
          href={`/product/${product.slug}`}
          className="block text-sm sm:text-[14px] font-normal line-clamp-2 h-[38px] overflow-hidden"
        >
          {product.title}
        </Link>

        <div className="text-sm sm:text-base mt-1">
          {hasSale ? (
            <>
              <span className="text-[#FB5D08] font-medium">
                {offerPrice.toLocaleString()}đ
              </span>
              <del className="text-[#999999] text-xs sm:text-sm ml-2">
                {salePrice.toLocaleString()}đ
              </del>
            </>
          ) : (
            <span className="text-[#FB5D08] font-medium">
              {salePrice.toLocaleString()}đ
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 mt-1 gap-x-2">
          <div className="flex items-center gap-1 text-[#26AA99]">
            <MdEventAvailable
              className={product.status_name !== "Active" ? "text-red-500" : ""}
              size={14}
            />
            <span
              className={product.status_name !== "Active" ? "text-red-500" : ""}
            >
              {product.status_name === "Active" ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <GoDotFill className="text-[8px]" />
            <span>Đã bán {product.sold_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

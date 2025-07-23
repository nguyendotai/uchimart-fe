"use client";
import React, { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Product, CartItem } from "@/app/types/Product";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import QuantityModal from "./QuantityModal";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: Product }) => {
  const [showNotif, setShowNotif] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const {t, i18n} = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"addToCart" | "buyNow" | null>(
    null
  );

  const hasSale =
    product.promotion_price !== undefined &&
    product.promotion_price < product.price;

  const discount = hasSale
    ? Math.round(
        ((product.price - product.promotion_price!) / product.price) * 100
      )
    : 0;

  const handleConfirm = (quantity: number) => {
    const selectedItem = {
      ...product,
      cartQuantity: quantity,
    };

    if (actionType === "buyNow") {
      // ✅ Lưu đầy đủ thông tin sản phẩm đã chọn
      localStorage.setItem("selectedItems", JSON.stringify([selectedItem]));

      // ✅ Điều hướng sang trang thanh toán
      router.push("/check-out");
    } else {
      // Trường hợp addToCart bình thường
      dispatch(addToCart(selectedItem));
      toast.success("Đã thêm vào giỏ hàng!");
    }
    setShowModal(false);
    setActionType(null);
  };

  return (
    <div className="relative group">
      {/* Modal */}
      <QuantityModal
        key={actionType}
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        productName={product.name}
        productImage={product.image}
        productPrice={product.price}
        productPromotionPrice={product.promotion_price}
        productStock={product.quantity}
      />

      {/* sale */}
      {hasSale && (
        <div className="absolute top-[-9px] left-[-8px] z-10 overflow-hidden">
          <div className="w-[80px] h-5 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center rounded-tl-md rounded-br-md shadow">
            GIẢM {discount}%
          </div>
        </div>
      )}

      {/* Ảnh */}
      <Link
        href={`/product/${product.slug}`}
        className="w-full h-[150px] bg-white flex items-center justify-center overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={230}
          height={230}
          className="w-full h-full object-contain rounded max-w-[200px] max-h-[200px] transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      {/* Button */}
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
          <MdOutlineAddShoppingCart></MdOutlineAddShoppingCart>
        </button>
      </div>

      {/* Content */}
      <div className="mt-2">
        {/* Name */}
        <a
          href={`/product/${product.slug}`}
          className="p-1 font-normal truncate"
        >
          {product.name}
        </a>

        {/* Description */}
        {/* <p className="px-1 text-gray-600 text-xs line-clamp-2">
          {product.description}
        </p> */}

        {/* Price */}
        <div className="">
          {hasSale ? (
            <>
              <span className="p-1 text-[#FB5D08] font-medium">
                {product.promotion_price.toLocaleString()}đ
              </span>
              <del className="text-[#999999] text-[14px]">
                {product.price.toLocaleString()}đ
              </del>
            </>
          ) : (
            <span className="p-1 text-[#FB5D08] font-medium">
              {product.price.toLocaleString()}đ
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center text-[14px]">
          {/* Trạng thái còn hàng / hết hàng */}
          <div className="flex items-center gap-1 text-[#26AA99]">
            <span
              className={`${product.status !== "inStock" && "text-red-500"}`}
            >
              <MdEventAvailable />
            </span>
            <span
              className={`${product.status !== "inStock" && "text-red-500"}`}
            >
              {product.status === "inStock" ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>

          {/* Đã bán */}
          <div className="flex items-center gap-1 text-gray-500">
            <GoDotFill className="text-[8px]" />
            <span className="text-[12px]">Đã bán {product.sold}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

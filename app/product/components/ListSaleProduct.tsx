"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { Product } from "@/app/types/Product";

interface Props {
  currentProduct: Product;
}

const ListSaleProduct = ({ currentProduct }: Props) => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const categoryGroupId =
      currentProduct?.subcategories?.[0]?.category?.category_group?.id;

    if (!categoryGroupId) return;

    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data.success || !Array.isArray(data.data)) return;

        // Giả sử mỗi item trong data.data là Product (Inventory đã flatten)
        const filtered = data.data
          .filter((p: Product) => {
            // Parse giá vì sale_price và offer_price là string có thể chứa ký tự ₫
            const sale = parseInt(p.sale_price.replace(/[₫,.]/g, ""));
            const offer = parseInt(
              (p.offer_price || "0").replace(/[₫,.]/g, "")
            );

            const sameGroup =
              p.subcategories?.[0]?.category?.category_group?.id ===
              categoryGroupId;

            return sameGroup && sale > offer;
          })
          .slice(0, 6);

        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, [currentProduct]);

  if (saleProducts.length === 0) return null;

  return (
    <div className="bg-[#FED7D7] shadow rounded-xl p-6 relative flex justify-center">
      <span className="absolute top-0 left-0 py-2 px-4 font-medium text-xl bg-red-500 text-white rounded-tl-xl rounded-br-xl">
        Khuyến mãi HOT
      </span>
      <div className="flex justify-between items-center mt-10 w-full gap-2 flex-wrap">
        {saleProducts.map((product) => (
          <div
            key={product.id}
            className="w-[15.5%] bg-white shadow rounded-xl p-2"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSaleProduct;

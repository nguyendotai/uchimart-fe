"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import { Product } from "@/app/types/Product";
import {
  formatCurrencyToNumber,
} from "../utils/helpers";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const products = res?.data ?? [];

        // ✅ Lấy tất cả inventories
        const allInventories = products.flatMap(
          (p: { inventories: Product[] }) => p.inventories || []
        );

        // ✅ Lọc sản phẩm có khuyến mãi
        const filtered = allInventories.filter(
          (p: {
            sale_price: string | null | undefined;
            offer_price: string | null | undefined;
          }) => {
            const sale = formatCurrencyToNumber(p.sale_price);
            const promo = formatCurrencyToNumber(p.offer_price);
            return !isNaN(sale) && !isNaN(promo) && promo > 0 && promo < sale;
          }
        );

        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    <div>
      {saleProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow">
          <img
            src="/no-sale-today.png"
            alt="Không có sản phẩm khuyến mãi"
            className="w-40 h-40 object-contain mb-4"
          />
          <p className="text-gray-500 text-center text-lg font-medium">
            Hôm nay không có sản phẩm đang khuyến mãi.
          </p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 justify-between">
          {saleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow">
              <img
                src="/no-sale-today.png"
                alt="Không có sản phẩm khuyến mãi"
                className="w-40 h-40 object-contain mb-4"
              />
              <p className="text-gray-500 text-center text-lg font-medium">
                Hôm nay không có sản phẩm đang khuyến mãi.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-6 gap-4">
              {saleProducts.map((product) => (
                <li
                  key={product.id}
                  className="bg-white shadow rounded-xl p-2 relative"
                >
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </ul>
      )}
    </div>
  );
};

export default ListSaleProduct;

"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import { Inventory, Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "../utils/helpers";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Inventory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const products: Product[] = res?.data ?? [];

        const inventoriesWithSub: Inventory[] = products.flatMap((p) =>
          p.inventories.map((inv) => ({
            ...inv,
            subcategories: p.subcategories,
            unit: undefined,
          }))
        );

        const filtered = inventoriesWithSub.filter((inv) => {
          const sale = formatCurrencyToNumber(inv.sale_price);
          const promo = formatCurrencyToNumber(inv.offer_price ?? "0");
          return !isNaN(sale) && !isNaN(promo) && promo > 0 && promo < sale;
        });

        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err))
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);

  if (isLoading) return null;

  return (
    <div>
      <div className="bg-white shadow rounded-xl p-4 flex items-center justify-start gap-2 text-xl font-semibold text-red-600 mb-4">
      Khuyến mãi hôm nay
    </div>
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
              className="border border-gray-200 rounded-xl p-2 relative"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListSaleProduct;

"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { Inventory, Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";

interface Props {
  categoryGroupId: number;
}

const ListSaleProduct = ({ categoryGroupId }: Props) => {
  const [saleProducts, setSaleProducts] = useState<Inventory[]>([]);

  useEffect(() => {
    if (!categoryGroupId) return;

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
            unit: inv.unit ?? "sp",
            product: p,
          }))
        );

        const filtered = inventoriesWithSub.filter((inv) => {
          const sale = formatCurrencyToNumber(inv.sale_price);
          const promo = formatCurrencyToNumber(inv.offer_price ?? "0");

          const inSameCategoryGroup =
            inv.subcategories?.some(
              (sub) => sub.category.category_group.id === categoryGroupId
            ) ?? false;

          return (
            !isNaN(sale) &&
            !isNaN(promo) &&
            promo > 0 &&
            promo < sale &&
            inSameCategoryGroup
          );
        });

        setSaleProducts(filtered.slice(0, 6));
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, [categoryGroupId]);

  if (saleProducts.length === 0) return null;

  return (
    <div className="bg-[#FED7D7] shadow rounded-xl p-6 relative flex justify-center mt-10">
      <span className="absolute top-0 left-0 py-2 px-4 font-medium text-xl bg-red-500 text-white rounded-tl-xl rounded-br-xl">
        Khuyến mãi HOT
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-10 px-2">
        {saleProducts.map((inventory) => (
          <div
            key={inventory.id}
            className="bg-white border border-gray-200 rounded-xl p-2"
          >
            <ProductCard product={inventory} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSaleProduct;
"use client";
import React from "react";
import { Product } from "@/app/types/Product";
import ProductCard from "../../../components/ui/ProductCard";

type Props = {
  currentProduct: Product;
  allProducts: Product[];
};

const ListSaleProduct = ({ currentProduct, allProducts }: Props) => {
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.promotion_price &&
        p.promotion_price < p.price
    )
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2 p-2 bg-white w-[19%] text-center rounded-xl">
        Sản phẩm giảm giá
      </h2>
      <ul className="flex flex-wrap gap-4 justify-between">
        {related.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow rounded-xl p-2 relative w-[18.9%]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSaleProduct;

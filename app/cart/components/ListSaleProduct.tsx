"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "@/app/components/ui/ProductCard";
import { Product, Inventory } from "@/app/types/Product"; // Đảm bảo đúng loại Product từ Inventory
import { productCarouselSettings_7 } from "@/app/utils/carouselSettings_7";
import { formatCurrencyToNumber } from "@/app/utils/helpers";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Inventory[]>([]);
  
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
        .catch((err) => console.error("Lỗi tải dữ liệu:", err));
    }, []);

  return (
    <>
      <h2 className="text-3xl font-semibold mb-2 text-[#921573] p-2 rounded w-fit text-center">
        Sản phẩm khuyến mãi
      </h2>
      {saleProducts.length > 0 ? (
        <Slider {...productCarouselSettings_7}>
          {saleProducts.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white shadow rounded-xl p-2 h-full">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 px-4">Không có sản phẩm khuyến mãi.</p>
      )}
    </>
  );
};

export default ListSaleProduct;

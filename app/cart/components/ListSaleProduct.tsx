"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "@/app/components/ui/ProductCard";
import { Product } from "@/app/types/Product"; // Đảm bảo đúng loại Product từ Inventory
import { productCarouselSettings_7 } from "@/app/utils/carouselSettings_7";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  // Helper: parse giá chuỗi "43,000₫" => 43000
  const parsePrice = (price: string | number | null | undefined) => {
    if (!price) return 0;
    if (typeof price === "number") return price;
    return Number(price.replace(/[₫,.]/g, "")) || 0;
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((products: Product[]) => {
        const filtered = products
          .filter((p) => {
            const normalPrice = parsePrice(p.sale_price);
            const promoPrice = parsePrice(p.offer_price ?? p.purchase_price);
            return promoPrice > 0 && promoPrice < normalPrice;
          })
          .slice(0, 12);

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

"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "@/app/components/UI/ProductCard";
import { Product } from "@/app/types/Product";
import { productCarouselSettings } from "@/app/utils/carouselSettings";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json() as Promise<Product[]>;
      })
      .then((products) => {
        const filtered = products
          .filter(
            (p) =>
              p.promotion_price !== undefined && p.promotion_price < p.price
          )
          .slice(0, 12);
        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    
        <>
      <h2 className="text-3xl font-semibold mb-2 text-[#921573] p-2 rounded w-[21%] text-center">
        Sản phẩm khuyến mãi
      </h2>
       <Slider {...productCarouselSettings}>
        {saleProducts.map((product) => (
          <div key={product.id} className="px-2">
            <div
            className="bg-white shadow rounded-xl p-2 h-full"
          >
            <ProductCard product={product} />
          </div>
          </div>
          
        ))}
       </Slider>
      </>
    
  );
};

export default ListSaleProduct;

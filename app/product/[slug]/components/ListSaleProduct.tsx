"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { productCarouselSettings } from "@/app/utils/carouselSettings";
import ProductCard from "../../../components/ui/ProductCard";

type Props = {
  currentProduct: Product;
  allProducts: Product[];
};

const ListSaleProduct = ({ currentProduct, allProducts }: Props) => {
  // ✅ Lọc các sản phẩm khác đang giảm giá
  const related = allProducts
    .filter((p) => {
      if (p.id === currentProduct.id) return false;

      const salePrice = formatCurrencyToNumber(p.sale_price);
      const offerPrice = formatCurrencyToNumber(p.offer_price ?? "0");

      return !isNaN(salePrice) && !isNaN(offerPrice) && offerPrice > 0 && offerPrice < salePrice;
    })
    .slice(0, 10); // tuỳ số lượng muốn hiển thị

  if (related.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-[#921573] pl-2">
        Sản phẩm đang khuyến mãi
      </h2>

      <Slider {...productCarouselSettings}>
        {related.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-white shadow rounded-xl p-2 h-full">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ListSaleProduct;

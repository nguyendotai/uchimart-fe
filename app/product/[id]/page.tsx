"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";
import ListCategories from "@/app/components/UI/ListCategories";
import ProductImages from "@/app/components/UIProductDetail/ProductImages";
import BuyBox from "@/app/components/UIProductDetail/BuyBox";
import ProductInfo from "@/app/components/UIProductDetail/ProductInfo";
import RelatedProducts from "@/app/components/UIProductDetail/RelatedProducts";
import SliderBanner from "@/app/components/UIProductDetail/SliderBanner";
import ListSaleProduct from "@/app/components/UIProductDetail/ListSaleProduct";
import PageTransitionWrapper from "@/app/components/Animation/PageTransitionWrapper";

const DetailProduct = () => {
  const params = useParams();
  const id = Number(params?.id);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json() as Promise<Product[]>;
      })
      .then((products) => {
        const found = products.find((p) => p.id === id) || null;
        setProduct(found);
        setAllProducts(products);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch("/data/brands.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json() as Promise<Brand[]>;
      })
      .then((data) => setBrands(data))
      .catch((err) => console.error("Lỗi tải brands:", err));
  }, []);

  const brand = brands.find((b) => b.id === product?.brand_id);

  return (
  <PageTransitionWrapper>
    <div className="w-full">
      <div className="container mx-auto mt-2 flex justify-between">
        {/* Sidebar */}
        <div className="w-[17%] bg-white shadow rounded-xl p-2 sticky top-32 self-start">
          <ListCategories />
        </div>

        {/* Center - Images */}
        <div className="w-[82%]">
          {loading || !product ? (
            <div className="text-center mt-10">Đang tải sản phẩm...</div>
          ) : (
            <>
              <div className="flex gap-2 justify-between">
                <div className="w-[58.5%]">
                  <ProductImages product={product} />
                  <ProductInfo product={product} brand={brand} />
                  <SliderBanner />
                </div>

                <BuyBox
                  product={product}
                  brand={brand}
                  allProducts={allProducts}
                  onSelect={(p) => setProduct(p)}
                />
              </div>

              <RelatedProducts currentProduct={product} allProducts={allProducts} />
              <ListSaleProduct currentProduct={product} allProducts={allProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  </PageTransitionWrapper>
);

};

export default DetailProduct;

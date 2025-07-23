"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// 🧩 Types
import { Product } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";

// 🧭 UI Components
import Notification from "@/app/components/ui/Notification";

// 📦 Product Detail Components
import ProductImages from "@/app/product/[slug]/components/ProductImages";
import BuyBox from "@/app/product/[slug]/components/BuyBox";
import ProductInfo from "@/app/product/[slug]/components/ProductInfo";
import RelatedProducts from "@/app/product/[slug]/components/RelatedProducts";
import SliderBanner from "@/app/product/[slug]/components/SliderBanner";
import ListSaleProduct from "@/app/product/[slug]/components/ListSaleProduct";

// 🎬 Animation
import PageTransitionWrapper from "@/app/components/Animation/PageTransitionWrapper";


const DetailProduct = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json() as Promise<Product[]>;
      })
      .then((products) => {
        const found = products.find((p) => p.slug === slug) || null;
        setProduct(found);
        setAllProducts(products);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

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

          {/* Center - Images */}
          <div className="w-full">
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
                    onNotify={() => {
                      setShowNotif(true);
                      setTimeout(() => setShowNotif(false), 2000);
                    }}
                  />
                </div>

                <RelatedProducts
                  currentProduct={product}
                  allProducts={allProducts}
                />
                <ListSaleProduct
                  currentProduct={product}
                  allProducts={allProducts}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Notification show={showNotif} message="Đã thêm vào giỏ hàng!" />
    </PageTransitionWrapper>
  );
};

export default DetailProduct;

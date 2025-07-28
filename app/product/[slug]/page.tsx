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
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        const allData = response.data;

        let foundProduct: Product | null = null;

        for (const product of allData) {
          const inventory = product.inventories?.find(
            (inv: any) => inv.slug === slug
          );

          if (inventory) {
            foundProduct = {
              ...inventory,
              brand: product.brand,
              description: product.description,
              primary_image: product.primary_image,
              subcategories: product.subcategories,
              product_code: product.code, // nếu cần
              category_id:
                product.subcategories?.[0]?.category?.id ?? undefined,
            };

            break;
          }
        }

        setProduct(foundProduct);
        const allVariants: Product[] = [];

        for (const product of allData) {
          const baseData = {
            brand: product.brand,
            description: product.description,
            primary_image: product.primary_image,
            subcategories: product.subcategories,
            product_code: product.code,
            category_id: product.subcategories?.[0]?.category?.id,
          };

          for (const inv of product.inventories) {
            allVariants.push({
              ...inv,
              ...baseData,
            });
          }
        }

        setAllProducts(allVariants); // ✅ now this is the correct data for ProductVariants
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm từ API:", err);
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

  const brand = brands.find((b) => b.id === product?.product?.brand?.id);

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
                    <ProductInfo product={product} />
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

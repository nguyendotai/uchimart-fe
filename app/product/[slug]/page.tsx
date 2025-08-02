"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// 🧩 Types
import { Inventory, Product } from "@/app/types/Product";
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

  const [allInventories, setAllInventories] = useState<Inventory[]>([]);
  const [currentInventory, setCurrentInventory] = useState<Inventory | null>(
    null
  );
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
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
        const inventories: Inventory[] = [];
        let selectedInventory: Inventory | null = null;
        let selectedProduct: Product | null = null;

        for (const product of allData) {
          for (const inv of product.inventories || []) {
            const inventory: Inventory = {
              ...inv,
              product: {
                code: product.code,
              },
              subcategories: product.subcategories,
            };

            inventories.push(inventory);

            if (inv.slug === slug) {
              selectedInventory = inventory;
              selectedProduct = product;
            }
          }
        }

        setAllInventories(inventories);
        setCurrentInventory(selectedInventory);
        setCurrentProduct(selectedProduct);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm từ API:", err);
        setCurrentInventory(null);
        setCurrentProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <PageTransitionWrapper>
      <div className="w-full">
        <div className="container mx-auto mt-2 flex justify-between">
          <div className="w-full">
            {loading || !currentInventory || !currentProduct ? (
              <div className="text-center mt-10">Đang tải sản phẩm...</div>
            ) : (
              <>
                <div className="flex gap-2 justify-between">
                  {/* Bên trái: hình ảnh, mô tả, banner */}
                  <div className="w-[58.5%]">
                    <ProductImages
                      inventory={currentInventory}
                      product={currentProduct}
                    />
                    <ProductInfo
                      inventory={currentInventory}
                      product={currentProduct}
                    />
                    <SliderBanner />
                  </div>

                  {/* Bên phải: thông tin mua hàng */}
                  <BuyBox
                    inventory={currentInventory}
                    product={currentProduct}
                    allInventories={currentProduct?.inventories}
                    onSelect={(inv) => {
                      setCurrentInventory(inv);
                    }}
                    onNotify={() => {
                      setShowNotif(true);
                      setTimeout(() => setShowNotif(false), 2000);
                    }}
                  />
                </div>

                {/* Sản phẩm liên quan + đang khuyến mãi */}
                <RelatedProducts
                  currentInventory={currentInventory}
                  allProducts={allInventories}
                />

                <ListSaleProduct
                  currentProduct={currentProduct}
                  allProducts={allInventories}
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

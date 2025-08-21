"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

// 🧩 Types
import { Inventory, Product } from "@/app/types/Product";

// 🎬 Animation Wrapper
import PageTransitionWrapper from "@/app/components/Animation/PageTransitionWrapper";
import Notification from "@/app/components/ui/Notification";

// 🧩 Dynamic Components (lazy load)
const ProductImages = dynamic(
  () => import("@/app/product/[slug]/components/ProductImages")
);
const ProductInfo = dynamic(
  () => import("@/app/product/[slug]/components/ProductInfo")
);
const BuyBox = dynamic(() => import("@/app/product/[slug]/components/BuyBox"));
const SliderBanner = dynamic(
  () => import("@/app/product/[slug]/components/SliderBanner")
);
const RelatedProducts = dynamic(
  () => import("@/app/product/[slug]/components/RelatedProducts")
);
const ListSaleProduct = dynamic(
  () => import("@/app/product/[slug]/components/ListSaleProduct")
);

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

  // 👀 In-view tracking
  const { ref: imagesRef, inView: imagesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: buyBoxRef, inView: buyBoxInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: relatedRef, inView: relatedInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: saleRef, inView: saleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
                brand: product.brand, // ✅ giữ brand
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

  const Skeleton = ({ height = 200, grid = 1, sections = 1 }) => (
    <div className="space-y-4">
      {Array.from({ length: sections }).map((_, idx) => (
        <div key={idx} className={`grid grid-cols-${grid} gap-4`}>
          {Array.from({ length: grid }).map((_, i) => (
            <div
              key={i}
              style={{ height }}
              className="bg-gray-200 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );

  const { ref: buyBoxMobileRef, inView: buyBoxMobileInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <PageTransitionWrapper>
      <div className="w-full">
        <div className="container mx-auto mt-2 flex justify-between">
          <div className="w-full">
            {loading || !currentInventory || !currentProduct ? (
              <div className="space-y-6">
                {/* Hình ảnh + thông tin sản phẩm (giả lập) */}
                <Skeleton height={300} grid={2} />

                {/* Mua hàng bên phải */}
                <Skeleton height={300} grid={1} />

                {/* Banner */}
                <Skeleton height={100} grid={1} />

                {/* Sản phẩm liên quan */}
                <Skeleton height={250} grid={4} />

                {/* Sale product */}
                <Skeleton height={250} grid={4} />
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  {/* Bên trái (mobile: ảnh + BuyBox + mô tả) */}
                  <div className="w-full sm:w-[58.5%] flex flex-col order-1 sm:order-1">
                    {/* Ảnh */}
                    <div ref={imagesRef}>
                      {imagesInView && (
                        <ProductImages
                          inventory={currentInventory}
                          product={currentProduct}
                        />
                      )}
                    </div>

                    {/* BuyBox: di chuyển vào cột trái trên mobile */}
                    <div ref={buyBoxMobileRef} className="mt-4 sm:hidden">
                      {buyBoxMobileInView && (
                        <BuyBox
                          inventory={currentInventory}
                          product={currentProduct}
                          allInventories={currentProduct?.inventories}
                          onSelect={(inv) => setCurrentInventory(inv)}
                        />
                      )}
                    </div>

                    {/* Mô tả */}
                    <div className="mt-4">
                      {imagesInView && (
                        <ProductInfo
                          inventory={currentInventory}
                          product={currentProduct}
                        />
                      )}
                    </div>

                    {/* Banner */}
                    <div ref={bannerRef} className="mt-4">
                      {bannerInView && <SliderBanner />}
                    </div>
                  </div>

                  {/* Bên phải: BuyBox chỉ hiện ở desktop */}
                  <div
                    ref={buyBoxRef}
                    className="w-[40%] hidden sm:block order-2"
                  >
                    {buyBoxInView && (
                      <BuyBox
                        inventory={currentInventory}
                        product={currentProduct}
                        brand={currentProduct?.brand}
                        allInventories={currentProduct?.inventories}
                        onSelect={(inv) => setCurrentInventory(inv)}
                      />
                    )}
                  </div>
                </div>

                {/* Sản phẩm liên quan + đang khuyến mãi */}
                <div ref={relatedRef}>
                  {relatedInView && (
                    <RelatedProducts
                      currentInventory={currentInventory}
                      allProducts={allInventories}
                    />
                  )}
                </div>

                <div ref={saleRef}>
                  {saleInView && (
                    <ListSaleProduct
                      currentProduct={currentProduct}
                      allProducts={allInventories}
                    />
                  )}
                </div>
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

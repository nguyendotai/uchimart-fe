"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard";
import { Product, Inventory } from "@/app/types/Product";
import { toast } from "react-toastify";

export default function BrandPage() {
  const { id } = useParams() as { id: string }; // id brand từ URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        const productList: Product[] = Array.isArray(data) ? data : data.data;

        console.log("API products:", productList);

        // ✅ Lọc sản phẩm theo brand.id
        const filtered = productList.filter((p: Product) => {
          const brandId = p.brand?.id;
          console.log("Check brand:", brandId, "compare with:", id);
          return String(brandId) === String(id);
        });

        setProducts(filtered);
      } catch (err) {
        console.error(err);
        toast.error("Không load được sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p className="text-center py-10">Đang tải sản phẩm...</p>;

  if (products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <img
          src="/img/online-store-10.png" // 👉 thay bằng link ảnh cụ thể bạn chọn
          alt="Không có sản phẩm"
          className="w-72 h-72 object-contain"
        />
        <p className="mt-4 text-gray-600">
          Không có sản phẩm thuộc brand này
        </p>
      </div>
    );

  // ✅ brand chung cho trang (lấy từ sản phẩm đầu tiên)
  const brandInfo = products[0]?.brand;

  return (
    <div className="p-4 space-y-4">
      {/* Brand info */}
      {brandInfo && (
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-xl font-bold">Các sản phẩm của thương hiệu:</h1>
          <h1 className="text-xl font-bold text-[#921573]">{brandInfo.name}</h1>
        </div>
      )}

      {/* Product list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {products.flatMap((product: Product) =>
          product.inventories.map((inventory: Inventory) => (
            <div
              className="border border-gray-200 rounded-xl 
          p-2 sm:p-3 bg-white"
            >
              <ProductCard
                key={inventory.id}
                product={{
                  ...inventory, // field inventory
                  brand: product.brand, // ✅ gắn brand cha
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

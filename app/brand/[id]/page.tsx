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
      <p className="text-center py-10">
        Không tìm thấy sản phẩm thuộc brand này
      </p>
    );

  // ✅ brand chung cho trang (lấy từ sản phẩm đầu tiên)
  const brandInfo = products[0]?.brand;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Brand info */}
      {brandInfo && (
        <div className="flex items-center gap-4 mb-6">
          <img
            src={brandInfo.image}
            alt={brandInfo.name}
            className="w-[80px] h-[80px] object-contain"
          />
          <h1 className="text-2xl font-bold">{brandInfo.name}</h1>
        </div>
      )}

      {/* Product list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.flatMap((product: Product) =>
          product.inventories.map((inventory: Inventory) => (
            <ProductCard
              key={inventory.id}
              product={{
                ...inventory, // field inventory
                brand: product.brand, // ✅ gắn brand cha
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

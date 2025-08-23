"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import { Inventory, Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "../utils/helpers";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Inventory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setItemsPerPage(mobile ? 4 : 12); // 👈 mobile = 4, desktop = 12
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch dữ liệu sản phẩm
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const products: Product[] = res?.data ?? [];

        const inventoriesWithSub: Inventory[] = products.flatMap((p) =>
          p.inventories.map((inv) => ({
            ...inv,
            subcategories: p.subcategories,
            unit: undefined,
          }))
        );

        const filtered = inventoriesWithSub.filter((inv) => {
          const sale = formatCurrencyToNumber(inv.sale_price);
          const promo = formatCurrencyToNumber(inv.offer_price ?? "0");
          return !isNaN(sale) && !isNaN(promo) && promo > 0 && promo < sale;
        });

        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;

  const totalPages = Math.ceil(saleProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = saleProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="bg-white shadow rounded-xl p-4 flex items-center justify-start gap-2 text-xl font-semibold text-red-600 mb-4">
        Khuyến mãi hôm nay
      </div>

      {saleProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow">
          <img
            src="/no-sale-today.png"
            alt="Không có sản phẩm khuyến mãi"
            className="w-40 h-40 object-contain mb-4"
          />
          <p className="text-gray-500 text-center text-lg font-medium">
            Hôm nay không có sản phẩm đang khuyến mãi.
          </p>
        </div>
      ) : (
        <>
          {/* Grid layout: mobile 2 cột × 3 hàng, desktop 6 cột */}
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentProducts.map((product) => (
              <li
                key={product.id}
                className="border border-gray-200 rounded-xl p-2 relative"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {/* Phân trang: hiển thị ở mọi kích thước màn hình */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <FaAngleLeft />
              </button>

              {/* Trang số */}
              {isMobile
                ? [currentPage - 1, currentPage, currentPage + 1]
                    .filter((page) => page > 0 && page <= totalPages)
                    .map((page) => (
                      <button
                        key={page}
                        className={`px-4 py-2 rounded ${
                          page === currentPage
                            ? "bg-[#921573] text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))
                : Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`px-4 py-2 rounded ${
                          page === currentPage
                            ? "bg-[#921573] text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}

              <button
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListSaleProduct;

"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Inventory } from "@/app/types/Product";
import clsx from "clsx";

const placeholderTexts = [
  "Giá siêu rẻ...",
  "Sữa tươi nguyên chất...",
  "Thực phẩm tươi sống...",
  "Giảm giá hôm nay...",
];

const Search = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Inventory[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setKeyword("");
    setSuggestions([]);
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholderTexts.length);
        setIsVisible(true);
      }, 300);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 👉 gọi API & lọc sản phẩm
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        const json = await res.json();

        // ✅ Lấy mảng sản phẩm từ json.data
        const products = json.data || [];

        // ✅ Gom danh sách inventory (mỗi sản phẩm có nhiều inventory)
        const inventories = products.flatMap((p: any) =>
          p.inventories.map((inv: any) => ({
            id: inv.id,
            title: inv.title,
            productName: p.name,
            image: p.primary_image,
            slug: inv.slug || p.slug, // ✅ ưu tiên inventory.slug nếu có, không thì fallback sang product.slug
          }))
        );

        // ✅ Lọc theo keyword
        const filtered = inventories.filter((inv: any) =>
          inv.title.toLowerCase().includes(keyword.toLowerCase())
        );

        // ✅ Chỉ lấy tối đa 5 gợi ý
        setSuggestions(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [keyword]);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      router.push(`/search/${encodeURIComponent(trimmed)}`);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex relative">
      <div className="w-full flex gap-2 items-center">
        <div className="relative flex-1 min-w-0">
          <CiSearch
            onClick={handleSearch}
            className={clsx(
              "absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 cursor-pointer",
              isMobile ? "text-lg" : "text-xl"
            )}
          />

          {!keyword && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.span
                    key={placeholderTexts[index]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {placeholderTexts[index]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )}

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className={clsx(
              "w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00bf63] text-sm",
              isMobile ? "pl-8 pr-2 h-8" : "pl-10 pr-3 h-10"
            )}
          />

          {/* Danh sách gợi ý */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded shadow mt-1 z-50">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    router.push(`/product/${item.slug}`);
                    setSuggestions([]);
                  }}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                  )}
                  <span className="text-sm">{item.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="hidden sm:block h-8 sm:h-10 px-4 text-white rounded hover:bg-blue-600 whitespace-nowrap shrink-0"
          style={{ backgroundColor: "#921573" }}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Search;

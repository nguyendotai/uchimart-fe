"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const placeholderTexts = [
  "Giá siêu rẻ...",
  "Sữa tươi nguyên chất...",
  "Thực phẩm tươi sống...",
  "Giảm giá hôm nay...",
];

const Search = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setKeyword("");
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholderTexts.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      const encodedKeyword = encodeURIComponent(trimmed);
      router.push(`/search/${encodedKeyword}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-full flex gap-2 justify-between">
        <div className="relative w-[91%]">
          <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-xl" />
          {/* Animated placeholder text */}
          {/* Animated placeholder text */}
          {!keyword && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-sm whitespace-nowrap">
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
            className="w-full pl-10 text-black pr-3 h-10 placeholder-transparent border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00bf63]"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-[19%] h-10 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          style={{ backgroundColor: "#921573" }}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Search;

"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
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
    }, 1500);
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
      <div className="w-full flex gap-2 items-center">
        <div className="relative flex-1 min-w-0">
          <CiSearch
            className={clsx(
              "absolute top-1/2 left-2 -translate-y-1/2 text-gray-400",
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
        </div>

        <button
          onClick={handleSearch}
          className="h-8 sm:h-10 px-4 text-white rounded hover:bg-blue-600 whitespace-nowrap shrink-0"
          style={{ backgroundColor: "#921573" }}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Search;

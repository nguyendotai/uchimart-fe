"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobeAsia } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeLanguage = async (lang: string) => {
    setIsLoading(true);
    await i18n.changeLanguage(lang);
    setTimeout(() => {
      setIsLoading(false);       // Ngừng loading
      setShowOptions(false);     // Ẩn popup
    }, 500); // Cho animation mượt hơn (nếu muốn có cảm giác loading)
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div className="relative">
        {/* Nút chính */}
        <button
          onClick={() => setShowOptions((prev) => !prev)}
          className="bg-[#f3e5f5] rounded-full p-3 shadow hover:bg-gray-100 transition"
        >
          <FaGlobeAsia className="text-xl text-[#921573]" />
        </button>

        {/* Tùy chọn ngôn ngữ */}
        <AnimatePresence>
          {showOptions && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 right-10 bg-white shadow-lg rounded-md overflow-hidden z-50"
            >
              <button
                onClick={() => handleChangeLanguage("vi")}
                className="w-30 px-4 py-2 hover:bg-gray-100 text-left text-sm flex items-center gap-2"
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                onClick={() => handleChangeLanguage("en")}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left text-sm flex items-center gap-2"
              >
                🇺🇸 English
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute bottom-14 right-10 flex items-center justify-center bg-white p-2 rounded shadow">
            <div className="w-6 h-6 border-4 border-[#921573] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

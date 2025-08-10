"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-16 sm:bottom-6 right-4 z-[9999] p-3 rounded-full bg-[#921573] text-white shadow-lg hover:bg-[#740e5b] transition-all"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;

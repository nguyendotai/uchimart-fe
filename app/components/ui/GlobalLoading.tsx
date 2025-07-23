"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const GlobalLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events?.on("routeChangeStart", start);
    router.events?.on("routeChangeComplete", end);
    router.events?.on("routeChangeError", end);

    return () => {
      router.events?.off("routeChangeStart", start);
      router.events?.off("routeChangeComplete", end);
      router.events?.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-white/80 flex items-center justify-center"
        >
          <div className="w-10 h-10 border-4 border-[#921573] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoading;

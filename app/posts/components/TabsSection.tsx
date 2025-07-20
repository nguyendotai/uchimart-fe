"use client";
import { motion } from "framer-motion";

export default function TabsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex space-x-6 text-sm border-b pt-8 pb-2"
    >
      <button className="text-gray-500 hover:text-black">Bài viết mới</button>
      <button className="border-b-2 border-black font-semibold">
        Công thức nấu ăn
      </button>
    </motion.div>
  );
}

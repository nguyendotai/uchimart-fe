"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RecipeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mt-10 mb-4">Công thức nấu ăn</h2>
      <div className="flex gap-4 items-center">
        <Image
          src="/img/image_post.png"
          alt="Cơm chiên Dương Châu"
          width={180}
          height={100}
          className="rounded-lg"
        />
        <div>
          <p className="font-semibold text-sm">Cơm chiên Dương Châu (Yangzhou Fried Rice)</p>
          <p className="text-xs text-gray-400">1/1/2025</p>
        </div>
      </div>
    </motion.div>
  );
}

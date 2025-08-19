"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function TabsSection({
  activeCategory,
  onChange,
}: {
  activeCategory: number | null;
  onChange: (id: number) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/post-categories");
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex space-x-6 text-sm border-b pt-8 pb-2 overflow-x-auto"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`whitespace-nowrap pb-2 ${
            activeCategory === cat.id
              ? "border-b-2 border-black font-semibold text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </motion.div>
  );
}

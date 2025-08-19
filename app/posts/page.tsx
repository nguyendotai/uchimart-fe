"use client";
import { useState } from "react";
import HeroSection from "./components/HeroSection";
import TabsSection from "./components/TabsSection";
import RecipeSection from "./components/RecipeSection";

export default function OrganicPage() {
  const [activeCategory, setActiveCategory] = useState<number>(1); // 👈 mặc định 1

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <HeroSection />
      <TabsSection activeCategory={activeCategory} onChange={setActiveCategory} />
      <RecipeSection categoryId={activeCategory} />
    </div>
  );
}

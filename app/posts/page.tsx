'use client';
import HeroSection from "./components/HeroSection";
import TabsSection from "./components/TabsSection";
import VideoSection from "./components/VideoSection";
import RecipeSection from "./components/RecipeSection";

export default function OrganicPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <HeroSection />
      <TabsSection />
      <VideoSection />
      <RecipeSection />
    </div>
  );
}

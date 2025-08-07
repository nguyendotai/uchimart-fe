"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import { CategoryGroup } from "@/app/types/Category";
import { productCarouselSettings_Cate } from "../utils/carouselSettings_Cate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListCateHome = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category-groups")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setGroups(json.data ?? []);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch category groups:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleGroupClick = (groupId: number) => {
    router.push(`/product?category=${groupId}`);
  };

  if (isLoading) return null;

  return (
    <div className="bg-white shadow rounded-xl p-4 relative">
      <Slider {...productCarouselSettings_Cate}>
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className="px-2 cursor-pointer"
          >
            <div className="bg-white text-center p-2 rounded transition hover:shadow-md">
              <div className="w-16 mx-auto aspect-square mb-2 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={group.image || "/default.png"}
                  alt={group.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium truncate">{group.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ListCateHome;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import { CategoryGroup } from "@/app/types/Category";
import { productCarouselSettings_Cate } from "../utils/carouselSettings_Cate"; // hoặc "@/utils/carouselSettings"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListCateHome = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/category-groups");
        const json = await res.json();
        setGroups(json.data ?? []);
      } catch (error) {
        console.error("Lỗi khi fetch category groups:", error);
      }
    }

    fetchGroups();
  }, []);

  const handleGroupClick = (groupId: number) => {
    router.push(`/product?category=${groupId}`);
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 relative">
      <Slider {...productCarouselSettings_Cate}>
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className="px-2 cursor-pointer"
          >
            <div className="bg-white text-center p-2 font-medium rounded">
              <img
                src={group.image || "/default.png"}
                className="mx-auto mb-1 h-12 object-contain rounded-full"
                alt={group.name}
              />
              <span className="text-xs">{group.name}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ListCateHome;

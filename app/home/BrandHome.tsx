"use client";
import React, { useState, useEffect } from "react";
import { Brand } from "@/app/types/Brand";

const BrandHome = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/data/brands.json")
      .then((res) => res.json())
      .then((data: Brand[]) => setBrands(data))
      .catch((err) => console.error("Lỗi load brands:", err));
  }, []);

  return (
    <div className="bg-white shadow rounded-xl">
      <ul className="flex flex-wrap justify-between items-center gap-4 p-2">
        {brands.map((brand, index) => (
          <li key={index} className="flex items-center justify-center">
            <div className="aspect-square max-w-[60px] w-full">
              <img
                src={brand.image}
                alt={brand.name || `Brand ${index}`}
                className="w-full h-full object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandHome;

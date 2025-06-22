"use client";
import React from "react";
import { Brand } from "@/app/types/Brand";
import { useState, useEffect } from "react";

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
      <ul className="flex justify-around items-center gap-2">
        {brands.map((brand, index) => (
          <li
            key={index}
            className="w-16 h-16 flex items-center justify-center"
          >
            <img
              src={brand.image}
              alt=""
              className="w-10 h-10 object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandHome;

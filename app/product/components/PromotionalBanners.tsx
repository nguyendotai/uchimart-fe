"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Banner = {
  id: number;
  desktop_image: string;
  redirect_url: string;
};

const PromotionalBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => res.json())
      .then((json) => {
        const data: Banner[] = json.data ?? [];
        setBanners(data.slice(0, 3)); // <-- lấy 3 cái đầu
      })
      .catch((err) => {
        console.error("Lỗi tải banners:", err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Các khuyến mãi khác</h2>
      <ul className="flex justify-between items-center gap-2">
        {banners.map((banner) => (
          <li
            key={banner.id}
            className="relative w-full h-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <a
              href={banner.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={banner.desktop_image}
                alt={`Banner ${banner.id}`}
                fill
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionalBanners;

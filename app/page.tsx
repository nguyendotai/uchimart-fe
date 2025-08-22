"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const ImageSlider = dynamic(() => import("./home/ImageSlider"), {
  loading: () => (
    <div className="w-full h-[200px] md:h-[250px] bg-gray-200 animate-pulse rounded-lg"></div>
  ),
});
const ListCateHome = dynamic(() => import("./home/ListCateHome"), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-20 md:h-24 bg-gray-200 animate-pulse rounded-md"
        ></div>
      ))}
    </div>
  ),
});

const ListSaleProduct = dynamic(() => import("./home/ListSaleProduct"), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 md:h-60 bg-gray-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  ),
});

const BrandHome = dynamic(() => import("./home/BrandHome"), {
  loading: () => (
    <div className="h-16 md:h-20 bg-gray-200 animate-pulse rounded-xl"></div>
  ),
});

const ListProduct = dynamic(() => import("./home/ListProduct"), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-40 md:h-60 bg-gray-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  ),
});

const ListProductByCate = dynamic(() => import("./home/ListProductByCate"), {
  loading: () => (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, sectionIdx) => (
        <div key={sectionIdx}>
          <div className="h-6 md:h-8 w-1/2 md:w-1/3 bg-gray-300 animate-pulse mb-2 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 md:h-60 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
});

// Animation wrapper
import PageTransitionWrapper from "./components/Animation/PageTransitionWrapper";

export default function Home() {
  const Skeleton = ({ height = 180, grid = 1, sections = 1 }) => (
    <div className="space-y-4">
      {Array.from({ length: sections }).map((_, idx) => (
        <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: grid }).map((_, i) => (
            <div
              key={i}
              style={{ height }}
              className="bg-gray-200 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="w-full mx-auto mt-2 flex flex-col md:flex-row justify-between relative">
        <div className="w-full">
          {/* Slider */}
          <div className="w-full mb-4">
            <ImageSlider />
          </div>

          {/* Categories */}
          <div className="w-full mb-4">
            <ListCateHome />
          </div>

          {/* Sale Products */}
          <div className="w-full mb-4">
            <ListSaleProduct />
          </div>

          {/* Brand Section */}
          <div className="w-full mx-auto mt-4 md:mt-6">
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Title */}
                <div className="md:col-span-4">
                  <span className="block bg-white shadow rounded-xl px-4 py-3 md:py-5 text-lg md:text-2xl font-semibold text-center md:text-left">
                    Sản phẩm mới nhất
                  </span>
                </div>

                {/* Brand List */}
                <div className="md:col-span-8">
                  <BrandHome />
                </div>
              </div>
            </div>
          </div>

          {/* List Product */}
          <div className="w-full mx-auto mt-6 md:mt-10">
            <ListProduct />
          </div>

          {/* Suggest Today */}
          <div className="w-full mx-auto mt-8 md:mt-10 flex justify-center">
            <span className="px-4 md:px-6 bg-white shadow rounded-xl py-2 flex justify-center items-center text-xl md:text-3xl font-semibold text-[#FB5D08] max-w-[600px] w-full">
              Gợi ý hôm nay
            </span>
          </div>

          <div className="w-full mx-auto mt-6 space-y-4">
            <div className="w-full md:min-h-[500px]">
              <ListProductByCate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

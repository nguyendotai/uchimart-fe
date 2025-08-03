"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// 🖼️ Home Sections
const ImageSlider = dynamic(() => import("./home/ImageSlider"), {
  loading: () => (
    <div className="w-full h-[250px] bg-gray-200 animate-pulse rounded-lg"></div>
  ),
});

const ListCateHome = dynamic(() => import("./home/ListCateHome"), {
  loading: () => (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-24 bg-gray-200 animate-pulse rounded-md"
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
          className="h-60 bg-gray-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  ),
});

const BrandHome = dynamic(() => import("./home/BrandHome"), {
  loading: () => (
    <div className="h-20 bg-gray-200 animate-pulse rounded-xl"></div>
  ),
});

const ListProduct = dynamic(() => import("./home/ListProduct"), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-60 bg-gray-200 animate-pulse rounded-lg"
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
          <div className="h-8 w-1/3 bg-gray-300 animate-pulse mb-2 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
});

// 🎬 Animation Wrapper
import PageTransitionWrapper from "./components/Animation/PageTransitionWrapper";

export default function Home() {
  const { ref: sliderRef, inView: sliderInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: cateRef, inView: cateInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: saleRef, inView: saleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: brandRef, inView: brandInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: productRef, inView: productInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: suggestRef, inView: suggestInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const Skeleton = ({ height = 200, grid = 1, sections = 1 }) => (
    <div className="space-y-4">
      {Array.from({ length: sections }).map((_, idx) => (
        <div key={idx} className={`grid grid-cols-${grid} gap-4`}>
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
    <PageTransitionWrapper>
      <div className="">
        <div className="w-full mx-auto mt-2 flex justify-between relative ">
          {/* SideBar */}
          <div className="w-full">
            {/* Slider */}
            <div ref={sliderRef} className="w-full mb-4">
              {sliderInView  ? <ImageSlider /> : <Skeleton height={250} />}
            </div>
            {/* List Categories */}
            <div ref={cateRef} className="w-full mb-4">
              {cateInView ? (
                <ListCateHome />
              ) : (
                <Skeleton grid={4} height={96} />
              )}
            </div>
            {/* Product Sale */}
            <div ref={saleRef} className="w-full">
              {saleInView ? (
                <ListSaleProduct />
              ) : (
                <Skeleton grid={4} height={240} />
              )}
            </div>
            <div className="w-full">
              {/* Brand */}
              <div
                className="w-full mx-auto mt-6 flex justify-between"
                ref={brandRef}
              >
                <span className="w-[35%] bg-white shadow rounded-xl px-4 flex justify-start items-center text-2xl font-semibold">
                  Duy nhất hôm nay
                </span>
                <div className="w-[59%]">
                  {brandInView ? <BrandHome /> : <Skeleton height={80} />}
                </div>
              </div>
              <div ref={productRef} className="w-full mx-auto mt-10">
                {productInView ? (
                  <ListProduct />
                ) : (
                  <Skeleton grid={4} height={240} />
                )}
              </div>
              <div className="w-full mx-auto mt-10 flex justify-center">
                <span className="w-[50%] bg-white shadow rounded-xl py-2 flex justify-center items-center text-3xl font-semibold text-[#FB5D08]">
                  Gợi ý hôm nay
                </span>
              </div>
              <div ref={suggestRef} className="w-full mx-auto mt-6 space-y-4">
                {suggestInView ? (
                  <ListProductByCate />
                ) : (
                  <Skeleton grid={4} height={240} sections={2} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}

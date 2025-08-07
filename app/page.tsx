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
  const { ref: sliderRef, inView: sliderInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: cateRef, inView: cateInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: saleRef, inView: saleInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: brandRef, inView: brandInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: productRef, inView: productInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: suggestRef, inView: suggestInView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
    <div className="px-2 md:px-4">
      <div className="w-full mx-auto mt-2 flex flex-col md:flex-row justify-between relative">
        <div className="w-full">
          {/* Slider */}
          <div ref={sliderRef} className="w-full mb-4">
            {sliderInView ? <ImageSlider /> : <Skeleton height={200} />}
          </div>

          {/* Categories */}
          <div ref={cateRef} className="w-full mb-4">
            {cateInView ? <ListCateHome /> : <Skeleton grid={2} height={80} />}
          </div>

          {/* Sale Products */}
          <div ref={saleRef} className="w-full mb-4">
            {saleInView ? <ListSaleProduct /> : <Skeleton grid={2} height={200} />}
          </div>

          {/* Brand Section */}
          <div className="w-full mx-auto mt-4 md:mt-6" ref={brandRef}>
            <div className="w-full px-2 md:px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 w-full">
                <span className="flex-1 bg-white shadow rounded-xl px-3 py-4 md:py-7.5 flex items-center text-lg md:text-2xl font-semibold">
                  Duy nhất hôm nay
                </span>
                <div className="flex-[2] w-full">
                  {brandInView ? <BrandHome /> : <Skeleton height={64} />}
                </div>
              </div>
            </div>
          </div>

          {/* List Product */}
          <div ref={productRef} className="w-full mx-auto mt-6 md:mt-10">
            {productInView ? <ListProduct /> : <Skeleton grid={2} height={200} />}
          </div>

          {/* Suggest Today */}
          <div className="w-full mx-auto mt-8 md:mt-10 flex justify-center">
            <span className="px-4 md:px-6 bg-white shadow rounded-xl py-2 flex justify-center items-center text-xl md:text-3xl font-semibold text-[#FB5D08] max-w-[600px] w-full">
              Gợi ý hôm nay
            </span>
          </div>

          <div ref={suggestRef} className="w-full mx-auto mt-6 space-y-4">
            <div className="w-full min-h-[400px] md:min-h-[500px]">
              {suggestInView ? (
                <ListProductByCate />
              ) : (
                <Skeleton grid={2} height={200} sections={2} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import ImageSlider from "./home/ImageSlider";
import ListCategories from "./components/ui/ListCategories";
import ListCateHome from "./home/ListCateHome";
import TimeFlashSale from "./home/TimeFlashSale";
import ListSaleProduct from "./home/ListSaleProduct";
import BrandHome from "./home/BrandHome";
import ListProduct from "./home/ListProduct";
import ListProductByCate from "./home/ListProductByCate";
import PageTransitionWrapper from "./components/Animation/PageTransitionWrapper";

export default function Home() {
  return (
    <PageTransitionWrapper>
      <div className="">
        <div className="w-full mx-auto mt-2 flex justify-between relative ">
          {/* SideBar */}
          <div className="w-full">
            {/* Slider */}
            <div className="w-full mb-4">
              <ImageSlider />
            </div>
            {/* List Categories */}
            <div className="w-full mb-4">
              <ListCateHome></ListCateHome>
            </div>
            {/* Countdown Flash Sale*/}
            <div className="w-full mb-4">
              <TimeFlashSale></TimeFlashSale>
            </div>
            {/* Product Sale */}
            <div className="w-full">
              <ListSaleProduct></ListSaleProduct>
            </div>
            <div className="w-full">
              {/* Brand */}
              <div className="w-full mx-auto mt-6 flex justify-between">
                <span className="w-[35%] bg-white shadow rounded-xl px-4 flex justify-start items-center text-2xl font-semibold">
                  Duy nhất hôm nay{" "}
                </span>
                <div className="w-[59%]">
                  <BrandHome></BrandHome>
                </div>
              </div>
              <div className="w-full mx-auto mt-10">
                <ListProduct></ListProduct>
              </div>
              <div className="w-full mx-auto mt-10 flex justify-center">
                <span className="w-[50%] bg-white shadow rounded-xl py-2 flex justify-center items-center text-3xl font-semibold text-[#FB5D08]">
                  Gợi ý hôm nay
                </span>
              </div>
              <div className="w-full mx-auto mt-6 space-y-4">
                <ListProductByCate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}

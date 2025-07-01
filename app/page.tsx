"use client";
import ImageSlider from "./components/UIHome/ImageSlider";
import ListCategories from "./components/UI/ListCategories";
import ListCateHome from "./components/UIHome/ListCateHome";
import TimeFlashSale from "./components/UIHome/TimeFlashSale";
import ListSaleProduct from "./components/UIHome/ListSaleProduct";
import BrandHome from "./components/UIHome/BrandHome";
import ListProduct from "./components/UIHome/ListProduct";
import ListProductByCate from "./components/UIHome/ListProductByCate";
import PageTransitionWrapper from "./components/Animation/PageTransitionWrapper";

export default function Home() {
  return (
    <PageTransitionWrapper>
      <div className="w-full">
        {/* Slider full width */}
        {/* <div className="container mx-auto mt-2">
          <ImageSlider />
        </div> */}
        <div className="container mx-auto mt-2 flex justify-between">
          {/* SideBar */}
          <div className="w-[17%] bg-white shadow rounded-xl p-2 sticky top-32 self-start">
            <ListCategories />
          </div>

          <div className="w-[82%]">
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
          </div>
        </div>
        {/* Brand */}
        <div className="container mx-auto mt-6 flex justify-between">
          <span className="w-[35%] bg-white shadow rounded-xl px-4 flex justify-start items-center text-2xl font-semibold">
            Duy nhất hôm nay{" "}
          </span>
          <div className="w-[59%]">
            <BrandHome></BrandHome>
          </div>
        </div>
        <div className="container mx-auto mt-10">
          <ListProduct></ListProduct>
        </div>
        <div className="container mx-auto mt-10 flex justify-center">
          <span className="w-[50%] bg-white shadow rounded-xl py-2 flex justify-center items-center text-3xl font-semibold text-[#FB5D08]">
            Gợi ý hôm nay
          </span>
        </div>
        <div className="container mx-auto mt-6 space-y-4">
          <ListProductByCate />
        </div>
      </div>
    </PageTransitionWrapper>
  );
}

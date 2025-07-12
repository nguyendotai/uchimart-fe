"use client";
import { usePathname } from "next/navigation";
import ListCategories from "../ui/ListCategories";

const ShowSidebar = () => {
  const pathname = usePathname();

  const shouldShowSidebar =
    pathname === "/" ||
    pathname === "/product" ||
    pathname === "/search/[search]" ||
    pathname.startsWith("/product/");

  return shouldShowSidebar ? (
    <div className="hidden lg:block fixed top-0 left-2 z-40">
      <ListCategories />
    </div>
  ) : null;
};

export default ShowSidebar;

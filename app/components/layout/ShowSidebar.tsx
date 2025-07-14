"use client";
import { usePathname } from "next/navigation";
import ListCategories from "../ui/ListCategories";

const ShowSidebar = () => {
  const pathname = usePathname();

  const shouldShowSidebar =
    pathname === "/" ||
    pathname === "/product" ||
    pathname === "/search/[search]" ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search");

  return shouldShowSidebar ? <ListCategories /> : null;
};

export default ShowSidebar;

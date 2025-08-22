"use client";
import { usePathname } from "next/navigation";
import ListCategories from "../ui/ListCategories";

const ShowSidebar = () => {
  const pathname = usePathname();

  const shouldShowSidebar =
    pathname === "/" ||
    pathname === "/product" ||
    pathname === "/brand" ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/brand");

  return shouldShowSidebar ? <ListCategories /> : null;
};

export default ShowSidebar;

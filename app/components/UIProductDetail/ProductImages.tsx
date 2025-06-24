import React from "react";
import { Product } from "@/app/types/Product";

interface ProductImagesProps {
  product: Product;
}

const ProductImages = ({ product }: ProductImagesProps) => {
  return (
    <div className="flex gap-2">
      <div className="w-[14%]">
        <img className="rounded-xl shadow" src={product.image} alt={product.name} />
      </div>
      <div className="w-[85%] ">
        <img className="w-full shadow rounded-xl min-h-[600px]" src={product.image} alt={product.name} />
      </div>
      
    </div>
  );
};

export default ProductImages;

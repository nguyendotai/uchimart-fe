import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  return (
    <div className="flex items-center justify-end gap-2 cursor-pointer text-gray-700 hover:text-black">
      <div className="bg-[#f3e5f5] rounded-full p-2">
        <FaShoppingCart className="text-2xl" style={{ color: "#921573" }} />
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="w-full flex ">
      <div className="w-[80%] flex gap-2 justify-between">
        {/* Input + icon nằm chung 1 div có 80% */}
        <div className="relative w-[91%]">
          <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Giá siêu rẻ"
            className="w-full pl-10 text-black pr-3 h-10 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00bf63]"
          />
        </div>

        {/* Nút chiếm 20% */}
        <button
          className="w-[19%] h-10 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          style={{ backgroundColor: "#921573" }}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Search;

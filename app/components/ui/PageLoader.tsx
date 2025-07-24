"use client";
import { ClipLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <ClipLoader color="#921573" size={50} />
    </div>
  );
};

export default PageLoader;

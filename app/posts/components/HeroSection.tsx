"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      <div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          TẠI SAO NÊN <br /> CHỌN SẢN PHẨM <br /> HỮU CƠ
        </h1>
        <p className="text-gray-700 mb-4">
          Sản phẩm hữu cơ là thực phẩm được nuôi trồng không dùng hóa chất, an toàn cho sức khỏe và thân thiện với môi trường...
        </p>
        <div className="space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
            Khám phá sản phẩm Hữu cơ tại Mini Mart
          </button>
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200">
            Xem ưu đãi hôm nay
          </button>
        </div>
      </div>
      <div>
        <Image
          src="/img/image_4.png"
          alt="Sản phẩm hữu cơ"
          width={500}
          height={400}
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
}

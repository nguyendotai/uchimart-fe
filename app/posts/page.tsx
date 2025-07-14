'use client';
import { motion } from "framer-motion";
import Image from "next/image";

export default function OrganicPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
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
            Sản phẩm hữu cơ là thực phẩm được nuôi trồng không dùng hóa chất, an
            toàn cho sức khỏe và thân thiện với môi trường. Chúng giúp giảm nguy
            cơ tích tụ độc tố, đặc biệt phù hợp cho trẻ nhỏ và người lớn tuổi có
            sức đề kháng yếu. Dù có giá cao hơn nhưng điểm bù chất lượng là xứng
            đáng.
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

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex space-x-6 text-sm border-b pt-8 pb-2"
      >
        <button className="text-gray-500 hover:text-black">Bài viết mới</button>
        <button className="border-b-2 border-black font-semibold">
          Công thức nấu ăn
        </button>
      </motion.div>

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Video</h2>

        <div className="mb-6">
          <video
            controls
            className="rounded-xl w-full max-h-[500px] object-cover"
            poster="/video-main-poster.jpg" // ảnh tĩnh nếu có
          >
            <source src="/videos/main-video.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>

        <h3 className="text-xl font-bold mb-4">Sườn xào chua ngọt đậm vị</h3>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <video
              controls
              className="w-44 h-28 rounded-lg object-cover"
              poster="/videos/thumb1.jpg"
            >
              <source src="/videos/suon-nuong.mp4" type="video/mp4" />
            </video>
            <div>
              <h4 className="font-semibold">
                Bí quyết làm món sườn nướng mật ong ngon tuyệt cú mèo
              </h4>
              <p className="text-sm text-gray-600">
                Sườn nướng mật ong là món ăn thơm ngon, dễ gây nghiện, thích hợp
                cho các dịp quây quần.
              </p>
              <p className="text-xs text-gray-400">1/1/2025</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <video
              controls
              className="w-44 h-28 rounded-lg object-cover"
              poster="/videos/thumb2.jpg"
            >
              <source src="/videos/chao-ech.mp4" type="video/mp4" />
            </video>
            <div>
              <h4 className="font-semibold">Cháo ếch đổi món ngày thu</h4>
              <p className="text-sm text-gray-600">
                Cháo ếch – món ăn ấm nóng, kết hợp các nguyên liệu thơm và dễ
                ăn, phù hợp cho gia đình.
              </p>
              <p className="text-xs text-gray-400">1/1/2025</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recipe Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mt-10 mb-4">Công thức nấu ăn</h2>
        <div className="flex gap-4 items-center">
          <Image
            src="/img/image_post.png"
            alt="Cơm chiên Dương Châu"
            width={180}
            height={100}
            className="rounded-lg"
          />
          <div>
            <p className="font-semibold text-sm">
              Cơm chiên Dương Châu (Yangzhou Fried Rice)
            </p>
            <p className="text-xs text-gray-400">1/1/2025</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

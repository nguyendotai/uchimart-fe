"use client";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
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
          poster="/video-main-poster.jpg"
        >
          <source src="/videos/main-video.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      <h3 className="text-xl font-bold mb-4">Sườn xào chua ngọt đậm vị</h3>

      <div className="space-y-6">
        {/* Video 1 */}
        <div className="flex gap-4 items-start">
          <video controls className="w-44 h-28 rounded-lg object-cover" poster="/videos/thumb1.jpg">
            <source src="/videos/suon-nuong.mp4" type="video/mp4" />
          </video>
          <div>
            <h4 className="font-semibold">Bí quyết làm món sườn nướng mật ong ngon tuyệt cú mèo</h4>
            <p className="text-sm text-gray-600">Sườn nướng mật ong là món ăn thơm ngon...</p>
            <p className="text-xs text-gray-400">1/1/2025</p>
          </div>
        </div>

        {/* Video 2 */}
        <div className="flex gap-4 items-start">
          <video controls className="w-44 h-28 rounded-lg object-cover" poster="/videos/thumb2.jpg">
            <source src="/videos/chao-ech.mp4" type="video/mp4" />
          </video>
          <div>
            <h4 className="font-semibold">Cháo ếch đổi món ngày thu</h4>
            <p className="text-sm text-gray-600">Cháo ếch – món ăn ấm nóng, dễ ăn...</p>
            <p className="text-xs text-gray-400">1/1/2025</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

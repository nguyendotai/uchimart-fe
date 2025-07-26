"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Huỳnh Ngọc Phú",
    avatar: "/images/reviews/phu.jpg",
    rating: 5,
    content:
      "Giao diện website rất dễ sử dụng, sản phẩm đa dạng và có mô tả chi tiết rõ ràng. Tôi đặt hàng rất nhanh chóng, thanh toán tiện lợi, và hàng giao đúng như hình. Sẽ tiếp tục ủng hộ lâu dài!",
  },
  {
    name: "ROSE",
    avatar: "/images/reviews/rose.jpg",
    rating: 5,
    content:
      "Giao diện website rất dễ sử dụng, sản phẩm đa dạng và có mô tả chi tiết rõ ràng. Tôi đặt hàng rất nhanh chóng, thanh toán tiện lợi, và hàng giao đúng như hình. Sẽ tiếp tục ủng hộ lâu dài",
  },
  {
    name: "rằn Văn Hùng",
    avatar: "/images/reviews/hung.jpg",
    rating: 3,
    content:
      "Tôi rất hài lòng với chất lượng sản phẩm, giá cả hợp lý. Tuy nhiên, tốc độ giao hàng có thể cải thiện thêm một chút để tốt hơn. Nhìn chung là một website uy tín và đáng tin cậy",
  },
  {
    name: "Sơn Tùng MTP",
    avatar: "/images/reviews/tung.jpg",
    rating: 5,
    content:
      "Mong hệ thống cập nhật trạng thái đơn hàng thường xuyên hơn để dễ theo dõi.",
  },
];

const CustomerReviews = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        ĐÁNH GIÁ CỦA KHÁCH HÀNG
      </h2>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex gap-4 items-start"
          >
            <div className="min-w-[50px] h-[50px] rounded-full overflow-hidden">
              <Image
                src={review.avatar}
                alt={review.name}
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <div className="flex text-yellow-500 mb-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-sm text-gray-800">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;

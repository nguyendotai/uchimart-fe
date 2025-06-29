"use client";
import Image from "next/image";

type Props = {
  items: any[];
};

export default function OrderItems({ items }: Props) {
  const total = items.reduce(
    (sum, item) => sum + (item.promotion_price ?? item.price) * item.cartQuantity,
    0
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-4">Sản phẩm đã chọn</h2>
      <ul className="divide-y">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="py-3 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-12 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    className="rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Số lượng: {item.cartQuantity}</p>
                </div>
              </div>
              <p className="font-medium text-[#921573] whitespace-nowrap">
                {(item.promotion_price ?? item.price).toLocaleString()} đ
              </p>
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">Không có sản phẩm nào</li>
        )}
      </ul>
      <p className="text-right font-bold text-lg mt-4">
        Tổng tiền: {total.toLocaleString()} đ
      </p>
    </div>
  );
}

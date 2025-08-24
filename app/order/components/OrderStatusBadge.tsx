import React, { JSX } from "react";
import { FaTruck } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

type Props = {
  status: number;
};

const statusMap: Record<
  number,
  { label: string; color: string; icon: JSX.Element }
> = {
  1: {
    label: "Chờ thanh toán",
    color: "bg-yellow-100 text-yellow-800",
    icon: <FaTruck className="mr-2 text-xl" />,
  },
  3: {
    label: "Đang xử lí",
    color: "bg-blue-100 text-blue-800",
    icon: <FaTruck className="mr-2 text-xl" />,
  },
  4: {
    label: "Đang vận chuyển",
    color: "bg-purple-100 text-purple-800",
    icon: <FaTruck className="mr-2 text-xl" />,
  },
  5: {
    label: "Đã hoàn thành",
    color: "bg-green-100 text-green-800",
    icon: <IoMdDoneAll className="mr-2 text-xl" />,
  },
  6: {
    label: "Đã huỷ",
    color: " text-red-500",
    icon: <FcCancel className="text-red-500 mr-2 text-xl" />,
  },
};

export default function OrderStatusBadge({ status }: Props) {
  const statusInfo =
    statusMap[status] || {
      label: "Không xác định",
      color: "bg-gray-100 text-gray-800",
      icon: <FaTruck className="mr-2 text-xl" />,
    };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
    >
      {statusInfo.icon}
      {statusInfo.label}
    </span>
  );
}

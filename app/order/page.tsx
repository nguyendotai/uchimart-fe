"use client";
import React, { useEffect, useState } from "react";
import { IoStorefrontSharp } from "react-icons/io5";
import { OrderData } from "../types/Order";
import axios from "axios";
import OrderStatusBadge from "./components/OrderStatusBadge";
import { FaTruckFast } from "react-icons/fa6";

const Order = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const fetchOrders = async (statusFilter: string | null) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            let url = "http://localhost:8000/api/orders"; // Lấy tất cả đơn hàng của user
            if (statusFilter) {
                url += `?order_status=${statusFilter}`;
            }

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
                
            });

            if (res.data.success) {
                console.log("Danh sách orders:", res.data);
                // res.data.data là array
                console.log("Raw orders from API:", res.data.data);

                // Loại bỏ trùng (nếu có)
                const uniqueOrders = Array.from(
                    new Map((res.data.data as OrderData[]).map(o => [o.id, o])).values()
                );

                console.log("Unique orders after Map:", uniqueOrders);
                setOrders(uniqueOrders);
            }
        } catch (err) {
            console.error("Lỗi fetch đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchOrders(status);
    }, [status]); // chạy lần đầu + khi status thay đổi




    if (loading) return <p className="text-center">Đang tải đơn hàng...</p>;

    return (
        <div>
            <main className="my-[30px]">
                <div className="w-[80%] mx-auto rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4">Đơn hàng của tôi</h2>

                    {/* Bộ lọc trạng thái */}
                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium bg-white border-gray-300 mb-4 rounded-lg">
                        <div className="w-full p-3 flex justify-around text-[16px]">
                            <button
                                className={`${!status ? "border-b-2 border-[#921573]" : ""}`}
                                onClick={() => setStatus(null)}
                            >
                                Tất cả
                            </button>
                            <button
                                className={`${status === "1" ? "border-b-2 border-[#921573]" : ""
                                    }`}
                                onClick={() => setStatus("1")}
                            >
                                Chờ thanh toán
                            </button>
                            <button
                                className={`${status === "3" ? "border-b-2 border-[#921573]" : ""
                                    }`}
                                onClick={() => setStatus("3")}
                            >
                                Đang xử lý
                            </button>
                            <button
                                className={`${status === "4" ? "border-b-2 border-[#921573]" : ""
                                    }`}
                                onClick={() => setStatus("4")}
                            >
                                Đang giao hàng
                            </button>
                            <button
                                className={`${status === "5" ? "border-b-2 border-[#921573]" : ""
                                    }`}
                                onClick={() => setStatus("5")}
                            >
                                Đã hoàn tất
                            </button>
                            <button
                                className={`${status === "6" ? "border-b-2 border-[#921573]" : ""
                                    }`}
                                onClick={() => setStatus("6")}
                            >
                                Đã hủy
                            </button>
                        </div>
                    </div>

                    {/* Bộ lọc thời gian */}
                    <div className="flex gap-2 mb-4">
                        <button className="border-2 border-[#4DCB44] bg-[#EBFAEA] rounded-full px-3 py-1 cursor-pointer">
                            Tất cả
                        </button>
                        <button className="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">
                            1 tháng
                        </button>
                        <button className="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">
                            3 tháng
                        </button>
                        <button className="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer">
                            6 tháng
                        </button>
                    </div>

                    {orders.length === 0 ? (
                        <p>Chưa có đơn hàng nào.</p>
                    ) : (
                        orders.map((order) => (
                            console.log("Order before render:", order),

                            <div
                                key={order.id}
                                className="bg-white shadow-sm rounded-lg p-4 mb-4"
                            >
                                {/* Trạng thái đơn */}
                                <div className="pb-2 text-right text-sm flex justify-between items-center border-b border-[#e5e5e5]">
                                    <p className="text-[#898991]">
                                        Thương hiệu:{" "}
                                        <span className="text-[#327FF6] font-semibold">Pepsi</span>
                                    </p>
                                    <span className="flex items-center">
                                        <OrderStatusBadge status={order.order_status} />
                                    </span>
                                </div>

                                {/* Ngày và hình thức nhận */}
                                <div className="mt-2">
                                    <p className="flex gap-1 items-center font-medium text-[#545458]">
                                        Thứ 7, 7/5/2025
                                    </p>
                                    <span className="flex items-center text-[14px]">
                                        <FaTruckFast className="text-[#4DCB44] text-xl mx-2" /> Giao hàng
                                    </span>
                                </div>

                                {/* Sản phẩm trong đơn hàng */}
                                {order.items?.map((item) => (
                                    <div key={item.id} className="flex gap-4 mt-2 ml-2">
                                        <img
                                            src={item.inventory.image || item.inventory.product.primary_image}
                                            className="w-[8%] border-2 border-[#898991] object-cover rounded-2xl"
                                            alt={item.inventory.title}
                                        />

                                        <div className="flex-1 text-sm text-gray-700">
                                            <p className="font-medium mt-1 mb-2">{item.inventory.title}</p>
                                            <p className="text-[#898991] mb-2">  Phân loại hàng: {item.inventory?.product?.name || "Không xác định"}</p>
                                            <p className="font-medium mb-2">Số lượng: {item.quantity}</p>
                                        </div>

                                        <div className="text-right text-sm">
                                            <p className="text-gray-600">
                                                Giá: <span className="text-[#921573] font-semibold">{item.price}đ</span>
                                            </p>
                                            <p className="mt-1">
                                                Thành tiền: <span className="text-[#921573] font-semibold">{item.total_price}đ</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}



                                {/* Sản phẩm */}
                                {/* <div className="flex gap-4 mt-2 ml-2">
                                    <img
                                        src="https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2024%2F3%2F27%2F56200-8934588670114.jpg&w=1920&q=75"
                                        className="w-[8%] border-2 border-[#898991] object-cover rounded-2xl"
                                        alt="product image"
                                    />

                                    <div className="flex-1 text-sm text-gray-700">
                                        <p className="font-medium mt-1 mb-2">
                                            Thùng nước ngọt vị chanh zero calo Pepsi 320ml (24 Lon)
                                        </p>
                                        <p className="text-[#898991] mb-2">Phân loại hàng: thùng</p>
                                        <p className="font-medium mb-2">Số lượng: 1</p>
                                    </div>

                                    <div className="text-right text-sm">
                                        <p className="text-gray-600">
                                            Giá:{" "}
                                            <span className="text-[#921573] font-semibold">
                                                194.000đ
                                            </span>
                                        </p>
                                        <p className="mt-1">
                                            Thành tiền:{" "}
                                            <span className="text-[#921573] font-semibold">
                                                210.000đ
                                            </span>
                                        </p>
                                    </div>
                                </div> */}

                                {/* Tổng tiền đơn hàng */}
                                <div className="border-t mt-3 pt-3 text-right">
                                    <p className="text-base font-medium">
                                        Tổng tiền đơn hàng: <span className="text-[#921573] font-bold">
                                            {order.grand_total}đ
                                        </span>


                                    </p>


                                </div>

                                {/* Hành động */}
                                <div className="flex justify-between gap-3 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-[35px] h-[35px] text-[#4DCB44] rounded-full bg-[#EBFAEA]">
                                            <IoStorefrontSharp className="text-xl" />
                                        </div>
                                        <span className="text-[14px]">
                                            {" "}
                                            <span className="font-medium">
                                                UchiMart - 308 Thạnh Xuân, Quận 12
                                            </span>
                                        </span>
                                    </div>

                                    <div className="w-[30%] flex justify-end">
                                        <p>{order.uuid}</p>
                                        <button className="w-[48%] border border-[#921573] text-[#921573] px-4 py-1 rounded-md hover:bg-pink-50 cursor-pointer"
                                            onClick={() => window.location.href = `/order/${order.uuid}`}
                                        >
                                            Chi tiết đơn hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Order;

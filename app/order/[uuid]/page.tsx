"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import OrderStatusBadge from "../components/OrderStatusBadge";
import { OrderData } from "../../types/Order";

const OrderDetail = () => {
    const params = useParams();
    const uuid = params?.uuid as string;
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchOrderDetail = async () => {
        if (!uuid) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:8000/api/orders/${uuid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setOrder(res.data.data as OrderData);
            }
        } catch (err) {
            console.error("Lỗi fetch chi tiết đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [uuid]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <p className="ml-4 text-lg text-gray-600">Đang tải chi tiết đơn hàng...</p>
        </div>
    );
    if (!order) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-red-500">Không tìm thấy đơn hàng.</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in">
                Chi tiết đơn hàng #{order.order_code}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
                {/* Trạng thái + Người đặt */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 mb-4">
                    <div className="mb-4 sm:mb-0">
                        <p className="text-lg font-semibold text-gray-700">
                            Người đặt: {order.fullname}
                        </p>
                        <p className="text-gray-500">{order.email}</p>
                    </div>
                    <OrderStatusBadge status={order.order_status} />
                </div>

                {/* Thông tin đơn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-medium">Địa chỉ nhận:</span> {order.address_line}, {order.city_name}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Số điện thoại:</span> {order.phone}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Ngày tạo:</span> {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-medium">Cập nhật:</span> {new Date(order.updated_at).toLocaleString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Tổng sản phẩm:</span> {order.total_item}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Trạng thái thanh toán:</span> {order.payment_status === "1" ? "Đang xử lý" : order.payment_status === "2" ? "Đã thanh toán" : "Chưa xác định"}
                        </p>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sản phẩm trong đơn</h3>
                    <div className="space-y-4">
                        {order.order_items?.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
                            >
                                <img
                                    src={item.inventory.image || item.inventory.product?.primary_image || "/fallback.png"}
                                    alt={item.inventory.title}
                                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{item.inventory.title}</p>
                                    <p className="text-gray-600">
                                        Phân loại: {item.inventory.product?.name || "Không có"}
                                    </p>
                                    <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600">Giá: {Number(item.price).toLocaleString()}đ</p>
                                    <p className="font-semibold text-gray-800">
                                        Thành tiền: {Number(item.total_price).toLocaleString()}đ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tổng tiền */}
                <div className="border-t border-gray-200 mt-6 pt-4 text-right">
                    <p className="text-2xl font-bold text-gray-800">
                        Tổng cộng: {Number(order.grand_total ?? order.total_price).toLocaleString()}đ
                    </p>
                </div>

                {/* Hành động */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                        Mua lại
                    </button>
                    <button className="border border-pink-500 text-pink-500 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-200">
                        In hóa đơn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
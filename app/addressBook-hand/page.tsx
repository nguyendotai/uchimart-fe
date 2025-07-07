"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const AddressBookHand = () => {
    const [enabled, setEnabled] = useState(false);
    return (
        <main className="my-[50px]">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Chi tiết địa chỉ</h2>

                <div className="grid grid-cols-2 gap-4">
                    {/* Tên địa chỉ */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tên địa chỉ</label>
                        <input
                            type="text"
                            placeholder="VD: Nhà / Cơ quan / ..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Tỉnh / Thành phố */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tỉnh / Thành phố</label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500">
                            <option>Vui lòng chọn</option>
                        </select>
                    </div>

                    {/* Quận / Huyện */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Quận / Huyện</label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500">
                            <option>Vui lòng chọn</option>
                        </select>
                    </div>

                    {/* Phường / Xã */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Phường / Xã</label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500">
                            <option>Vui lòng chọn</option>
                        </select>
                    </div>

                    {/* Số nhà, tên đường */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Số nhà, tên đường</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Tên người nhận */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tên người nhận</label>
                        <input
                            type="text"
                            value="Trần Tuấn Anh"
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            value="+84915527501"
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Ghi chú */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Ghi chú giao hàng cho tài xế (không bắt buộc)
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Nhập hướng dẫn"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        ></textarea>
                    </div>
                </div>

                {/* Đặt làm mặc định & Lưu */}
                <div className="flex justify-between items-center mt-6">
                    <label className="flex items-center gap-2 text-sm">
                        <span>Đặt làm mặc định</span>
                        <button
                            type="button"
                            onClick={() => setEnabled(!enabled)}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${enabled ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <span className="sr-only">Enable</span>
                            <span
                                className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${enabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>

                    </label>

                    <Link href="/addressBook"><button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 cursor-pointer">
                        Lưu
                    </button></Link>
                </div>
            </div>
        </main>
    );
};

export default AddressBookHand;

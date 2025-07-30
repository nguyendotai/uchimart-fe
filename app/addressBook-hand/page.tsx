"use client";
// import { Province, District, Ward, fetchProvinces, fetchDistricts, fetchWards } from '../types/address'; // đường dẫn tùy dự án bạn
import React, {  useState } from 'react';
// import { toast } from 'react-toastify';
// import { AddressPayload } from "../types/address";
// import { useRouter } from "next/navigation";
const AddressBookHand = () => {
const [enabled, setEnabled] = useState(false);
    return (
        <main className="my-[50px]">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Chi tiết địa chỉ</h2>

                <form  className="grid grid-cols-2 gap-4">
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
                        <select
                           
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Chọn tỉnh/thành</option>
                                
                        </select>

                    </div>

                    {/* Quận / Huyện */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Quận / Huyện</label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Chọn quận/huyện</option>
                            
                        </select>

                    </div>

                    {/* Phường / Xã */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Phường / Xã</label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                        >
                            <option value="">Chọn phường/xã</option>
                            
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
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input
                            type="text"
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

                    {/* Đặt làm mặc định & Lưu */}
                    <div className="col-span-2 flex justify-between items-center mt-6">
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

                        <button type='submit' className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 cursor-pointer">
                            Lưu
                        </button>
                    </div>
                </form>

            </div>
        </main>
    );
};

export default AddressBookHand;

"use client";
import { Province, District, Ward, APIResponse } from "../types/address";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

const AddressBookHand = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [enabled, setEnabled] = useState(false);


    const [addressLine, setAddressLine] = useState("");
    const [note, setNote] = useState("");


    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");

    // ✅ Đọc user từ localStorage khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserName(user.name || "");
                setUserPhone(user.phone_number || "");
            } catch (error) {
                console.error("Lỗi parse user từ localStorage:", error);
            }
        }
    }, []);


    // Lấy danh sách tỉnh
    useEffect(() => {
        axios
            .get<APIResponse>(`${API_BASE}/provinces`)
            .then((res) => {
                const list: Province[] = res.data.data.map((item) => ({
                    code: item.code,
                    name: item.full_name,
                }));
                setProvinces(list);
            })
            .catch((err) => console.error("Lỗi lấy tỉnh:", err));
    }, []);



    // Lấy danh sách quận khi chọn tỉnh
    useEffect(() => {
        if (!selectedProvince) {
            setDistricts([]);
            setSelectedDistrict("");
            setWards([]);
            setSelectedWard("");
            return;
        }
        axios
            .get<APIResponse>(`${API_BASE}/districts`, {
                params: { province_code: selectedProvince },
            })
            .then((res) => {
                const list: District[] = res.data.data.map((item) => ({
                    code: item.code,
                    name: item.full_name,
                }));
                setDistricts(list);
            })
            .catch((err) => console.error("Lỗi lấy quận:", err));
    }, [selectedProvince]);



    // Lấy danh sách phường khi chọn quận
    useEffect(() => {
        if (!selectedDistrict) {
            setWards([]);
            setSelectedWard("");
            return;
        }
        axios
            .get<APIResponse>(`${API_BASE}/wards`, {
                params: { district_code: selectedDistrict },
            })
            .then((res) => {
                const list: Ward[] = res.data.data.map((item) => ({
                    code: item.code,
                    name: item.full_name,
                }));
                setWards(list);
            })
            .catch((err) => console.error("Lỗi lấy phường:", err));
    }, [selectedDistrict]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!storedUser || !token) {
            alert("Bạn chưa đăng nhập");
            return;
        }
        const user = JSON.parse(storedUser);

        const payload = {
            user_id: user.id,
            name: userName,
            phone: userPhone,
            supported_provinces: [selectedProvince],
            supported_districts: [selectedDistrict],
            supported_wards: [selectedWard],
            province_code: selectedProvince,
            district_code: selectedDistrict,
            ward_code: selectedWard,
            address_line: addressLine,
            is_default: enabled,
            note: note,
        };

        try {
            const res = await axios.post(`${API_BASE}/addresses`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Gửi token kèm request
                },
            });
            if (res.data.success) {
                alert("Lưu địa chỉ thành công!");
            } else {
                alert("Lưu địa chỉ thất bại!");
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error("Chi tiết lỗi:", error.response?.data);
            } else {
                console.error("Lỗi không xác định:", error);
            }
            alert("Lỗi lưu địa chỉ");
        }
    };


    return (
        <main className="my-[50px]">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Chi tiết địa chỉ</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    {/* Tên người nhận */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tên người nhận
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>
                    {/* Tỉnh / Thành phố */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tỉnh / Thành phố
                        </label>
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">Chọn tỉnh/thành</option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quận / Huyện */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Quận / Huyện
                        </label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedProvince}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Phường / Xã */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Phường / Xã</label>
                        <select
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            disabled={!selectedDistrict}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">Chọn phường/xã</option>
                            {wards.map((w) => (
                                <option key={w.code} value={w.code}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Số nhà, tên đường */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Số nhà, tên đường
                        </label>
                        <input
                            value={addressLine}
                            onChange={(e) => setAddressLine(e.target.value)}
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
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
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
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${enabled ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                            >
                                <span className="sr-only">Enable</span>
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${enabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </label>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 cursor-pointer"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddressBookHand;

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Province, District, Ward, APIResponse, AddressItem } from "../../types/address";

const API_BASE = "http://127.0.0.1:8000/api";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
    addressToEdit?: AddressItem | null; // nếu có => sửa, nếu null => thêm mới
}

export default function AddressBookHand({ onClose, onSuccess, addressToEdit }: Props) {
    const [isInitializing, setIsInitializing] = useState(false);

    const isEditMode = !!addressToEdit;

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



    // Khi mở modal, nếu là sửa thì fill dữ liệu vào form
    useEffect(() => {
        if (isEditMode && addressToEdit) {
            setIsInitializing(true); // bắt đầu load dữ liệu edit

            setUserName(addressToEdit.name || "");
            setUserPhone(addressToEdit.phone || "");
            setAddressLine(addressToEdit.address_line || "");
            setNote(addressToEdit.note || "");
            setEnabled(Number(addressToEdit.is_default) === 1);

            const provinceCode = addressToEdit.province_code || "";
            const districtCode = addressToEdit.district_code || "";
            const wardCode = addressToEdit.ward_code || "";

            setSelectedProvince(provinceCode);

            if (provinceCode) {
                axios.get<APIResponse>(`${API_BASE}/districts`, {
                    params: { province_code: provinceCode }
                }).then(res => {
                    const list = res.data.data.map((item) => ({
                        code: item.code,
                        name: item.full_name
                    }));
                    setDistricts(list);
                    setSelectedDistrict(districtCode);

                    if (districtCode) {
                        axios.get<APIResponse>(`${API_BASE}/wards`, {
                            params: { district_code: districtCode }
                        }).then(res2 => {
                            const wardList = res2.data.data.map((item) => ({
                                code: item.code,
                                name: item.full_name
                            }));
                            setWards(wardList);
                            setSelectedWard(wardCode);
                            setIsInitializing(false); // load xong
                        });
                    } else {
                        setIsInitializing(false);
                    }
                });
            } else {
                setIsInitializing(false);
            }
        } else {
            // Thêm mới
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    setUserName(user.name || "");
                    setUserPhone(user.phone_number || "");
                } catch {
                    toast.error("Lỗi khi đọc dữ liệu người dùng");
                }
            }
        }
    }, [isEditMode, addressToEdit]);

    // Lấy quận khi chọn tỉnh (chỉ chạy khi không phải đang init dữ liệu edit)
    useEffect(() => {
        if (isInitializing) return;
        if (!selectedProvince) {
            setDistricts([]);
            setSelectedDistrict("");
            setWards([]);
            setSelectedWard("");
            return;
        }
        axios.get<APIResponse>(`${API_BASE}/districts`, {
            params: { province_code: selectedProvince }
        }).then(res => {
            const list = res.data.data.map((item) => ({
                code: item.code,
                name: item.full_name
            }));
            setDistricts(list);
        });
    }, [selectedProvince, isInitializing]);

    // Lấy phường khi chọn quận (chỉ chạy khi không phải đang init dữ liệu edit)
    useEffect(() => {
        if (isInitializing) return;
        if (!selectedDistrict) {
            setWards([]);
            setSelectedWard("");
            return;
        }
        axios.get<APIResponse>(`${API_BASE}/wards`, {
            params: { district_code: selectedDistrict }
        }).then(res => {
            const list = res.data.data.map((item) => ({
                code: item.code,
                name: item.full_name
            }));
            setWards(list);
        });
    }, [selectedDistrict, isInitializing]);







    // Lấy danh sách tỉnh
    useEffect(() => {
        axios.get<APIResponse>(`${API_BASE}/provinces`)
            .then((res) => {
                const list = res.data.data.map((item) => ({
                    code: item.code,
                    name: item.full_name
                }));
                setProvinces(list);
            });
    }, []);

    // Lấy quận khi chọn tỉnh
    useEffect(() => {
        if (!selectedProvince) {
            setDistricts([]);
            setSelectedDistrict("");
            setWards([]);
            setSelectedWard("");
            return;
        }
        axios.get<APIResponse>(`${API_BASE}/districts`, {
            params: { province_code: selectedProvince }
        })
            .then((res) => {
                const list = res.data.data.map((item) => ({
                    code: item.code,
                    name: item.full_name
                }));
                setDistricts(list);
            });
    }, [selectedProvince]);

    // Lấy phường khi chọn quận
    useEffect(() => {
        if (!selectedDistrict) {
            setWards([]);
            setSelectedWard("");
            return;
        }
        axios.get<APIResponse>(`${API_BASE}/wards`, {
            params: { district_code: selectedDistrict }
        })
            .then((res) => {
                const list = res.data.data.map((item) => ({
                    code: item.code,
                    name: item.full_name
                }));
                setWards(list);
            });
    }, [selectedDistrict]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!storedUser || !token) {
            toast.error("Bạn chưa đăng nhập");
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
            is_default: enabled ? 1 : 0,
            note: note,
        };

        try {
            let res;
            if (isEditMode && addressToEdit) {
                // SỬA địa chỉ
                console.log("Request URL:", `${API_BASE}/addresses/${addressToEdit?.id || ''}`);

                res = await axios.put(
                    `${API_BASE}/addresses/${addressToEdit.id}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            // Accept: 'application/json' // Bắt buộc để BE không redirect
                        }
                    }
                );
            } else {
                // THÊM mới
                res = await axios.post(
                    `${API_BASE}/addresses`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            // Accept: 'application/json' // Bắt buộc để BE không redirect
                        }
                    }
                );
            }

            if (res.data.success) {
                toast.success(isEditMode ? "Cập nhật địa chỉ thành công!" : "Thêm địa chỉ thành công!");
                onSuccess();
            } else {
                toast.error("Lưu địa chỉ thất bại!");
            }
        } catch {
            toast.error("Lỗi lưu địa chỉ");
        }

    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full bg-white shadow-lg max-h-[90vh] overflow-y-auto
                 h-full rounded-none
                 sm:max-w-2xl sm:rounded-t-2xl sm:h-auto"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">Chi tiết địa chỉ</h2>
                        <button onClick={onClose}>
                            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                        >
                            <input
                                type="text"
                                placeholder="Tên người nhận"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <select
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 col-span-1 sm:col-span-2"
                            >
                                <option value="">Chọn tỉnh/thành</option>
                                {provinces.map((p) => (
                                    <option key={p.code} value={p.code}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedProvince}
                            className="border border-gray-300 rounded-md px-3 py-2"
                            >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            disabled={!selectedDistrict}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="">Chọn phường/xã</option>
                            {wards.map((w) => (
                                <option key={w.code} value={w.code}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                        <input
                            value={addressLine}
                            onChange={(e) => setAddressLine(e.target.value)}
                            type="text"
                            placeholder="Số nhà, tên đường"
                            className="border border-gray-300 rounded-md px-3 py-2 col-span-1 sm:col-span-2"
                        />
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={3}
                            placeholder="Ghi chú giao hàng (không bắt buộc)"
                            className="border border-gray-300 rounded-md px-3 py-2 col-span-1 sm:col-span-2"
                        />
                        <div className="flex flex-col gap-3 col-span-1 sm:col-span-2 sm:flex-row sm:justify-between sm:items-center">
                            <label className="flex items-center gap-2 text-sm">
                                <span>Đặt làm mặc định</span>
                                <button
                                    type="button"
                                    onClick={() => setEnabled(!enabled)}
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${enabled ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                ><span
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
            </motion.div>
        </motion.div>
        </AnimatePresence >
    );
}

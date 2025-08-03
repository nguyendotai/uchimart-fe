"use client";
import { AddressItem, Province, District, WardAPI, Ward } from "../../types/address";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
// import Link from "next/link";
import axios from "axios";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const API_BASE = "http://127.0.0.1:8000/api";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
    addressToEdit?: AddressItem | null;
}

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function ModalAddressBookMap({
    onClose,
    onSuccess,
    addressToEdit,
}: Props) {
    const isEditMode = !!addressToEdit;

    const [position, setPosition] = useState({
        lat: 10.762622,
        lng: 106.660172,
    });

    const [customAddress, setCustomAddress] = useState("");
    const [addressParts, setAddressParts] = useState({
        province: "",
        district: "",
        ward: "",
    });

    // Fly map đến vị trí mới
    const FlyToLocation = ({ position }: { position: { lat: number; lng: number } }) => {
        const map = useMap();
        useEffect(() => {
            map.flyTo(position, 15);
        }, [position]);
        return null;
    };

    // Chọn vị trí trên bản đồ
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition({ lat, lng });
                reverseGeocode(lat, lng);
            },
        });
        return <Marker position={position} icon={markerIcon} />;
    };


    // Chuẩn hóa tên để so sánh
    function normalizeName(name?: string) {
        if (!name) return "";
        return name
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // bỏ dấu
            .toLowerCase()
            .replace(/\b(thanh pho|tp\.?|tinh|quan|huyen|thi xa|phuong|xa)\b/gi, "") // bỏ tiền tố
            .replace(/\s+/g, " ")
            .trim();
    }









    // Lấy địa chỉ từ lat/lng
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=vi`
            );
            const data = await res.json();
            if (!data.address) return;

            const a = data.address;
            setCustomAddress(data.display_name || "");

            console.log("📍 Dữ liệu OSM:", a);

            let provinceName = "";
            let districtName = "";
            let wardName = "";

            // Xác định tỉnh/thành
            if (a.state) {
                provinceName = a.state;
            } else if (a.city === "Thành phố Hồ Chí Minh" || a.city === "Thành phố Hà Nội") {
                provinceName = a.city;
            }

            // Xác định quận/huyện
            if (a.county) {
                districtName = a.county;
            } else if (a.city && a.city !== provinceName) {
                districtName = a.city;
            } else if (a.suburb && !a.suburb.startsWith("Phường") && !a.suburb.startsWith("Xã")) {
                districtName = a.suburb;
            }

            // Xác định phường/xã
            if (a.city_district && (a.city_district.startsWith("Phường") || a.city_district.startsWith("Xã"))) {
                wardName = a.city_district;
            } else if (a.suburb && (a.suburb.startsWith("Phường") || a.suburb.startsWith("Xã"))) {
                wardName = a.suburb;
            } else if (a.town) {
                wardName = a.town;
            }

            // Nếu không có tỉnh nhưng districtName là quận/huyện của HCM
            if (!provinceName && [
                "Thành phố Thủ Đức", "Quận 1", "Quận 3", "Quận 5", "Quận 7", "Quận 10",
                "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Tân Bình", "Huyện Bình Chánh",
                "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè", "Huyện Cần Giờ"
            ].includes(districtName)) {
                provinceName = "Thành phố Hồ Chí Minh";
            }

            // Nếu không có tỉnh nhưng districtName là quận/huyện của Hà Nội
            if (!provinceName && [
                "Quận Hoàn Kiếm", "Quận Ba Đình", "Quận Hai Bà Trưng", "Quận Đống Đa",
                "Quận Tây Hồ", "Quận Cầu Giấy", "Quận Nam Từ Liêm", "Quận Bắc Từ Liêm",
                "Quận Thanh Xuân", "Huyện Đông Anh", "Huyện Sóc Sơn", "Huyện Gia Lâm"
            ].includes(districtName)) {
                provinceName = "Thành phố Hà Nội";
            }


            setAddressParts({
                province: provinceName,
                district: districtName,
                ward: wardName
            });


            console.log("📌 Địa chỉ tách ra:", { province: provinceName, district: districtName, ward: wardName });
        } catch {
            toast.error("Không thể lấy thông tin địa chỉ từ bản đồ");
        }
    };



    // Lấy vị trí hiện tại
    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ lat: latitude, lng: longitude });
                    reverseGeocode(latitude, longitude);
                },
                (err) => {
                    toast.error("Không thể lấy vị trí hiện tại: " + err.message);
                }
            );
        } else {
            toast.error("Trình duyệt không hỗ trợ định vị.");
        }
    };



    // Lấy code từ tên
    const fetchProvinceCode = async (provinceName: string) => {
        if (!provinceName) return "";

        const res = await axios.get(`${API_BASE}/provinces`);
        const provinces: Province[] = res.data.data;
        // Map đặc biệt để tránh nhầm
        const specialProvinceMap: Record<string, string> = {
            "ha noi": "01",
            "thanh pho ha noi": "01",
            "ho chi minh": "79",
            "thanh pho ho chi minh": "79",
        };

        const normName = normalizeName(provinceName);
        if (specialProvinceMap[normName]) {
            console.log("🔍 Tỉnh đặc biệt tìm được:", specialProvinceMap[normName]);
            return specialProvinceMap[normName];
        }

        // Chuẩn hóa tên
        const normProvinceName = normalizeName(provinceName);

        // Match chính xác full_name trước
        let found = provinces.find(
            p =>
                normalizeName(p.full_name || "") === normProvinceName ||
                normalizeName(p.name) === normProvinceName
        );

        // Match kiểu contains nếu chưa tìm được
        if (!found) {
            found = provinces.find(
                p =>
                    normProvinceName.includes(normalizeName(p.full_name || "")) ||
                    normProvinceName.includes(normalizeName(p.name)) ||
                    normalizeName(p.full_name || "").includes(normProvinceName) ||
                    normalizeName(p.name).includes(normProvinceName)
            );
        }

        console.log("🔍 Tỉnh tìm được:", found);
        return found ? found.code : "";
    };



    const fetchDistrictCode = async (provinceCode: string, districtName: string) => {
        if (!provinceCode || !districtName) return "";
        const res = await axios.get(`${API_BASE}/districts/${provinceCode}`);
        const data = res.data.data;
        const districts = Array.isArray(data) ? data : [data]; // ép thành mảng
        console.log("🔍 Danh sách districts:", districts.map(d => ({
            name: d.name,
            full_name: d.full_name,
            code: d.code
        })));

        const found = districts.find((d: District) =>
            normalizeName(d.name) === normalizeName(districtName) ||
            normalizeName(d.full_name || "").includes(normalizeName(districtName)) ||
            normalizeName(districtName).includes(normalizeName(d.name))
        );

        return found ? found.code : "";
    };

    const fetchWardCode = async (districtCode: string, wardName: string) => {
        if (!districtCode || !wardName) return "";

        const res = await axios.get(`${API_BASE}/wards/${districtCode}`);
        const wardsAPI: WardAPI[] = res.data.data;

        // Map API -> type app
        const wards: Ward[] = wardsAPI.map(w => ({
            code: w.code,
            name: w.full_name, // dùng full_name làm name chuẩn
            district_code: w.district_code
        }));

        console.log("📋 Wards (mapped):", wards);

        const wardNameNorm = normalizeName(wardName);
        console.log("🔍 So sánh ward:", {
            inputWard: wardName,
            normalizedInput: normalizeName(wardName),
            list: wards.map(w => ({
                raw: w.name,
                normalized: normalizeName(w.name),
                code: w.code
            }))
        });


        const found = wards.find(w => {
            const wardNorm = normalizeName(w.name);
            return wardNorm === wardNameNorm || wardNorm.includes(wardNameNorm) || wardNameNorm.includes(wardNorm);
        });

        return found ? found.code : "";
    };











    // Nếu đang sửa thì đặt sẵn dữ liệu
    useEffect(() => {
        if (isEditMode && addressToEdit) {
            setCustomAddress(addressToEdit.address_line || "");
        }
    }, [isEditMode, addressToEdit]);

    // Lưu địa chỉ
    const handleSaveAddress = async () => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
            toast.error("Bạn chưa đăng nhập");
            return;
        }

        const user = JSON.parse(storedUser);

        console.log("🔍 Địa chỉParts để tìm mã:", addressParts);

        // Lấy code
        console.log("📌 Province name từ OSM:", addressParts.province);
        const provinceCode = await fetchProvinceCode(addressParts.province);
        console.log("✅ ProvinceCode:", provinceCode);

        console.log("📌 District name từ OSM:", addressParts.district);
        const districtCode = await fetchDistrictCode(provinceCode, addressParts.district);
        console.log("✅ DistrictCode:", districtCode);

        console.log("📌 Ward name từ OSM:", addressParts.ward);
        let wardCode = "";
        if (districtCode) {
            wardCode = await fetchWardCode(districtCode, addressParts.ward);
        }
        console.log("✅ WardCode:", wardCode);


        console.log("🔍 Tên district từ OSM:", addressParts.district);

        console.log("✅ Mã tìm được:", { provinceCode, districtCode, wardCode });

        if (!provinceCode || !districtCode || !wardCode) {
            toast.error("Không xác định được mã tỉnh/huyện/xã từ bản đồ");
            return;
        }

        const payload = {
            user_id: user.id,
            name: user.name || "",
            phone: user.phone_number || "",
            address_line: customAddress,
            note: "",
            province_code: provinceCode,
            district_code: districtCode,
            ward_code: wardCode,
            supported_provinces: [provinceCode],
            supported_districts: [districtCode],
            supported_wards: [wardCode],
            is_default: addressToEdit?.is_default || 0,
        };

        console.log("📦 Payload gửi lên:", payload);

        try {
            let res;
            if (isEditMode && addressToEdit) {
                res = await axios.put(`${API_BASE}/addresses/${addressToEdit.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                res = await axios.post(`${API_BASE}/addresses`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            if (res.data.success) {
                toast.success(isEditMode ? "Cập nhật địa chỉ thành công!" : "Thêm địa chỉ thành công!");
                onSuccess();
            } else {
                toast.error("Lưu địa chỉ thất bại!");
            }
        } catch (err) {
            console.error("Lỗi lưu địa chỉ:", err);
            toast.error("Lỗi lưu địa chỉ");
        }
    };




    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="w-full max-w-6xl bg-white rounded-t-2xl shadow-lg max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">
                            {isEditMode ? "Sửa địa chỉ (Bản đồ)" : "Thêm địa chỉ (Bản đồ)"}
                        </h2>
                        <button onClick={onClose}>
                            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                        </button>
                    </div>

                    {/* Nội dung */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cột trái: Bản đồ */}
                        <div className="relative">
                            <div className="w-full h-96 rounded-lg overflow-hidden relative">
                                <MapContainer
                                    center={position}
                                    zoom={15}
                                    scrollWheelZoom={true}
                                    className="w-full h-full rounded-lg z-0"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <FlyToLocation position={position} />
                                    <LocationMarker />
                                </MapContainer>

                                {/* Nút vị trí của tôi */}
                                <button
                                    onClick={handleGetCurrentLocation}
                                    className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white px-3 py-2 rounded-full text-sm shadow hover:bg-blue-700 transition cursor-pointer"
                                >
                                    📍 Vị trí của tôi
                                </button>
                            </div>
                        </div>

                        {/* Cột phải: Giữ nguyên giao diện cũ */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="text-sm font-medium mb-2">Chọn vị trí</p>
                                <div className="space-y-2 text-sm">
                                    {customAddress && (
                                        <label className="flex items-start gap-2">
                                            <input
                                                type="radio"
                                                name="location"
                                                className="mt-1 accent-blue-600 w-4 h-4"
                                                defaultChecked
                                            />
                                            <span className="text-blue-700">{customAddress}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Chuyển sang nhập thủ công */}
                                <div className="mt-6 bg-gray-100 rounded-md p-4 text-sm text-gray-600">
                                    <p>Bạn không tìm thấy địa chỉ trên bản đồ?</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                            // Mở modal nhập tay ở AddressBook nếu muốn
                                        }}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Chuyển sang nhập thủ công
                                    </button>
                                </div>
                            </div>

                            {/* Nút xác nhận */}
                            <div className="mt-6 text-right">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full text-sm transition cursor-pointer"
                                    onClick={handleSaveAddress}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

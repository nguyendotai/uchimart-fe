"use client";

import Link from 'next/link';
import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const LocationPicker = () => {
    const [position, setPosition] = useState({ lat: 10.762622, lng: 106.660172 });
    const [customAddress, setCustomAddress] = useState("");
    const [searchText, setSearchText] = useState("");


    const FlyToLocation = ({ position }: { position: { lat: number, lng: number } }) => {
        const map = useMap();
        React.useEffect(() => {
            map.flyTo(position, 15); // zoom đến vị trí mới
        }, [position]);
        return null;
    };


    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ lat: latitude, lng: longitude });

                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then((res) => res.json())
                        .then((data) => {
                            const displayName = data.display_name || "Không tìm thấy địa chỉ";
                            setCustomAddress(displayName);
                        });
                },
                (err) => {
                    alert("Không thể lấy vị trí hiện tại: " + err.message);
                }
            );
        } else {
            alert("Trình duyệt không hỗ trợ định vị.");
        }
    };



    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition({ lat, lng });

                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                    .then((res) => res.json())
                    .then((data) => {
                        const displayName = data.display_name || "Không tìm thấy địa chỉ";
                        setCustomAddress(displayName);
                    });
            },
        });

        return <Marker position={position} icon={markerIcon} />;
    };



    return (
        <main className="my-[50px]">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Cột trái: Bản đồ Leaflet */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm địa chỉ (VD: 382 Tân Kỳ Tân Quý)"
                        className="absolute top-4 left-4 z-10 bg-white border border-gray-300 rounded-full px-4 py-1 text-sm shadow-sm focus:outline-none w-72"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchText)}&format=json&limit=1`)
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.length > 0) {
                                            const lat = parseFloat(data[0].lat);
                                            const lng = parseFloat(data[0].lon);
                                            setPosition({ lat, lng });
                                            setCustomAddress(data[0].display_name);
                                        } else {
                                            alert("Không tìm thấy địa chỉ!");
                                        }
                                    });
                            }
                        }}
                    />





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

                        {/* Nút Vị trí của tôi */}
                        <button
                            onClick={handleGetCurrentLocation}
                            className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white px-3 py-2 rounded-full text-sm shadow hover:bg-blue-700 transition cursor-pointer"
                        >
                            📍 Vị trí của tôi
                        </button>
                    </div>

                </div>

                {/* Cột phải: chọn vị trí */}
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-sm font-medium mb-2">Chọn vị trí</p>
                        <div className="space-y-2 text-sm">
                            {/* Địa chỉ được chọn từ bản đồ */}
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
                            <Link href="/addressBook-hand" className="text-blue-600 font-medium hover:underline">
                                Chuyển sang nhập thủ công
                            </Link>
                        </div>
                    </div>

                    {/* Nút xác nhận */}
                    <div className="mt-6 text-right">
                        <Link href="/addressBook">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full text-sm transition cursor-pointer"
                                onClick={() =>
                                    alert(`Đã chọn địa chỉ: ${customAddress || "382/15 Đường Tân Kỳ Tân Quý"}`)
                                }
                            >
                                Xác nhận
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LocationPicker;
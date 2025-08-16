"use client";
import React, { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import AddressModal from "./AddressModal";
import { Address } from "./CreateAddressModal";
import CreateAddressModal from "./CreateAddressModal";

export default function DeliveryAddress() {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      name: "Nguyễn Đỗ Tài",
      fullAddress:
        "256 Đường Phan Huy Ích, Phường 12, Quận Gò Vấp, TP. Hồ Chí Minh",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<Address>({
    name: "Nguyễn Đỗ Tài",
    fullAddress:
      "256 Đường Phan Huy Ích, Phường 12, Quận Gò Vấp, Thành phố Hồ Chí Minh",
  });

  const handleCreateAddress = (newAddress: Address) => {
    const newList = [...addresses, newAddress];
    setAddresses(newList);
    setSelectedAddress(newAddress);
    setShowCreateModal(false);
    setShowModal(true); // mở lại modal chọn địa chỉ nếu bạn muốn
  };

  return (
    <>
      <div className="bg-teal-50 p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="flex gap-3 items-center mb-4">
          <div className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-full text-sm font-bold">
            2
          </div>
          <h2 className="text-base font-semibold text-gray-900 tracking-tight">
            Chọn địa chỉ giao
          </h2>
        </div>

        {/* Địa chỉ */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <PiMapPinFill className="text-rose-500 mt-1 text-lg" />
            <div className="text-sm">
              <p className="text-gray-800">
                Giao đến <span className="font-semibold text-gray-900">{selectedAddress.name}</span>
              </p>
              <p className="text-gray-600 mt-1">{selectedAddress.fullAddress}</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors whitespace-nowrap"
          >
            Đổi địa chỉ
          </button>
        </div>

        {/* Siêu thị */}
        <div className="relative bg-white px-5 py-4 rounded-lg text-sm text-gray-800 shadow-sm">
          <div className="absolute -top-2 left-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-teal-100" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500 mb-1">Siêu thị phục vụ bạn</p>
              <p className="font-semibold text-sm text-gray-900">
                Uchimart – 448 Phạm Văn Bạch, Quận Gò Vấp
              </p>
            </div>
            <button className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors whitespace-nowrap ml-2">
              Đổi siêu thị
            </button>
          </div>
        </div>
      </div>

      <AddressModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(address) => {
          setSelectedAddress(address);
          setShowModal(false);
        }}
        onRequestCreate={() => {
          setShowModal(false);
          setShowCreateModal(true);
        }}
      />

      <CreateAddressModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateAddress}
      />
    </>
  );
}

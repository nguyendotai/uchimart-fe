"use client";

import React, { useEffect, useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import SelectAddressModal from "./SelectAddressModal";
import { useAddress } from "../../Address-context/AddressProvider";
import { AddressItem } from "../../types/address";


type Props = {
    onSelectAddress: (address: AddressItem) => void; // 👈 nhận object thay vì id
    defaultAddress?: AddressItem; // thêm
};


export default function DeliveryAddress({ onSelectAddress }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { addresses, defaultAddress } = useAddress();

  // state lưu địa chỉ được chọn
  const [selectedAddress, setSelectedAddress] = useState<AddressItem | null>(
    defaultAddress ?? null
  );

  // ✅ Gửi mặc định về cha ngay khi mount
useEffect(() => {
  if (defaultAddress) {
    setSelectedAddress(defaultAddress);
    onSelectAddress(defaultAddress); // gửi lên cha ngay khi mount
  }
}, [defaultAddress, onSelectAddress]);


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
                Giao đến{" "}
                <span className="font-semibold text-gray-900">
                  {selectedAddress?.name || "Chưa chọn"}
                </span>
              </p>
              <p className="text-gray-600 mt-1">
                {selectedAddress ? (
                  <span>
                    {selectedAddress.address_line}
                    {selectedAddress.ward?.name ? `, P.${selectedAddress.ward.name}` : ""}
                    {selectedAddress.district?.name ? `, Q.${selectedAddress.district.name}` : ""}
                    {selectedAddress.province?.name ? `, TP.${selectedAddress.province.name}` : ""}
                  </span>
                ) : defaultAddress ? (
                  <span>
                    {defaultAddress.address_line}
                    {defaultAddress.ward?.name ? `, ${defaultAddress.ward.name}` : ""}
                    {defaultAddress.district?.name ? `, ${defaultAddress.district.name}` : ""}
                    {defaultAddress.province?.name ? `, ${defaultAddress.province.name}` : ""}
                  </span>
                ) : (
                  <span>Bạn chưa có địa chỉ mặc định</span>
                )}
              </p>

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
              Xem trên bản đồ
            </button>
          </div>
        </div>
      </div>

      {/* Modal chọn địa chỉ */}
      <SelectAddressModal
        open={showModal}
        onClose={() => setShowModal(false)}
        addresses={addresses}
        selectedAddress={selectedAddress ?? undefined}
        onSelect={(address: AddressItem) => {
          setSelectedAddress(address);
          onSelectAddress(address); // 👉 gửi id về cha
        }}
      />
    </>
  );
}

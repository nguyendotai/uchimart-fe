import Link from 'next/link';
import React from 'react';

const AddressBookMap = () => {
  return (
    <main className="my-[50px]">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái: Bản đồ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm địa chỉ"
            className="absolute top-4 left-4 z-10 bg-white border border-gray-300 rounded-full px-4 py-1 text-sm shadow-sm focus:outline-none"
          />
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Tân%20Kỳ%20Tân%20Quý,%20Tân%20Phú&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Cột phải: chọn vị trí */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium mb-2">Chọn vị trí</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="location"
                  defaultChecked
                  className="mt-1 accent-blue-600 w-4 h-4"
                />
                <span>382/15 Đường Tân Kỳ Tân Quý</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="location"
                  className="mt-1 accent-blue-600 w-4 h-4"
                />
                <span>
                  382/15 Đ. Tân Kỳ Tân Quý, Tân Quý, Tân Phú, Hồ Chí Minh, Việt Nam
                </span>
              </label>
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full text-sm transition cursor-pointer">
              Xác nhận
            </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddressBookMap;

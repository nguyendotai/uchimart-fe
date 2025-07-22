'use client';

import { CheckCircle, Truck, PackageCheck, ShoppingCart } from 'lucide-react';

export default function OrderDetail() {
  return (
    <main className="bg-[#F7F7F7] min-h-screen py-8 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="text-sm text-[#921573] font-medium mb-2">&larr; Trở lại</button>
          <h1 className="text-2xl font-bold mb-1">Chi tiết đơn hàng</h1>
          <div className="text-sm text-gray-600">
            Mã đơn hàng: <span className="font-medium">231128S3S3SEX</span> |{' '}
            <span className="text-green-600 font-medium">Đơn hàng đã được giao thành công</span>
          </div>
        </div>

        {/* Địa chỉ nhận hàng & Trạng thái */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 grid md:grid-cols-2 gap-6">
          {/* Địa chỉ */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Địa chỉ nhận hàng</h2>
            <p className="text-gray-800 font-medium">Nguyễn Đỗ Tài</p>
            <p className="text-gray-600 text-sm">(+84) 332466408</p>
            <p className="text-gray-600 text-sm">
              Hẻm 745/62/ Đường Quang Trung, Phường 12, Quận Gò Vấp, TP. Hồ Chí Minh
            </p>
          </div>

          {/* Trạng thái đơn hàng */}
          <div>
            <ul className="space-y-3 border-l-2 border-gray-200 pl-4 relative">
              <li className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-green-600">Đã giao</p>
                  <p className="text-sm text-gray-600">10:11 30-11-2023 • Người nhận: Nguyễn Đỗ Tài</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Truck className="text-gray-500 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Đang vận chuyển</p>
                  <p className="text-sm text-gray-600">08:28 30-11-2023</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <PackageCheck className="text-gray-500 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Đang được chuẩn bị</p>
                  <p className="text-sm text-gray-600">18:13 28-11-2023</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <ShoppingCart className="text-gray-500 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Đặt hàng thành công</p>
                  <p className="text-sm text-gray-600">16:30 28-11-2023</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/pepsi.jpg"
              alt="Pepsi"
              className="w-20 h-20 object-cover rounded-md border"
            />
            <div>
              <p className="font-medium text-sm">Thùng nước ngọt vị chanh zero calo Pepsi 320ml (24 Lon)</p>
              <p className="text-sm text-gray-600">Phân loại: thùng</p>
              <p className="text-sm text-gray-600">Số lượng: 1</p>
              <p className="text-sm text-gray-500">Thương hiệu: <span className="text-blue-600 font-medium">Pepsi</span></p>
            </div>
          </div>

          {/* Giá */}
          <div className="text-right text-sm text-gray-700">
            <p>Tổng tiền hàng: <span className="font-semibold text-gray-900">194.000đ</span></p>
            <p>Phí vận chuyển: <span className="text-gray-900 font-medium">16.000đ</span></p>
            <p>Giảm giá phí vận chuyển: <span className="text-gray-900 font-medium">-6.000đ</span></p>
            <p className="mt-1 text-lg font-bold text-[#921573]">Thành tiền: 204.000đ</p>
            <p className="text-sm mt-1">Phương thức thanh toán: <span className="font-medium text-[#00BF63]">Thanh toán khi nhận hàng</span></p>
          </div>

          <div className="text-center mt-4">
            <button className="bg-[#00BF63] text-white px-6 py-2 rounded-full hover:bg-green-700 transition font-medium">
              Mua lại
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

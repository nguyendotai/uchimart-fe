"use client";
import React, { useState, useEffect } from "react";
import DeliveryMethod from "./components/DeliveryMethod";
import DeliveryAddress from "./components/DeliveryAddress";
import DeliveryTime from "./components/DeliveryTime";
import OrderItems from "./components/OrderItems";
import VoucherSelect from "./components/VoucherSelect";
import { FaCheckCircle } from "react-icons/fa";
import { CartItem } from "../types/Product";
import { Voucher } from "../types/Voucher";
import { AddressItem } from "../types/address";
import PaymentMethod from "./components/PaymentMethod";
import { useAddress } from "../Address-context/page";

// --- Thêm interface này ở đây ---
interface StoredCartItem {
  id: number;
  inventory_id: number;
  quantity: number;
  total_price: string;
  inventory?: {
    title?: string;
    image?: string;
    sale_price?: string;
    offer_price?: string | null;
  };
}


interface Section {
  id: number;
  title: string;
  component: React.ReactNode;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");


  const [activeSection, setActiveSection] = useState(1);
  // state lưu địa chỉ được chọn
  const { defaultAddress } = useAddress(); // lấy từ context
const [selectedAddress, setSelectedAddress] = useState<AddressItem | null>(defaultAddress ?? null);


  // ✅ Lấy dữ liệu từ localStorage (chỉ lấy selectedItems thay vì toàn bộ giỏ hàng)
  useEffect(() => {
    const stored = localStorage.getItem("selectedItems");
    if (!stored) return;

    try {
      const selected: StoredCartItem[] = JSON.parse(stored);

      // map sang CartItem hợp lệ
      const cartItems: CartItem[] = selected.map((item) => {
        const inv = item.inventory;
        const salePrice = inv?.sale_price ?? undefined;
        const offerPrice = inv?.offer_price ?? null;

        return {
          id: item.id,
          inventory_id: item.inventory_id,
          title: inv?.title,
          image: inv?.image,
          sale_price: salePrice,
          offer_price: offerPrice,
          quantity: item.quantity,
          total_price: Number(item.total_price), // number thay vì string
          inventory: undefined, // hoặc giữ raw inv nếu bạn muốn
        };
      });

      setItems(cartItems);
    } catch (error) {
      console.error("Failed to parse selectedItems from localStorage", error);
    }
  }, []);




  const sections: Section[] = [
    { id: 1, title: "Phương thức giao hàng", component: <DeliveryMethod value={deliveryMethod} onChange={setDeliveryMethod} /> },
    { id: 2, title: "Địa chỉ giao hàng", component: <DeliveryAddress defaultAddress={defaultAddress ?? undefined} onSelectAddress={(address: AddressItem) => setSelectedAddress(address)} /> },
    { id: 3, title: "Thời gian giao nhận", component: <DeliveryTime items={items} selectedTime={selectedTime} onChange={setSelectedTime} /> },
    { id: 4, title: "Khuyến mãi", component: <VoucherSelect selectedVoucher={selectedVoucher} onChange={setSelectedVoucher} /> },
    {
      id: 5, title: "Phương thức thanh toán", component: <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-8 px-4 md:px-6">
      {/* Progress Tracker */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-5 gap-2">
          {sections.map((section, index) => (
            <div key={section.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${activeSection >= section.id
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-600"
                  } transition-all duration-300`}
              >
                {activeSection > section.id ? <FaCheckCircle /> : section.id}
              </div>
              <span className="text-xs text-gray-700 mt-2 text-center">
                {section.title}
              </span>
              {index < sections.length - 1 && (
                <div
                  className={`h-1 mt-2 ${activeSection > section.id ? "bg-teal-500" : "bg-gray-200"
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left: Checkout Steps */}
        <div className="w-full md:w-2/3 space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-teal-50"
                onClick={() => setActiveSection(section.id)}
              >
                <span className="font-semibold text-gray-900">
                  {section.title}
                </span>
                <span className="text-teal-600">
                  {activeSection === section.id ? "▲" : "▼"}
                </span>
              </button>
              {activeSection === section.id && (
                <div className="p-5 bg-white transition-all duration-300">
                  {section.component}
                  <div className="flex justify-between mt-4">
                    {section.id > 1 && (
                      <button
                        className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
                        onClick={() => setActiveSection(section.id - 1)}
                      >
                        Quay lại
                      </button>
                    )}
                    <button
                      className="bg-teal-600 text-white py-2 px-6 rounded-full font-medium hover:bg-teal-700 transition-colors"
                      onClick={() =>
                        section.id < sections.length
                          ? setActiveSection(section.id + 1)
                          : alert("Hoàn tất đặt hàng!")
                      }
                    >
                      {section.id < sections.length ? "Tiếp tục" : "Hoàn tất"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-6 bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tóm tắt đơn hàng
            </h3>
            <OrderItems items={items} voucher={selectedVoucher} selectedAddress={selectedAddress} paymentMethod={paymentMethod} />
          </div>
        </div>
      </div>
    </div>
  );
}

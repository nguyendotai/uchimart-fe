"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFacebook } from "react-icons/bs";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import axios from "axios";

type Page = {
  id: number;
  name: string;
  slug: string;
  title: string;
  content: string | null;
  order: number;
  code: string | null;
  display_in: string | null;
  author: string | null;
  status: number;
  post_at: string | null;
};

const Footer = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ success: boolean; data: Page[] }>(
        "http://localhost:8000/api/pages"
      )
      .then((res) => setPages(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const veChungToiSlug = [
    "lien-he",
    "chinh-sach-bao-mat",
    "dieu-khoan-giao-dich",
    "quy-che-hoat-ong-cua-website-uchimartsite",
  ];
  const hoTroSlug = [
    "chinh-sach-giao-hang",
    "chinh-sach-thanh-toan",
    "chinh-sach-doi-tra",
    "huong-dan-mua-hang",
  ];

  const veChungToi = pages.filter((p) => veChungToiSlug.includes(p.slug));
  const hoTroKhachHang = pages.filter((p) => hoTroSlug.includes(p.slug));

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 📩 Gửi email đăng ký
  const handleSubscribe = async () => {
    if (!email) {
      toast.warn("Vui lòng nhập email.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/api/subscribers", {
        email,
      });

      if (res.data.success) {
        toast.success("🎉 " + res.data.message);
        setEmail("");
      }
    } catch (err: any) {
      if (err.response?.data?.errors?.email) {
        toast.error(err.response.data.errors.email[0]);
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className=" text-white py-10">
      <ToastContainer position="top-right" autoClose={1500} />
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Left: Logo & Company Info */}
          <div className="flex-1">
            <img src="./logo.png" alt="Uchi Mart Logo" className="w-36 mb-4" />
            <p className="text-sm text-black leading-relaxed max-w-sm">
              Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce
              <br />
              Mã số doanh nghiệp: 0104918404
              <br />
              Đăng ký lần đầu: 20/09/2010, thay đổi lần thứ 48: 30/06/2023
            </p>
            <img
              src="./img/certification.png"
              alt="Certification"
              className="w-28 mt-4"
            />
          </div>

          {/* Center: Links */}
          <div className="flex-1 flex flex-col sm:flex-row gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">
                Về chúng tôi
              </h3>
              <ul className="space-y-2 text-black">
                {veChungToi.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/policy/${page.slug}`}
                      className="hover:text-green-500 transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">
                Hỗ trợ khách hàng
              </h3>
              <ul className="space-y-2 text-black">
                {hoTroKhachHang.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/policy/${page.slug}`}
                      className="hover:text-green-500 transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Customer Support & Subscription */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-400 mb-3">
              Liên hệ & Đăng ký
            </h3>
            <ul className="space-y-2  text-black mb-4">
              <li>
                Hotline:{" "}
                <a href="tel:0332493487" className="hover:text-green-500">
                  0332493487
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:cskh@uchimart.com"
                  className="hover:text-green-500"
                >
                  cskh@uchimart.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className=" text-black mb-3">
                Đăng ký để nhận ưu đãi độc quyền!
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="flex-1 p-2 rounded-md border border-gray-600 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm disabled:opacity-50"
                >
                  {loading ? "Đang gửi..." : "Đăng ký"}
                </button>
              </div>
              {message && (
                <p className="mt-2 text-sm text-red-500">{message}</p>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <Link
                href="https://www.facebook.com/tuan.anh.358553"
                className="hover:text-blue-400 transition-colors"
              >
                <BsFacebook className="text-xl" />
              </Link>
              <Link
                href="https://www.youtube.com"
                className="hover:text-red-400 transition-colors"
              >
                <FaYoutube className="text-xl" />
              </Link>
              <Link
                href="https://www.tiktok.com"
                className="hover:text-green-500 transition-colors"
              >
                <FaTiktok className="text-xl" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs text-black">
          <p>© 2025 Công Ty TNHH Uchi Martket. ...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/User";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("Vui lòng nhập email và mật khẩu");
      return;
    }

    try {
      setLoading(true);

      // Gọi API đăng nhập
      const res = await axios.post<LoginResponse>(
        "http://localhost:8000/api/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      if (!res.data.access_token) {
        toast.error("Không nhận được token từ server!");
        return;
      }

      // Lưu token riêng
      localStorage.setItem("token", res.data.access_token);

      // Lưu user riêng
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Đăng nhập thành công!");
      router.push("/"); // quay lại trang chủ
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error?: string }>;
        alert(axiosErr.response?.data?.error || "Đăng nhập thất bại!");
      } else {
        alert("Lỗi không xác định!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="./logo.png"
              alt="Logo"
              className="mx-auto w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[300px]"
            />
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                />

                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg 
                    hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center 
                    focus:shadow-outline focus:outline-none disabled:opacity-50"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('./img/loginrb.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

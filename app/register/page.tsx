"use client";
import React, { useState } from "react";
import { RegisterPayload, User } from "../types/User";
import axios, { AxiosError } from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // cần cài heroicons

type RegisterForm = RegisterPayload & { confirmPassword: string };

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    genders: 1,
    birthday: "2000-01-01",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (form.password.trim() !== form.confirmPassword.trim()) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    const payload: RegisterPayload = {
      name: form.name.trim(),
      phone_number: form.phone_number.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      password_confirmation: form.confirmPassword.trim(),
      genders: form.genders,
      birthday: form.birthday,
    };

    try {
      const res = await axios.post<User>(
        "http://localhost:8000/api/register",
        payload
      );
      alert("Đăng ký thành công!");
      console.log("User mới:", res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        alert(axiosErr.response?.data?.message || "Đăng ký thất bại!");
      } else {
        console.error(err);
        alert("Lỗi không xác định!");
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center">
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
                {/* Họ tên */}
                <input
                  name="name"
                  type="text"
                  placeholder="Họ và tên"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border mt-2"
                />

                {/* Số điện thoại */}
                <input
                  name="phone_number"
                  type="tel"
                  placeholder="Số điện thoại"
                  value={form.phone_number}
                  onChange={handleChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border mt-2"
                />

                {/* Email */}
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border mt-2"
                />

                {/* Mật khẩu */}
                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Nhập lại mật khẩu */}
                <div className="relative mt-2">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Nút đăng ký */}
                <button
                  onClick={handleSubmit}
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all"
                >
                  Đăng ký
                </button>

                {/* Điều khoản */}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Bằng việc đăng ký, tôi đồng ý với{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Chính sách bảo mật
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hình bên phải */}
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

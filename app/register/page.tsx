"use client";
import React, { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }
        console.log("Register form data:", form);
        // TODO: Gọi API đăng ký
    };

    return (
        <div className=" bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                {/* Form */}
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    {/* Logo */}
                    <div>
                        <img
                            src="./logo.png"
                            alt="Logo"
                            className="mx-auto w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[300px]"
                        />
                    </div>

                    <div className="mt-10 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">




                            {/* Email + Password */}
                            <div className="mx-auto max-w-xs">
                                {/* Họ tên */}
                                <input
                                    name="fullname"
                                    type="text"
                                    placeholder="Họ và tên"
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                />

                                {/* Số điện thoại */}
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                />

                                {/* Email */}
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                />

                                {/* Mật khẩu */}
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                />

                                {/* Nhập lại mật khẩu */}
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
    placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                />

                                {/* Nút Đăng ký */}
                                <button
                                    onClick={handleSubmit}
                                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg 
    hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center 
    focus:shadow-outline focus:outline-none"
                                >
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-2">Đăng ký</span>
                                </button>

                                {/* Điều khoản */}
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Bằng việc đăng ký, tôi đồng ý với{" "}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Điều khoản dịch vụ
                                    </a>{" "}
                                    và{" "}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Chính sách bảo mật
                                    </a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right image */}
                <div className="flex-1 bg-green-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('./img/loginrb.png')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

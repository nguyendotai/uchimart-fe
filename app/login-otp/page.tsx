"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { FaHome } from "react-icons/fa";

const LoginOTP = () => {
    // Mảng ref cho 6 ô input
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Khi người dùng nhập vào 1 ô
    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        // Chỉ nhận số
        if (/^[0-9]$/.test(value)) {
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        } else {
            e.target.value = "";
        }
    };

    // Khi nhấn phím (xử lý backspace)
    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !e.currentTarget.value) {
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };
    return (
        <main className="flex flex-1 flex-col">
            <div className="flex min-h-screen items-center justify-center bg-[#F5F5FA]">
                <div className="w-full rounded-[10px] max-w-[45%] bg-white">
                    <div className="p-4 mb-10">
                        <div className="w-[8%] border-2 border-[#921573] rounded-full flex items-center justify-center cursor-pointer p-3">
                            <Link href="/"><FaHome className="  text-2xl text-[#C7C7C7] " /></Link>
                        </div>

                        <div className="flex flex-col items-center space-y-4 mb-10">
                            <h2 className="text-2xl font-bold">Nhập mã OTP</h2>
                            <p className="text-center">
                                Nhập mã gồm 6 chữ số đã gửi đến số điện thoại <br />
                                <span className="font-bold">0338047406</span>{" "}
                                <Link href="/login" className="text-blue-600 underline">
                                    đổi số điện thoại
                                </Link>
                            </p>

                            {/* Các ô nhập mã */}
                            <div id="otp" className="flex space-x-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        ref={(el) => {
                                            inputRefs.current[i] = el;
                                        }}
                                        onChange={(e) => handleChange(i, e)}
                                        onKeyDown={(e) => handleKeyDown(i, e)}
                                        className="otp-input w-12 h-12 text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mx-auto w-[30%] flex items-center justify-center text-[#F5F5FA] bg-[#327FF6] rounded-[10px] cursor-pointer mb-4"
                        >
                            <span className="w-full p-4 text-center">Xác nhận</span>
                        </button>

                        <p className="text-center mb-5">
                            Bạn chưa nhận được?{" "}
                            <Link href="#" className="text-blue-600">
                                Gửi lại
                            </Link>
                        </p>
                        <p className="text-center">
                            Hoặc chọn{" "}
                            <Link href="#" className="text-blue-600">
                                Nhận qua Zalo
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginOTP;

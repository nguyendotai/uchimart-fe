"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';


const LoginOTP = () => {
    const router = useRouter(); // ✅ đây là hook

    // Mảng ref cho 6 ô input
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));


    // Khi người dùng nhập vào 1 ô
    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        } else {
            e.target.value = "";
        }
    };


    const handleVerifyOTP = async () => {
        const fullOTP = otp.join('');

        if (!window.confirmationResult) {
            alert("⚠️ Vui lòng nhập số điện thoại trước.");
            router.push("/login");
            return;
        }

        try {
            await window.confirmationResult.confirm(fullOTP);
            router.push('/'); // 👉 chuyển đến trang sau khi đăng nhập
        } catch (error) {
            console.error('❌ Lỗi xác thực OTP:', error);
            alert('❌ Mã OTP không đúng!');
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


    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);
    return (
        <main className="flex flex-1 flex-col">
            <div className="flex min-h-screen items-center justify-center bg-[#F5F5FA]">
                <div className="w-full rounded-[10px] max-w-[45%] bg-white">
                    <div className="p-4 mb-10">
                        

                        <div className="flex flex-col items-center space-y-4 mb-10 pt-10">
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
                            className="mx-auto w-[30%] flex items-center justify-center text-[#F5F5FA] bg-[#327FF6] rounded-[10px] cursor-pointer mb-4" onClick={handleVerifyOTP}
                        >
                            <span className="w-full p-4 text-center">Xác nhận</span>
                        </button>

                        <p className="text-center mb-5">
                            Bạn chưa nhận được?{" "}
                            <Link href="#" className="text-blue-600">
                                Gửi lại
                            </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginOTP;

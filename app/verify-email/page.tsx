"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = decodeURIComponent(searchParams.get("email") || "");
    const router = useRouter();

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(5); // 5 giây đếm ngược
    const calledRef = React.useRef(false);

    useEffect(() => {
        if (!token || !email || calledRef.current) return;
        calledRef.current = true; // Đánh dấu đã gọi 1 lần

        axios.post("http://localhost:8000/api/verify-email", { token, email })
            .then((res) => {
                setStatus("success");
                setMessage(res.data.message || "Xác thực email thành công!");

                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            router.push("/login");
                        }
                        return prev - 1;
                    });
                }, 1000);
            })
            .catch((err) => {
                setStatus("error");
                setMessage(err.response?.data?.message || "Xác thực thất bại");
            });
    }, [token, email]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                {status === "loading" && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Đang xác thực email...</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-green-600 mb-2">{message}</h1>
                        <p className="text-gray-500">Tự động chuyển hướng sau {countdown} giây...</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center">
                        <div className="bg-red-100 p-4 rounded-full mb-4">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-red-600 mb-2">{message}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;
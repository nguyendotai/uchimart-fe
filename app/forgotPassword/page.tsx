"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ApiResponse {
  message: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post<ApiResponse>(
        "http://localhost:8000/api/forgot-password",
        { email }
      );
      toast.success(res.data.message);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      toast.error(err.response?.data?.message || "Gửi yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
  <h1 className="text-2xl font-semibold mb-6 text-center text-[#00A63E]">
    Quên mật khẩu
  </h1>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="email"
      className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A63E] transition-all duration-300"
      placeholder="Nhập email của bạn"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button
      type="submit"
      disabled={loading}
      className="bg-[#00A63E] hover:bg-green-700 text-white px-4 py-3 w-full rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Đang gửi..." : "Gửi link đặt lại"}
    </button>
  </form>
  <p className="mt-4 text-center text-gray-500 text-sm">
    Bạn sẽ nhận được email kèm link đặt lại mật khẩu.
  </p>
</div>


  );
}

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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl mb-4">Quên mật khẩu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="border p-2 w-full mb-4"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          {loading ? "Đang gửi..." : "Gửi link đặt lại"}
        </button>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

interface ApiResponse {
  message: string;
}

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !passwordConfirm) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post<ApiResponse>(
        "http://localhost:8000/api/reset-password",
        {
          email,
          token,
          password,
          password_confirmation: passwordConfirm
        }
      );
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      toast.error(err.response?.data?.message || "Đặt lại mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return <p className="text-center mt-10">Link đặt lại mật khẩu không hợp lệ.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
  <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
    Đặt lại mật khẩu
  </h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Mật khẩu mới */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Mật khẩu mới
      </label>
      <div className="relative">
        <input
          type="password"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#00A63E] focus:border-[#00A63E] transition-all"
          placeholder="Nhập mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="absolute right-3 top-3 text-gray-400">
          🔒
        </span>
      </div>
    </div>

    {/* Xác nhận mật khẩu */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Xác nhận mật khẩu
      </label>
      <div className="relative">
        <input
          type="password"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#00A63E] focus:border-[#00A63E] transition-all"
          placeholder="Nhập lại mật khẩu"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <span className="absolute right-3 top-3 text-gray-400">
          🔒
        </span>
      </div>
    </div>

    {/* Nút submit */}
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3 rounded-lg bg-[#00A63E] text-white font-semibold hover:bg-[#009136] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
    </button>
  </form>
</div>

  );
}

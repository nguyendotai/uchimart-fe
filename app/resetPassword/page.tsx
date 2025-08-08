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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl mb-4">Đặt lại mật khẩu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Xác nhận mật khẩu"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 w-full"
        >
          {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
        </button>
      </form>
    </div>
  );
}

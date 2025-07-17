"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginGGSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const name = searchParams.get("name");

  useEffect(() => {
    if (email && name) {
      // Lưu vào localStorage hoặc context
      localStorage.setItem("user", JSON.stringify({ email, name }));

      // Chuyển hướng đến trang chính
      router.push("/");
    }
  }, [email, name]);

  return <div className="text-center mt-10 text-xl">Đang đăng nhập bằng Google...</div>;
};

export default LoginGGSuccess;

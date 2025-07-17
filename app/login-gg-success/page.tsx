"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginGGSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const avatar = searchParams.get("avatar");

  useEffect(() => {
    if (email && name) {
      localStorage.setItem("user", JSON.stringify({ email, name, avatar }));
      router.push("/"); // chuyển về trang chính
    }
  }, [email, name, avatar]);

  return <div className="text-center mt-10 text-xl">Đang đăng nhập bằng Google...</div>;
};

export default LoginGGSuccess;

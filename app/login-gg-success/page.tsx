"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginGGSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const avatar = searchParams.get("avatar");
  const birthday = searchParams.get("birthday");
  const phone_number = searchParams.get("phone_number");

  useEffect(() => {
    if (email && name) {
      localStorage.setItem("user", JSON.stringify({ email, name, avatar, birthday, phone_number }));
      router.push("/"); // chuyển về trang chính
    }
  }, [email, name, avatar, birthday, phone_number]);

  return <div className="text-center mt-10 text-xl">Đang đăng nhập bằng Google...</div>;
};

export default LoginGGSuccess;

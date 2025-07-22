"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginGGSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {

    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const avatar = searchParams.get("avatar");
    const birthday = searchParams.get("birthday");
    const phone_number = searchParams.get("phone_number");
    const genders = searchParams.get("genders");


    if (id && email && name) {
      const user = {
        id,
        email,
        name,
        avatar,
        birthday,
        phone_number,
        genders: Number(genders),
      };
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/"); // hoặc chuyển đến /profile
    }
  }, [searchParams, router]);

  return <div className="text-center mt-10 text-xl">Đang đăng nhập bằng Google...</div>;
};

export default LoginGGSuccess;

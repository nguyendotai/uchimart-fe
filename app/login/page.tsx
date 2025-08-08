"use client";
import React, { useEffect, useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/User";
import { toast } from "react-toastify";
import { CgShapeZigzag } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";


type IconData = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotate: number;
  vr: number;
  color: string;
};


export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const colors = ["#921573", "#000000"];
  const numIcons = 7;

  const [icons, setIcons] = useState<IconData[]>([]);
  const iconsRef = useRef<IconData[]>([]);





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("Vui lòng nhập email và mật khẩu");
      return;
    }

    try {
      setLoading(true);

      // Gọi API đăng nhập
      const res = await axios.post<LoginResponse>(
        "http://localhost:8000/api/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      if (!res.data.token) {
        toast.error("Không nhận được token từ server!");
        return;
      }

      // Lưu token riêng
      localStorage.setItem("token", res.data.token);

      // Lưu user riêng
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Đăng nhập thành công!");
      // Phát sự kiện custom để các component khác biết user đã thay đổi
      window.dispatchEvent(new Event("userChanged"));
      router.push("/"); // quay lại trang chủ
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error?: string }>;
        toast.error(axiosErr.response?.data?.error || "Đăng nhập thất bại!");
      } else {
        toast.error("Lỗi không xác định!");
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const initIcons: IconData[] = Array.from({ length: numIcons }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 85,
      vx: (Math.random() - 0.5) * 0.01,
      vy: (Math.random() - 0.5) * 0.01,
      rotate: Math.random() * 360,
      vr: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setIcons(initIcons);
    iconsRef.current = initIcons;

    const animate = () => {
      iconsRef.current = iconsRef.current.map(icon => {
        let { x, y, vx, vy, rotate } = icon;
        const { vr } = icon; // vr dùng const vì không đổi

        x += vx;
        y += vy;
        rotate += vr;

        if (x <= 0 || x >= 95) vx *= -1;
        if (y <= 0 || y >= 90) vy *= -1;

        return { ...icon, x, y, vx, vy, rotate };
      });


      setIcons([...iconsRef.current]);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);


  const handleLoginWithGoogle = () => {
    window.location.href = "http://127.0.0.1:8000/auth/google"; // URL BE Laravel
  };

  return (
    <div className="relative w-full h-[83vh] overflow-hidden">
      {/* Ảnh nền */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 z-1 bg-contain bg-right bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('./img/bglogin1.png')" }}
        ></div>
        <div
          className="absolute inset-0 z-1 bg-contain bg-left bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('./img/bglogin2.1.png')" }}
        ></div>
      </div>

      {/* SVG background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 L0,97 C15,70 20,0 180,0 Z" fill="#8FC446" />
      </svg>

      {/* Div màu đen bên trái */}
      <div
        className="absolute top-0 left-[12%] h-full w-[17%] bg-white opacity-80 z-5 bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://images.pexels.com/photos/4877842/pexels-photo-4877842.jpeg')",
        }}
      >
        <img
          src="./img/logo2rb.png"
          alt=""
          className="w-[60%] mx-auto mt-3 drop-shadow-lg"
        />
      </div>

      <div>
        <img src="./img/salad3.png" alt="" className="absolute top-5 left-5 z-10 w-[35%]" />
        <img src="./img/fruits1.png" alt="" className="absolute top-30 left-20 z-9 w-[35%]" />
        <img src="./img/salad1.png" alt="" className="absolute top-95 left-10 z-8 w-[30%]" />
      </div>

      {/* Form đăng nhập */}
      <div className="absolute top-[55%] z-20 right-[18%] transform -translate-y-1/2 w-[27%] p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Đăng nhập
        </h2>

        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
          />

          {/* Forgot password */}
          <div className="text-right">
            <Link href="/forgotPassword" className="text-sm text-green-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Login button */}
          <button
            disabled={loading}
            className="w-full bg-[#89C841] hover:bg-[#00A63E] text-white py-3 rounded-lg font-semibold transition cursor-pointer"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Hoặc */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-green-500"></div>
          <span className="mx-3 text-gray-500">Hoặc</span>
          <div className="flex-grow border-t border-green-500"></div>
        </div>

        {/* Social login */}
        <div className="flex gap-4">
          <button onClick={handleLoginWithGoogle} className="flex-1 flex items-center justify-center border border-gray-300 rounded-full py-2 hover:bg-gray-50 cursor-pointer">
            <FcGoogle className="w-5 h-5 mr-2" />
            Google
          </button>
        </div>

        {/* Sign up */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Bạn chưa có tài khoản?{" "}
          <Link href="/register" className="text-[#00A63E] hover:underline">
            Đăng ký ngay!
          </Link>
        </p>
      </div>


      {/* Icons di chuyển mượt */}
      {icons.map(icon => (
        <div
          key={icon.id}
          className="absolute z-10"
          style={{
            top: `${icon.y}%`,
            left: `${icon.x}%`,
            transform: `rotate(${icon.rotate}deg)`,
            fontSize: "50px",
            color: icon.color
          }}
        >
          <CgShapeZigzag />
        </div>
      ))}
    </div>

  );
}

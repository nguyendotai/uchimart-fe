"use client";
import React, { useState, useRef, useEffect } from "react";
import { RegisterPayload, User } from "../types/User";
import axios, { AxiosError } from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { CgShapeZigzag } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


type RegisterForm = RegisterPayload & { confirmPassword: string };
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


export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    genders: 1,
    birthday: "2000-01-01",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (form.password.trim() !== form.confirmPassword.trim()) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    const payload: RegisterPayload = {
      name: form.name.trim(),
      phone_number: form.phone_number.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      password_confirmation: form.confirmPassword.trim(),
      genders: form.genders,
      birthday: form.birthday,
    };

    try {
      setLoading(true);
      const res = await axios.post<User>(
        "http://localhost:8000/api/register",
        payload
      );
      toast.success("Đăng ký thành công! Vui lòng xác thực email.");
      console.log("User mới:", res.data);
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        toast.error(axiosErr.response?.data?.message || "Đăng ký thất bại!");
      } else {
        console.error(err);
        toast.error("Lỗi không xác định!");
      }
    } finally {
      setLoading(false); // Tắt loading khi request kết thúc
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
      <div className="absolute top-[55%] z-15 right-[18%] transform -translate-y-1/2 z-20 w-[27%] p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Đăng Ký
        </h2>

        <form className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
          />

          {/* Phone */}
          <input
            name="phone_number"
            type="tel"
            placeholder="Số điện thoại"
            value={form.phone_number}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
          />

          {/* Password */}
          <div className="relative mt-2">

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* xác nhận Password */}
          <div className="relative mt-2">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>



          {/* Login button */}
           <button
            type="submit"
            disabled={loading} // disable khi đang load
            className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#89C841] hover:bg-[#00A63E]"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        {/* Sign up */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Bạn đã có tài khoản?{" "}
          <Link href="/login" className="text-[#00A63E] hover:underline">
            Đăng nhập!
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

"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import firebase from "../firebase/firebase";
import {useRouter}  from 'next/navigation';


// 👇 Gắn kiểu rõ ràng cho window
declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    confirmationResult: firebase.auth.ConfirmationResult;
  }
}

const Login = () => {
  const router = useRouter(); // ✅ đây là hook
  // const [phone, setPhone] = useState('');
  // const [agree, setAgree] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const setupRecaptcha = (): void => {
  if (typeof window !== "undefined" && !window.recaptchaVerifier) {
    const recaptchaElement = document.getElementById("sign-in-button");
    if (recaptchaElement) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
        defaultCountry: "VN",
      });
    }
  }
};


  const formatPhoneNumber = (number: string): string => {
    if (number.startsWith('0')) {
      return '+84' + number.slice(1);
    }
    return number;
  };

  const handleSendOTP = async (): Promise<void> => {
    if (!window.recaptchaVerifier) {
      setupRecaptcha();
    }

    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(
        formatPhoneNumber(phoneNumber),
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      alert('✅ Đã gửi OTP thành công!');
       router.push('/login-otp');
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      alert("❌ Gửi OTP thất bại!");
    }
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);



  return (
    <div>
      <main className="flex flex-1 flex-col">
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5FA]">
          <div className="w-full rounded-[10px] max-w-[50%] bg-white">
            <div className="p-4">
              <div className="w-[8%] border-2 border-[#921573] rounded-full flex items-center justify-center cursor-pointer p-3">
                <Link href="/"><FaHome className="  text-2xl text-[#C7C7C7] " /></Link>
              </div>

              <div className="w-full mb-10">
                <img className="mx-auto w-[50%]" src="/logo.png" alt="Logo" />
              </div>

              <div className="text-center mb-4">Mời bạn nhập số điện thoại</div>

              <div className="text-center mb-4">
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  // onChange={(e) =>
                  //   setPhone(e.target.value.replace(/[^0-9]/g, ''))
                  // }
                  className="border border-[#DCDCDC] rounded-[10px] outline-none w-[95%] ant-input transition-none p-4"
                />
              </div>

              <button
                id="sign-in-button"
                type="button"
                className="mx-auto w-[50%] flex items-center justify-center bg-[#EDF2F6] rounded-[10px] cursor-pointer mb-4" onClick={handleSendOTP}
              >
                {/* <Link href="#" className='w-full p-4 text-center'></Link> */}
                <span className="w-full p-4 text-center">Tiếp tục</span>
              </button>

              <div className="w-[95%] mx-auto flex items-center">
                <input
                  type="checkbox"
                  // checked={agree}
                  // onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110"
                />
                <p className="mx-2">
                  Tôi đồng ý với các{' '}
                  <span className="text-[#0075FF]">điều khoản</span> của UchiMart
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

        {/* Phần tử Recaptcha (ẩn đi cũng được) */}
        <div id="sign-in-button" className="hidden"></div>
    </div>
  );
};

export default Login;
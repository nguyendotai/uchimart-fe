"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import firebase from "../types/firebase";
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';


import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import PhoenixModel from '../components/Animation/robot/components/robot';


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
  const [agree, setAgree] = useState(false);

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
      router.push('/login-otp');
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      alert("❌ Gửi OTP thất bại!");
    }
  };


  const handleLoginWithGoogle = () => {
    window.location.href = "http://127.0.0.1:8000/auth/google"; // URL BE Laravel
  };


  useEffect(() => {
    setupRecaptcha();
  }, []);



  return (
    <div>
      <main className="flex flex-1 flex-col ">

        <div className="flex min-h-screen items-center justify-center bg-[#F5F5FA]">
          <div className="w-full rounded-[10px] max-w-[75%] bg-white flex justify-between overflow-hidden">
            <div className="w-[50%] p-4">
              <div className=''>
                <div className="w-[8%] border-2 border-[#921573] rounded-full flex items-center justify-center cursor-pointer px-3 py-2  mb-20">
                  <Link href="/"><FaHome className="fa-solid fa-house  text-2xl text-[#921573] rounded-full"></FaHome></Link>
                </div>
              </div>

              <div className="flex items-center ">
                <div className="w-[70%] mx-auto text-center">
                  <div className=" w-[80%] mx-auto mb-4">
                    <img src="./img/logo2.png" alt="" className="mx-auto" />
                  </div>

                  <div className="mb-5">Mời bạn nhập số điện thoại</div>


                  <div className="mb-5">
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Nhập số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '');
                        setPhoneNumber(onlyNums);
                      }}
                      className="border border-[#DCDCDC] rounded-[10px] outline-none w-[95%] ant-input  p-2 focus:ring-2 focus:ring-[#327FF6] focus:border-[#327FF6] transition-all duration-500 ease-in-out" />
                  </div>


                  <div className="w-[95%] mx-auto flex items-center mb-5">
                    <input type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="w-4 h-4 rounded cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110" />
                    <p className="mx-2 text-sm">
                      Tôi đồng ý với các <span className="text-[#0075FF]">điều khoản</span> của UchiMart
                    </p>
                  </div>


                  <button
                    id="sign-in-button"
                    disabled={!phoneNumber || !agree}
                    className={`mx-auto w-[95%] flex items-center justify-center rounded-[10px] mb-3 p-2.5
                        transition-all duration-300 ease-in-out transform
                        ${!phoneNumber || !agree
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70 scale-95'
                        : 'bg-[#921573] text-white cursor-pointer hover:scale-105'}`}
                    onClick={handleSendOTP}
                  >
                    <span className="w-full text-center">Tiếp tục</span>
                  </button>



                  <div className="mb-5">Hoặc</div>

                  <div
                    className="mx-auto w-[45%] flex items-center justify-center border border-gray-300 rounded-[10px] cursor-pointer mb-3 p-2.5
             hover:bg-blue-50 hover:shadow-lg transition duration-300 ease-in-out"
                    onClick={handleLoginWithGoogle}
                  >
                    <FcGoogle className="mr-2 text-2xl" />
                    <span className="text-center font-medium text-gray-700">Google</span>
                  </div>


                </div>
              </div>
            </div>




            <div className="w-[50%] relative "> {/* hoặc h-full, tùy bố cục */}
              <Canvas className="absolute top-0 left-0 w-full h-full">
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <PhoenixModel scale={1.5} />
                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
                <Environment preset="sunset" />
              </Canvas>
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
"use client";
import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";

const Login = () => {
    const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
    return (
        <div>
            <main className="flex flex-1 flex-col">
      <div className="flex min-h-screen items-center justify-center bg-[#F5F5FA]">
        <div className="w-full rounded-[10px] max-w-[50%] bg-white">
          <div className="p-4">
            <div className="w-[8%] border-2 border-[#921573] rounded-full flex items-center justify-center cursor-pointer p-3">
                <a href="/"><FaHome className="  text-2xl text-[#C7C7C7] " /></a>
            </div>

            <div className="w-full mb-10">
              <img className="mx-auto w-[50%]" src="/logo.png" alt="Logo" />
            </div>

            <div className="text-center mb-4">Mời bạn nhập số điện thoại</div>

            <div className="text-center mb-4">
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                maxLength={10}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ''))
                }
                className="border border-[#DCDCDC] rounded-[10px] outline-none w-[95%] ant-input transition-none p-4"
              />
            </div>

            <button
              type="button"
              className="mx-auto w-[50%] flex items-center justify-center bg-[#EDF2F6] rounded-[10px] cursor-pointer mb-4"
            >
              <a href="/login-otp" className='w-full p-4 text-center'><span className="">Tiếp tục</span></a>
            </button>

            <div className="w-[95%] mx-auto flex items-center">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
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
        </div>
    );
};

export default Login;
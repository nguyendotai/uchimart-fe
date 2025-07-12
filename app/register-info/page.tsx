import Link from 'next/link';
import React from 'react';

const registerInfo = () => {
    return (
        <div>
            <main className="flex flex-1 flex-col my-[50px]">
                <div className='rounded-[10px] max-w-[45%] bg-white mx-auto'>

                <div className='flex items-center justify-center mt-16 mb-10'>
                    <img src="/logok.png" alt="" className='w-[40%]' />
                    <h1 className='text-3xl mt-2'>Chào bạn</h1>
                </div>

                <div className='text-center mb-7'>Bạn vui lòng cung cấp <span className='text-[#0075FF]'>thông tin</span> cho Uchimart</div>

                <div className='text-center mb-7'>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="border border-[#DCDCDC] rounded-[10px] outline-none w-[70%] ant-input  p-2 mb-5 focus:ring-2 focus:ring-[#327FF6] focus:border-[#327FF6] transition-all duration-500 ease-in-out" />

                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-[#DCDCDC] rounded-[10px] outline-none w-[70%] ant-input p-2 focus:ring-2 focus:ring-[#327FF6] focus:border-[#327FF6] transition-all duration-500 ease-in-out" />
                </div>


                <Link href="/"
                    type="button"
                    className="mx-auto w-[30%] flex items-center justify-center text-[#F5F5FA] bg-[#327FF6] rounded-[10px] cursor-pointer mb-16"
                >
                    <span className="w-full p-4 text-center">Tiếp tục</span>
                </Link>
                </div>

            </main>
        </div>
    );
};

export default registerInfo;
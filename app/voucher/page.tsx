import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const Voucher = () => {
    return (
        <div>
            <main className="my-[50px]">
                <div className="w-[80%] mx-auto ">
                    <div className="bg-white rounded-2xl">
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <IoIosArrowBack className="text-2xl cursor-pointer" />
                                <h1 className="text-2xl font-bold">Ưu đãi của bạn</h1>
                            </div>


                            <div className="w-full flex justify-between mb-4">
                                <input type="text" className="w-[90%] bg-[#F5F5FA] rounded-sm" />
                                <button className="py-1 px-6 bg-[#4DCB44] text-sm font-medium text-white rounded-sm cursor-pointer hover:opacity-90">Áp dụng</button>
                            </div>


                            <div className="w-[30%]">
                                <ul className="flex gap-7">
                                    <li className="border-b-2 border-[#921573]">Tất cả</li>
                                    <li>Chưa dùng</li>
                                    <li>Đã dùng / Hết hạn</li>
                                </ul>
                            </div>
                        </div>


                        <div>
                            <div>
                                <img src="" alt="" />
                            </div>

                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Voucher;
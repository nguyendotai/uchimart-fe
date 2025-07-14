'use client';
import React, { useState } from 'react';

const Profile = () => {
    const [gender, setGender] = useState('Nam');
    
    return (
        <div>
            <div className="max-w-4xl mx-auto my-20 bg-white p-8 rounded-2xl shadow-xl">
                {/* Banner + Avatar */}
                <div className="relative mb-20">
                    <div className="h-40 bg-gradient-to-r from-green-300 via-teal-400 to-blue-400 rounded-t-2xl"></div>
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                        <img src="/img/avt1.jpg" alt="" className='w-28 h-28 rounded-full flex items-center justify-center shadow-lg border-4 border-white object-cover'/>
                        
                    </div>
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Họ và tên đệm */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Họ và tên đệm</label>
                        <input
                            type="text"
                            defaultValue="Trần Tuấn"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Tên */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Tên</label>
                        <input
                            type="text"
                            defaultValue="Anh"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            defaultValue="+84332493487"
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            defaultValue="tanh7164@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Giới tính */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Giới tính</label>
                        <div className="flex items-center gap-6 mt-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={gender === 'Nam'}
                                    onChange={() => setGender('Nam')}
                                    className="accent-blue-500"
                                />
                                <span>Nam</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={gender === 'Nữ'}
                                    onChange={() => setGender('Nữ')}
                                    className="accent-pink-500"
                                />
                                <span>Nữ</span>
                            </label>
                        </div>
                    </div>

                    {/* Ngày sinh */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Ngày sinh</label>
                        <input
                            type="date"
                            defaultValue="14/07/2025"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Nút cập nhật */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-md hover:opacity-90 transition"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
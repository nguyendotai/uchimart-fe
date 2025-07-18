'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import Image from 'next/image';
const Profile = () => {
    const [gender, setGender] = useState('Nam');
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            if (parsedUser.name) {
                setName(parsedUser.name);
            }
        }
    }, []);

    return (
        <div>
            <div className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-2xl shadow-xl">
                {/* Banner + Avatar */}
                <div className="relative mb-20">
                    <div className="h-40 bg-gradient-to-r from-green-300 via-teal-400 to-blue-400 rounded-t-2xl"></div>
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                        <Image
                            src={user?.avatar || '/img/default-avatar.jpg'}
                            alt="User avatar"
                            width={112} // tương đương w-28
                            height={112} // tương đương h-28
                            className="rounded-full flex items-center justify-center shadow-lg border-4 border-white object-cover"
                        />
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (user) {
                            const updatedUser = {
                                ...user,
                                name: name,
                            };
                            localStorage.setItem("user", JSON.stringify(updatedUser));
                            setUser(updatedUser);
                            alert("Đã cập nhật tên thành công!");
                        }
                    }}
                    
                    className="grid grid-cols-1 gap-4 mt-4">
                    {/* Tên đầy đủ */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Tên</label>
                        <input
                            type="text"
                            value={user?.name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            defaultValue={user?.phone_number || ""}
                            className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Giới tính */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Giới tính</label>
                        <div className="flex items-center gap-6 mt-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={gender === "Nam"}
                                    onChange={() => setGender("Nam")}
                                    className="accent-blue-500"
                                />
                                <span>Nam</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={gender === "Nữ"}
                                    onChange={() => setGender("Nữ")}
                                    className="accent-pink-500"
                                />
                                <span>Nữ</span>
                            </label>
                        </div>
                    </div>

                    {/* Ngày sinh */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Ngày sinh</label>
                        <input
                            type="date"
                            defaultValue="2025-07-14"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Nút cập nhật */}
                    <div>
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
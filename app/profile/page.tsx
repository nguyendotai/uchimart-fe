'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import Image from 'next/image';
const Profile = () => {
    const [gender, setGender] = useState('Nam');
    const [user, setUser] = useState<User | null>(null);

    // Gọi API mỗi 5s để lấy dữ liệu mới nhất
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) return;

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setGender(parsedUser.genders === 1 ? "Nữ" : "Nam");

        const fetchUser = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/users/${parsedUser.id}`);
                if (res.ok) {
                    const latestUser = await res.json();
                    setUser(latestUser);

                    localStorage.setItem("user", JSON.stringify(latestUser));
                }
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", err);
            }
        };

        // Gọi lần đầu
        fetchUser();

        // Gọi lại mỗi 5s
        const interval = setInterval(fetchUser, 1000);
        return () => clearInterval(interval);
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
                            width={112} // w-28
                            height={112} // h-28
                            className="rounded-full flex items-center justify-center shadow-lg border-4 border-white object-cover"
                        />
                    </div>
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 gap-4 mt-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!user) return;

                        const formData = new FormData(e.currentTarget);

                        const updatedUser = {
                            ...user,
                            name: formData.get("name")?.toString() || "",
                            email: formData.get("email")?.toString() || "",
                            genders: gender === "Nữ" ? 1 : 0,
                            birthday: formData.get("birthday")?.toString() || "",
                            phone_number: formData.get("phone_number")?.toString() || "", // nếu cho sửa
                        };

                        try {
                            const res = await fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(updatedUser),
                            });

                            if (res.ok) {
                                const data = await res.json();
                                setUser(data.user); // ← phải là `data.user` vì response có key `user`
                                localStorage.setItem("user", JSON.stringify(data.user));
                                alert("Cập nhật thành công!");
                            } else {
                                const errorData = await res.json();
                                alert("Cập nhật thất bại: " + errorData.message);
                                console.error("Chi tiết lỗi:", errorData);
                            }

                        } catch (err) {
                            console.error("Lỗi khi cập nhật:", err);
                            alert("Lỗi kết nối server!");
                        }
                    }}
                >
                    {/* Tên đầy đủ */}
                    <div >
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Tên</label>
                        <input
                            type="text"
                            name='name'
                            defaultValue={user?.name || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name='phone_number'
                            defaultValue={user?.phone_number || ""}
                            readOnly={user?.provider !== "google"}
                            className={
                                user?.provider !== "google"
                                    ? "w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg"
                                    : "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            }
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name='email'
                            defaultValue={user?.email || ""}
                            readOnly={user?.provider === 'google'}
                            className={
                                user?.provider === "google"
                                    ? "w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg outline-none"
                                    : "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 outline-none"
                            } />
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
                            name='birthday'
                            defaultValue={
                                user?.birthday
                                    ? new Date(user.birthday).toISOString().split('T')[0]
                                    : ""
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Nút cập nhật */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div >

        </div >
    );
};

export default Profile;
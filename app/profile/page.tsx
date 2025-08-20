'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import Image from 'next/image';
import { toast } from 'react-toastify';



const Profile = () => {
    const [gender, setGender] = useState('Nam');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) return;

        const parsedUser = JSON.parse(userData);
        setGender(parsedUser.genders === 1 ? "Nữ" : "Nam");

        const fetchUser = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/users/${parsedUser.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error(`Lỗi ${res.status}`);
                const latestUser = await res.json();
                setUser(latestUser);
                localStorage.setItem("user", JSON.stringify(latestUser));
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", err);
            }
        };

        fetchUser();
    }, []);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        const formData = new FormData(e.currentTarget);
        const birthday = formData.get("birthday")?.toString() || "";

        // ✅ Kiểm tra ngày sinh phải là quá khứ
        if (birthday) {
            const birthdayDate = new Date(birthday);
            const today = new Date();
            // Xóa phần giờ phút giây để so sánh đúng ngày
            today.setHours(0, 0, 0, 0);

            if (birthdayDate >= today) {
                toast.error("Vui lòng nhập đúng ngày tháng năm sinh!");
                return;
            }
        }

        const updatedUser = {
            ...user,
            name: formData.get("name")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            genders: gender === "Nữ" ? 1 : 0,
            birthday: formData.get("birthday")?.toString() || "",
            phone_number: formData.get("phone_number")?.toString() || "",
        };
        console.log("User ID:", user?.id);
        console.log("Fetch URL:", `http://127.0.0.1:8000/api/users/${user?.id}`);
        console.log("Token gửi lên:", token);




        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Server trả về:", text);
                toast.error("Cập nhật thất bại!");
                return;
            }

            const data = await res.json();
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Cập nhật thành công!");
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            toast.error("Lỗi kết nối server!");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p>Đang tải...</p>;



    return (
        <div>
            <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto my-10 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl">
                {/* Banner + Avatar */}
                <div className="relative mb-20">
                    <div className="h-32 sm:h-40 bg-gradient-to-r from-green-300 via-teal-400 to-blue-400 rounded-t-2xl"></div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <Image
                            src={user?.avatar || "/img/login.jpg"}
                            alt="User avatar"
                            width={128}
                            height={128}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-white object-cover"
                        />
                    </div>
                </div>

                {/* Form */}
                <form
                    className="grid grid-cols-1 gap-4 mt-4"
                    onSubmit={handleUpdate}
                >
                    {/* Tên đầy đủ */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.name || ""}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone_number"
                            defaultValue={user?.phone_number || ""}
                            readOnly={user?.access_channel_type !== 1}
                            className={
                                user?.access_channel_type !== 1
                                    ? "w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg text-sm sm:text-base"
                                    : "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                            }
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email || ""}
                            readOnly={user?.access_channel_type === 1}
                            className={
                                user?.access_channel_type === 1
                                    ? "w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg text-sm sm:text-base"
                                    : "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                            }
                        />
                    </div>

                    {/* Giới tính */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Giới tính</label>
                        <div className="flex items-center gap-6 mt-2 text-sm sm:text-base">
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
                            name="birthday"
                            defaultValue={
                                user?.birthday
                                    ? new Date(user.birthday).toISOString().split("T")[0]
                                    : ""
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Nút cập nhật */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-base sm:text-lg font-semibold shadow-md transition cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                                }`}
                        >
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Profile;
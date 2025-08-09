"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FaTiktok, FaYoutube } from 'react-icons/fa';
import axios from 'axios';

type Page = {
    id: number;
    name: string;
    slug: string;
    title: string;
    description: string | null;
    order: number;
    code: string | null;
    display_in: string | null;
    author: string | null;
    status: number;
    post_at: string | null;
};

const Footer = () => {

    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        axios.get<{ success: boolean; data: Page[] }>("http://localhost:8000/api/pages")
            .then(res => setPages(res.data.data))
            .catch(err => console.error(err));
    }, []);

    const veChungToiSlug = [
        'chinh-sach-bao-mat',
        'dieu-khoan-giao-dich'
    ];

    const hoTroSlug = [
        'chinh-sach-giao-hang',
        'chinh-sach-thanh-toan',
        'chinh-sach-doi-tra',
        'huong-dan-mua-hang'
    ];

    const veChungToi = pages.filter(p => veChungToiSlug.includes(p.slug));
    const hoTroKhachHang = pages.filter(p => hoTroSlug.includes(p.slug));
    return (
        <div className='mt-10'>
            <div className='bg-white rounded-xl'>
                <div className='p-5'>
                    <div className='flex gap-7 border-b-2 border-[#DDDDE3]'>
                        <div className='w-[30%]'>
                            <div className='mb-7'>
                                <img src="./logo.png" alt="" className='w-[90%]' />
                            </div>

                            <div className='mb-4'>
                                <p className='mb-4'>Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</p>
                                <p>Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010, đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023</p>
                            </div>
                            <div>
                                <img src="./img/certification.png" alt="" className='w-[60%]' />
                            </div>
                        </div>


                        {/* Về chúng tôi */}
                        <div className='w-[30%] '>
                            <div className='mt-6 mb-7'>
                                <h1 className='text-xl font-medium'>Về chúng tôi</h1>
                            </div>
                            <ul className='flex flex-col gap-2'>
                                {veChungToi.map(page => (
                                    <li key={page.id}>
                                        <Link href={`/pages/${page.slug}`} className="hover:underline">
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Hỗ trợ khách hàng */}
                        <div className='w-[30%]'>
                            <div className='mt-6 mb-7'>
                                <h1 className='text-xl font-medium text-[rgb(45,55,72)]'>Hỗ trợ khách hàng</h1>
                            </div>
                            <ul className='flex flex-col gap-2'>
                                {hoTroKhachHang.map(page => (
                                    <li key={page.id}>
                                        <Link href={`/pages/${page.slug}`} className="hover:underline">
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className='w-[30%]'>
                            <div className='mt-6 mb-7'>
                                <h1 className='text-xl font-medium'>Chăm sóc khách hàng</h1>
                            </div>

                            <ul className='flex flex-col gap-2'>
                                <li>Mua online: 0332493487</li>
                                <li>Email: cskh@uchimart.com</li>
                            </ul>
                        </div>


                        <div className='w-[30%]'>
                            <div className='mt-6 mb-7'>
                                <h1 className='text-xl font-medium'>Đăng ký nhận ưu đãi</h1>
                            </div>

                            <div>
                                <p className='mb-4'>Bạn muốn nhận khuyến mãi đặc biệt? Đăng ký tham gia ngay cộng đồng của chúng tôi để cập nhật khuyến mãi ngay lập tức</p>

                                <form className="flex justify-between gap-1">
                                    <input
                                        type="email"
                                        placeholder="Email của bạn..."
                                        className="w-[60%] p-3 rounded-full border border-gray-300 focus:outline-none  focus:ring-green-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-[40%] text-sm bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 cursor-pointer"
                                    >
                                        Đăng ký
                                    </button>
                                </form>
                            </div>


                        </div>


                        <div className='w-[10%] flex flex-col gap-5'>
                            <Link href="https://www.facebook.com/tuan.anh.358553" className='mt-6'>
                                <BsFacebook className='text-5xl text-blue-500' />
                            </Link>

                            <Link href="https://www.facebook.com/tuan.anh.358553">
                                <FaYoutube className='text-5xl text-red-500' />
                            </Link>

                            <Link href="https://www.facebook.com/tuan.anh.358553">
                                <FaTiktok className='text-5xl' />
                            </Link>
                        </div>
                    </div>



                    <div className='text-center mt-5'>
                        <p className='w-[9git0%] mx-auto text-[12px] text-[#A29E9E]'>© 2025. Công Ty TNHH Uchi Martket. GPDKKD: 0310471746 do sở KH & ĐT TP.HCM cấp ngày 23/11/2010. Giấy phép thiết lập mạng xã hội trên mạng (Số 20/GP-BTTTT) do Bộ Thông Tin Và Truyền Thông cấp ngày 11/01/2021, tạm ngưng từ ngày 18/10/2024 - 03/03/2025. Trụ sở chính: 128 Thạnh Xuấn 14, P.Thạnh Xuân, Quận.12, TP.HCM. Địa chỉ liên hệ: Toà nhà MWG, Lô T2-1.2, Đường D1, Khu Công Nghệ Cao, P. Tân Phú, TP.Thủ Đức, TP.HCM. Email:lienhe@uchimart.com SĐT: 0332493487 Chịu trách nhiệm nội dung: TuanXji.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
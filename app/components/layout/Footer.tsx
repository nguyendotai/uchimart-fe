"use client"
import Link from 'next/link';
import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <div className=''>
                <div className='p-5'>
                    <div className='flex gap-7 border-b-2 border-[#DDDDE3]'>
                        <div className='w-[30%]'>
                            <div className='mb-7'>
                                <img src="./logo.png" alt="" className='w-[90%]'/>
                            </div>

                            <div className='mb-4'>
                                <p className='mb-4'>Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</p>
                                <p>Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010, đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023</p>
                            </div>
                            <div>
                                <img src="./img/certification.png" alt="" className='w-[60%]'/>
                            </div>
                        </div>


                        <div className='w-[30%] '>
                            <div className='mt-6 mb-7'>
                            <h1 className='text-xl font-medium'>Về chúng tôi</h1>
                            </div>
                                
                            <ul className='flex flex-col gap-2'>
                                <li>Giới thiệu về Uchi Mart</li>
                                <li>Danh sách cửa hàng</li>
                                <li>Quản lý chất lượng</li>
                                <li>Chính sách bảo mật</li>
                                <li>Điều khoản và điều kiện giao dịch</li>
                                <li>Quy chế web</li>
                            </ul>
                        </div>


                        <div className='w-[30%]'>
                            <div className='mt-6 mb-7'>
                            <h1 className='text-xl font-medium text-[rgb(45,55,72)]'>Hỗ trợ khách hàng</h1>
                            </div>
                                
                            <ul className='flex flex-col gap-2'>
                                <li>Trung tâm hỗ trợ khách hàng</li>
                                <li>Chính sách giao hàng</li>
                                <li>Chính sách thanh toán</li>
                                <li>Chính sách đổi trả</li>
                                <li>Chính sách đổi trả</li>
                                <li>Hỏi đáp</li>
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


                        <div className='w-[10%] flex flex-col gap-5'>
                            <Link href="https://www.facebook.com/tuan.anh.358553" className='mt-6'>
                                <BsFacebook className='text-5xl text-blue-500'/>
                            </Link>

                            <Link href="https://www.facebook.com/tuan.anh.358553">
                                <FaYoutube  className='text-5xl text-red-500'/>
                            </Link>

                            <Link href="https://www.facebook.com/tuan.anh.358553">
                                <FaTiktok  className='text-5xl'/>
                            </Link>
                        </div>
                    </div>



                    <div className='text-center mt-5'>
                        <p className='w-[70%] mx-auto text-[12px] text-[#A29E9E]'>© 2025. Công Ty TNHH Uchi Martket. GPDKKD: 0310471746 do sở KH & ĐT TP.HCM cấp ngày 23/11/2010. Giấy phép thiết lập mạng xã hội trên mạng (Số 20/GP-BTTTT) do Bộ Thông Tin Và Truyền Thông cấp ngày 11/01/2021, tạm ngưng từ ngày 18/10/2024 - 03/03/2025. Trụ sở chính: 128 Thạnh Xuấn 14, P.Thạnh Xuân, Quận.12, TP.HCM. Địa chỉ liên hệ: Toà nhà MWG, Lô T2-1.2, Đường D1, Khu Công Nghệ Cao, P. Tân Phú, TP.Thủ Đức, TP.HCM. Email:lienhe@uchimart.com SĐT: 0332493487 Chịu trách nhiệm nội dung: TuanXji.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
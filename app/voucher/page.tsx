import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDiscount } from 'react-icons/md';

const Voucher = () => {
    return (
        <div>
            <main className="my-[30px]">
                <div className="w-[80%] mx-auto">


                    <div className='bg-white rounded-2xl mb-3'>
                        <div className='p-4'>

                            <div className='flex items-center gap-2 mb-4'>
                                <IoIosArrowBack className='text-3xl cursor-pointer' />
                                <h1 className='text-2xl'>Ưu đãi của bạn</h1>
                            </div>

                            <div className='flex justify-between ml-10 mb-4'>
                                <input
                                    type="text"
                                    placeholder="Nhập mã khuyến mãi của bạn tại đây"
                                    className="w-[87%] bg-[#F5F5FA] p-1.5 rounded-lg outline-none border border-transparent focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200 ease-in-out hover:shadow-sm"
                                />
                                <button
                                    className="w-[12%] text-white rounded-lg bg-[#4DCB44] cursor-pointer hover:bg-[#3db634] active:scale-95 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
                                    Áp dụng
                                </button>


                            </div>

                            <div className='w-[27%] ml-10'>
                                <ul className='flex justify-between '>
                                    <li className='pb-1 border-b-2 border-[#921573] cursor-pointer'>Tất cả</li>
                                    <li className='cursor-pointer'>Chưa dùng</li>
                                    <li className='cursor-pointer'>Đã dùng / Hết hạn</li>
                                </ul>
                            </div>

                        </div>

                    </div>




                    <div className=''>
                        <ul className='flex flex-wrap gap-5.5 '>
                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>

                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>


                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>

                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>

                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>


                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>

                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>

                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>


                            <li className='w-[32%] bg-white rounded-2xl'>

                                <div className='px-3 pt-3 pb-2'>

                                    <div className='flex pb-2 gap-3 border-b-2 border-[#D9D9D9]'>


                                    <div className='relative bg-[#C7F6D6] rounded-2xl overflow-hidden'>
                                        <div className=' p-2'>
                                            <p className='w-[80%] text-[12px] text-[#299361] font-medium'>PHIẾU GIẢM GIÁ</p>

                                            <div className='absolute bottom-[-9%] right-[-9%] rounded-full bg-[#9AE6B5] p-3.5'>
                                                <MdDiscount className='text-xl text-[#38A169]' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[70%] pb-4'>
                                        <p className='text-[10px] font-medium text-[#898991] mb-1'>UCHIMART</p>
                                        <h3 className='text-[#4DCB44] truncate'>Phiếu giảm giá 8k cho đơn hàng từ 280k</h3>
                                        <p className='text-[12px]'>Áp dụng cho đơn hàng online từ 280k</p>
                                        <p className='text-[12px] text-[#4DCB44]'>Hết hạn trong 3 ngày</p>
                                    </div>

                                    </div>

                                </div>

                                <div className='px-3 pb-2 text-[12px] text-[#898991] font-medium'>Áp dụng cho tất cả sản phẩm</div>

                            </li>

                            

                            
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Voucher;
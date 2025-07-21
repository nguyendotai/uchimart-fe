import React from 'react';

const FAQs = () => {
    const faqData = [
        {
            question: 'Tôi có thể đổi trả sản phẩm không?',
            answer: 'Có. Bạn được đổi trả trong 7 ngày nếu sản phẩm còn mới, đầy đủ phụ kiện và hóa đơn.',
        },
        {
            question: 'Thời gian giao hàng mất bao lâu?',
            answer: 'Từ 2–5 ngày làm việc tùy khu vực. Nội thành có thể nhận trong 1–2 ngày.',
        },
        {
            question: 'Sản phẩm có được bảo hành không?',
            answer: 'Các sản phẩm chính hãng được bảo hành từ 6–12 tháng tùy loại.',
        },
        {
            question: 'Có thể thanh toán khi nhận hàng không?',
            answer: 'Có. Bạn có thể chọn "Thanh toán khi nhận hàng (COD)" khi đặt mua.',
        },
        {
            question: 'Làm sao để kiểm tra đơn hàng?',
            answer: 'Vào mục “Tra cứu đơn hàng” trên website, nhập mã đơn và số điện thoại để xem trạng thái.',
        },
        {
            question: 'Tôi có thể đặt giữ hàng không?',
            answer: 'Có. Bạn có thể liên hệ để giữ sản phẩm tối đa 48 giờ trước khi thanh toán.',
        },
        {
            question: 'Sản phẩm có kèm hướng dẫn sử dụng không?',
            answer: 'Có. Mỗi sản phẩm đều có hướng dẫn đính kèm trong hộp.',
        },
    ];
    return (
        <div>
            <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
                <div className="max-w-4xl mx-auto">
                    {/* Tiêu đề */}
                    <div className="bg-[#a1348c] rounded-xl p-8 md:p-10 text-white mb-10 shadow-lg">
                        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                            Xin chào, UchiMart có thể giúp gì cho bạn?
                        </h1>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Nhập từ khóa hoặc nội dung cần tìm"
                                className="w-full md:w-2/3 px-5 py-3 rounded-lg text-gray-800 bg-white shadow-md focus:outline-[#00BF63] focus:ring-2 focus:ring-[#00BF63] transition"
                            />
                        </div>
                    </div>


                    {/* Danh sách câu hỏi */}
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow p-5 hover:border-l-4 hover:border-[#00BF63] transition-all"
                            >
                                <p className="text-[#921573] font-semibold">Hỏi: {item.question}</p>
                                <p className="text-gray-700 mt-1">Đáp: {item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FAQs;
<div>
      <main className="my-[30px]">
        <div className="w-[80%] mx-auto rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Đơn hàng của tôi</h2>

          {orders.length === 0 ? (
            <p>Chưa có đơn hàng nào.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-sm rounded-lg p-4 mb-4"
              >
                <div className="pb-2 text-right text-sm text-[#4DCB44] flex justify-between items-center border-b-1 border-[#898991]">
                  <p className="text-[#898991]">
                    Thương hiệu:{" "}
                    <span className="text-[#327FF6] font-semibold">Pepsi</span>
                  </p>
                  <span className="flex items-center">
                    {order.order_status === 0 && <FaTruck className="mr-2 text-xl" />}
                    {order.order_status === 1 && <IoMdDoneAll className="mr-2 text-xl" />}
                    {order.order_status === 2 && <FcCancel className="mr-2 text-xl" />}
                    {order.order_status === 0
                      ? "Đơn hàng đang chờ xác nhận"
                      : order.order_status === 1
                      ? "Đơn hàng đã được giao"
                      : "Đã hủy"}
                  </span>
                </div>

                <div>
                  <p className="flex gap-1 items-center font-medium text-[#545458]">
                    {new Date(order.created_at).toLocaleDateString("vi-VN")}
                  </p>
                  <span className="flex items-center text-[14px]">
                    <FaWalking className="text-[#4DCB44] text-xl ml-2" /> Tự đến nhận
                  </span>
                </div>

                <div className="flex gap-4 mt-2 ml-2">
                  <img
                    src="https://kingfoodmart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fsc_pcm_product%2Fprod%2F2024%2F3%2F27%2F56200-8934588670114.jpg&w=1920&q=75"
                    className="w-[8%] border-2 border-[#898991] object-cover rounded-2xl"
                    alt="product image"
                  />

                  <div className="flex-1 text-sm text-gray-700">
                    <p className="font-medium mt-1 mb-2">{order.fullname}</p>
                    <p className="text-[#898991] mb-2">{order.email}</p>
                    <p className="font-medium mb-2">Số lượng: {order.total_quantity}</p>
                  </div>

                  <div className="text-right text-lg ">
                    <p className="text-gray-600">
                      Giá: <span className="text-[#921573] font-bold">{order.total_price}</span>
                    </p>
                    <p className="font-medium mt-1">
                      Thành tiền: <span className="text-[#921573] font-bold">{order.grand_total}</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-[35px] h-[35px] text-[#4DCB44] rounded-full bg-[#EBFAEA]">
                      <IoStorefrontSharp className="text-xl" />
                    </div>
                    <span className="text-[14px]">
                      Nhận tại <span className="font-medium">UchiMart - 308 Thạnh Xuân, Quận 12</span>
                    </span>
                  </div>

                  <div className="w-[30%] flex justify-between">
                    <button className="w-[48%] bg-[#4DCB44] text-white px-4 py-1 rounded-md hover:bg-green-600 cursor-pointer">
                      Mua lại
                    </button>
                    <button className="w-[48%] border border-[#921573] text-[#921573] px-4 py-1 rounded-md hover:bg-pink-50 cursor-pointer">
                      Chi tiết đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
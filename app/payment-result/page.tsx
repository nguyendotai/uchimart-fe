"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "react-use";

type PaymentStatus = "loading" | "success" | "fail" | "error";

interface PaymentStatusState {
  status: PaymentStatus;
  message?: string;
}

const PaymentStatus: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width, height } = useWindowSize();
  const [state, setState] = useState<PaymentStatusState>({ status: "loading" });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    const statusFromQuery = searchParams.get("status");
    const validStatuses: PaymentStatus[] = ["success", "fail", "error"];

    // Mô phỏng thời gian tải ngắn
    const timer = setTimeout(() => {
      if (!statusFromQuery || !validStatuses.includes(statusFromQuery as PaymentStatus)) {
        setState({
          status: "error",
          message: "Trạng thái thanh toán không hợp lệ trong URL",
        });
        return;
      }

      setState({
        status: statusFromQuery as PaymentStatus,
        message:
          statusFromQuery === "success"
            ? "Thanh toán của bạn đã được xử lý thành công!"
            : statusFromQuery === "fail"
            ? "Thanh toán của bạn không thể được xử lý."
            : "Đã xảy ra lỗi không mong muốn.",
      });

      if (statusFromQuery === "success") {
        setShowConfetti(true);
        setTimeout(() => {
          router.push("/order");
        }, 3000);
      }
    }, 1000);

    // Dọn dẹp timer khi component unmount
    return () => clearTimeout(timer);
  }, [searchParams, router]);

  const handleRetry = useCallback(() => {
    router.push("/check-out");
  }, [router]);

  const variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}

      <AnimatePresence mode="wait">
        {state.status === "loading" && (
          <motion.div
            key="loading"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-center"
            role="status"
            aria-live="polite"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Đang xử lý thanh toán...</p>
          </motion.div>
        )}

        {state.status === "success" && (
          <motion.div
            key="success"
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center"
            role="alert"
            aria-live="assertive"
          >
            <div className="bg-green-500 rounded-full p-6 shadow-lg inline-flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </svg>
            </div>
            <p className="mt-4 text-green-600 text-xl font-semibold">
              Thanh Toán Thành Công!
            </p>
            <p className="text-gray-500 mt-2">
              {state.message || "Đang chuyển hướng đến đơn hàng..."}
            </p>
          </motion.div>
        )}

        {state.status === "fail" && (
          <motion.div
            key="fail"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-center"
            role="alert"
            aria-live="assertive"
          >
            <div className="bg-red-500 rounded-full p-6 shadow-lg inline-flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  d="M6 6l12 12M6 18L18 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </svg>
            </div>
            <p className="mt-4 text-red-600 text-xl font-semibold">
              Thanh Toán Thất Bại!
            </p>
            <p className="text-gray-500 mt-2">{state.message || "Vui lòng thử lại."}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Thử lại thanh toán"
            >
              Thử Lại
            </button>
          </motion.div>
        )}

        {state.status === "error" && (
          <motion.div
            key="error"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-center"
            role="alert"
            aria-live="assertive"
          >
            <div className="bg-yellow-500 rounded-full p-6 shadow-lg inline-flex items-center justify-center">
              <span className="text-white text-3xl font-bold">!</span>
            </div>
            <p className="mt-4 text-yellow-600 text-xl font-semibold">
              Đã Xảy Ra Lỗi!
            </p>
            <p className="text-gray-500 mt-2">{state.message || "Vui lòng thử lại."}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              aria-label="Thử lại thanh toán"
            >
              Thử Lại
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentStatus;
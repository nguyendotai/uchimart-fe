"use client";
// components/TimeFlashSale.tsx
import React, { useEffect, useState } from "react";

const TimeFlashSale = () => {
  // 🔸 Giả lập: flash sale kết thúc sau 3 giờ kể từ khi tải trang
  const fakeSaleEndTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

  const calculateTimeLeft = () => {
    const difference = +new Date(fakeSaleEndTime) - +new Date();
    if (difference <= 0) return null;

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="bg-white shadow rounded-xl p-4 text-red-500 font-semibold">
        Flash sale đã kết thúc!
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-4 flex items-center justify-start gap-2 text-lg font-semibold text-red-600">
      Flash Sale:
      <div className="bg-red-100 text-red-700 px-3 py-1 rounded">
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

export default TimeFlashSale;

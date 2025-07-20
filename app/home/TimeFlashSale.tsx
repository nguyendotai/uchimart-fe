"use client";
import React, { useEffect, useState } from "react";

const TimeFlashSale = () => {
  const [timeLeft, setTimeLeft] = useState<null | {
    hours: number;
    minutes: number;
    seconds: number;
  }>(null);

  useEffect(() => {
    // Chỉ chạy ở client
    const fakeSaleEndTime = new Date(Date.now() + 3 * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const difference = +fakeSaleEndTime - +new Date();
      if (difference <= 0) return null;

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft === null) return null; // Tránh render mismatch khi SSR

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

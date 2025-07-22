// components/UI/Notification.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

type Props = {
  show: boolean;
  message: string;
};

export default function Notification({ show, message }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-10 right-5 bg-green-100 text-green-600 border border-green-600 px-2 py-2 rounded shadow-lg z-50"
        >
            <div className="flex gap-2 items-center">
                <AiFillCheckCircle className="text-green-600 text-2xl" />{message}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

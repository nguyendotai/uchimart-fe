// components/animations/StaggerFadeIn.tsx
'use client';
import { motion,Variants } from 'framer-motion';


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // delay giữa các phần tử con
      when: "beforeChildren",
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number], // cubic-bezier mượt hơn
      type: "spring",
    },
  },
};

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.div>
  );
}
  // components/animations/StaggerFadeIn.tsx
  'use client';
  import { motion } from 'framer-motion';

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

  const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.8, 0.25, 1], // cubic-bezier mượt hơn
      type: "tween",
    },
  },
};

  export default function StaggerFadeIn({ children }: { children: React.ReactNode }) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0 }} // chỉ hiện 1 lần, khi thấy 20%
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

"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      onAnimationComplete={() => {
        setTimeout(onComplete, 2500);
      }}
    >
      {/* Center Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Geometric Lotus Icon */}
        <motion.div
          className="mb-6"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="neon-glow"
          >
            {/* Geometric Lotus Design */}
            <path
              d="M50 10 L30 50 L50 45 L70 50 Z"
              fill="url(#gradient1)"
              className="opacity-90"
            />
            <path
              d="M50 45 L25 70 L50 60 L75 70 Z"
              fill="url(#gradient2)"
              className="opacity-80"
            />
            <path
              d="M50 60 L30 85 L50 75 L70 85 Z"
              fill="url(#gradient3)"
              className="opacity-70"
            />
            <circle cx="50" cy="50" r="8" fill="#F59E0B" className="animate-pulse" />
            <defs>
              <linearGradient id="gradient1" x1="30" y1="10" x2="70" y2="50">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="25" y1="45" x2="75" y2="70">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
              <linearGradient id="gradient3" x1="30" y1="60" x2="70" y2="85">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Protocol Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-5xl mb-3 uppercase tracking-wider text-gradient"
        >
          NIVI PROTOCOL
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-3"
        >
          <span className="text-white/60 tracking-widest uppercase">Verify</span>
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-white/60 tracking-widest uppercase">Mint</span>
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-white/60 tracking-widest uppercase">Rent</span>
        </motion.div>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 flex flex-col items-center gap-4"
      >
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-indigo-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
        <p className="text-white/40 tracking-wider uppercase">Initializing Protocol</p>
      </motion.div>
    </motion.div>
  );
}

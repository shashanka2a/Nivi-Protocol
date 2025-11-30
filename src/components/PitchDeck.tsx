"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  AlertCircle,
  DollarSign,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  Globe,
  Lock,
  Play,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    type: "intro",
    title: "NIVI PROTOCOL",
    subtitle: "The Future of Creator Licensing",
    tagline: "Verify • Mint • Rent",
    description: "Authentic content verification meets blockchain licensing for the Web3 creator economy",
  },
  {
    id: 2,
    type: "problem",
    title: "THE PROBLEM",
    subtitle: "Creator Economy is Broken",
    problems: [
      {
        icon: AlertCircle,
        title: "Content Theft & Deepfakes",
        description: "$78B lost annually to unauthorized content usage and AI-generated fakes",
        stat: "$78B",
      },
      {
        icon: DollarSign,
        title: "Payment Delays & Disputes",
        description: "Creators wait 60-90 days for licensing payments with unclear terms",
        stat: "90 days",
      },
      {
        icon: Users,
        title: "Limited Monetization",
        description: "Only 12% of creators earn sustainable income from their content",
        stat: "12%",
      },
    ],
  },
  {
    id: 3,
    type: "solution",
    title: "THE SOLUTION",
    subtitle: "Nivi Protocol Empowers Creators",
    solutions: [
      {
        icon: Shield,
        title: "Shelby AI Verification",
        description: "100% authentic content guaranteed with advanced deepfake detection",
        color: "indigo",
      },
      {
        icon: Zap,
        title: "On-Chain Smart Licensing",
        description: "Instant automated payments, transparent terms, no intermediaries",
        color: "purple",
      },
      {
        icon: Globe,
        title: "Global Marketplace",
        description: "Connect with brands worldwide, set your own terms, earn recurring revenue",
        color: "orange",
      },
    ],
  },
  {
    id: 4,
    type: "how-it-works",
    title: "HOW IT WORKS",
    subtitle: "Simple, Secure, Scalable",
    steps: [
      {
        number: "01",
        title: "Create & Upload",
        description: "Creators upload original content to the platform",
        icon: Play,
      },
      {
        number: "02",
        title: "AI Verification",
        description: "Shelby AI scans for deepfakes and validates authenticity",
        icon: Shield,
      },
      {
        number: "03",
        title: "Mint License NFT",
        description: "Content is minted as a license NFT on Aptos blockchain",
        icon: Lock,
      },
      {
        number: "04",
        title: "Brands Subscribe",
        description: "Businesses pay monthly subscriptions for commercial rights",
        icon: DollarSign,
      },
      {
        number: "05",
        title: "Earn Recurring Revenue",
        description: "Creators receive instant, automated payments in APT tokens",
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 5,
    type: "conclusion",
    title: "JOIN THE REVOLUTION",
    subtitle: "Empowering 50M+ Creators Globally",
    stats: [
      { value: "100%", label: "AI Verified Content", icon: Shield },
      { value: "0 Days", label: "Payment Delays", icon: Zap },
      { value: "95%", label: "Creator Revenue Share", icon: TrendingUp },
      { value: "Global", label: "Marketplace Reach", icon: Globe },
    ],
    cta: "Start Licensing Today",
  },
];

export function PitchDeck({ onClose }: { onClose: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col bg-void-black"
    >
      {/* Header */}
      <div className="glass-card-elevated border-b border-white/10 p-4 flex items-center justify-between bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="neon-glow"
          >
            <path d="M50 10 L30 50 L50 45 L70 50 Z" fill="url(#gradient1)" className="opacity-90" />
            <path d="M50 45 L25 70 L50 60 L75 70 Z" fill="url(#gradient2)" className="opacity-80" />
            <path d="M50 60 L30 85 L50 75 L70 85 Z" fill="url(#gradient3)" className="opacity-70" />
            <circle cx="50" cy="50" r="8" fill="#F59E0B" />
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
          <span className="text-gradient uppercase tracking-wider">Nivi Protocol Pitch Deck</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg glass-card-hover flex items-center justify-center"
        >
          <span className="text-white/60">✕</span>
        </button>
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {/* Slide 1: Intro */}
            {slide.type === "intro" && (
              <div className="max-w-4xl w-full text-center space-y-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="neon-glow mx-auto mb-8"
                  >
                    <path d="M50 10 L30 50 L50 45 L70 50 Z" fill="url(#gradient1-main)" className="opacity-90" />
                    <path d="M50 45 L25 70 L50 60 L75 70 Z" fill="url(#gradient2-main)" className="opacity-80" />
                    <path d="M50 60 L30 85 L50 75 L70 85 Z" fill="url(#gradient3-main)" className="opacity-70" />
                    <circle cx="50" cy="50" r="8" fill="#F59E0B" className="animate-pulse" />
                    <defs>
                      <linearGradient id="gradient1-main" x1="30" y1="10" x2="70" y2="50">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                      <linearGradient id="gradient2-main" x1="25" y1="45" x2="75" y2="70">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                      <linearGradient id="gradient3-main" x1="30" y1="60" x2="70" y2="85">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl md:text-8xl text-gradient uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl md:text-3xl text-white/80 mb-6"
                >
                  {slide.subtitle}
                </motion.h2>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center gap-4 mb-8"
                >
                  <span className="text-white/60 tracking-widest uppercase">Verify</span>
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <span className="text-white/60 tracking-widest uppercase">Mint</span>
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <span className="text-white/60 tracking-widest uppercase">Rent</span>
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-lg text-white/60 max-w-2xl mx-auto"
                >
                  {slide.description}
                </motion.p>
              </div>
            )}

            {/* Slide 2: Problem */}
            {slide.type === "problem" && (
              <div className="max-w-5xl w-full space-y-12">
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl text-gradient uppercase tracking-wider mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/60"
                  >
                    {slide.subtitle}
                  </motion.h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {slide.problems?.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.2 }}
                      className="glass-card p-6 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto border border-red-500/30">
                        <problem.icon className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="text-4xl text-gradient">{problem.stat}</div>
                      <h3 className="text-xl text-white/90">{problem.title}</h3>
                      <p className="text-white/60">{problem.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 3: Solution */}
            {slide.type === "solution" && (
              <div className="max-w-5xl w-full space-y-12">
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl text-gradient uppercase tracking-wider mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/60"
                  >
                    {slide.subtitle}
                  </motion.h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {slide.solutions?.map((solution, index) => {
                    const colorMap = {
                      indigo: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
                      purple: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
                      orange: "from-orange-500/20 to-yellow-500/20 border-orange-500/30",
                    };
                    return (
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.2 }}
                        className="glass-card p-6 text-center space-y-4 hover:scale-105 transition-transform duration-300"
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[solution.color as keyof typeof colorMap]} flex items-center justify-center mx-auto border`}>
                          <solution.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl text-white/90">{solution.title}</h3>
                        <p className="text-white/60">{solution.description}</p>
                        <div className="pt-2">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Slide 4: How It Works */}
            {slide.type === "how-it-works" && (
              <div className="max-w-5xl w-full space-y-12">
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl text-gradient uppercase tracking-wider mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/60"
                  >
                    {slide.subtitle}
                  </motion.h2>
                </div>
                <div className="space-y-6">
                  {slide.steps?.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.15 }}
                      className="glass-card p-6 flex items-center gap-6 hover:scale-102 transition-transform duration-300"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30">
                          <step.icon className="w-10 h-10 text-indigo-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-indigo-400 tracking-widest mb-2">STEP {step.number}</div>
                        <h3 className="text-2xl text-white/90 mb-2">{step.title}</h3>
                        <p className="text-white/60">{step.description}</p>
                      </div>
                      {index < slide.steps.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-white/30 flex-shrink-0 hidden md:block" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 5: Conclusion */}
            {slide.type === "conclusion" && (
              <div className="max-w-5xl w-full space-y-12">
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl text-gradient uppercase tracking-wider mb-6"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl text-white/80"
                  >
                    {slide.subtitle}
                  </motion.h2>
                </div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                >
                  {slide.stats?.map((stat, index) => (
                    <div key={index} className="glass-card p-6 text-center space-y-3">
                      <stat.icon className="w-10 h-10 text-indigo-400 mx-auto" />
                      <div className="text-4xl text-gradient">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <button className="btn-primary text-xl px-12 py-6 inline-flex items-center gap-3">
                    {slide.cta}
                    <ArrowRight className="w-6 h-6" />
                  </button>
                  <p className="text-white/40 mt-6 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Powered by Aptos Blockchain
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="glass-card-elevated border-t border-white/10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="glass-card-hover px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="glass-card-hover px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-white/40 text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </motion.div>
  );
}


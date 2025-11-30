"use client";

import { motion } from "motion/react";
import {
  ArrowLeft,
  Play,
  Shield,
  CheckCircle,
  RefreshCw,
  Zap,
  Download,
  Share2,
  Star,
  Eye,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { Video } from "../data/mockVideos";
import { WalletConnectButton } from "./WalletConnectButton";
import { useWallet } from "@/lib/aptos/wallet";

export function LicenseDetail({
  video,
  onBack,
}: {
  video: Video;
  onBack: () => void;
}) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { connected } = useWallet();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = () => {
    if (!connected) {
      alert("Please connect your wallet to subscribe to this license.");
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setShowConfetti(true);
      
      // Create confetti effect
      const confettiColors = ["#6366F1", "#F59E0B", "#8B5CF6", "#10B981"];
      const confettiCount = 50;
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = "-10px";
        confetti.style.borderRadius = "50%";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";
        document.body.appendChild(confetti);

        const duration = 2000 + Math.random() * 1000;
        const fallDistance = window.innerHeight + 20;
        
        confetti.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            {
              transform: `translateY(${fallDistance}px) rotate(${360 * (Math.random() > 0.5 ? 1 : -1)}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: duration,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }
        );

        setTimeout(() => confetti.remove(), duration);
      }

      setTimeout(() => setShowConfetti(false), 3000);
    }, 2000);
  };

  const platformFee = video.price * 0.05;
  const totalPrice = video.price + platformFee;

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-card border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-3">
            <WalletConnectButton />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card p-2.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card p-2.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Video Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card overflow-hidden mb-6"
        >
          <div className="relative aspect-video bg-black">
            <ImageWithFallback
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />

            {/* Watermark Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 mx-auto cursor-pointer border-2 border-white/30 shadow-2xl"
                >
                  <Play className="w-12 h-12 fill-white ml-1" />
                </motion.div>
                <p className="text-white uppercase tracking-wider mb-2">
                  Preview Mode
                </p>
                <p className="text-white/60 text-sm">
                  Subscribe to unlock full HD version
                </p>
              </div>
            </div>

            {/* Watermark text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-white/15 text-8xl font-bold uppercase tracking-widest rotate-[-20deg] select-none">
                NIVI
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="glass-card px-3 py-1 rounded-lg text-sm text-indigo-300">
                    {video.category}
                  </span>
                </div>
                <h1 className="text-4xl mb-4">{video.title}</h1>
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={video.creator.avatar}
                    alt={video.creator.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{video.creator.name}</span>
                      {video.creator.verified && (
                        <CheckCircle className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>
                    <p className="text-white/50">Content Creator</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              {video.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <p className="text-white/50">Views</p>
                </div>
                <p className="text-2xl">{video.stats.views}</p>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <p className="text-white/50">Licenses</p>
                </div>
                <p className="text-2xl">{video.stats.licenses}</p>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <p className="text-white/50">Rating</p>
                </div>
                <p className="text-2xl">{video.stats.rating} ⭐</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commercial Rights */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Commercial Rights Included
          </h2>
          <div className="space-y-3 mb-6">
            {video.rights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{right}</span>
              </motion.div>
            ))}
          </div>

          <div className="glass-card bg-indigo-500/10 border-indigo-500/30 p-5 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-indigo-300 mb-2">Shelby AI Verified</h3>
                <p className="text-white/60 leading-relaxed">
                  This content has been verified as 100% authentic and original
                  by Shelby AI. No deepfakes, no manipulated media. Safe for
                  brand partnerships and commercial use.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 border-2 border-indigo-500/30 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

          <div className="relative">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-2">Monthly Subscription</h2>
                <p className="text-white/50">
                  Cancel anytime • Automatic renewal on 1st of month
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl text-gradient">{video.price}</span>
                  <span className="text-xl text-white/60">APT</span>
                </div>
                <p className="text-white/50 text-sm">per month</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 glass-card p-4 rounded-xl">
              <div className="flex items-center justify-between text-white/80">
                <span>License fee</span>
                <span>{video.price.toFixed(2)} APT</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Platform fee (5%)</span>
                <span>{platformFee.toFixed(2)} APT</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center justify-between text-lg">
                <span>Total (first month)</span>
                <span className="text-gradient text-2xl">
                  {totalPrice.toFixed(2)} APT
                </span>
              </div>
            </div>

            {!connected && (
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <p className="text-white/80 text-sm flex-1">
                    Connect your Aptos wallet to subscribe to this license.
                  </p>
                </div>
                <div className="flex justify-center">
                  <WalletConnectButton />
                </div>
              </div>
            )}

            <motion.button
              whileHover={connected ? { scale: 1.02 } : {}}
              whileTap={connected ? { scale: 0.98 } : {}}
              onClick={handleSubscribe}
              disabled={isSubscribing || showConfetti || !connected}
              className={`w-full py-4 flex items-center justify-center gap-3 text-lg relative overflow-hidden transition-all ${
                connected
                  ? "btn-primary"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              {isSubscribing ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : showConfetti ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span>Successfully Subscribed! 🎉</span>
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  <span>Subscribe to License</span>
                </>
              )}
            </motion.button>

            <div className="mt-6 flex items-center justify-center gap-2 text-white/40">
              <Shield className="w-4 h-4" />
              <span className="text-sm">
                Powered by Aptos • Secure blockchain payment
              </span>
            </div>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          <div className="glass-card p-5 text-center hover:bg-white/10 transition-colors">
            <Shield className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <p className="text-white/70 leading-snug">Secure Payment</p>
          </div>
          <div className="glass-card p-5 text-center hover:bg-white/10 transition-colors">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-white/70 leading-snug">Verified Content</p>
          </div>
          <div className="glass-card p-5 text-center hover:bg-white/10 transition-colors">
            <RefreshCw className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <p className="text-white/70 leading-snug">Cancel Anytime</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
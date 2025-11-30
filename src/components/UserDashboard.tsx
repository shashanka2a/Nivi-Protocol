"use client";

import { motion } from "motion/react";
import { TrendingUp, Zap, Shield, ChevronRight, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

const MOCK_LICENSES = [
  {
    id: 1,
    brand: "Nike India",
    logo: "https://images.unsplash.com/photo-1622651132634-a7ed1fbb86dd",
    videoTitle: "Viral Dance Tutorial",
    monthlyFee: 10,
    status: "active",
    startDate: "2024-11-01",
  },
  {
    id: 2,
    brand: "Amazon Prime",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2",
    videoTitle: "Mumbai Street Food",
    monthlyFee: 15,
    status: "active",
    startDate: "2024-10-15",
  },
  {
    id: 3,
    brand: "Samsung Mobile",
    logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
    videoTitle: "Tech Review 2024",
    monthlyFee: 20,
    status: "active",
    startDate: "2024-10-01",
  },
];

const EARNINGS_DATA = {
  total: 450.0,
  thisMonth: 45.0,
  growth: 12.5,
  activeLicenses: 3,
};

export function UserDashboard() {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      alert("✅ Withdrawal initiated!\n\nYour earnings will be transferred to your wallet within 24 hours.");
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="glass-card border-b border-white/10 px-6 py-6">
        <h1 className="text-2xl uppercase tracking-wider mb-2">DASHBOARD</h1>
        <p className="text-white/60">Track your earnings and licenses</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Earnings Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-8 mb-6 relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />

          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/60 mb-2 uppercase tracking-wider">
                  Total Earnings
                </p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-5xl text-gradient">
                    {EARNINGS_DATA.total.toFixed(2)}
                  </h2>
                  <span className="text-2xl text-white/60">APT</span>
                </div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-xl">
                <p className="text-white/50 mb-1">This Month</p>
                <p className="text-xl">{EARNINGS_DATA.thisMonth} APT</p>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <p className="text-white/50 mb-1">Growth</p>
                <p className="text-xl text-green-400">+{EARNINGS_DATA.growth}%</p>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <p className="text-white/50 mb-1">Licenses</p>
                <p className="text-xl">{EARNINGS_DATA.activeLicenses}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 btn-primary py-3 flex items-center justify-center gap-2"
              onClick={handleWithdraw}
              disabled={isWithdrawing}
            >
              {isWithdrawing ? (
                <span>Loading...</span>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Withdraw Earnings</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Active Licenses */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Active Licenses</h2>
            <span className="glass-card px-3 py-1.5 rounded-lg text-green-400">
              {MOCK_LICENSES.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {MOCK_LICENSES.map((license, index) => (
              <motion.div
                key={license.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <LicenseCard license={license} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
              <h3>Verified</h3>
            </div>
            <p className="text-3xl mb-1">8</p>
            <p className="text-white/60">Content pieces</p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <h3>Views</h3>
            </div>
            <p className="text-3xl mb-1">12.4M</p>
            <p className="text-white/60">Total reach</p>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mt-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Boost Your Earnings</h3>
              <p className="text-white/60 mb-4">
                Upload more verified content to attract more brand partnerships.
              </p>
              <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                <span>Learn more</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LicenseCard({
  license,
}: {
  license: (typeof MOCK_LICENSES)[0];
}) {
  return (
    <div className="glass-card-hover p-4 cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Brand Logo */}
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
          <ImageWithFallback
            src={license.logo}
            alt={license.brand}
            className="w-full h-full object-cover"
          />
        </div>

        {/* License Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="truncate">{license.brand}</h3>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs uppercase tracking-wide flex-shrink-0">
              Active
            </span>
          </div>
          <p className="text-white/60 truncate mb-2">{license.videoTitle}</p>
          <div className="flex items-center gap-4 text-white/50">
            <span>Since {new Date(license.startDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Monthly Fee */}
        <div className="text-right flex-shrink-0">
          <p className="text-2xl text-gradient">{license.monthlyFee}</p>
          <p className="text-white/50">APT/mo</p>
        </div>

        <ChevronRight className="w-5 h-5 text-white/40" />
      </div>
    </div>
  );
}
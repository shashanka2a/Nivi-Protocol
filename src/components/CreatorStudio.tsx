"use client";

import { motion, AnimatePresence } from "motion/react";
import { Upload, CheckCircle, Shield, ArrowLeft, Sparkles, Info } from "lucide-react";
import { useState, useEffect } from "react";

type VerificationState = "idle" | "scanning" | "verified";

export function CreatorStudio({ onBack }: { onBack: () => void }) {
  const [verificationState, setVerificationState] =
    useState<VerificationState>("idle");
  const [licenseFee, setLicenseFee] = useState("10");
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpload = () => {
    // Simulate video upload
    setUploadedVideo("https://images.unsplash.com/photo-1627777941175-d31f471f3d12");
    setVerificationState("scanning");

    // Simulate Shelby AI verification
    setTimeout(() => {
      setVerificationState("verified");
    }, 3000);
  };

  const handleMintLicense = () => {
    setIsMinting(true);
    
    // Simulate minting - show confetti effect
    setTimeout(() => {
      const duration = 2000;
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
      
      setIsMinting(false);
      setTimeout(() => {
        alert("🎉 License NFT minted successfully!\n\nYour content is now live on the marketplace.");
      }, 500);
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-24">
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
          <h1 className="text-xl uppercase tracking-wider">CREATOR STUDIO</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Upload Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-8 mb-6"
        >
          <h2 className="text-2xl mb-2 flex items-center gap-2">
            <Upload className="w-6 h-6 text-indigo-400" />
            Upload Viral Video
          </h2>
          <p className="text-white/60 mb-6">
            Upload your authentic content to get verified and create a license
          </p>

          {!uploadedVideo ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500/50 transition-colors"
            >
              <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 mb-2">Click to upload video</p>
              <p className="text-white/40">MP4, MOV up to 100MB</p>
            </motion.div>
          ) : (
            <div className="rounded-xl overflow-hidden aspect-[9/16] max-w-xs mx-auto relative">
              <img
                src={uploadedVideo}
                alt="Uploaded video"
                className="w-full h-full object-cover"
              />
              {verificationState === "scanning" && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-white">Scanning with Shelby AI...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Verification Status Card */}
        <AnimatePresence>
          {verificationState === "scanning" && (
            <motion.div
              initial={{ y: 20, opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ y: -20, opacity: 0, height: 0 }}
              className="glass-card p-6 mb-6 overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-8 h-8 text-indigo-400" />
                </motion.div>
                <div>
                  <h3 className="mb-1">Verifying with Shelby AI</h3>
                  <p className="text-white/60">Analyzing content authenticity...</p>
                </div>
              </div>

              {/* Scanning animation */}
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}

          {verificationState === "verified" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-6 mb-6 border-2 border-orange-500/50"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>Content Verified</h3>
                    <span className="verified-badge">
                      <Shield className="w-4 h-4" />
                      <span className="uppercase">100% ASLI</span>
                    </span>
                  </div>
                  <p className="text-white/60 mb-4">
                    Your content has been verified as authentic and original. Ready
                    to mint!
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="glass-card px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Original Content</span>
                    </span>
                    <span className="glass-card px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>No Deepfake</span>
                    </span>
                    <span className="glass-card px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Authentic Creator</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mint License Form */}
        {verificationState === "verified" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-400" />
              Create License
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">
                  Monthly License Fee
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={licenseFee}
                    onChange={(e) => setLicenseFee(e.target.value)}
                    className="w-full glass-card px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
                    APT
                  </span>
                </div>
                <p className="text-white/40 mt-2">
                  Suggested: 5-20 APT based on content quality
                </p>
              </div>

              <div>
                <label className="block text-white/80 mb-2">License Type</label>
                <div className="space-y-3">
                  <label className="glass-card p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="radio"
                      name="license"
                      defaultChecked
                      className="w-4 h-4 text-indigo-500"
                    />
                    <div>
                      <div className="text-white mb-1">Commercial Use</div>
                      <div className="text-white/50">
                        Brands can use in ads, social media, and marketing
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMintLicense}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Mint License NFT</span>
              </motion.button>

              <p className="text-xs text-white/40 text-center">
                Minted on Aptos • Gas fees: ~0.01 APT
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
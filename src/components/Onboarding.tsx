"use client";

import React from 'react';
import { Mail } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* 3D Floating Coin */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="float-animation w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#10B981] flex items-center justify-center shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#10B981] to-[#D4AF37] flex items-center justify-center border-4 border-white/20">
                <span className="text-4xl text-white">N</span>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#10B981] blur-3xl opacity-30 float-animation" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4">
            Claim your Investment Identity.
          </h1>
          <p className="text-lg text-gray-300">
            Zero wallets. 100% Ownership.
          </p>
        </div>

        {/* Sign in Button */}
        <button
          onClick={onComplete}
          className="w-full glass p-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all group"
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Mail className="text-[#022C22]" size={20} />
          </div>
          <span className="text-lg">Sign in with Google</span>
        </button>

        <p className="text-center mt-6 text-sm text-gray-400">
          Powered by Photon Identity
        </p>

        {/* Trust indicators */}
        <div className="mt-12 flex justify-center gap-6 text-xs text-gray-500">
          <div className="text-center">
            <div className="text-[#10B981] mb-1">🔒</div>
            <div>Secure</div>
          </div>
          <div className="text-center">
            <div className="text-[#D4AF37] mb-1">✓</div>
            <div>Verified</div>
          </div>
          <div className="text-center">
            <div className="text-[#10B981] mb-1">⚡</div>
            <div>Instant</div>
          </div>
        </div>
      </div>
    </div>
  );
}

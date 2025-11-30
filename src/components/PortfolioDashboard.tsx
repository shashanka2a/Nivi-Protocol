"use client";

import React from 'react';
import { TrendingUp, ArrowUpRight, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PortfolioDashboardProps {
  onNavigate: (view: string) => void;
}

interface Royalty {
  id: string;
  assetName: string;
  assetImage: string;
  amount: number;
  period: string;
  trend: number;
}

const mockRoyalties: Royalty[] = [
  {
    id: '1',
    assetName: 'MrBeast',
    assetImage: 'https://images.unsplash.com/photo-1611702817774-8ac0f2d3f13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdG9yJTIwaW5mbHVlbmNlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDM4OTQxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    amount: 24.5,
    period: 'This Week',
    trend: 12.4,
  },
  {
    id: '2',
    assetName: 'Artistry Studios',
    assetImage: 'https://images.unsplash.com/photo-1613666587344-f3c08aac2594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NjQ0NDE4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    amount: 18.2,
    period: 'This Week',
    trend: 8.7,
  },
  {
    id: '3',
    assetName: 'Creator Hub',
    assetImage: 'https://images.unsplash.com/photo-1673767297220-6341467cb687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHZpZGVvfGVufDF8fHx8MTc2NDQ2NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    amount: 15.8,
    period: 'This Week',
    trend: 15.6,
  },
];

export function PortfolioDashboard({ onNavigate }: PortfolioDashboardProps) {
  const totalBalance = 5420;
  const weeklyYield = 58.5;
  const totalYield = 19.2;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-3xl mb-2">Portfolio</h1>
        <p className="text-gray-400">Your creator investments</p>
      </div>

      {/* Total Balance Card */}
      <div className="px-6 mb-6">
        <div className="glass p-6 rounded-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981] rounded-full blur-3xl opacity-10" />
          
          <div className="relative">
            <div className="text-sm text-gray-400 mb-2">Total Portfolio Value</div>
            <div className="text-5xl text-[#D4AF37] mb-4">{totalBalance.toLocaleString()} APT</div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#10B981]">
                <TrendingUp size={16} />
                <span className="text-sm">+{totalYield}%</span>
              </div>
              <div className="text-sm text-gray-400">All Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-dark p-4 rounded-xl">
            <div className="text-xs text-gray-400 mb-1">Weekly Yield</div>
            <div className="text-2xl text-[#10B981]">{weeklyYield} APT</div>
            <div className="text-xs text-gray-400 mt-1">+12.4% from last week</div>
          </div>
          <div className="glass-dark p-4 rounded-xl">
            <div className="text-xs text-gray-400 mb-1">Assets Owned</div>
            <div className="text-2xl text-white">3</div>
            <div className="text-xs text-gray-400 mt-1">Across 3 categories</div>
          </div>
        </div>
      </div>

      {/* Active Royalties Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Active Royalties</h2>
          <button className="text-[#D4AF37] text-sm flex items-center gap-1">
            View All
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {mockRoyalties.map((royalty) => (
            <div key={royalty.id} className="glass-dark p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={royalty.assetImage}
                  alt={royalty.assetName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="text-sm mb-1">{royalty.assetName}</div>
                  <div className="text-xs text-gray-400">{royalty.period}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg text-[#10B981]">+{royalty.amount} APT</div>
                  <div className="flex items-center justify-end gap-1 text-xs text-[#10B981]">
                    <TrendingUp size={10} />
                    <span>+{royalty.trend}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Breakdown */}
      <div className="px-6 mb-6">
        <h2 className="text-xl mb-4">Investment Breakdown</h2>
        
        <div className="glass-dark p-4 rounded-xl">
          <div className="space-y-4">
            {/* Progress bars for each asset */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>MrBeast</span>
                <span className="text-[#10B981]">45%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#10B981] to-[#D4AF37] rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Artistry Studios</span>
                <span className="text-[#10B981]">30%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#10B981] to-[#D4AF37] rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Creator Hub</span>
                <span className="text-[#10B981]">25%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#10B981] to-[#D4AF37] rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 mb-6">
        <button
          onClick={() => onNavigate('feed')}
          className="w-full btn-emerald py-4 rounded-xl text-lg flex items-center justify-center gap-2"
        >
          <DollarSign size={20} />
          Discover New Assets
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass-dark border-t border-[#D4AF37]/30 px-6 py-4">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => onNavigate('feed')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <TrendingUp size={24} />
            <span className="text-xs">Market</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#10B981]">
            <div className="text-2xl">💼</div>
            <span className="text-xs">Portfolio</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <div className="text-2xl">🎁</div>
            <span className="text-xs">Rewards</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <div className="text-2xl">👤</div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

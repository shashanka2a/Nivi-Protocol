"use client";

import React from 'react';
import { ArrowLeft, Shield, TrendingUp, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AssetDetailProps {
  assetId: string;
  onBack: () => void;
  onInvest: () => void;
}

export function AssetDetail({ assetId, onBack, onInvest }: AssetDetailProps) {
  // Mock data - in real app would fetch based on assetId
  const asset = {
    name: 'MrBeast',
    ticker: '$BEAST',
    image: 'https://images.unsplash.com/photo-1611702817774-8ac0f2d3f13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdG9yJTIwaW5mbHVlbmNlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDM4OTQxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 145.20,
    change24h: 12.4,
    yield: 18.5,
    volume24h: 2840000,
    marketCap: 425000000,
    totalSupply: 2927000,
    description: 'Premier content creator with verified viral IP. Consistent 100M+ view content with global brand partnerships.',
  };

  // Mock chart data
  const chartData = [
    { x: 0, y: 85 },
    { x: 1, y: 92 },
    { x: 2, y: 88 },
    { x: 3, y: 95 },
    { x: 4, y: 102 },
    { x: 5, y: 110 },
    { x: 6, y: 125 },
    { x: 7, y: 135 },
    { x: 8, y: 145 },
  ];

  const maxY = Math.max(...chartData.map(d => d.y));
  const minY = Math.min(...chartData.map(d => d.y));
  const range = maxY - minY;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="relative">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 glass-dark p-2 rounded-lg hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Video Preview */}
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={asset.image}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* IP Authenticity Badge */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="glass-dark p-3 rounded-lg flex items-center gap-2">
              <Shield className="text-[#D4AF37]" size={20} />
              <div>
                <div className="text-sm">IP Authenticity: Verified</div>
                <div className="text-xs text-gray-400">Shelby Data Confirmed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl">{asset.name}</h1>
              <div className="bg-[#D4AF37] rounded-full p-1">
                <Shield size={16} className="text-black" />
              </div>
            </div>
            <div className="text-gray-400">{asset.ticker}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl text-[#10B981]">{asset.currentPrice} APT</div>
            <div className="flex items-center gap-1 text-sm text-[#10B981]">
              <TrendingUp size={14} />
              <span>+{asset.change24h}% (24h)</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="glass-dark p-4 rounded-xl mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Yield (APY)</div>
              <div className="text-xl text-[#10B981]">{asset.yield}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">24h Volume</div>
              <div className="text-xl">${(asset.volume24h / 1000000).toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Market Cap</div>
              <div className="text-xl">${(asset.marketCap / 1000000).toFixed(0)}M</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total Supply</div>
              <div className="text-xl">{(asset.totalSupply / 1000).toFixed(0)}K</div>
            </div>
          </div>
        </div>

        {/* License Value Chart */}
        <div className="glass-dark p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg">License Value</h3>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-sm text-gray-400">30 Days</div>
          </div>
          
          {/* Chart */}
          <div className="relative h-32">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Gradient fill */}
              <path
                d={`
                  M 0,${100 - ((chartData[0].y - minY) / range) * 100}
                  ${chartData.map((d, i) => 
                    `L ${(i / (chartData.length - 1)) * 300},${100 - ((d.y - minY) / range) * 100}`
                  ).join(' ')}
                  L 300,100 L 0,100 Z
                `}
                fill="url(#chartGradient)"
              />
              
              {/* Line */}
              <path
                d={`
                  M 0,${100 - ((chartData[0].y - minY) / range) * 100}
                  ${chartData.map((d, i) => 
                    `L ${(i / (chartData.length - 1)) * 300},${100 - ((d.y - minY) / range) * 100}`
                  ).join(' ')}
                `}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
            </svg>
            
            {/* Value change indicator */}
            <div className="absolute top-0 right-0 text-sm text-[#10B981]">
              +{((asset.currentPrice - minY) / minY * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="glass-dark p-4 rounded-xl mb-6">
          <h3 className="text-lg mb-2">About This Asset</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{asset.description}</p>
        </div>

        {/* Investment Action */}
        <button
          onClick={onInvest}
          className="w-full btn-emerald py-4 rounded-xl text-lg"
        >
          Invest 50 APT
        </button>

        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Minimum investment: 10 APT • Est. gas fee: 0.5 APT</p>
        </div>
      </div>
    </div>
  );
}

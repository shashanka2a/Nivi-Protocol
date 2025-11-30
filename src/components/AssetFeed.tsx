"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Shield, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Asset {
  id: string;
  name: string;
  ticker: string;
  image: string;
  yield: number;
  floorPrice: number;
  volume: number;
  change: number;
  verified: boolean;
}

interface AssetFeedProps {
  onSelectAsset: (assetId: string) => void;
  onNavigate: (view: string) => void;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'MrBeast',
    ticker: '$BEAST',
    image: 'https://images.unsplash.com/photo-1611702817774-8ac0f2d3f13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdG9yJTIwaW5mbHVlbmNlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDM4OTQxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    yield: 18.5,
    floorPrice: 145.20,
    volume: 2840000,
    change: 12.4,
    verified: true,
  },
  {
    id: '2',
    name: 'Artistry Studios',
    ticker: '$ART',
    image: 'https://images.unsplash.com/photo-1613666587344-f3c08aac2594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NjQ0NDE4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yield: 24.2,
    floorPrice: 89.75,
    volume: 1560000,
    change: 8.7,
    verified: true,
  },
  {
    id: '3',
    name: 'BeatMaker Pro',
    ticker: '$BEAT',
    image: 'https://images.unsplash.com/photo-1740102687678-2d34988d8596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwcmVjb3JkaW5nfGVufDF8fHx8MTc2NDQ2NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    yield: 15.8,
    floorPrice: 67.30,
    volume: 890000,
    change: -3.2,
    verified: true,
  },
  {
    id: '4',
    name: 'Creator Hub',
    ticker: '$CREATE',
    image: 'https://images.unsplash.com/photo-1673767297220-6341467cb687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHZpZGVvfGVufDF8fHx8MTc2NDQ2NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    yield: 21.4,
    floorPrice: 112.90,
    volume: 1920000,
    change: 15.6,
    verified: false,
  },
];

export function AssetFeed({ onSelectAsset, onNavigate }: AssetFeedProps) {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-3xl mb-2">Top Performing Assets</h1>
        <p className="text-gray-400">Real-time creator investment opportunities</p>
      </div>

      {/* Market Stats */}
      <div className="px-6 mb-6">
        <div className="glass-dark p-4 rounded-xl">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Market Cap</div>
              <div className="text-[#10B981]">$2.4B</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">24h Volume</div>
              <div className="text-white">$156M</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Avg. APY</div>
              <div className="text-[#D4AF37]">19.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div className="px-6 space-y-3">
        {mockAssets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => onSelectAsset(asset.id)}
            className="w-full glass p-4 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-4">
              {/* Asset Image */}
              <div className="relative">
                <ImageWithFallback
                  src={asset.image}
                  alt={asset.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                {asset.verified && (
                  <div className="absolute -top-1 -right-1 bg-[#D4AF37] rounded-full p-1">
                    <Shield size={12} className="text-black" />
                  </div>
                )}
              </div>

              {/* Asset Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{asset.name}</span>
                  {asset.verified && (
                    <span className="text-xs text-[#D4AF37]">Shelby Verified</span>
                  )}
                </div>
                <div className="text-sm text-gray-400">{asset.ticker}</div>
              </div>

              {/* Asset Stats */}
              <div className="text-right">
                <div className="flex items-center gap-4 mb-1">
                  <div>
                    <div className="text-xs text-gray-400">Yield (APY)</div>
                    <div className="text-[#10B981]">{asset.yield}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Floor</div>
                    <div className="text-white">{asset.floorPrice} APT</div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 text-xs">
                  {asset.change > 0 ? (
                    <>
                      <TrendingUp size={12} className="text-[#10B981]" />
                      <span className="text-[#10B981]">+{asset.change}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={12} className="text-red-500" />
                      <span className="text-red-500">{asset.change}%</span>
                    </>
                  )}
                </div>
              </div>

              <ChevronRight className="text-gray-400 group-hover:text-[#D4AF37] transition-colors" size={20} />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass-dark border-t border-[#D4AF37]/30 px-6 py-4">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-[#10B981]">
            <TrendingUp size={24} />
            <span className="text-xs">Market</span>
          </button>
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
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

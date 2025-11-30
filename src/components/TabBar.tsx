"use client";

import { motion } from "motion/react";
import { Home, Search, PlusSquare, Wallet } from "lucide-react";

type TabType = "home" | "search" | "create" | "wallet";

export function TabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  const tabs = [
    { id: "home" as TabType, icon: Home, label: "Home" },
    { id: "search" as TabType, icon: Search, label: "Search" },
    { id: "create" as TabType, icon: PlusSquare, label: "Studio" },
    { id: "wallet" as TabType, icon: Wallet, label: "Wallet" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="glass-card max-w-md mx-auto px-4 py-3 rounded-2xl">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center gap-1 px-4 py-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <Icon
                  className={`w-6 h-6 relative z-10 transition-colors ${
                    isActive ? "text-indigo-400" : "text-white/60"
                  }`}
                />

                <span
                  className={`text-xs relative z-10 transition-colors ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-indigo-400 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

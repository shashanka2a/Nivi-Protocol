"use client";

import { useWallet } from "@/lib/aptos/wallet";
import { Wallet, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function WalletConnectButton() {
  const { connect, disconnect, account, connected, wallets } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletList, setShowWalletList] = useState(false);

  const handleConnect = async (walletName?: string) => {
    setIsConnecting(true);
    try {
      if (walletName) {
        // Connect to specific wallet
        const wallet = wallets.find((w) => w.name === walletName);
        if (wallet) {
          await connect(walletName);
        }
      } else {
        // Connect to first available wallet
        if (wallets.length > 0) {
          await connect(wallets[0].name);
        }
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
      setShowWalletList(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (connected && account) {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDisconnect}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white font-medium">
            {formatAddress(
              typeof account.address === "string"
                ? account.address
                : account.address.toString()
            )}
          </span>
          <LogOut className="w-4 h-4 text-white/60" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowWalletList(!showWalletList)}
        disabled={isConnecting}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </motion.button>

      {/* Wallet List Dropdown */}
      {showWalletList && wallets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 w-64 glass-card border border-white/20 rounded-xl p-2 z-50"
        >
          <div className="text-xs text-white/60 px-3 py-2 mb-1">
            Select Wallet
          </div>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-left"
            >
              {wallet.icon && (
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="w-6 h-6 rounded"
                />
              )}
              <div className="flex-1">
                <div className="text-white font-medium text-sm">
                  {wallet.name}
                </div>
                {wallet.url && (
                  <div className="text-xs text-white/40">
                    {wallet.url.includes("petra") ? "Petra Wallet" : "Wallet"}
                  </div>
                )}
              </div>
              {wallet.readyState === "Installed" && (
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              )}
            </button>
          ))}
          {wallets.length === 0 && (
            <div className="px-3 py-4 text-center text-white/60 text-sm">
              No wallets detected. Please install Petra or another Aptos wallet.
            </div>
          )}
        </motion.div>
      )}

      {/* Click outside to close */}
      {showWalletList && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowWalletList(false)}
        />
      )}
    </div>
  );
}


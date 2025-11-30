"use client";

import { useWallet } from "@/lib/aptos/wallet";
import { WalletConnectButton } from "./WalletConnectButton";

interface WalletStatusProps {
  showButton?: boolean;
  className?: string;
}

/**
 * Component to show wallet connection status
 * Can be used anywhere transactions are needed
 */
export function WalletStatus({ showButton = true, className = "" }: WalletStatusProps) {
  const { connected, account } = useWallet();

  if (!connected) {
    return (
      <div className={className}>
        {showButton && <WalletConnectButton />}
      </div>
    );
  }

  return null; // Wallet is connected, no status needed
}


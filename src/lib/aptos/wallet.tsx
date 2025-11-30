"use client";

import { ReactNode } from 'react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

// Wallet adapter provider with WalletConnect support
export function AptosWalletProvider({ children }: { children: ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={false}
      onError={(error) => {
        console.error('Aptos wallet error:', error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}

export { useWallet } from '@aptos-labs/wallet-adapter-react';


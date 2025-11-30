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
        // Show user-friendly error message for blank popup issues
        if (error?.message?.includes('popup') || error?.message?.includes('blank')) {
          console.warn('Wallet popup issue detected. Ensure Petra wallet extension is installed and enabled.');
        }
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}

export { useWallet } from '@aptos-labs/wallet-adapter-react';


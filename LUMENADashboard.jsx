import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function LUMENADashboard() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setWallet(accounts[0]);
      }
    };
    connectWallet();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>💠 LUMENA Dashboard</h1>
      <p>Wallet: {wallet ? wallet : "Not connected"}</p>
    </div>
  );
}


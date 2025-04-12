import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function LUMENADashboard() {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    // Ensure we're running in a browser and MetaMask is available
    if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
      setError("MetaMask is not available. Please install it in your browser.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setError(null);
      } else {
        setError("No accounts found. Please connect an account in MetaMask.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to MetaMask.");
    }
  };

  useEffect(() => {
    // Attempt automatic connection on mount if desired
    if (typeof window !== "undefined" && window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>💠 LUMENA Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Wallet: {wallet ? wallet : "Not connected"}</p>
      {!wallet && (
        <button 
          onClick={connectWallet} 
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

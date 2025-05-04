import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const TOKEN_ADDRESS = "0xe51dfa124F55393e4bdb3377b71aaFCD235b5767";
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

function WalletCard() {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function fetchBalance() {
      if (!window.ethereum) {
        alert("MetaMask is not installed! Please install it from https://metamask.io/download/");
        return;
      }

      // Request account access and create provider
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Using ethers v6: 
      const provider = new ethers.BrowserProvider(window.ethereum);
      // If you're using ethers v5, use:
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const signer = await provider.getSigner();
      const userAccount = await signer.getAddress();
      setAccount(userAccount);

      // Instantiate token contract and fetch balance
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
      const rawBalance = await tokenContract.balanceOf(userAccount);
      const decimals = await tokenContract.decimals();
      const formattedBalance = ethers.formatUnits(rawBalance, decimals);
      setBalance(formattedBalance);
    }

    fetchBalance();
  }, []);

  return (
    <div className="sticky top-16 h-fit bg-purple-500 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Wallet</h2>
      <div className="space-y-2">
        <div>
          <p className="text-lg">
            Balance:{" "}
            <span className="font-bold">
              {balance !== null ? balance + " Briks" : "Loading..."}
            </span>
          </p>
        </div>
        <div>
          <p className="text-lg">
            Monthly Profit: <span className="font-bold">44 Briks</span>
          </p>
        </div>
        <div className="mt-4 text-sm text-gray-200">
          +10% Profit Increase
        </div>
        <div className="mt-2 text-sm">
          {/* If you don’t see your Briks token, please add it manually using the contract address: {TOKEN_ADDRESS} */}
        </div>
      </div>
    </div>
  );
}

export default WalletCard;

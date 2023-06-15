import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useConnectWalletbyMetamask, useWallet } from "../states/wallet.state";
import { ellipsisAddress } from "../utils/ellipsisAddress";
import logo from "../../public/logo.png";

import { BigNumber, ethers } from "ethers";
import { runMain } from "../utils/getBalancesByAlchemy";
import { providers } from "ethers";

interface Account {
  address: string;
  balance: string | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

interface TokenBalance {
  contractAddress: string;
  balance: BigNumber;
}

function Header({ handleClickNavLink }: { handleClickNavLink: any }) {
  const { account, chainId, connect, disconnect } =
    useConnectWalletbyMetamask();
  //const chain = Chain.get(chainId);

  const [TokenBalance, setTokenBalance] = useState<TokenBalance[] | null>(null);

  const [ethBalance, setEthBalance] = useState<string | null>(null);

  const getEthBalance = async (account: string) => {
    console.log("ji");
    if (!account) return;
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const balance = await provider?.getBalance(account);
    console.log(balance?.toString());

    setEthBalance(balance?.toString());
  };

  const onDisconnect = () => {
    if (confirm("Disconnect Wallet?")) disconnect();
  };

  useEffect(() => {
    if (!account) return;
    runMain(account);
    getEthBalance(account);
  }, [account]);

  return (
    <div className="bg-none flex-col items-center">
      <div className="flex items-center justify-between m-6 ">
        <div className="flex justify-center items-center">
          <img src={logo} className="w-24 h-24" alt="logo" />
          <div className="m-auto">This is Template</div>
        </div>

        {account ? (
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center p-4 border-4 border-blue-500 rounded-md "
              onClick={onDisconnect}
            >
              {ellipsisAddress(account)}
            </button>
            <div className="flex justify-center  bg-slate-500 top-32  w-[250px] h-full absolute ">
              ho
            </div>

            {TokenBalance?.map((tokenBalance) => (
              <div key={tokenBalance.contractAddress}>
                {tokenBalance.contractAddress} :{" "}
                {tokenBalance.balance.toString()}
              </div>
            ))}
          </div>
        ) : (
          <button
            className="w-[150px] h-[50px] bg-blue-500 text-white rounded-md"
            onClick={connect}
          >
            Connect
          </button>
        )}
      </div>
      <NavBar handleClickNavLink={handleClickNavLink} />
    </div>
  );
}

export default Header;

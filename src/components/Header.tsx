import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useConnectWalletbyMetamask, useWallet } from "../states/wallet.state";
import { ellipsisAddress } from "../utils/ellipsisAddress";
import logo from "../../public/logo.png";
import eth from "../assets/tokens/eth.png";

import { BigNumber, ethers } from "ethers";
import { runMain } from "../utils/getBalancesByAlchemy";
import Loading from "./common/Loading";
import { providers } from "ethers";

interface Account {
  address: string;
  balance: string | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

interface TokenInfos {
  logo: string;
  name: string;
  balance: string;
  symbol: string;
}

function Header({ handleClickNavLink }: { handleClickNavLink: any }) {
  const { account, chainId, connect, disconnect } =
    useConnectWalletbyMetamask();
  //const chain = Chain.get(chainId);

  const [TokenBalance, setTokenBalance] = useState<TokenInfos[] | null>(null);

  const [ethBalance, setEthBalance] = useState<string | null>(null);

  const getEthBalance = async (account: string) => {
    if (!account) return;
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const balance = await provider?.getBalance(account);
    const formatBalance = ethers.utils.formatEther(balance?.toString());
    const fixedBalance = parseFloat(formatBalance).toFixed(4);
    console.log(fixedBalance);

    setEthBalance(ethers.utils.formatEther(balance?.toString()));
  };

  const getTokenInfos = async (account: string) => {
    if (!account) return;
    if (!window.ethereum) return;
    const TokenInfos = await runMain(account);
    setTokenBalance(TokenInfos);
    console.log(TokenInfos);
    return TokenInfos;
  };

  const onDisconnect = () => {
    if (confirm("Disconnect Wallet?")) disconnect();
  };

  useEffect(() => {
    if (!account) return;
    //getTokenInfos(account);
    console.log("hi");

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
            <div className="text-white bg-slate-700 flex flex-col items-center p-4   top-32  w-[250px] h-full absolute ">
              <div className="flex items-center">
                ETH
                <img className="w-10 h-10" src={eth} alt="eth" />
                {ethBalance ? parseFloat(ethBalance).toFixed(4) : ""} ETH
              </div>

              {TokenBalance ? (
                <>
                  {TokenBalance?.map((tokenBalance) => (
                    <div className="flex items-center " key={tokenBalance.name}>
                      {tokenBalance.name} :{" "}
                      {tokenBalance.logo ? (
                        <img
                          src={tokenBalance.logo}
                          className="w-10 h-10"
                          alt="logo"
                        />
                      ) : (
                        ""
                      )}
                      {tokenBalance.balance
                        ? parseFloat(tokenBalance.balance).toFixed(4)
                        : ""}
                      {tokenBalance.symbol}
                    </div>
                  ))}
                </>
              ) : (
                // <Loading />
                <></>
              )}
            </div>
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

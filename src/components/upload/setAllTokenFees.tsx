import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useConnectWalletbyMetamask } from "../../states/wallet.state";
import { runMain } from "../../utils/getBalancesByAlchemy";
import Loading from "../common/Loading";

interface Token {
  name: string;
  amount: number;
  max: any;
}
interface TokenInfos {
  logo: string;
  name: string;
  balance: string;
  symbol: string;
}

const App = ({ totalFee }) => {
  const { account, chainId, connect, disconnect } =
    useConnectWalletbyMetamask();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [TokenBalance, setTokenBalance] = useState<TokenInfos[] | null>(null);

  const [ethBalance, setEthBalance] = useState<string | null>(null);

  const [totalAmount, setTotalAmount] = useState<number>(0);

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
    console.log("실행");
    if (!account) return;
    if (!window.ethereum) return;
    const TokenInfos = await runMain(account);
    TokenInfos.map((token) => {
      setTokens((tokens) => [
        ...tokens,
        { name: token.name, amount: 0, max: token.balance },
      ]);
    });
    setTotalAmount(tokens.reduce((sum, token) => sum + token.amount, 0));
    console.log(tokens);
    console.log(totalAmount);
  };

  useEffect(() => {
    if (!account) return;
    getTokenInfos(account);

    getEthBalance(account);
  }, []);

  const handleTokenChange = (index: number, value: number) => {
    const newTokens = [...tokens];
    const totalAmount = newTokens.reduce((sum, token) => sum + token.amount, 0);

    // 새로운 토큰의 양을 설정하고, 총합이 100을 넘지 않도록 조정
    if (totalAmount + value - newTokens[index].amount <= totalFee) {
      newTokens[index].amount = value;
      setTokens(newTokens);
    }
  };

  const totalAmount2 = tokens.reduce((sum, token) => sum + token.amount, 0);

  if (tokens.length == 0) return <Loading />;
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="flex items-center">
        <span className="mr-2">Total Amount:</span>

        <div className=" p-2  ">{totalAmount2}</div>
        <div className="mr-2">/</div>
        <div className="mr-2">{totalFee}</div>
      </div>
      <div className="flex flex-col items-center justify-center mb-4">
        {tokens.map((token, index) => (
          <div key={index} className="flex flex-col items-center mx-4 mb-8">
            <span className="text-2xl font-bold">{token.name}</span>
            <input
              type="range"
              min={0}
              max={token.max}
              value={token.amount}
              onChange={(e) => handleTokenChange(index, +e.target.value)}
              className="w-[600px] p-2 mt-2 text-center border border-gray-300"
            />
            <div className="flex w-[600px] justify-between">
              <span>최소: {0}</span> {/* 최소 값 표시 */}
              <span>현재: {token.amount}</span> {/* 현재 선택된 값 표시 */}
              <span>최대: {token.max}</span> {/* 최대 값 표시 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

interface TokenInfo {
  logo: string;
  name: string;
  balance: string;
  symbol: string;
}

const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_KEY as string,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);
const TokenInfos: TokenInfo[] = [];

const main = async (address: string) => {
  // Wallet address

  // Get token balances
  const balances = await alchemy.core.getTokenBalances(address);

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  console.log(`Token balances of ${address} \n`);

  // Counter for SNo of final output
  let i = 1;
  console.log(nonZeroBalances);
  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance: any = token.tokenBalance;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(4);
    if (balance === "0.00") continue;

    // Print name, balance, and symbol of token
    // console.log(
    //   `${i++}. ${metadata.logo} ${metadata.name}: ${balance} ${metadata.symbol}`
    // );
    TokenInfos.push({
      logo: metadata.logo,
      name: metadata.name,
      balance: balance,
      symbol: metadata.symbol,
    });
  }
  return TokenInfos;
};

export const runMain = async (address: string) => {
  try {
    const TokenInfos = await main(address);

    return TokenInfos;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

import axios from "axios";
import { BigNumber } from "ethers";
import { useRecoilValue } from "recoil";

interface TokenBalance {
  contractAddress: string;
  balance: BigNumber;
}

export const fetchTokenBalance = async (walletAddress: string) => {
  try {
    const apikey = import.meta.env.VITE_ETHSCAN_KEY;
    const apiUrl = `https://api.etherscan.io/api
        ?module=account
        &action=tokenbalance
        &contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055
        &address=${walletAddress}
        &tag=latest&apikey=${apikey}`;
    const response = await axios.get(apiUrl);
    const data = response.data;
    const balances: TokenBalance[] = [];

    for (const [contractAddress, balance] of Object.entries(data.result)) {
      balances.push({
        contractAddress,
        balance: BigNumber.from(balance),
      });
    }
    return balances;
  } catch (error) {
    console.log(error);
    return [];
  }
};

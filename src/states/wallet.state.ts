import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { CHAINID } from "../interfaces/config-data.interface";
import { connectMetamask } from "./../utils/metamask";
import { providers } from "ethers";

export const accountAtom = atom<string | null>({
  key: "atom/account",
  default: null,
});
export const chainIdAtom = atom<number>({
  key: "atom/chainId",
  // TODO: CHANGE DEFAULT CHAIN ID
  default: CHAINID.Goerli,
});
export const signerAtom = atom<ethers.Signer | null>({
  key: "atom/signer",
  default: null,
});

export const useWallet = () => {
  const account = useRecoilValue(accountAtom);
  const chainId = useRecoilValue(chainIdAtom);
  const signer = useRecoilValue(signerAtom);
  return {
    account,
    chainId,
    signer,
  };
};

export const useConnectWalletbyMetamask = () => {
  const [account, setAccount] = useRecoilState(accountAtom);
  const [chainId, setChainId] = useRecoilState(chainIdAtom);

  const resetChainId = useResetRecoilState(chainIdAtom);
  const nav = useNavigate();

  const connect = async () => {
    const res = await connectMetamask(chainId);
    if (!res || !res.ok) return nav("/");

    setAccount(res!.account);
    setChainId(res!.chainId);
  };

  const disconnect = async () => {
    setAccount(null);
    resetChainId();
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.ethereum?.on("accountsChanged", (accounts: string[]) => {
    setAccount(accounts[0] ?? null);
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.ethereum?.on("chainChanged", (chainId: string) => {
    setChainId(+chainId);
    nav("/");
  });

  return {
    account,
    chainId,

    connect,
    disconnect,
  };
};

// export const getContract = async ({
//   address,
//   abi,
//   signer,
// }: {
//   address: any;
//   abi: any;
//   signer: any;
// }) => {
//   const [{ wallet }, connect, disconnect, updateBalance, setWalletModules] =
//     getWeb3OnboardWallet();

//   const contract = new ethers.Contract(address, abi, signer);
//   return contract;
// };

export const useSigner = () => {
  const account = useRecoilValue(accountAtom);
  return {
    signer:
      account && window.ethereum
        ? // @ts-ignore
          new providers.Web3Provider(window.ethereum!).getSigner()
        : null,
  };
};

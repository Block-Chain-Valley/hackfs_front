import { CHAINID, TokenData } from "../interfaces/config-data.interface";

import eth from "../assets/tokens/eth.png";
import fil from "../assets/tokens/fil.png";
import matic from "../assets/tokens/matic.png";
import near from "../assets/tokens/near.png";
import xrp from "../assets/tokens/xrp.png";

const TOKENS: TokenData[] = [
  {
    chainId: CHAINID.Mumbai,
    name: "MATIC",
    decimals: 18,
    symbol: "MATIC",
    address: "0x19A7Ff2D5905E010bf234123A63AaC48524e7EDa",
    isWrappedToken: false,
    imgUrl: matic,
  },

  {
    chainId: CHAINID.Scroll,
    name: "ETH",
    decimals: 18,
    symbol: "ETH",
    address: "0x9b489AF10Ac2E13bDB57952cbc0BC06AEbE1394B",
    isWrappedToken: false,
    imgUrl: eth,
  },

  {
    chainId: CHAINID.Linea,
    name: "ETH",
    decimals: 18,
    symbol: "ETH",
    address: "0x580A9E9c750841628cb9ba2e217512A9703D8662",
    isWrappedToken: false,
    imgUrl: eth,
  },

  {
    chainId: CHAINID.Celo,
    name: "ETH",
    decimals: 18,
    symbol: "ETH",
    address: "0x580A9E9c750841628cb9ba2e217512A9703D8662",
    isWrappedToken: false,
    imgUrl: eth,
  },
  {
    chainId: CHAINID.Taiko,
    name: "ETH",
    decimals: 18,
    symbol: "ETH",
    address: "0x17bA4044914b479098150BaB8Fe62fac69B814B3",
    isWrappedToken: false,
    imgUrl: eth,
  },
];

export default TOKENS;

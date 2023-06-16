import React, { useEffect, useRef, useState } from "react";
import About from "./About";
import Contact from "./Upload";
import logo from "../../public/logo.png";
import { useSigner, useWallet } from "../states/wallet.state";
import { FileSwap, FreeERC20 } from "../types";
import { ethers, utils } from "ethers";
import FreeERC20ABI from "../abi/FreeERC20.json";
import FileSwapABI from "../abi/FileSwap.json";
import { fetchFilFee } from "../utils/getFilFee";

function Home({ sectionRefs }: { sectionRefs: any }) {
  const { account, chainId } = useWallet();
  const { signer } = useSigner();

  const Matic: FreeERC20 = new ethers.Contract(
    import.meta.env.VITE_MATIC_ADDRESS_KEY as string,
    FreeERC20ABI,
    signer
  ) as FreeERC20;
  const Klay: FreeERC20 = new ethers.Contract(
    import.meta.env.VITE_KLAY_ADDRESS_KEY as string,
    FreeERC20ABI,
    signer
  ) as FreeERC20;
  const USDT: FreeERC20 = new ethers.Contract(
    import.meta.env.VITE_USDT_ADDRESS_KEY as string,
    FreeERC20ABI,
    signer
  ) as FreeERC20;
  const FileSwap: FileSwap = new ethers.Contract(
    import.meta.env.VITE_FILESWAP_ADDRESS_KEY as string,
    FileSwapABI,
    signer
  ) as FileSwap;

  const mintMatic = async (account) => {
    console.log(signer);
    if (!account) return;
    if (!window.ethereum) return;
    await Matic.mint(account, utils.parseEther("10000"));
  };
  const mintKlay = async (account) => {
    if (!account) return;
    if (!window.ethereum) return;
    await Klay.mint(account, utils.parseEther("10000"));
  };
  const mintUSDT = async (account) => {
    if (!account) return;
    if (!window.ethereum) return;
    await USDT.mint(account, utils.parseEther("10000"));
  };

  const getMaticBalance = async (account) => {
    if (!account) return;
    if (!window.ethereum) return;
    const balance = await Matic.balanceOf(account);
    console.log(utils.formatEther(balance));
  };
  const getKlayBalance = async (account) => {
    if (!account) return;
    if (!window.ethereum) return;
    const balance = await Klay.balanceOf(account);
    console.log(utils.formatEther(balance));
  };
  const getUSDTBalance = async (account) => {
    if (!account) return;
    if (!window.ethereum) return;
    const balance = await USDT.balanceOf(account);
    console.log(utils.formatEther(balance));
  };

  const swap = async () => {
    if (!account) return;
    await Matic.approve(
      import.meta.env.VITE_FILESWAP_ADDRESS_KEY as string,
      utils.parseEther("17")
    );
    await Klay.approve(
      import.meta.env.VITE_FILESWAP_ADDRESS_KEY as string,
      utils.parseEther("35")
    );
    await USDT.approve(
      import.meta.env.VITE_FILESWAP_ADDRESS_KEY as string,
      utils.parseEther("20")
    );
    const tx = await FileSwap.stake(
      [
        import.meta.env.VITE_MATIC_ADDRESS_KEY as string,
        import.meta.env.VITE_KLAY_ADDRESS_KEY as string,
        import.meta.env.VITE_USDT_ADDRESS_KEY as string,
      ],
      [utils.parseEther("17"), utils.parseEther("35"), utils.parseEther("20")]
    );
    await tx.wait();
    console.log(tx);
  };

  return (
    <main className="flex flex-col  items-center justify-center">
      <button onClick={() => mintMatic(account)}>Mint FileMatic</button>
      <button onClick={() => getMaticBalance(account)}>view FileMatic</button>
      <button onClick={() => mintKlay(account)}>Mint FileKlay</button>
      <button onClick={() => getKlayBalance(account)}>view FileKlay</button>
      <button onClick={() => mintUSDT(account)}>Mint FileUSDT</button>
      <button onClick={() => getUSDTBalance(account)}>view FileUSDT</button>
      <button onClick={() => swap()}>swap</button>
      <button onClick={() => fetchFilFee()}>getFilFee</button>

      <div className="flex items-center  h-[604px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex-col mr-4">
          <div className="w-[600px] h-[200px] text-6xl font-semibold leading-14">
            Data Storage Swap Data Storage Swap Data Storage Swap
          </div>
          <div className="w-[600px] h-[100px] text-2xl leading-8 ">
            NFT marketplace UI created with Anima for Figma. Collect, buy and
            sell art from more than 20k NFT artists.
          </div>
          <button className="w-[200px] h-[50px] bg-blue-500 text-white rounded-md">
            Get Started
          </button>
        </div>
        <div>
          <img className="w-[500px] h-[400px] rounded-md" src={logo} alt="" />
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </p>
            <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div className="mt-10">
            <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {/* Heroicon name: globe-alt */}
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9l2 2m0 0l7 7 7-7m-7 7V3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg leading-6 font-medium text-gray-900">
                      Competitive exchange rates
                    </h4>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsa libero labore natus.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

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

import { AiFillCloseCircle } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { SiHiveBlockchain } from "react-icons/si";
import home1 from "../assets/home/home1.png";
import home2 from "../assets/home/home2.png";
import home3 from "../assets/home/home3.png";
import home4 from "../assets/home/home4.png";
import home5 from "../assets/home/home5.png";
import { Link } from "react-router-dom";
import ROUTES from "../routes";
import useScrollFadeIn from "../hooks/useScrollFadeIn";

const plans = [
  {
    id: 1,
    title: "Jun 2023",
    content: "Product launch",
    detail:
      " To launch the product, we plan to develop and test it, and create a pool to facilitate usage. We also aim to provide a user-friendly UI/UX to ensure ease of use for our users.",
  },
  {
    id: 2,
    title: "Aug 2023",
    content: "Implementation of NFT future certificate trading market",
    detail:
      " We will add the ability to issue future certificates for future transactions in the form of NFTs. This will allow the recipient of a future to store the future certificate in their NFT wallet, and trade it if needed. 'DeFuture' thus serves as a technical foundation for the NFT future certificate trading market.",
  },
  {
    id: 3,
    title: "Jan 2024",
    content: "Expanding to new markets",
    detail:
      "Our service is not limited to token future transactions and can be utilized in various fields such as contract management between businesses, real estate transactions, and art trading. Therefore, we plan to expand the service's features and enter different markets. By expanding into new markets, we can increase the potential of blockchain technology and enhance the value of our service.",
  },
];

function Home() {
  const { account, chainId } = useWallet();
  const { signer } = useSigner();

  const animatedItem = {
    0: useScrollFadeIn("down", 1, 0),
    1: useScrollFadeIn("left", 2, 0),
    2: useScrollFadeIn("right", 2, 0),
    3: useScrollFadeIn("up", 1, 0),
    4: useScrollFadeIn("up", 1, 0),
    5: useScrollFadeIn("up", 1, 0),
    6: useScrollFadeIn("up", 1, 0),
  };

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
      {/* <div className="flex">
        <button onClick={() => mintMatic(account)}>Mint FileMatic</button>
        <button onClick={() => getMaticBalance(account)}>view FileMatic</button>
        <button onClick={() => mintKlay(account)}>Mint FileKlay</button>
        <button onClick={() => getKlayBalance(account)}>view FileKlay</button>
        <button onClick={() => mintUSDT(account)}>Mint FileUSDT</button>
        <button onClick={() => getUSDTBalance(account)}>view FileUSDT</button>
        <button onClick={() => swap()}>swap</button>
        <button onClick={() => fetchFilFee()}>getFilFee</button>
      </div> */}
      {/* bg-[length:1200px_600px] */}
      <div className="flex bg-black bg-filecoin bg-contain bg-right bg-no-repeat  w-full  h-[604px] mx-auto py-12 px-4 ">
        <div className="  flex-col items-center justify-center h-[600px] ml-8">
          <div className="w-[600px] mt-12 m-8 text-8xl font-semibold leading-14">
            Data Storage Swap
          </div>
          <div className="ml-8 w-[600px] h-[100px] text-2xl leading-8 ">
            <div className=" font-bold">
              Dataswap, a platform to make using the Filecoin network more
              accessible
            </div>
          </div>
          <Link to={ROUTES.UPLOAD}>
            <button className=" ml-48 w-[200px] h-[50px] bg-blue-500 text-white rounded-md">
              Get Started
            </button>
          </Link>
        </div>
        <div>
          {/* <img
            className="w-[600px] h-[500px] rounded-md animate-pulse duration-1000"
            src={logo}
            alt=""
          /> */}
        </div>
      </div>

      <div {...animatedItem[0]}>
        <h1 className=" w-full flex items-center justify-center text-primary-400 text-lg  leading-9 font-extrabold sm:text-3xl sm:leading-10">
          The Filecoin Network is a revolutionary data decentralized storage
          platform.
        </h1>

        <h1 className="w-full flex items-center justify-center mt-12 text-primary-400 text-lg leading-10 font-extrabold sm:text-3xl sm:leading-10">
          However, accessibility issues have prevented many users from using it.
          <br />
          To make the Filecoin Network accessible to more users,
          <br /> we solved the accessibility problem.
        </h1>
      </div>

      <div className="mt-12 flex w-full p-10 bg-primary-100 justify-center items-center flex-col">
        <h1 className="text-primary-500 text-shadow-gray text-5xl mb-20 leading-9 font-extrabold  sm:leading-10">
          Problem
        </h1>

        <div className="flex flex-row items-center justify-center">
          <div className="flex items-center w-96 flex-col m-16">
            <h2 className="text-primary-700 text-xl font-bold">
              {" "}
              Filecoin network increases the stability and security of data
              storage by storing data on multiple nodes, but in reality, it is
              not accessible due to technical difficulties experienced by users.
              In addition, the two platforms that were created to increase
              accessibility both have the following problems, making them less
              accessible.
            </h2>
          </div>
          <div>
            <div className="flex  items-center  m-16">
              <div className="flex-col">
                <CgDanger className="text-primary-500  w-28 h-28 text-5xl mb-3" />
                <h2 className="text-primary-700 mb-6 text-xl font-bold">
                  Fixed payment currency
                </h2>
              </div>
              <div className=" text-center text-gray-600 w-60">
                The two services that are supposed to make the Filecoin network
                accessible allow users to pay in dollars or stablecoins. They
                require users to pay just only in dollars or stablecoins, which
                prevents many users with altcoins from being able to pay
                directly with altcoins, making them less accessible.
              </div>
            </div>
            <div className="flex  items-center m-16 ">
              <div className="flex-col">
                {" "}
                <SiHiveBlockchain className="text-primary-500 w-28 h-28 text-5xl mb-3" />
                <h2 className="text-primary-700 mb-6 text-xl font-bold">
                  Fixed payment method
                </h2>
              </div>
              <div className=" text-center text-gray-600 w-48">
                The payment method is also fixed, with a monthly subscription,
                which reduces accessibility for users.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-6  items-center justify-center flex-col">
        <div className="text-primary-500 text-shadow-gray flex mt-10 items-center justify-center text-5xl font-bold mb-10">
          Solution
        </div>

        <div className="flex flex-row items-center mb-10">
          <div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[36px] mb-2 text-primary-700 font-bold">
                Diversification of payment currency
              </h1>
              <p className="text-primary-900 w-[600px]">
                We diversified our payment methods by adding altcoins as a
                payment method among cryptocurrencies. This allows altcoin
                holders to easily access Filecoin Network services.
              </p>
            </div>
          </div>

          <div>
            <img src={home4} />
          </div>
        </div>

        <div className="flex flex-row items-center mb-10">
          <div>
            <img src={home5} />
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[36px] mb-2 text-primary-700 font-bold">
                Flexibility in payment method
              </h1>
              <p className="text-primary-900 w-[600px]">
                Our service requires payment for each file upload, which allows
                users who want to upload small amounts of data to the Filecoin
                Network.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center mb-10">
          <div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[36px] mb-2 text-primary-700 font-bold">
                Market stabilizer
              </h1>
              <p className="text-primary-900 w-[600px]">
                Positions from both ends when placed together, this impacts the
                whole market to stabilize prize fluctuations as it will act as
                key axis throughout the duration. In other words, more positions
                the more impact it will strive the market, creating a firm
                market price dome reaching stability preventing price sudden
                peaks. This powerful feature is expected to reach high demands
                as users tend to look for stable, safe products to invest in.
              </p>
            </div>
          </div>

          <div>
            <img src={home3} />
          </div>
        </div>
      </div>

      <div className="flex bg-primary-50 p-20 w-full justify-center items-center">
        <div className="bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-primary-500 text-shadow-gray sm:text-4xl">
                RoadMap
              </p>
              <p className="mt-2 text-xl leading-8 tracking-tight text-primary-500 sm:text-4xl">
                Our Future Plans
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col justify-start items-center relative p-8 bg-white shadow-lg rounded-md"
                >
                  <div className="flex">
                    <div className="flex ">
                      <div className="flex items-center justify-center h-12 w-12 p-8 rounded-md bg-primary-500 text-white">
                        {plan.title}
                      </div>
                    </div>
                    <div className="flex justify-start ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {plan.content}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-6 text-gray-500">
                    <p className="text-base">{plan.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

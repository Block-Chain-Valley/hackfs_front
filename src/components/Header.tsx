import React from "react";
import NavBar from "./NavBar";
import { useConnectWalletbyMetamask } from "../states/wallet.state";
import { ellipsisAddress } from "../utils/ellipsisAddress";
import logo from "../../public/logo.png";

interface Account {
  address: string;
  balance: string | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

function Header({ handleClickNavLink }: { handleClickNavLink: any }) {
  const { account, chainId, connect, disconnect } =
    useConnectWalletbyMetamask();
  //const chain = Chain.get(chainId);

  const onDisconnect = () => {
    if (confirm("Disconnect Wallet?")) disconnect();
  };

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
            <div className="flex justify-center  bg-slate-500 top-32  w-[250px] h-[500px] absolute ">
              ho
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

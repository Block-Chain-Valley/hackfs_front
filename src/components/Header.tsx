import React from "react";
import NavBar from "./NavBar";
import { useConnectWalletbyMetamask } from "../states/wallet.state";
import { ellipsisAddress } from "../utils/ellipsisAddress";

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
      <div className="flex ">
        <img
          src="https://i.imgur.com/1Q1Z1Zy.png"
          className="w-16 h-16"
          alt="logo"
        />
        <div className="m-auto">This is Template</div>

        {account ? (
          <button className="btn btn-secondary" onClick={onDisconnect}>
            {ellipsisAddress(account)}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={connect}>
            Connect
          </button>
        )}
      </div>
      <NavBar handleClickNavLink={handleClickNavLink} />
    </div>
  );
}

export default Header;

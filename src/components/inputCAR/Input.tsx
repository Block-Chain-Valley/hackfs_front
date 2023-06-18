import { useState, useEffect } from "react";

import DealClientABI from "../../abi/DealClient.json";

import { BigNumber, ethers } from "ethers";

import Loading from "../common/Loading";
import { useSigner, useWallet } from "../../states/wallet.state";

import { DealClient } from "../../types";
import CID from "cids";

const contractAddress = "0xf4E0C74D76Bf324293bB3B3DA184d164d06F7664";

let cid;

const Inputs = ({ carLink, ipfsHash, fileSize, carSize }) => {
  const [commP, setCommP] = useState(
    "baga6ea4seaqkp2pjlh6avlvee6ib2maanav5sc35l5glf3zm6rd6hmfgcx5xeji"
  );

  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
  const [pieceSize, setPieceSize] = useState("32768");

  const [txSubmitted, setTxSubmitted] = useState("");
  const [dealID, setDealID] = useState("");
  const [proposingDeal, setProposingDeal] = useState(false);
  const [network, setNetwork] = useState("");

  const { account, chainId } = useWallet();
  const { signer } = useSigner();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.calibration.node.glif.io/rpc/v1",
    314159
  );
  const providerSigner = new ethers.Wallet(
    import.meta.env.VITE_PRIVATE_KEY as string,
    provider
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(commP);
    console.log(carLink);
    console.log(fileSize);
    console.log(carSize);

    try {
      setErrorMessageSubmit("");
      cid = new CID(commP);

      if (account && signer) {
        const dealClient: DealClient = new ethers.Contract(
          contractAddress,
          DealClientABI.abi,
          providerSigner
        ) as DealClient;

        const extraParamsV1 = [carLink, carSize, false, false];
        const DealRequestStruct = [
          cid.bytes,
          fileSize,

          false,
          ipfsHash,
          520000,
          1555200,
          0,
          0,
          0,
          1,
          // 999999999999999,
          // 999999999999999,
          // 999999999999999,
          // 999999999999999,
          // 999999999999999,
          // 999999999999999,
          extraParamsV1,
        ];
        console.log(dealClient.interface);
        const transaction = await dealClient.makeDealProposal(
          DealRequestStruct as any
        );
        console.log("Proposing deal...");
        setProposingDeal(true);
        const receipt = await transaction.wait();
        console.log(receipt);
        setProposingDeal(false);
        setTxSubmitted("Transaction submitted! " + receipt.blockHash);

        dealClient.on("DealProposalCreate", (id, size, verified, price) => {
          console.log(id, size, verified, price);
        });

        console.log("Deal proposed! CID: " + cid);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setErrorMessageSubmit(
        "Something went wrong. " + error.name + " " + error.message
      );
      return;
    }
  };
  const dealIDButton = () => {
    return (
      <button
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={dealIDHandler}
      >
        Get deal ID
      </button>
    );
  };

  const dealIDHandler = async () => {
    const dealClient: DealClient = new ethers.Contract(
      contractAddress,
      DealClientABI.abi,
      providerSigner
    ) as DealClient;
    setDealID("CID: " + cid + "\nWaiting for acceptance by SP...");
    cid = new CID(commP);
    var refresh = setInterval(async () => {
      console.log(cid.bytes);
      if (cid === undefined) {
        setDealID("Error: CID not found");
        clearInterval(refresh);
      }
      console.log("Checking for deal ID...");
      console.log("Deal CID: ", cid);
      const dealID = await dealClient.pieceDeals(cid.bytes);
      console.log(dealID);

      if (dealID !== undefined && dealID !== BigNumber.from(0)) {
        // If your deal has already been submitted, you can get the deal ID by going to https://calibration.filfox.info/en/deal/<dealID>
        // The link will show up in the frontend: once a deal has been submitted, its deal ID stays constant. It will always have the same deal ID.
        setDealID("https://calibration.filfox.info/en/deal/" + dealID);
        clearInterval(refresh);
      }
    }, 5000);
  };
  return (
    <div className="flex flex-col items-center" id="container">
      <form className="child-1" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>

        <div style={{ color: "red" }}>{errorMessageSubmit}</div>

        {proposingDeal && <Loading />}

        <div style={{ color: "green" }}>{txSubmitted}</div>
      </form>

      <br />
      <br />

      <div>
        <div style={{ display: "flex", margin: "auto" }}>{dealIDButton()}</div>
      </div>

      {dealID && (
        <div style={{ color: "green", margin: "auto" }}>Deal: {dealID}</div>
      )}
    </div>
  );
};

export default Inputs;

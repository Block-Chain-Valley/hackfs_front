import { useState, useEffect } from "react";

import DealClientABI from "../../abi/DealClient.json";

import { BigNumber, ethers } from "ethers";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import Loading from "../common/Loading";
import { useSigner, useWallet } from "../../states/wallet.state";

import { DealClient } from "../../types";
import CID from "cids";

const contractAddress = "0xf4E0C74D76Bf324293bB3B3DA184d164d06F7664";

let cid;

const Inputs = () => {
  const [commP, setCommP] = useState(
    "baga6ea4seaqkp2pjlh6avlvee6ib2maanav5sc35l5glf3zm6rd6hmfgcx5xeji"
  );
  const [carLink, setCarLink] = useState(
    "https://data-depot.lighthouse.storage/api/download/download_car?fileId=862fb115-d24a-4ff1-a1c8-eadbbbfd19cf.car"
  );
  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
  const [pieceSize, setPieceSize] = useState("32768");
  const [carSize, setCarSize] = useState("18445");
  const [txSubmitted, setTxSubmitted] = useState("");
  const [dealID, setDealID] = useState("");
  const [proposingDeal, setProposingDeal] = useState(false);
  const [network, setNetwork] = useState("");

  const { account, chainId } = useWallet();
  const { signer } = useSigner();

  const handleChangeCommP = (event) => {
    setCommP(event.target.value);
  };

  const handleChangeCarLink = (event) => {
    setCarLink(event.target.value);
  };

  const handleChangePieceSize = (event) => {
    setPieceSize(event.target.value);
  };

  const handleChangeCarSize = (event) => {
    setCarSize(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(commP);
    console.log(carLink);
    console.log(pieceSize);
    console.log(carSize);

    try {
      setErrorMessageSubmit("");
      cid = new CID(commP);

      if (account && signer) {
        const dealClient: DealClient = new ethers.Contract(
          contractAddress,
          DealClientABI.abi,
          signer
        ) as DealClient;

        const extraParamsV1 = [carLink, carSize, false, false];
        const DealRequestStruct = [
          cid.bytes,
          pieceSize,
          false,
          commP,
          520000,
          1555200,
          0,
          0,
          0,
          1,
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
        setTxSubmitted("Transaction submitted! " + receipt.hash);

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
    return <button onClick={dealIDHandler}>Get deal ID</button>;
  };

  const dealIDHandler = async () => {
    const dealClient: DealClient = new ethers.Contract(
      contractAddress,
      DealClientABI.abi,
      signer
    ) as DealClient;
    setDealID("Waiting for acceptance by SP...");
    cid = new CID(commP);
    var refresh = setInterval(async () => {
      console.log(cid.bytes);
      if (cid === undefined) {
        setDealID("Error: CID not found");
        clearInterval(refresh);
      }
      console.log("Checking for deal ID...");
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
    <div id="container">
      <form className="child-1" onSubmit={handleSubmit}>
        <div className="flex child-1-hg">
          <label>Link to CAR file</label>

          <div>
            " Find a URL to your car file by going to data.fvm.dev and uploading
            your file (site in development). <br /> You can also go to
            tech-greedy/generate-car and upload the resulting car file to
            web3.storage."
          </div>
        </div>

        <input
          className="text-black"
          type="text"
          value={carLink}
          onChange={handleChangeCarLink}
        />

        <br />
        <br />

        <div className="flex">
          <label>commP</label>
          "This is also known as the Piece CID. <br /> You can go to
          data.fvm.dev and get this by uploading your file (site in
          development). <br />
          This also can be accessed as the output of tech-greedy/generate-car."
        </div>

        <input
          className="text-black"
          type="text"
          value={commP}
          onChange={handleChangeCommP}
        />

        <br />
        <br />

        <div className="flex">
          <label>Piece Size:</label>
          "This is the number of bytes of your Piece (you can read more about
          Filecoin Pieces in the spec). <br /> You can go to data.fvm.dev and
          get this by uploading your file (site in development).
          <br /> This also can be accessed as the output of
          tech-greedy/generate-car."
        </div>

        <input
          className="text-black"
          type="text"
          value={pieceSize}
          onChange={handleChangePieceSize}
        />

        <br />
        <br />

        <div className="flex">
          "This is the size of the CAR file in bytes. <br /> You can go to
          data.fvm.dev and get this by uploading your file (site in
          development). <br /> This can be accessed as the output of
          tech-greedy/generate-car."
        </div>

        <input
          className="text-black"
          type="text"
          value={carSize}
          onChange={handleChangeCarSize}
        />

        <br />
        <br />

        <button
          type="submit"
          style={{ display: "block", width: "50%", margin: "auto" }}
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
        <div style={{ display: "flex", width: "50%", margin: "auto" }}>
          {dealIDButton()}
        </div>
      </div>

      {dealID && (
        <div style={{ color: "green", margin: "auto" }}>Deal: {dealID}</div>
      )}
    </div>
  );
};

export default Inputs;

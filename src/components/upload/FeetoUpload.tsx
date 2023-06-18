import React, { useEffect } from "react";
import { useState } from "react";
import SetAllTokenFees from "./setAllTokenFees";
import { BsArrowRight } from "react-icons/bs";
import Fil from "../../assets/tokens/fil.png";

interface FilecoinUploadProps {
  fileSize: any;
}

const FeetoUpload: React.FC<FilecoinUploadProps> = ({ fileSize }) => {
  const [filAmount, setFilAmount] = useState<number>(0);

  const calculateFilAmount = () => {
    // 파일코인 네트워크에서 1기가바이트 데이터를 올릴 때 필요한 FIL 양 계산 로직
    const filPerGigabyte = 0.01; // 1기가바이트당 필요한 FIL 양 (임의의 값)
    const calculatedFilAmount = fileSize * filPerGigabyte;
    setFilAmount(calculatedFilAmount);
  };

  useEffect(() => {
    calculateFilAmount();
  }, [fileSize]);

  return (
    <div className="flex flex-col w-256  justify-between  font-bold p-4 ">
      <div className="flex text-2xl w-[800px] items-center justify-around">
        <div className="">Data size to upload: {fileSize} Gigabytes</div>
        <BsArrowRight style={{ fontSize: "30px" }} />
        <div className="flex">
          Required FIL
          <img
            className="mr-2 ml-2"
            src={Fil}
            alt="fil"
            style={{ width: "30px" }}
          />{" "}
          : {filAmount} FIL
        </div>
      </div>
      <SetAllTokenFees totalFee={filAmount} />
    </div>
  );
};

export default FeetoUpload;

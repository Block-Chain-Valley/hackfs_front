import React, { useEffect } from "react";
import { useState } from "react";

interface FilecoinUploadProps {
  fileSize: string;
}

const FeetoUpload: React.FC<FilecoinUploadProps> = ({ fileSize }) => {
  const [filAmount, setFilAmount] = useState<number>(0);

  const calculateFilAmount = () => {
    // 파일코인 네트워크에서 1기가바이트 데이터를 올릴 때 필요한 FIL 양 계산 로직
    const filPerGigabyte = 0.1; // 1기가바이트당 필요한 FIL 양 (임의의 값)
    const calculatedFilAmount = fileSize * filPerGigabyte;
    setFilAmount(calculatedFilAmount);
  };

  useEffect(() => {
    calculateFilAmount();
  }, [fileSize]);

  return (
    <div className="flex w-256  justify-between  font-bold p-4 ">
      <div className="">업로드할 데이터 크기: {fileSize} 기가바이트</div>

      <p>필요한 FIL 양: {filAmount} FIL</p>
    </div>
  );
};

export default FeetoUpload;

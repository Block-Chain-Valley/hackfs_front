import React, { useState } from "react";
import Loading from "../common/Loading";
import axios from "axios";
import lighthouse from "@lighthouse-web3/sdk";
import { AiOutlineArrowRight } from "react-icons/ai";
import FeetoUpload from "./FeetoUpload";
const FileUploader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [text, setText] = useState("");

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    // const file = event.dataTransfer?.files?.[0];
    const file = event.dataTransfer.files;
    if (file) {
      setUploadedFile(file as any);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const uploadToIpfs = async () => {
    if (!uploadedFile) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          },
        }
      );

      if (response.data.IpfsHash) {
        setIpfsHash(response.data.IpfsHash);
      }
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }

    setLoading(false);
  };

  const uploadToLighthouse = async () => {
    if (!uploadedFile) {
      return;
    }
    setLoading(true);

    const response = await lighthouse.upload(
      uploadedFile,
      import.meta.env.VITE_LH_API_KEY
    );
    if (response.data.Hash) {
      setIpfsHash(response.data.Hash);
      setFileSize(response.data.Size);
    }

    console.log(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <>
        <div className=" text-2xl font-bold mb-8 ">
          파일을 IPFS 에 올리세요 , 영구저장되지않음
        </div>
        <div
          className={`${
            dragging ? "border-blue-400" : "border-blue-200"
          }} w-[800px] p-[200px] border-2 border-dashed rounded-md flex flex-col items-center justify-center`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag and drop a file here</p>
        </div>
      </>

      {uploadedFile ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-xl font-semibold">
            업로드할 파일: {uploadedFile.name}
          </p>
          <img
            className="m-4"
            src={URL.createObjectURL(uploadedFile[0])}
            alt="Uploaded"
            style={{ maxWidth: "300px" }}
          />
          <button
            className="w-[150px] h-[50px] m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
            onClick={uploadToLighthouse}
            disabled={!uploadedFile || loading}
          >
            Upload to IPFS
          </button>
        </div>
      ) : (
        <></>
      )}

      {loading && <Loading />}

      {ipfsHash && (
        <div className="flex items-center justify-center">
          <div>
            <div className="text-xl font-bold m-4">IPFS Hash: {ipfsHash}</div>
            <div className="text-xl font-bold m-4">File Size: {fileSize}</div>
          </div>
          <div>
            <button className="w-[150px] h-[50px] text-xl m-4 border-b-2 border-blue-500 text-white hover:border-blue-600 ">
              <a
                className="flex  items-center justify-center"
                href={`https://ipfs.io/ipfs/${ipfsHash}`}
                target="_blank"
              >
                <AiOutlineArrowRight className="mr-2" /> View on IPFS
              </a>
            </button>
          </div>
        </div>
      )}
      <div className="mt-12 text-3xl  font-extrabold">
        파일코인 네트워크에 영구적으로 저장하고 싶다면 아래 버튼을 눌러주세요
      </div>
      <div>
        {/* 1기가바이트 데이터를 업로드할 때 필요한 FIL 양을 표시 */}
        <FeetoUpload fileSize={fileSize} />
      </div>
    </div>
  );
};

export default FileUploader;

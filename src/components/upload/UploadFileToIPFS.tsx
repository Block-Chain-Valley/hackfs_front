import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import axios from "axios";
import lighthouse from "@lighthouse-web3/sdk";
import { AiOutlineArrowRight } from "react-icons/ai";
import FeetoUpload from "./FeetoUpload";

import { CarWriter } from "@ipld/car/writer";
import { importer } from "ipfs-unixfs-importer";
import browserReadableStreamToIt from "browser-readablestream-to-it";

import Inputs from "../inputCAR/Input";

function CarDownloadLink({
  files,

  children,
  setRootCid,
  rootCid,
  setCar,
}) {
  const [carUrl, setCarUrl] = useState();
  useEffect(async () => {
    if (!files || files.length === 0) return;
    const { root, car } = await createCarBlob(files);
    console.log(car);
    const carFile = new File([car], `${root}.car`, {
      type: "application/car",
    });
    console.log(carFile);
    setCar(carFile);
    if (car) {
      setCarUrl(URL.createObjectURL(car) as any);
      setRootCid(root);
    }
  }, [files]);
  return carUrl ? (
    <a href={carUrl} download={`${rootCid}.car`}>
      {`${rootCid}.car`}
      {children}
    </a>
  ) : null;
}

function FileForm({ files = [], setFiles }) {
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Upload File
      </button>
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        multiple
        onChange={handleFileChange.bind(null, setFiles)}
      />
    </div>
    // <input
    //   className="dn"
    //   type="file"
    //   multiple
    //   onChange={handleFileChange.bind(null, setFiles)}
    // />
  );
}

const handleFileChange = (setFiles, event) => {
  const fileList = event && event.target && event.target.files;
  const files = [];
  for (const file of fileList) {
    files.push(file);
  }
  console.log(files);
  setFiles(files);
};

async function createCarBlob(files) {
  if (!files || !files.length) return;
  if (files.car) return;
  const carParts = [];
  const { root, out } = await fileListToCarIterator(files);
  for await (const chunk of out) {
    carParts.push(chunk);
  }
  const car = new Blob(carParts, {
    type: "application/car",
  });
  return { root, car };
}

class MapBlockStore {
  store: Map<any, any>;
  constructor() {
    this.store = new Map();
  }
  *blocks() {
    for (const [cid, bytes] of this.store.entries()) {
      yield { cid, bytes };
    }
  }
  put({ cid, bytes }) {
    return Promise.resolve(this.store.set(cid, bytes));
  }
  get(cid) {
    return Promise.resolve(this.store.get(cid));
  }
}

export async function fileListToCarIterator(
  fileList,
  blockApi = new MapBlockStore()
) {
  const fileEntries = [];
  for (const file of fileList) {
    fileEntries.push({
      path: file.name,
      content: browserReadableStreamToIt(file.stream()),
    });
  }

  const options = {
    cidVersion: 1,
    wrapWithDirectory: true,
    rawLeaves: true,
  };
  const unixFsEntries = [];
  for await (const entry of importer(
    fileEntries,
    blockApi as any,
    options as any
  )) {
    unixFsEntries.push(entry);
  }

  const root = unixFsEntries[unixFsEntries.length - 1].cid;
  const { writer, out } = CarWriter.create(root);
  for (const block of blockApi.blocks()) {
    writer.put(block);
  }
  writer.close();
  console.log(root.toString());
  return { root, out };
}

const FileUploader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [carLink, setCarLink] = useState("");
  const [carSize, setCarSize] = useState("");

  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [text, setText] = useState("");

  const [files, setFiles] = useState([]);
  const [rootCid, setRootCid] = useState<any>();
  const [car, setCar] = useState();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files);
      setUploadedFile(event.target.files[0] as any);
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

  function onFileInput(setFiles, evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const fileList = evt && evt.target && evt.target.files;
    const files = [];
    for (const file of fileList) {
      files.push(file);
    }
    console.log("adding", files);
    setFiles(files);
  }

  const uploadToLighthouse = async () => {
    if (!files) {
      return;
    }

    try {
      setLoading(true);

      console.log(files);

      const response = await lighthouse.upload(
        files,
        import.meta.env.VITE_LH_API_KEY
      );
      if (response.data.Hash) {
        setIpfsHash(response.data.Hash);
        setFileSize(response.data.Size);
      }

      const responseCar = await lighthouse.upload(
        [car],
        import.meta.env.VITE_LH_API_KEY
      );
      if (responseCar.data.Hash) {
      }
      setCarLink(
        "https://gateway.lighthouse.storage/ipfs/" + responseCar.data.Hash
      );
      setCarSize(responseCar.data.Size);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <>
        <div className=" text-2xl font-bold mb-8 ">
          파일을 IPFS 에 올리세요 , 영구저장되지않음
        </div>
        {/* <div
          className={`${
            dragging ? "border-blue-400" : "border-blue-200"
          }} w-[800px] p-[200px] border-2 border-dashed rounded-md flex flex-col items-center justify-center`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag and drop a file here</p>
        </div> */}

        {/* <input type="file" onChange={handleFileChange} /> */}

        <div>
          <div className="mw6 center mt4">
            {files && files.length ? (
              <></>
            ) : (
              <FileForm files={files} setFiles={setFiles} />
            )}

            {/* {files.length ? (
              <div className="flex flex-wrap justify-center">
                {files.map((file, i) => (
                  <div className="mw4 pa2" key={i}>
                    <div className="bg-light-gray black pa2">
                      <div className="flex justify-between">
                        <div className="flex-auto">
                          <div className="fw6">{file.name}</div>
                          <div className="f7">{file.type}</div>
                        </div>
                        <div className="flex-none">
                          <div className="f6">{file.size} bytes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null} */}
          </div>
          {files && files.length ? (
            <div className=" hidden">
              <div>
                <div className="mw6 center tl bg-light-gray black pt2 pb3 ph3 fw4 f7 overflow-y-scroll">
                  <label className="db">
                    <a>
                      IPFS <abbr title="Content ID aka the IPFS HASH">CID</abbr>
                    </a>
                  </label>
                  <code>{rootCid ? rootCid.toString() : "..."}</code>
                </div>

                <CarDownloadLink
                  files={files}
                  rootCid={rootCid}
                  setRootCid={setRootCid}
                  setCar={setCar}
                >
                  Download .car file
                </CarDownloadLink>
              </div>
            </div>
          ) : null}
        </div>
      </>
      {files && files.length > 0 && (
        <>
          <img
            className="m-4"
            src={URL.createObjectURL(files[0])}
            alt="Uploaded"
            style={{ width: "800px" }}
          />
          <button
            className="font-bold w-[150px] h-[50px] m-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
            onClick={uploadToLighthouse}
            disabled={loading}
          >
            Upload to IPFS
          </button>
        </>
      )}

      {uploadedFile ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-xl font-semibold">
            업로드할 파일: {uploadedFile.name}
          </p>
          <img
            className="m-4"
            src={URL.createObjectURL(files[0])}
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
            <div className="text-xl font-bold m-4">CAR Link: {carLink}</div>
            <div className="text-xl font-bold m-4">CAR Size: {carSize}</div>
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
      {ipfsHash && (
        <>
          <div className="mt-12 text-3xl  font-extrabold">
            파일코인 네트워크에 영구적으로 저장하고 싶다면 아래 버튼을
            눌러주세요
          </div>
          <div>
            {/* 1기가바이트 데이터를 업로드할 때 필요한 FIL 양을 표시 */}
            <FeetoUpload fileSize={fileSize} />
          </div>

          <Inputs
            carLink={carLink}
            ipfsHash={ipfsHash}
            fileSize={fileSize}
            carSize={carSize}
          />
        </>
      )}
    </div>
  );
};

export default FileUploader;

import lighthouse from "@lighthouse-web3/sdk";

import UploadFileToIPFS from "../components/upload/UploadFileToIPFS";
interface ProgressData {
  total: number;
  uploaded: number;
}

function Upload() {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <UploadFileToIPFS />
    </div>
  );
}

export default Upload;

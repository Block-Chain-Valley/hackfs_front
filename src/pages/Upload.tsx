import Inputs from "../components/inputCAR/Input";
import UploadFileToIPFS from "../components/upload/UploadFileToIPFS";

interface ProgressData {
  total: number;
  uploaded: number;
}

function Upload() {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <UploadFileToIPFS />
      <Inputs />
    </div>
  );
}

export default Upload;

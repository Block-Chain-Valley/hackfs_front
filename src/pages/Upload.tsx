import lighthouse from "@lighthouse-web3/sdk";
import HandleFile from "../components/upload/HandleFile";
interface ProgressData {
  total: number;
  uploaded: number;
}

function Upload() {
  const handleFileUpload = (file: File) => {
    // Handle the file upload logic here
    console.log("Uploaded file:", file);
  };

  const progressCallback = (progressData: ProgressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    const output = await lighthouse.upload(
      file,
      import.meta.env.VITE_LH_API_KEY,
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* <input onChange={(e) => uploadFile(e.target.files)} type="file" /> */}
      <HandleFile onFileUpload={handleFileUpload} />
    </div>
  );
}

export default Upload;

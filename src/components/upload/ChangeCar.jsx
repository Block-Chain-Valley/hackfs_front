import { useState, useEffect } from "react";
import { CarWriter } from "@ipld/car/writer";
import { importer } from "ipfs-unixfs-importer";
import browserReadableStreamToIt from "browser-readablestream-to-it";

const ChangeCar = ({ uploadedFile }) => {
  const [files, setFiles] = useState([]);
  const [rootCid, setRootCid] = useState();
  return (
    <div>
      <div className="mw6 center mt4">
        <FileForm files={files} setFiles={setFiles} />
        {files.length ? (
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
        ) : null}
      </div>
      {files && files.length ? (
        <div>
          <div className="mw6 center tl bg-light-gray black pt2 pb3 ph3 fw4 f7 overflow-y-scroll">
            <label className="db">
              <a
                className="ttu blue fw6 link"
                herf="https://docs.ipfs.io/concepts/content-addressing/"
              >
                IPFS <abbr title="Content ID aka the IPFS HASH">CID</abbr>
              </a>
            </label>
            <code>{rootCid ? rootCid.toString() : "..."}</code>
          </div>
          <CarDownloadLink
            files={files}
            rootCid={rootCid}
            setRootCid={setRootCid}
          >
            Download .car file
          </CarDownloadLink>
        </div>
      ) : null}
    </div>
  );
};

function CarDownloadLink({
  files,

  children,
  setRootCid,
  rootCid,
}) {
  const [carUrl, setCarUrl] = useState();
  useEffect(async () => {
    if (!files || files.length === 0) return;
    const { root, car } = await createCarBlob(files);
    console.log(car);
    if (car) {
      setCarUrl(URL.createObjectURL(car));
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
  return (
    <input
      className="dn"
      type="file"
      multiple
      onChange={handleFileChange.bind(null, setFiles)}
    />
  );
}

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
  for await (const entry of importer(fileEntries, blockApi, options)) {
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

export default ChangeCar;

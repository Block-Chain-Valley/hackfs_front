import browserReadableStreamToIt from "browser-readablestream-to-it";
import { CarWriter } from "@ipld/car/writer";
import { importer } from "ipfs-unixfs-importer";

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
  uploadFile,
  blockApi = new MapBlockStore()
) {
  const fileEntries = [];

  const blob = new Blob([uploadFile], { type: "text/plain" });

  fileEntries.push({
    path: blob.name,
    content: browserReadableStreamToIt(blob.stream()),
  });

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

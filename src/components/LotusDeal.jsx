import React, { useEffect } from "react";
import {
  HttpJsonRpcConnector,
  LotusClient,
  LotusWalletProvider,
} from "filecoin.js";

const MyComponent = () => {
  useEffect(() => {
    const storeFile = async () => {
      try {
        // 1. import data to lotus
        // 2. query storage provider's offer for storing this file
        // 3. start storage deal with SP
      } catch (error) {
        console.log(error);
      }
    };

    storeFile();
  }, []);

  return <div>React 애플리케이션 내에서 Filecoin.js 실행 예제</div>;
};

export default MyComponent;

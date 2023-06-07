import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { RecoilRoot } from "recoil";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

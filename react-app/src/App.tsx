import "./App.css";
import { useState } from "react";
import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork";
import { CHAIN_CONFIG_TYPE } from "./config/chainConfig";
import styles from "./styles/Home.module.css";
import { Web3AuthProvider } from "./services/web3auth";
import Navigation from "./components/Navigation";
function App() {
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("mainnet");

  return (
    <div className={styles.container}>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <Navigation setNetwork={setWeb3AuthNetwork} setChain={setChain}/>
      </Web3AuthProvider>
    </div>
  );
}

export default App;

import { Web3AuthContext } from "../services/web3auth";
import Setting from "./Setting";
import Main from "./Main";
import Init from "./Init";
import Verify from "./Verify";
import "../App.css"
import Google from "./Google";
import HomePage from "./HomePage";
import {
 BrowserRouter as Router,
 Routes,
 Route,
} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import {  WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";

interface IProps {
  setNetwork: (network: WEB3AUTH_NETWORK_TYPE) => void;
  setChain: (chain: CHAIN_CONFIG_TYPE) => void;
}
function Navigation ({ setNetwork, setChain }: IProps){
  const { provider } = useContext(Web3AuthContext);
    const [account, setAccount] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(provider !== null)
    useEffect( ()=> {
      const fetchData = async () => {
        setIsLoggedIn(provider !== null || (localStorage.getItem("account") != null && localStorage.getItem("account")!.length !== 0));
        if(isLoggedIn){
          let temp = await provider!.getAccounts()
          if(temp &&(temp as string[]).length !== 0){
            localStorage.setItem("account", ( temp as string[])[0])
            setAccount(( temp as string[])[0])
          }
        }
      }
      fetchData()
        .catch(console.error);
    }, [provider, isLoggedIn])
 
 return (
   <Router>
     <div className="App">
       <Routes>
         <Route path="/init" element={isLoggedIn? <Init acc={account}/>:<Setting  setNetwork={setNetwork} setChain={setChain}/> } />
         <Route path="/verify" element={isLoggedIn? <Verify acc={account}/>:<Setting  setNetwork={setNetwork} setChain={setChain}/> } />
         <Route path="/google" element={<Google/>} />
         <Route path="/" element={<HomePage/>} />
         <Route path="/main" element={isLoggedIn? <Main/>: <Setting  setNetwork={setNetwork} setChain={setChain}/>} />
         <Route path="/login" element={<Setting  setNetwork={setNetwork} setChain={setChain}/>} />
         {/* <Route path="/qrcode" element={isLoggedIn? <QrCode/>: <Setting  setNetwork={setNetwork} setChain={setChain}/>} /> */}
       </Routes>
     </div>
   </Router>
 );
}
 
export default Navigation;
 


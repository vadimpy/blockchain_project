import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "../services/web3auth";
import styles from "../styles/Home.module.css";
import {Link} from "react-router-dom"
import "../App.css"
const Main = () => {
  const { logout, getUserInfo, getAccounts, getBalance} = useWeb3Auth();

  const loggedInView = (
    <>
      <button onClick={getUserInfo} className={styles.card}>
        Get User Info
      </button>
      <button onClick={getAccounts} className={styles.card}>
        Get Accounts
      </button>
      <button onClick={getBalance} className={styles.card}>
        Get Balance
      </button>
      <button className={styles.card}>
        <Link to="/init" style={{textDecoration: "none"}}>
            Initialize new SOO 
        </Link>
      </button>
      <button className={styles.card}>
        <Link to="/" style={{textDecoration: "none"}}>
            Home page 
        </Link>
      </button>
      <button onClick={logout} className={styles.card}>
        Log Out
      </button>

      <div className={styles.console} id="console">
        <p className={styles.code}></p>
      </div>
    </>
  );

  return <div className={styles.grid}>{loggedInView}</div>;
};

export default Main;

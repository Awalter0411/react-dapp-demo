import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { abi as ContractAbi } from "../contract/Counter.json";
import ContractAddress from "../contract/Token.json";
import styles from "./assets/styles/App.module.css";
import ReactLogo from "./assets/images/react.svg";

const App = () => {
  const [address, setAddress] = useState("");
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const addr = localStorage.getItem("address");
    if (addr) {
      getCounter();
      setAddress(() => addr);
    }
  }, [address]);

  async function connectWallet() {
    const { ethereum } = window;
    if (ethereum === void 0) {
      alert("please enter install MetaMask browser extension");
    } else {
      setIsLoading(() => true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const [address] = await provider.send("eth_requestAccounts", []);
        setAddress(() => address);
        localStorage.setItem("address", address);
      } catch (err) {
        alert("cancel connect wallet");
      }
      setIsLoading(() => false);
    }
  }

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ContractCounter = new ethers.Contract(
      ContractAddress.Token,
      ContractAbi,
      signer
    );
    return ContractCounter;
  };

  const addCounter = async () => {
    setIsLoading(() => true);
    try {
      const ContractCounter = getContract();
      const tx = await ContractCounter.addCounter();
      await tx.wait();
      await getCounter();
    } catch (err) {
      alert("you reject a transaction");
    }
    setIsLoading(() => false);
  };

  const getCounter = async () => {
    setIsLoading(() => true);
    const ContractCounter = getContract();
    const result = await ContractCounter.getCounter();
    setCounter(() => result.toNumber());
    setIsLoading(() => false);
  };

  return (
    <div className={styles.container}>
      <img src={ReactLogo} alt="" className={styles.logo} />
      {isLoading ? (
        <div>loading...</div>
      ) : address ? (
        <div className={styles.content}>
          <div>the counter is: {counter}</div>
          <button onClick={addCounter} className={styles.button}>
            add
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          <div>please connect MetaMask wallet</div>
          <button onClick={connectWallet} className={styles.button}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

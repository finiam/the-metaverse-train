import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { utils } from "ethers";

import MetaverseTrainContract, {
  buildMetaverseTrainContract,
} from "../blockchain/greeterContract";
import initializeBlockchain from "../blockchain/initializeBlockchain";

function Home() {
  const [currentAccount, setCurrentAccount] =
    (useState < string) | (null > null);
  const [provider, setProvider] = useState < any > null;
  const [MetaverseTrainContract, setTokenContract] =
    (useState < MetaverseTrainContract) | (null > null);
  const [balance, setBalance] = useState < string > "";

  useEffect(() => {
    initializeBlockchain().then(({ provider, currentAccount }) => {
      setCurrentAccount(currentAccount);
      setProvider(provider);
    });
  }, []);

  useEffect(() => {
    if (provider && currentAccount) {
      setMetaverseTrainContract(buildGreeterContract(provider, currentAccount));
    }
  }, [provider, currentAccount]);

  const isConnected = MetaverseTrainContract;

  if (isConnected) {
    MetaverseTrainContract.ChooChoo().then(() =>
      console.log("CHOOOO CHOOOO !!!")
    );
  }

  return (
    <div>
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          {currentAccount ? <p>My account Address: {currentAccount}</p> : null}
        </nav>
      </header>

      <main>
        <h1>Welcome to our Starter</h1>

        {isConnected && (
          <section>
            <p>My balance {balance}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;

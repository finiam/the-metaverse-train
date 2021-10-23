import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { utils } from "ethers";
import dynamic from "next/dynamic";
import initializeBlockchain from "../blockchain/initializeBlockchain";
import MetaverseTrainContract, {
  buildMetaverseTrainContract,
} from "../blockchain/metaverseTrainContract";

const ThreeApp = dynamic(() => import("../components/ThreeApp"), {
  ssr: false,
});

function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [MetaverseTrainContract, setMetaverseTrainContract] = useState(null);

  useEffect(() => {
    initializeBlockchain().then(({ provider, currentAccount }) => {
      setCurrentAccount(currentAccount);
      setProvider(provider);
    });
  }, []);

  useEffect(() => {
    if (provider && currentAccount) {
      setMetaverseTrainContract(
        buildMetaverseTrainContract(provider, currentAccount)
      );
    }
  }, [provider, currentAccount]);

  const isConnected = MetaverseTrainContract;

  const chooChoo = () => {
    MetaverseTrainContract.chooChoo();
  };

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Train to Metaverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>
        {`
          body,
          html,
          #__next {
            margin: 0;
          }
        `}
      </style>

      <main>
        <ThreeApp />
        {isConnected && (
          <div>
            <button
              onClick={() => chooChoo()}
              style={{
                position: "absolute",
                width: "100px",
                height: "50px",

                top: "0",
              }}
            >
              CHUU CHUU
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;

import Head from "next/head";

import Link from "next/link";
import { useState, useEffect } from "react";
import { utils } from "ethers";
import dynamic from "next/dynamic";
import initializeBlockchain from "../blockchain/initializeBlockchain";
import MetaverseTrainContract, {
  buildMetaverseTrainContract,
} from "../blockchain/metaverseTrainContract";
import horn from "../assets/horn.mp3";
import { client } from "./api/apollo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const ThreeApp = dynamic(() => import("../components/ThreeApp"), {
  ssr: false,
});

function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [MetaverseTrainContract, setMetaverseTrainContract] = useState(null);
  const [moving, setMoving] = useState(true);
  const [choices, setChoices] = useState();

  const [choos, setChoos] = useState(0);

  useEffect(() => {
    const doit = async () => {
      if (MetaverseTrainContract) {
        const val = await client.query({
          query: gql`
            {
              choos {
                id
              }
            }
          `,
        });
        const choosList = val.data.choos;
        if (choosList.length != choos) {
          console.log("ADDED")
          setChoos(choosList.length);
        }
      }
    };
    doit();
  });

  useEffect(() => {
    const doit = async () => {
      if (MetaverseTrainContract) {
        const v = await MetaverseTrainContract.voteId();
        const val = await client.query({
          query: gql`
            {
              choos(first: 5) {
                id
              }
              voteCounters(first: 5) {
                id
                left
                right
                leftDestination
              }
            }
          `,
        });
        const counters = val.data.voteCounters;
        const choos = val.data.choos;
        setChoices(counters);
      }
    };
    doit();
  }, [MetaverseTrainContract]);

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
    <div className="w-screen h-screen static">
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
        {!moving && (
          <h1
            style={{
              position: "absolute",
              top: "40%",
              left: "10%",
              zIndex: "1000",
              fontFamily: "helvetica",
              fontSize: "60pt",
              fontStyle: "italic",
              color: "white",
              textShadow: "-4px 4px #333333",
            }}
          >
            {" "}
            LISBON{" "}
          </h1>
        )}
        <ThreeApp moving={moving} choos={choos} />

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
            {/* <button
              onClick={() => setMoving((prev) => !prev)}
              style={{
                position: "absolute",
                width: "100px",
                height: "50px",

                top: "0",
                left: "100px"
              }}
            >
              MOVE
            </button> */}
            {/* {choices && moving && (
              <div>
                <button
                  onClick={() => MetaverseTrainContract.vote(0)}
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "30%",
                    zIndex: "1000",
                    fontFamily: "helvetica",
                    fontSize: "60pt",
                    fontStyle: "italic",
                    color: "white",
                    textShadow: "-4px 4px #333333",
                  }}
                >
                  {choices.leftDestination}
                </button>
                <button
                  onClick={() => MetaverseTrainContract.vote(1)}
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "70%",
                    zIndex: "1000",
                    fontFamily: "helvetica",
                    fontSize: "60pt",
                    fontStyle: "italic",
                    color: "white",
                    textShadow: "-4px 4px #333333",
                  }}
                >
                  {choices.rightDestination}
                </button>
              </div>
            )} */}
          </div>
        )}
        <audio id="audio" controls style={{ display: "none" }}>
          <source src={horn} type="audio/mpeg" />
        </audio>
      </main>
    </div>
  );
}

export default Home;

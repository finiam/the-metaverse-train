import Head from "next/head";
import ThreeApp from "../components/ThreeApp";

function Home() {
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
      </main>
    </div>
  );
}

export default Home;

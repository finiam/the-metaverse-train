import Head from "next/head";
import dynamic from "next/dynamic";
import horn from "../assets/horn.mp3";

const ThreeApp = dynamic(() => import("../components/ThreeApp"), {
  ssr: false,
});

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
        <audio id="audio" controls style={{ display: "none" }}>
          <source src={horn} type="audio/mpeg" />
        </audio>
      </main>
    </div>
  );
}

export default Home;

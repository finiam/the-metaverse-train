import { Canvas } from "@react-three/fiber";
import Lighting from "./Lighting";
import Train from "./Train";
import SkyBox from "./Skybox";
import Field from "./Field";
import CameraControls from "./CameraControls";
import { useEffect, useState } from "react";

const ThreeApp = () => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div>
      {isMounted && (
        <Canvas
          style={{ width: "100vw", height: "100vh" }}
          shadows
          camera={{ position: [0, -60, 60], far: 5000 }}
          id="three-canvas"
        >
          <SkyBox />
          <Lighting />
          <Train />
          <Field />
          <CameraControls />
        </Canvas>
      )}
    </div>
  );
};

export default ThreeApp;

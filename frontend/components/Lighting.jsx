import React from "react";

const size = 500;

const Lighting = () => {
  return (
    <group>
      <hemisphereLight args={["#b1e1ff", "#b97a20", 0.3]} />
      <directionalLight
        args={["#ffffff", 1.0]}
        castShadow
        position={[100, 100, 200]}
        shadow-camera-left={-size}
        shadow-camera-right={size}
        shadow-camera-top={size}
        shadow-camera-bottom={-size}
        shadow-camera-near={0.5}
        shadow-camera-far={size}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
};

export default Lighting;

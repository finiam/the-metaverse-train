import * as THREE from "three";

const SkyBox = () => {
  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1000, 1000, 1000]}
    >
      <sphereGeometry attach="geometry" args={[3, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        color="#67afdb"
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default SkyBox;

import lisbonAsset from "../assets/lisbon.stl";
import useAsset from "../hooks/useAsset";

const City = ({ name }) => {
  const asset = useAsset(lisbonAsset);

  console.log(asset);

  if (!asset) return <></>;

  return (
    <group>
      <mesh
        visible
        castShadow
        receiveShadow
        scale={[0.7, 0.7, 0.7]}
        rotation={[0, 0, Math.PI*0.7]}
        position={[40, 20, 0]}
      >
        <primitive attach="geometry" object={asset} />
        <meshPhongMaterial attach="material" color="white" />
      </mesh>
    </group>
  );
};

export default City;

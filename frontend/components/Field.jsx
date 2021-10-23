import tree from "../assets/tree.stl";
import useAsset from "../hooks/useAsset";
import { useEffect, useState } from "react";
import Tree from "./Tree";
import TrainTracks from "./TrainTracks";
import * as THREE from "three";
import Tunnel from "./Tunnel";
import City from "./City";
import Train from "./Train";

const Field = ({ location = "trees" }) => {
  const treeAsset1 = useAsset(tree);
  const [treeAsset2, setTreeAsset2] = useState();
  const [treeAsset3, setTreeAsset3] = useState();

  useEffect(() => {
    if (treeAsset1) {
      setTreeAsset2(treeAsset1.clone());
      setTreeAsset3(treeAsset1.clone());
    }
  }, [treeAsset1]);

  return (
    <group>
      {location == "trees" && (
        <group>
          {treeAsset1 && <Tree asset={treeAsset1} offset={0.2} left />}
          {treeAsset2 && <Tree asset={treeAsset2} offset={0.5} left />}
          {treeAsset3 && <Tree asset={treeAsset3} offset={0.9} />}
          {treeAsset3 && <Tree asset={treeAsset3} offset={0.4} />}
        </group>
      )}
      {location == "tunnel" && <Tunnel />}
      {location == "city" && <City name="lisbon" />}
      <Train moving={location !== "city"} />
      <TrainTracks moving={location !== "city"}/>
      <mesh visible position={[0, 100, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[100, 200]} />
        <meshBasicMaterial attach="material" color="#67afdb" />
      </mesh>
      <mesh visible receiveShadow>
        <planeBufferGeometry attach="geometry" args={[8000, 200]} />
        <meshStandardMaterial attach="material" color="#638241" />
      </mesh>
    </group>
  );
};

export default Field;

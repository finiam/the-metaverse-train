import useAsset from "../hooks/useAsset";
import track from "../assets/track.stl";
import { useEffect, useState } from "react";
import Track from "./Track";

const TrainTracks = () => {
  const asset = useAsset(track);
  const [asset1, setAsset1] = useState();
  const [asset2, setAsset2] = useState();
  const [asset3, setAsset3] = useState();

  useEffect(() => {
    if (asset) {
      setAsset1(asset.clone());
      setAsset2(asset.clone());
      setAsset3(asset.clone());
    }
  }, [asset]);

  if (!asset) {
    return <></>;
  }

  return (
    <group>
      <Track asset={asset} offset={0} color="#5e5027"/>
      <Track asset={asset1} offset={222} color="#5e5027"/>
    </group>
  );
};

export default TrainTracks;

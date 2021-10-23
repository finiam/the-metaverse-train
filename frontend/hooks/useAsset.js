import { useEffect, useState } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { asyncLoad } from "../utils";

const useAsset = (assetFile) => {
  const [asset, setAsset] = useState();
  useEffect(() => {
    const load = async () => {
      const loader = new STLLoader();
      try {
        setAsset(await asyncLoad(loader, assetFile));
      } catch (e) {
        console.error("Failed asset load.");
      }
    };
    load();
  }, [assetFile]);

  return asset;
};

export default useAsset;

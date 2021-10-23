import { animated, useSpring } from "@react-spring/three";
import { memo } from "react";
import useAsset from "../hooks/useAsset";
import train from "../assets/train.stl";

const Train = () => {
  const asset = useAsset(train);

  const positionSpring = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, 1] },
    loop: { reverse: true },
    config: {
      duration: 120,
      mass: 10,
      tension: 1000,
      friction: 300,
    },
  });

  if (!asset) return <>Error</>;

  return (
    <animated.group>
      {/* @ts-ignore */}
      <animated.mesh
        visible
        castShadow
        receiveShadow
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, 0, 3.14]}
        {...positionSpring}
      >
        <animated.primitive attach="geometry" object={asset} />
        <animated.meshPhongMaterial attach="material" color={"#333333"} />
      </animated.mesh>
    </animated.group>
  );
};

export default memo(Train);

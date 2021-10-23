import { animated, useSpring } from "@react-spring/three";
import { memo, useEffect, useState } from "react";
import useAsset from "../hooks/useAsset";
import train from "../assets/train.stl";
import smoke from "../assets/smoke.stl";

const Train = ({moving}) => {
  const asset = useAsset(train);
  const smokeAsset = useAsset(smoke);
  const [showSmoke, setShowSmoke] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.key == " ") {
        setShowSmoke(true);
        document.getElementById("audio").play();
        api.start(smokeOptions);
      }
    });
  }, []);

  const smokeOptions = {
    from: { position: [0, 13, 35], opacity: 0.0 },
    to: { position: [0, 13, 45], opacity: 0.7 },

    onChange: {
      position: (value) => {
        value[2] == 45 ? api.set({ opacity: 0 }) : null;
      },
    },
    loop: { reverse: true },
    config: {
      duration: 3000,
      mass: 10,
      tension: 1000,
      friction: 300,
    },
  };

  const positionSpring = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, 2] },
    loop: moving ? { reverse: true } : false,
    config: {
      duration: 200,
      mass: 10,
      tension: 1000,
      friction: 300,
    },
  });

  const [smokeSpring, api] = useSpring(smokeOptions, []);

  if (!asset) return <>Error</>;

  return (
    <animated.group>
      <animated.mesh
        visible
        receiveShadow
        scale={[1, 1, 1]}
        rotation={[0, Math.PI, Math.PI / 2]}
        {...smokeSpring}
      >
        <animated.primitive attach="geometry" object={smokeAsset} />
        <animated.meshPhongMaterial
          transparent
          attach="material"
          color={"#999999"}
          {...smokeSpring}
        />
      </animated.mesh>
      {/* @ts-ignore */}
      <animated.mesh
        visible
        castShadow
        receiveShadow
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, 0, Math.PI]}
        {...positionSpring}
      >
        <animated.primitive attach="geometry" object={asset} />
        <animated.meshPhongMaterial attach="material" color={"#333333"} />
      </animated.mesh>
    </animated.group>
  );
};

export default memo(Train);

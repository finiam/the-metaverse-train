import { animated, useSpring } from "@react-spring/three";
import { memo, useEffect } from "react";
import useAsset from "../hooks/useAsset";
import train from "../assets/train.stl";
import smoke from "../assets/smoke.stl";
import horn from "../assets/horn.mp3";

const Train = () => {
  const asset = useAsset(train);
  const smokeAsset = useAsset(smoke);

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.key == "Space") {
        document.getElementById("audio").play();
        api.start();
      }
    });
  }, []);

  const positionSpring = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, 2] },
    loop: { reverse: true },
    config: {
      duration: 200,
      mass: 10,
      tension: 1000,
      friction: 300,
    },
  });

  const [smokeSpring, api] = useSpring(
    {
      from: { position: [0, 13, 35], opacity: 0.0 },
      to: { position: [0, 13, 45], opacity: 0.7 },
      loop: { reverse: true },
      config: {
        duration: 3000,
        mass: 10,
        tension: 1000,
        friction: 300,
      },
    },
    []
  );

  if (!asset) return <>Error</>;

  return (
    <animated.group>
      {/* <audio id="audio" controls style="display:none">
        <source src={horn} type="audio/mpeg" />
      </audio> */}
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

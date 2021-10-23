import { animated, useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";

const Tree = ({ asset, offset, left }) => {
  const multiplier = left ? -1 : 1;
  const [horizontalPos, setHorizontalPos] = useState(
    Math.random() * 100 * multiplier + 30 * multiplier
  );

  const positionSpring = useSpring({
    from: { position: [horizontalPos, 100, 0], scale: [0, 0, 0] },
    to: { position: [horizontalPos, -100, 0], scale: [0.2, 0.2, 0.2] },
    loop: true,
    delay: offset * 3000,
    config: {
      duration: 4000,
      mass: 10,
      tension: 1000,
      friction: 300,
    },
    onStart: {
      position: () => {
        api.start({
          scale: [0.2, 0.2, 0.2],
        });
      },
    },
    onChange: {
      position: (value) => {
        if (value[1] == 100) {
          api.set({
            scale: [0, 0, 0],
          });
          setHorizontalPos(Math.random() * 100 * multiplier + 30 * multiplier);
        }
      },
    },
  });

  const [scaleSpring, api] = useSpring(
    {
      scale: [0, 0, 0],
      config: {
        reset: true,
        duration: 1000,
        mass: 10,
        tension: 1000,
        friction: 300,
      },
    },
    []
  );

  if (!asset) return <></>;

  return (
    <animated.mesh
      visible
      castShadow
      receiveShadow
      scale={[0.2, 0.2, 0.2]}
      rotation={[0, 0, 3.14]}
      {...positionSpring}
      {...scaleSpring}
    >
      <animated.primitive attach="geometry" object={asset} />
      <animated.meshPhongMaterial attach="material" color="#638241" />
    </animated.mesh>
  );
};

export default Tree;

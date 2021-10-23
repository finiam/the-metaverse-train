import { animated, useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";

const Track = ({ asset, offset, color, moving }) => {
  const positionSpring = useSpring({
    from: { position: [27, 40 + offset, 0] },
    to: { position: [27, -150 + offset, 0] },
    config: {
      duration: 4000,
    },
    loop: true,
  });

  if (!asset) {
    return <></>;
  }

  return (
    <animated.group
      position={moving ? positionSpring.position : [27, 40 + offset, 0]}
    >
      <animated.mesh
        visible
        castShadow
        receiveShadow
        scale={[0.25, 0.25, 0.25]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <animated.primitive attach="geometry" object={asset} />
        <animated.meshPhongMaterial attach="material" color={color} />
      </animated.mesh>
      <animated.mesh
        visible
        castShadow
        receiveShadow
        scale={[0.25, 0.25, 0.25]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, -55, 0]}
      >
        <animated.primitive attach="geometry" object={asset} />
        <animated.meshPhongMaterial attach="material" color={color} />
      </animated.mesh>
      <animated.mesh
        visible
        castShadow
        receiveShadow
        scale={[0.25, 0.25, 0.25]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, -110, 0]}
      >
        <animated.primitive attach="geometry" object={asset} />
        <animated.meshPhongMaterial attach="material" color={color} />
      </animated.mesh>
      <animated.mesh
        visible
        castShadow
        receiveShadow
        scale={[0.25, 0.25, 0.25]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, -165, 0]}
      >
        <animated.primitive attach="geometry" object={asset} />
        <animated.meshPhongMaterial attach="material" color={color} />
      </animated.mesh>
    </animated.group>
  );
};

export default Track;

// components/PhoenixModel.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function PhoenixModel({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: Props) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/phoenix/scene.gltf');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action?.reset().play();
      });
    }
  }, [actions]);


  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={group} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import SmolModel from './components/smol';

export default function SmolPage() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <SmolModel scale={0.01} />
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

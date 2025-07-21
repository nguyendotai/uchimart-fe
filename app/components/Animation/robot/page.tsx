// app/phoenix/page.tsx hoặc component khác
'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import PhoenixModel from './components/robot';

export default function PhoenixPage() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <PhoenixModel scale={0.01} />
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

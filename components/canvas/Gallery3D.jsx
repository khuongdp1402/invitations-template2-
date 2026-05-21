"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, Image as DreiImage } from '@react-three/drei';

function Images() {
  return (
    <>
      <DreiImage position={[-2, 0, 0]} scale={[3, 4]} url="https://www.tierra.vn/wp-content/uploads/2025/08/cac-concept-chup-anh-cuoi-studio-835x1024.jpg" />
      <DreiImage position={[2, -1, 1]} scale={[3, 4]} url="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[-1.5, -4, 0]} scale={[3, 4]} url="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[1.5, -6, 2]} scale={[3, 4]} url="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[-2, -8, -1]} scale={[3, 4]} url="https://images.unsplash.com/photo-1520854221256-17456bf1500f?q=80&w=600&auto=format&fit=crop" />
    </>
  );
}

export default function Gallery3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1} />
      <ScrollControls pages={3} damping={0.2}>
        <Scroll>
          <Images />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}

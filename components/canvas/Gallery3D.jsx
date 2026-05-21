"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, Image as DreiImage } from '@react-three/drei';

function Images() {
  return (
    <>
      <DreiImage position={[-2, 0, 0]} scale={[3, 4]} url="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[2, -1, 1]} scale={[3, 4]} url="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[-1.5, -4, 0]} scale={[3, 4]} url="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[1.5, -6, 2]} scale={[3, 4]} url="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" />
      <DreiImage position={[-2, -8, -1]} scale={[3, 4]} url="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop" />
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

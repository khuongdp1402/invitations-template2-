"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

function Gallery() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Smooth rotation based on mouse pointer
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.pointer.x * Math.PI) / 8, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.pointer.y * Math.PI) / 16, 0.05);
    // Slight floating bounce
    group.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Center Image */}
      <DreiImage position={[0, 0, 1.5]} scale={[3, 4]} url="/test-image.jpg" />
      {/* Left Image */}
      <DreiImage position={[-3.5, 0, 0.5]} rotation={[0, Math.PI / 12, 0]} scale={[3, 4]} url="/test-image.jpg" />
      {/* Right Image */}
      <DreiImage position={[3.5, 0, 0.5]} rotation={[0, -Math.PI / 12, 0]} scale={[3, 4]} url="/test-image.jpg" />
      {/* Far Left */}
      <DreiImage position={[-7, 0, -1]} rotation={[0, Math.PI / 6, 0]} scale={[3, 4]} url="/test-image.jpg" />
      {/* Far Right */}
      <DreiImage position={[7, 0, -1]} rotation={[0, -Math.PI / 6, 0]} scale={[3, 4]} url="/test-image.jpg" />
    </group>
  );
}

export default function Gallery3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
      <ambientLight intensity={1} />
      <Gallery />
    </Canvas>
  );
}

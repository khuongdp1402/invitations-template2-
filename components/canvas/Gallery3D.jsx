"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image as DreiImage, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const IMG_URLS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17456bf1500f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop"
];

function Carousel({ radius = 5 }) {
  const count = IMG_URLS.length;
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Bồng bềnh nhẹ nhàng
    group.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      {IMG_URLS.map((url, i) => {
        const angle = (i / count) * Math.PI * 2;
        // Bố trí ảnh theo hình trụ tròn
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <DreiImage 
            key={i} 
            url={url} 
            transparent
            position={[x, 0, z]} 
            rotation={[0, angle, 0]} 
            scale={[3, 4.5]} 
          />
        );
      })}
    </group>
  );
}

export default function Gallery3D() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 35 }} style={{ touchAction: 'none' }}>
      <ambientLight intensity={1} />
      <React.Suspense fallback={null}>
        <Carousel radius={5} />
      </React.Suspense>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2} 
        maxPolarAngle={Math.PI / 2} 
        autoRotate={true}
        autoRotateSpeed={0.8}
        enableDamping={true}
      />
    </Canvas>
  );
}

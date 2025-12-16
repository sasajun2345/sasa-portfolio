import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Helper to generate random points in a sphere
const generateParticles = (count: number, radius: number) => {
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    particles[i * 3] = x;
    particles[i * 3 + 1] = y;
    particles[i * 3 + 2] = z;
  }
  return particles;
};

const StarField = (props: any) => {
  const ref = useRef<THREE.Points>(null);
  
  // Memoize particle positions for performance
  const sphere = useMemo(() => generateParticles(3000, 1.8), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the entire cloud
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
      
      // Subtle pulse effect based on time
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
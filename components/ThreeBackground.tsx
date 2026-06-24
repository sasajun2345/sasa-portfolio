import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

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

  const sphere = useMemo(() => generateParticles(1500, 1.8), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 30;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#66aaff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.15}
        />
      </Points>
    </group>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-y2k-bg">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;

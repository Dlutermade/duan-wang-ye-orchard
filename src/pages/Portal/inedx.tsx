/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Html,
  PerspectiveCamera,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';
import React, { Suspense, useState } from 'react';
import Avocado from './components/Avocado';
import Background from './components/Background';
import { useNavigate } from 'react-router-dom';
import Loadding from '@components/Loadding';

import TipImg from '@assets/portal/a9f96b985ba9adc6.gif';

const Portal = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  const handlePointerDown = () => {
    setIsClicked(() => true);
  };

  return (
    <div className="absolute inset-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0.5, 10]} />
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
          enableZoom={false}
        />

        <spotLight
          position={[0, 70, 0]}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
        />
        <ambientLight args={['#ffffff', 0.1]} />

        <Suspense fallback={<Loadding isCanvas />}>
          <Avocado position={[0, -1.5, -1]} onPointerDown={handlePointerDown} />
        </Suspense>

        <Background />

        <Html
          center
          className="pointer-events-none flex h-screen w-screen space-y-16 px-20 text-center"
          zIndexRange={[40, 0]}
        >
          <div className="pointer-events-none mx-auto flex h-screen w-full flex-col items-center justify-between text-4xl font-semibold">
            <h2 className="pointer-events-auto mt-24">創新的酪梨小農網頁</h2>
            <div className="flex flex-col items-center justify-center">
              <img
                src={TipImg}
                className={`w-32 -translate-y-6 object-cover ${
                  isClicked ? 'hidden' : ''
                }`}
              />
              <button
                className="pointer-events-auto mb-20 h-16 w-44 animate-bounce rounded-2xl bg-hemp-600 text-slate-100 shadow-lg shadow-hemp-600 hover:bg-hemp-800"
                onClick={handleClick}
              >
                進入首頁
              </button>
            </div>
          </div>
        </Html>

        <mesh
          position={[0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[150, 150]} />
          <meshStandardMaterial color={'#ffccaa'} />
        </mesh>

        <Environment background>
          <mesh scale={100}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color={'#ffccaa'} side={THREE.BackSide} />
          </mesh>
        </Environment>
      </Canvas>
    </div>
  );
};
export default Portal;

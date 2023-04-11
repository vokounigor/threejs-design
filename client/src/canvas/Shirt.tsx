import { FC } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import state from '../store';
import { ColorRepresentation } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

const baseFullTexture: [number, number, number] = [0, 0, 0];
const baseLogoTexture: [number, number, number] = [0, 0.04, 0.15];
const baseRotation: [number, number, number] = [0, 0, 0];

const Shirt: FC = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb') as GLTFResult;

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((_, delta) => easing.dampC(materials.lambert1.color, snap.color as ColorRepresentation, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && <Decal position={baseFullTexture} rotation={baseRotation} scale={1} map={fullTexture} />}
        {snap.isLogoTexture && (
          <Decal
            position={baseLogoTexture}
            rotation={baseRotation}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;

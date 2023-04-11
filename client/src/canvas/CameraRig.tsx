import React, { FC, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { snapshot, useSnapshot } from 'valtio';

import state from '../store';
import { Group } from 'three';

interface CameraRigProps {
  children?: React.ReactNode;
}

const CameraRig: FC<CameraRigProps> = ({ children }) => {
  const snap = useSnapshot(state);
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    const targetPosition = getTargetPosition(snap.intro, isBreakpoint, isMobile);

    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
  });

  return <group ref={group}>{children}</group>;
};

const getTargetPosition = (intro: boolean, isBreakpoint: boolean, isMobile: boolean): [number, number, number] => {
  let targetPosition: [number, number, number] = [-0.4, 0, 2];

  if (intro) {
    if (isBreakpoint) {
      targetPosition = [0, 0, 2];
    }
    if (isMobile) {
      targetPosition = [0, 0.2, 2.5];
    }
  } else {
    if (isMobile) {
      targetPosition = [0, 0, 2.5];
    } else {
      targetPosition = [0, 0, 2];
    }
  }

  return targetPosition;
};

export default CameraRig;

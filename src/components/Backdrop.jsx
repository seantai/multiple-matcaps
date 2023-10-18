import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Backdrop(props) {
  const { nodes } = useGLTF("/1018_Backdrop.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Backdrop.geometry}>
        <meshStandardMaterial color={"#efefef"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/1018_Backdrop.glb");

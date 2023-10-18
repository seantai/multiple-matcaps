import { useCursor, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useRef, useState } from "react";
import { Vector2 } from "three";
import fooFrag from "../glsl/foo.frag";
import fooVert from "../glsl/foo.vert";

export const Suz = () => {
  const geometryRef = useRef();
  const shaderRef = useRef();

  const { nodes } = useGLTF("./Suz3-transformed.glb");

  const goldMatcapTexture = useTexture("bw.jpg");
  const metalMatcapTexture = useTexture("metal.jpeg");
  const reflection5MatcapTexture = useTexture("matcap_reflection_5.png");

  const [hovered, setHovered] = useState();
  useCursor(hovered);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      u_goldMatcapTexture: {
        value: goldMatcapTexture,
      },
      u_metalMatcapTexture: {
        value: metalMatcapTexture,
      },
      u_reflection5MatcapTexture: {
        value: reflection5MatcapTexture,
      },
      u_clickFloat: {
        value: 1,
      },
      // u_bool1: {
      //   value: false,
      // },
      u_pointer: { value: new Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (geometryRef.current) {
      geometryRef.current.rotation.y = Math.sin(clock.elapsedTime / 2) * 0.2;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.u_time.value = clock.elapsedTime;
      shaderRef.current.uniforms.u_pointer.value = pointer;
    }
  });

  return (
    <>
      <group
        onPointerDown={(e) => {
          const tl = gsap.timeline();
          tl.to(e.eventObject.rotation, {
            y: e.eventObject.rotation.y + Math.PI * 2,
            duration: 1,
          });
        }}
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <mesh geometry={nodes.Suzanne.geometry} scale={0.6} ref={geometryRef}>
          <shaderMaterial
            ref={shaderRef}
            vertexShader={fooVert}
            fragmentShader={fooFrag}
            uniforms={uniforms}
          />
        </mesh>
      </group>
    </>
  );
};

useGLTF.preload("/Suz3-transformed.glb");

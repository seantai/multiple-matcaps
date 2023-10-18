import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Suz } from "./components/Suz";
import Backdrop from "./components/Backdrop";

const Scene = () => {
  return (
    <>
      <Suz />
      <Backdrop />
      <CameraControls
        makeDefault
        mouseButtons={{ left: 1, middle: 0, right: 0, wheel: 0 }}
        touches={{ one: 32, two: 0, three: 0 }}
        minAzimuthAngle={-0.2}
        maxAzimuthAngle={0.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
      <pointLight color="#CAD6D7" />
    </>
  );
};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Scene />
    </Canvas>
  );
}

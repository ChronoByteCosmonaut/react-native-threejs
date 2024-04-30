import useControls from "r3f-native-orbitcontrols";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber/native";
import React, { useRef } from "react";
import { PerspectiveCamera } from "three";
import { SensorType, useAnimatedSensor } from "react-native-reanimated";

function Box(props: MeshProps) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    let { x, y, z } = props?.animatedSensor?.sensor?.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    meshRef.current.rotation.x += x;
    meshRef.current.rotation.y += y;
  });

  return (
    <mesh ref={meshRef} {...props}>
      <boxGeometry />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

export default function App() {
  const [OrbitControls, events] = useControls();
  console.log("🚀 ~ App ~ events:", events);
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });
  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas>
        <OrbitControls
          minZoom={5}
          maxZoom={10}
          enableRotate={true}
          enablePan={true}
        />
        <ambientLight intensity={Math.PI / 3} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[1.5, 1.5, 1.5]} />
        <Box
          animatedSensor={animatedSensor}
          // rotation={[0, -0.4, 0.5]}
          scale={1.56}
          position={[0, 0, 0]}
        />
        {/* <Box />
      <Box position={[0, -2, 0]} /> */}
        {/* <mesh scale={0.1}>
        <torusKnotGeometry args={[10, 1, 260, 6, 10, 16]} />
        <meshStandardMaterial color={"green"} />
      </mesh> */}
      </Canvas>
    </View>
  );
}

// app/components/RiveAvatar.tsx
"use client";
import { useRive } from "@rive-app/react-canvas";

export default function RiveAvatar() {
  const { RiveComponent } = useRive({
    src: "/animations/rimix-face.riv",
    autoplay: true,
    animations: ["Idle"],
    stateMachines: ["State Machine 1"],
  });

  return (
    <div className="w-[450px] h-[450px] mx-auto bg-transparent">
      <RiveComponent />
    </div>
  );
}

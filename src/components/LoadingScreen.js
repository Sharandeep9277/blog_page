"use client";

import dynamic from "next/dynamic";

// Dynamically import Player only on client side
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Player
        autoplay
        loop
        src="/animations/loading.json"
        className="w-[160px] h-[160px] md:w-[300px] md:h-[300px]"
      />
    </div>
  );
}

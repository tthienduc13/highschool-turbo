import ReactCanvasConfetti from "react-canvas-confetti";

import React from "react";

import { effectChannel } from "@/events/effect";

// Animation settings function
const getAnimationSettings = (angle: number, originX: number) => ({
  particleCount: 3,
  angle,
  spread: 100,
  origin: { x: originX },
  colors: ["#4b83ff", "#ffa54c"],
});

// Main ConfettiLayer component
export const ConfettiLayer: React.FC = () => {
  const [confetti, setConfetti] = React.useState(false);

  React.useEffect(() => {
    const prepareConfetti = () => setConfetti(false);
    const handleConfetti = () => setConfetti(true);

    // Subscribing to confetti events
    effectChannel.on("prepareConfetti", prepareConfetti);
    effectChannel.on("confetti", handleConfetti);

    // Cleanup subscriptions
    return () => {
      effectChannel.off("prepareConfetti", prepareConfetti);
      effectChannel.off("confetti", handleConfetti);
    };
  }, []);

  // Render ConfettiPlayer if confetti is active
  if (!confetti) return null;
  return <ConfettiPlayer onEnd={() => setConfetti(false)} />;
};

// ConfettiPlayer component
interface ConfettiPlayerProps {
  onEnd: () => void;
}

export const ConfettiPlayer: React.FC<ConfettiPlayerProps> = ({ onEnd }) => {
  const refAnimationInstance = React.useRef<confetti.CreateTypes | null>(null);

  const getInstance = React.useCallback(
    (instance: confetti.CreateTypes | null) => {
      refAnimationInstance.current = instance;
    },
    [],
  );

  const nextTickAnimation = React.useCallback(() => {
    if (refAnimationInstance.current) {
      // Triggering animations from both sides
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  React.useEffect(() => {
    const interval = setInterval(nextTickAnimation, 16);

    // Stop the confetti after 1.5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onEnd();
    }, 1500);

    // Cleanup interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [nextTickAnimation, onEnd]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "fixed",
        zIndex: 1000,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ConfettiLayer;

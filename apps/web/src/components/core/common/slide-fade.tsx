import React, { useEffect, useState } from "react";

interface SlideFadeProps {
  children: React.ReactNode;
  delay?: number;
  skeleton?: boolean;
}

export const SlideFade: React.FC<SlideFadeProps> = ({
  children,
  delay = 320,
  skeleton = false,
}) => {
  const [isVisible, setIsVisible] = useState(skeleton);

  useEffect(() => {
    if (!skeleton) {
      const timer = setTimeout(() => setIsVisible(true), delay);

      return () => clearTimeout(timer);
    }

    return;
  }, [delay, skeleton]);

  return (
    <div
      className={`ease-in-out transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2.5 opacity-0"
      } `}
    >
      {children}
    </div>
  );
};

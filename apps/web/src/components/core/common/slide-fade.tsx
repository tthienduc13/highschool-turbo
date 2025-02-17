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
      className={`transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 transform opacity-100"
          : "-translate-y-2.5 transform opacity-0"
      } `}
    >
      {children}
    </div>
  );
};

import React from "react";

const FireAnimation: React.FC = () => {
  return (
    <div className="h-ful relative mx-auto my-16 size-[80px]">
      <div className="absolute bottom-[40%] left-1/2 size-3/5 -translate-x-1/2 rotate-45">
        <div className="animate-flameodd absolute bottom-0 right-0 size-0 rounded-lg" />
        <div className="animate-flameodd animate-deylay-2 absolute bottom-0 right-0 size-0 rounded-lg" />
        <div className="animate-flameeven animate-deylay-3 absolute bottom-0 right-0 size-0 rounded-lg" />
        <div className="animate-flameeven animate-deylay-4 absolute bottom-0 right-0 size-0 rounded-lg" />
      </div>
    </div>
  );
};

export default FireAnimation;

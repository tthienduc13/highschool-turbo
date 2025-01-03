import { MouseEventHandler } from "react";

import { Button } from "@highschool/ui/components/ui/button";

interface ButtonProps {
  children?: React.ReactNode;
  colorShadow?: string;
  heightShadow?: string;
  backgroundColor?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export const ButtonKet = ({
  children,
  colorShadow,
  heightShadow,
  backgroundColor,
  className,
  onClick,
  isDisabled,
}: ButtonProps) => {
  return (
    <Button
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-6 text-[1rem] font-bold text-white ${className} animation-hover`}
      style={{
        boxShadow: `inset 0 ${heightShadow ?? "-7px"} ${colorShadow ?? "#00000033"}`,
        backgroundColor: `${backgroundColor}`,
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};

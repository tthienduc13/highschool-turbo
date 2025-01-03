import { Button } from "@highschool/ui/components/ui/button";
import { MouseEventHandler } from "react";

interface ButtonProps {
    children?: React.ReactNode;
    colorShadow?: string;
    heightShadow?: string;
    backgroundColor?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
}

export const ButtonKet = ({ children, colorShadow, heightShadow, backgroundColor, className, onClick, isDisabled }: ButtonProps) => {

    return (
        <Button
            className={`text-[1rem] flex-1 flex items-center justify-center gap-2 px-4 py-6 rounded-xl text-white font-bold
                    ${className} animation-hover`}
            style={{ boxShadow: `inset 0 ${heightShadow ?? '-7px'} ${colorShadow ?? '#00000033'}`, backgroundColor: `${backgroundColor}` }}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </Button>
    )
}
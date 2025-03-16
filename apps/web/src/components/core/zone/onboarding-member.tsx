import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { cn } from "@highschool/ui/lib/utils"; // Assuming you're using a utility like this for classnames
import React from "react";

interface OnboardingMemberProps {
  image?: string | null;
  nameOrEmail?: string | null;
  isMe?: boolean;
  pending?: boolean;
  label: string;
  isLoaded?: boolean;
}

export const OnboardingMember: React.FC<OnboardingMemberProps> = ({
  image,
  nameOrEmail,
  isMe = false,
  pending = false,
  label,
  isLoaded = true,
}) => {
  return (
    <div className="flex flex-row  gap-4 rounded-md px-4 py-2 transition-all duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <Avatar>
        <AvatarImage alt="image" src={image || "/logo.svg"} />
      </Avatar>
      <div className="flex flex-col gap-0">
        <div className="flex flex-row items-center gap-2">
          <p className="text-base font-bold">
            {nameOrEmail || "placeholder text"}
          </p>
          {isMe && (
            <Tag colorScheme="blue" size="sm">
              Bạn
            </Tag>
          )}
          {pending && (
            <Tag colorScheme="orange" size="sm">
              Đang chờ
            </Tag>
          )}
        </div>
        <div className="flex h-[21px] flex-row items-center">
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

interface TagProps {
  children: React.ReactNode;
  colorScheme?:
    | "blue"
    | "green"
    | "red"
    | "gray"
    | "yellow"
    | "purple"
    | "orange";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export const Tag = ({
  children,
  colorScheme = "gray",
  size = "sm",
  className,
}: TagProps) => {
  const baseStyles =
    "flex items-center justify-center rounded-full font-medium";

  const sizeStyles = {
    xs: "px-1.5 h-4 text-xs",
    sm: "px-2 h-5 text-xs",
    md: "px-2.5 h-6 text-sm",
    lg: "px-3 h-7 text-base",
  };

  const colorStyles = {
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
    yellow: "bg-yellow-100 text-yellow-800",
    purple: "bg-purple-100 text-purple-800",
  };

  const combinedStyles = cn(
    baseStyles,
    sizeStyles[size],
    colorStyles[colorScheme],
    className,
  );

  return <div className={combinedStyles}>{children}</div>;
};

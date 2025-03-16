import Image from "next/image";
import React from "react";
import { thumbHashToDataURL } from "thumbhash";
import { IconSchool } from "@tabler/icons-react";

export interface ZoneLogoProps {
  url?: string | null;
  hash?: string | null;
  width: number;
  height: number;
  local?: boolean;
}

export const ZoneLogo: React.FC<ZoneLogoProps> = ({
  url,
  hash,
  width,
  height,
  local = false,
}) => {
  const Logo = ({ src }: { src: string }) => (
    <div
      className=""
      style={{
        width,
        height,
        position: "relative",
      }}
    >
      <Image
        alt="Class logo"
        blurDataURL={
          hash
            ? thumbHashToDataURL(
                new Uint8Array(
                  atob(hash)
                    .split("")
                    .map((char) => char.charCodeAt(0)),
                ),
              )
            : undefined
        }
        fill={local}
        height={!local ? height : undefined}
        placeholder={hash ? "blur" : undefined}
        src={src}
        style={{
          objectFit: "cover",
        }}
        width={!local ? width : undefined}
      />
    </div>
  );

  if (url) return <Logo src={url} />;

  return (
    <div
      className="flex flex-row items-center justify-center  "
      style={{
        width,
        height,
      }}
    >
      <div className=" text-gray-900" color="gray.900">
        <IconSchool size={32} />
      </div>
    </div>
  );
};

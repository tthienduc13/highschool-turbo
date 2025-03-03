/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";

export type SmartImageProps = ImageProps & {
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  height?: number;
  radius?: string;
  alt?: string;
  isLoading?: boolean;
  objectFit?: CSSProperties["objectFit"];
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
};

const SmartImage: React.FC<SmartImageProps> = ({
  className,
  style,
  aspectRatio,
  height,
  radius,
  alt = "",
  isLoading = false,
  objectFit = "cover",
  enlarge = false,
  src,
  unoptimized = false,
  ...props
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (enlarge) {
      setIsEnlarged(!isEnlarged);
    }
  };

  useEffect(() => {
    if (isEnlarged) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEnlarged]);

  const calculateTransform = () => {
    if (!imageRef.current) return {};

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = window.innerWidth / rect.width;
    const scaleY = window.innerHeight / rect.height;
    const scale = Math.min(scaleX, scaleY) * 0.9;

    const translateX = (window.innerWidth - rect.width) / 2 - rect.left;
    const translateY = (window.innerHeight - rect.height) / 2 - rect.top;

    return {
      transform: isEnlarged
        ? `translate(${translateX}px, ${translateY}px) scale(${scale})`
        : "translate(0, 0) scale(1)",
      transition: "all 0.3s ease-in-out",
      zIndex: isEnlarged ? 2 : 1,
    };
  };

  const isYouTubeVideo = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    return youtubeRegex.test(url);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );

    return match
      ? `https://www.youtube.com/embed/${match[1]}?controls=0&rel=0&modestbranding=1`
      : "";
  };

  const isVideo = src?.endsWith(".mp4");
  const isYouTube = isYouTubeVideo(src);

  return (
    <>
      <div
        ref={imageRef}
        {...(!isEnlarged && { background: "neutral-medium" })}
        className={cn("relative flex w-full", className)}
        style={{
          outline: "none",
          overflow: "hidden",
          height: aspectRatio ? undefined : height ? `${height}rem` : "100%",
          aspectRatio,
          cursor: enlarge ? "pointer" : "default",
          borderRadius: isEnlarged
            ? "0"
            : radius
              ? `var(--radius-${radius})`
              : undefined,
          ...calculateTransform(),
          ...style,
        }}
        onClick={handleClick}
      >
        {isLoading && <Skeleton className="size-full" />}
        {!isLoading && isVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={src}
            style={{
              width: "100%",
              height: "100%",
              objectFit: isEnlarged ? "contain" : objectFit,
            }}
          />
        )}
        {!isLoading && isYouTube && (
          <iframe
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            height="100%"
            src={getYouTubeEmbedUrl(src)}
            style={{
              objectFit: objectFit,
            }}
            title="video"
            width="100%"
          />
        )}
        {!isLoading && !isVideo && !isYouTube && (
          <Image
            {...props}
            fill
            alt={alt}
            src={src}
            style={{
              objectFit: isEnlarged ? "contain" : objectFit,
            }}
          />
        )}
      </div>

      {isEnlarged && enlarge && (
        <div
          className="fixed flex items-center justify-center"
          style={{
            zIndex: 1,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "var(--backdrop)",
            cursor: "pointer",
            transition: "opacity 0.3s ease-in-out",
            opacity: isEnlarged ? 1 : 0,
          }}
          onClick={handleClick}
        >
          <div
            className="relative flex"
            style={{
              height: "100vh",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                src={src}
                style={{
                  width: "90vw",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Image
                {...props}
                fill
                alt={alt}
                sizes="90vw"
                src={src}
                style={{ objectFit: "contain" }}
                unoptimized={unoptimized}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

SmartImage.displayName = "SmartImage";

export { SmartImage };

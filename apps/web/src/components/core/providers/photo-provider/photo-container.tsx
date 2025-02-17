/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useLayoutEffect, useRef, useState } from "react";

interface PhotoContainerProps {
  visible: boolean;
  src?: string;
  origin: HTMLElement | null;
  borderRadius?: number;
}

export const PhotoContainer: React.FC<PhotoContainerProps> = ({
  visible,
  src,
  origin,
  borderRadius,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [originalWidth, setOriginalWidth] = useState<number>();
  const [originalHeight, setOriginalHeight] = useState<number>();
  const originalWidthRef = useRef<number>(0);
  const originalHeightRef = useRef<number>(0);

  originalWidthRef.current = originalWidth ?? 0;
  originalHeightRef.current = originalHeight ?? 0;

  const [rounded, setRounded] = useState<number>(0);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [animate, setAnimate] = useState(false);

  const [scale, setScale] = useState(1);
  const scaleRef = useRef<number>(1);

  scaleRef.current = scale;

  const setBounded = () => {
    if (!origin || !containerRef.current) return;

    const originWidth = origin.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const scale =
      originWidth && containerWidth ? originWidth / containerWidth : 1;
    const originRect = origin.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setRounded((borderRadius || 0) / scale);

    setOriginalWidth(containerRect.width);
    setOriginalHeight(containerRect.height);

    setX(originRect.left - containerRect.left);
    setY(originRect.top - containerRect.top);

    setScale(scale);
    setWidth(originRect.width / scale);
    setHeight(originRect.height / scale);
  };

  useLayoutEffect(() => {
    setBounded();

    if (visible) {
      setTimeout(() => {
        setAnimate(true);
        setX(0);
        setY(0);
        setScale(1);
        setRounded(8);
        setWidth(originalWidthRef.current);
        setHeight(originalHeightRef.current);
      }, 10);
    } else {
      setTimeout(() => {
        setAnimate(false);
        setOriginalHeight(undefined);
        setOriginalWidth(undefined);
        setHeight(undefined);
        setWidth(undefined);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!src || !origin) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width: originalWidth,
        height: originalHeight,
      }}
    >
      <img
        alt="Photo preview"
        className={
          animate
            ? "object-cover transition-[width,height,transform,border-radius] duration-500"
            : ""
        }
        src={src}
        style={{
          width,
          height,
          cursor: "zoom-out",
          borderRadius: rounded,
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          transformOrigin: "top left",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

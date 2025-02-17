import { ConnectionLineComponentProps } from "@xyflow/react";
import React from "react";

function CustomConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) {
  return (
    <g>
      <path
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
        fill="none"
        stroke={"#1a5fff"}
        strokeWidth={1.5}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={"#1a5fff"}
        strokeWidth={1.5}
      />
    </g>
  );
}

export default CustomConnectionLine;

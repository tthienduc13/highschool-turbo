import { EdgeProps, getBezierPath } from "@xyflow/react";
import React, { memo } from "react";

function Edge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      className="react-flow__edge-path"
      d={edgePath}
      id={id}
      markerEnd={markerEnd}
      style={{
        ...style,
        strokeDasharray: "5, 5",
        strokeWidth: 2,
      }}
    />
  );
}

export const DashedEdge = memo(Edge);

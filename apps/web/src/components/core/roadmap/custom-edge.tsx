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
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;

  const [edgePath] = getBezierPath({
    sourceX: xEqual ? sourceX + 0.0001 : sourceX,
    sourceY: yEqual ? sourceY + 0.0001 : sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        className="react-flow__edge-path"
        d={edgePath}
        id={id}
        markerEnd={markerEnd}
        style={style}
      />
    </>
  );
}

export const CustomEdge = memo(Edge);

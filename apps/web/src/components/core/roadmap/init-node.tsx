import { useState, memo, useCallback } from "react";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useConnection,
} from "@xyflow/react";
import { cn } from "@highschool/ui/lib/utils";

export type InitNodeData = {
  label: string;
  forceToolbarVisible?: boolean;
};

const Init = ({ data, id }: NodeProps<Node<InitNodeData>>) => {
  const [isHovered, setIsHovered] = useState(false);
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const label = isTarget ? "Drop here" : data.label;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className={cn(
          "flex h-full items-center justify-center p-[10px] text-center text-xl font-bold",
          "transition-border border-2 border-transparent duration-300 ease-in-out",
          isHovered && "rounded-md border-[#1a5fff]",
        )}
      >
        <div>{label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="init-source-bottom"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 300ms ease-in-out",
        }}
      />
    </div>
  );
};

export const InitNode = memo(Init);

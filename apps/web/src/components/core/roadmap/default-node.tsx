import { Handle, Node, NodeProps, NodeResizer, Position } from "@xyflow/react";
import { memo, useState } from "react";

export type DefaultNodeData = {
  label: string;
  resourceId: string;
  forceToolbarVisible?: boolean;
};
const DefNode = ({
  data,
  selected,
  isConnectable,
}: NodeProps<Node<DefaultNodeData>>) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <NodeResizer
        handleClassName="rounded-md"
        isVisible={selected}
        lineClassName="rounded-md"
        minHeight={30}
        minWidth={100}
      />
      <div
        className="rounded-md border-2 border-black bg-[#fdff00] px-8 py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-lg font-medium">{data.label}</div>
        <Handle
          id="def-source-top"
          isConnectable={isConnectable}
          position={Position.Top}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="source"
        />
        <Handle
          id="def-source-bottom"
          isConnectable={isConnectable}
          position={Position.Bottom}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="source"
        />
        <Handle
          id="def-source-left"
          isConnectable={isConnectable}
          position={Position.Left}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="source"
        />
        <Handle
          id="def-source-right"
          isConnectable={isConnectable}
          position={Position.Right}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="source"
        />

        <Handle
          id="def-target-top"
          isConnectable={isConnectable}
          isConnectableStart={false}
          position={Position.Top}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="target"
        />
        <Handle
          id="def-target-bottom"
          isConnectable={isConnectable}
          isConnectableStart={false}
          position={Position.Bottom}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="target"
        />
        <Handle
          id="def-target-left"
          isConnectable={isConnectable}
          isConnectableStart={false}
          position={Position.Left}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="target"
        />
        <Handle
          id="def-target-right"
          isConnectable={isConnectable}
          isConnectableStart={false}
          position={Position.Right}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          type="target"
        />
      </div>
    </>
  );
};

export const DefaultNode = memo(DefNode);

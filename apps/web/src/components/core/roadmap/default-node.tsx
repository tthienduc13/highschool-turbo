import { memo, useState } from "react";
import { Handle, NodeProps, Position, Node, NodeResizer } from "@xyflow/react";

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
        lineClassName="rounded-md"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-md border-2 border-black bg-[#fdff00] px-8 py-2"
      >
        <div className="text-lg font-medium">{data.label}</div>
        <Handle
          type="source"
          position={Position.Top}
          id="def-source-top"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="def-source-bottom"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="def-source-left"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="def-source-right"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />

        <Handle
          type="target"
          position={Position.Top}
          id="def-target-top"
          isConnectableStart={false}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="def-target-bottom"
          isConnectableStart={false}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="def-target-left"
          isConnectableStart={false}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="def-target-right"
          isConnectableStart={false}
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            backgroundColor: "#1a5fff",
          }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export const DefaultNode = memo(DefNode);

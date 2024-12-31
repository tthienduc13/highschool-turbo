import { memo, useState } from "react";
import { Node, Handle, NodeProps, Position, NodeResizer } from "@xyflow/react";

export type SecNodeData = {
  label: string;
  resourceId: string;
  forceToolbarVisible?: boolean;
};

const SecNode = ({
  data,
  selected,
  isConnectable,
}: NodeProps<Node<SecNodeData>>) => {
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
        className="rounded-md border-2 border-black bg-[#ffe599] px-8 py-2"
      >
        <div className="text-lg font-medium">{data.label}</div>

        <Handle
          type="source"
          position={Position.Top}
          id="sec-source-top"
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
          id="sec-source-bottom"
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
          id="sec-source-left"
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
          id="sec-source-right"
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
          id="sec-target-top"
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
          id="sec-target-bottom"
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
          id="sec-target-left"
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
          id="sec-target-right"
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

export const SecondaryNode = memo(SecNode);

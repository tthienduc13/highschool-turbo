"use client";

import {
  Background,
  Controls,
  type Edge,
  FitViewOptions,
  type Node,
  NodeMouseHandler,
  OnEdgesChange,
  OnNodesChange,
  Panel,
  ReactFlow,
  ReactFlowInstance,
  ReactFlowProvider,
  Viewport,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";

import { IconArrowBackUp } from "@tabler/icons-react";

import { Logo } from "@/components/core/common/logo";
import CustomConnectionLine from "@/components/core/roadmap/custom-connection-line";
import { CustomEdge } from "@/components/core/roadmap/custom-edge";
import { DashedEdge } from "@/components/core/roadmap/dashed-edge";
import { DefaultNode } from "@/components/core/roadmap/default-node";
import { InitNode } from "@/components/core/roadmap/init-node";
import { SecondaryNode } from "@/components/core/roadmap/secondary-node";
import { useRoadMapContext } from "@/stores/use-roadmap-store";

import { HydrateRoadMapData } from "./hydrate-roadmap-data";
import { ResourcePanel } from "./resource-panel";
import { UserPanel } from "./user-panel";

export type EdgeType = "custom" | "dashed";

const connectionLineStyle = {
  strokeWidth: 2,
  stroke: "#1a5fff",
};

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

function Roadmap() {
  const router = useRouter();

  const openResource = useRoadMapContext((s) => s.openResourcePanel);
  const closeResource = useRoadMapContext((s) => s.closeResourcePanel);
  const setActiveTab = useRoadMapContext((s) => s.setActiveTab);
  const { getNode } = useReactFlow();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedNodeId(node.id);
      if (getNode(selectedNodeId!)?.type === "init") {
        return;
      }
      openResource();
      setActiveTab("specific");
    },
    [getNode, openResource, selectedNodeId, setActiveTab],
  );

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  console.log(rfInstance);
  const { setViewport } = useReactFlow();

  const roadmapData = useRoadMapContext((s) => s.roadmapData);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  useEffect(() => {
    if (roadmapData) {
      const flow = JSON.parse(roadmapData?.contentJson!) as {
        nodes: Node[];
        edges: Edge[];
        viewport: Viewport;
      };
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmapData]);

  const nodeTypes = useMemo(
    () => ({
      init: InitNode,
      def: DefaultNode,
      secondary: SecondaryNode,
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
      dashed: DashedEdge,
    }),
    [],
  );

  return (
    // <FullPage>
    <div
      className="fixed left-0 top-0 h-screen w-screen"
      style={{ zIndex: 40 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setRfInstance}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={fitViewOptions}
        connectionLineStyle={connectionLineStyle}
        connectionLineComponent={CustomConnectionLine}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        draggable={false}
        onPaneClick={closeResource}
        nodesDraggable={false}
        style={{ cursor: "pointer" }}
      >
        <Panel
          position={"top-left"}
          className="bg-background flex flex-row items-center gap-x-2 rounded-md border px-4 py-2 shadow-xl"
        >
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <IconArrowBackUp />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Logo />
          <Separator orientation="vertical" className="h-8" />
        </Panel>
        <UserPanel />
        <ResourcePanel selectedNodeId={selectedNodeId ?? ""} />
        <Background />
        <Controls
          className="bg-background border"
          position="bottom-left"
          orientation="horizontal"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
    // </FullPage>
  );
}
function InternalRoadmap() {
  return (
    <ReactFlowProvider>
      <HydrateRoadMapData>
        <Roadmap />
      </HydrateRoadMapData>
    </ReactFlowProvider>
  );
}

InternalRoadmap.displayName = "InternalRoadmap";

export default InternalRoadmap;

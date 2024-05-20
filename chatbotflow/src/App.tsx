import React, {
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import "reactflow/dist/style.css";
import Sidebar from "./components/Sidebar";
import ReactFlow, {
  useEdgesState,
  ReactFlowProvider,
  addEdge,
  Controls,
  ReactFlowInstance,
  Position,
  Node,
  NodeChange,
  applyNodeChanges,
  Connection,
  Edge,
} from "reactflow";
import MessageNode from "./components/Node/MessageNode";
import { GetEditor } from "./components/Nodes";
import SaveButton from "./components/SaveButton";
import ErrorState from "./components/ErrorState";

let id = 0;
const getId = () => `dndnode_${id++}`;
const availableNodeTypes = ["message"];

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editNode, setEditNode] = useState<Node>();
  const [errorState, setErrorState] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const nodeTypes = useMemo(() => ({ messageNode: MessageNode }), []);

  // Close the edit section on either deleting node or closing editor by user
  const closeEditor = () => {
    setEditNode(undefined);
  };

  // callback to apply changes when node changes
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // callback when an edge is connected
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("nodeType");
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = !!reactFlowInstance
        ? reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          })
        : { x: 0, y: 0 };
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: { label: `Message` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Handling Click of any node
  // TODO: Add more styling to highlight selected node.
  const onNodeClick = useCallback((event: MouseEvent, node: Node) => {
    setEditNode(node);
  }, []);

  //Updating the node data from edit section
  const updateNodeData = (newData: Partial<Node["data"]>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === editNode?.id
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };

  // validation for given condition on "Save Changes"
  const checkEmptyTargetHandles = () => {
    const nodesWithEmptyTargetHandles = nodes.filter((node) => {
      const hasIncomingEdges = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdges;
    });

    if (nodesWithEmptyTargetHandles.length > 1) {
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 2000);
    } else {
      // TODO: handle Success here to show succes response on UI
      console.log("Nodes are connected just fine, can proceed with API call");
    }
  };

  return (
    <>
      <div
        className={`flex ${
          errorState ? "justify-between" : "justify-end"
        } bg-gray-400 p-3 align-center`}
      >
        {errorState && <ErrorState errMessage="Cannot Save file" />}
        <SaveButton handleSave={checkEmptyTargetHandles} />
      </div>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={(instance: ReactFlowInstance) =>
                setReactFlowInstance(instance)
              }
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesDelete={closeEditor}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
          {editNode ? (
            <GetEditor
              editNode={editNode}
              updateNodeData={updateNodeData}
              closeEditor={closeEditor}
            />
          ) : (
            <Sidebar availableNodeTypes={availableNodeTypes} />
          )}
        </ReactFlowProvider>
      </div>
    </>
  );
}

export default App;

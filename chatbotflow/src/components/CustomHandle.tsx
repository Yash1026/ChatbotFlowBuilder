import React, { useMemo } from "react";
import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props: any) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof props.isConnectable === "number") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);
      //Condition added to count number of sources for a particular node, and restrict further sources if already there exists a source
      const sourceEdgesCount = connectedEdges.filter(
        (edge) => edge.source === nodeId
      ).length;
      return sourceEdgesCount === 0;
    }
    return true;
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return <Handle {...props} isConnectableStart={isHandleConnectable}></Handle>;
};

export default CustomHandle;

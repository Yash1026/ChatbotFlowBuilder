import { useCallback } from "react";
import { getConnectedEdges, Handle, Position, useStore } from "reactflow";
import CustomHandle from "../CustomHandle";

const handleStyle = { left: 10 };

function MessageNode({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: boolean;
}) {
  return (
    <div className="text-updater-node w-44">
      <CustomHandle
        id="t"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="bg-[#b2f0e3] p-1">
        <p className="text-[0.5rem] font-medium text-black"> Send Message </p>
      </div>
      <div className="p-1">
        <label className="text-xs" htmlFor="text">
          {data.label}
        </label>
      </div>

      <CustomHandle
        type="source"
        position={Position.Right}
        id="s"
        isConnectable={1}
      />
    </div>
  );
}

export default MessageNode;

import React, { useEffect, useState } from "react";
import { Node, useNodes, useNodesState } from "reactflow";

const MessageEditor = ({
  updateNodeData,
  nodeData,
  closeEditor,
}: {
  updateNodeData: (newData: Partial<{ label: string }>) => void;
  nodeData: any;
  closeEditor: () => void;
}) => {
  const [message, setMessage] = useState(nodeData.label);
  useEffect(() => {
    updateNodeData({ label: message });
  }, [message]);

  return (
    <div>
      <div className="flex">
        <button className="back-button" onClick={closeEditor}>
          ←
        </button>
        <h1 className="block text-gray-800 font-semibold text-sm">
          {"Edit Message"}
        </h1>
      </div>
      <div className="mt-2">
        <input
          type="text"
          name="inputname"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
        />
      </div>
    </div>
  );
};

export default MessageEditor;

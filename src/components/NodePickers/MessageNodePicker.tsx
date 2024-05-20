import React from "react";

const MessageNodePicker = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      onDragStart={(event) => onDragStart(event, "messageNode")}
      draggable
      className="p-1 border-2 rounded border-[#243c5a] w-6/12 flex justify-center"
    >
      <label className="text-xs text-center" htmlFor="text">
        {"Message"}
      </label>
    </div>
  );
};

export default MessageNodePicker;

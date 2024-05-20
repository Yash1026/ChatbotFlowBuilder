import React from "react";
import MessageEditor from "./Editor/MessageEditor";
import ErrorState from "./ErrorState";
import MessageNodePicker from "./NodePickers/MessageNodePicker";
import { Node } from "reactflow";
import { staticTexts } from "../helper";

//Get different types of picker for Nodes panel for different types of node.
export const GetPicker = ({ type }: { type: string }) => {
  switch (type) {
    case "message":
      return <MessageNodePicker />;
    default:
      return <ErrorState errMessage={staticTexts.unknownErrorState} />;
  }
};

//Get different types of editor for different types of node.
export const GetEditor = ({
  editNode,
  updateNodeData,
  closeEditor,
}: {
  editNode: Node;
  updateNodeData: (newData: Partial<{ label: string }>) => void;
  closeEditor: () => void;
}) => {
  switch (editNode.type) {
    case "messageNode":
      return (
        <Wrapper>
          <MessageEditor
            updateNodeData={updateNodeData}
            nodeData={editNode.data}
            closeEditor={closeEditor}
          />
        </Wrapper>
      );
    default:
      return <ErrorState errMessage={staticTexts.unknownErrorState} />;
  }
};

//Wrapper for any editor for a consistent UI between Editor panel and Nodes panel
const Wrapper = ({ children }: { children: any }) => {
  return <aside className="bg-slate-200 drop-shadow-md p-4">{children}</aside>;
};

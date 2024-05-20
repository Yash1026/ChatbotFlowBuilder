import React, { useState } from "react";
import { Node } from "reactflow";
import { GetEditor, GetPicker } from "./Nodes";

interface Props {
  availableNodeTypes: string[];
}

export default (props: Props) => {
  const { availableNodeTypes } = props;
  return (
    <aside className="bg-slate-200 drop-shadow-md p-4">
      {availableNodeTypes?.map((nodeType: string, _index: number) => {
        return <GetPicker type={nodeType} />;
      })}
    </aside>
  );
};

import React from "react";
import { staticTexts } from "../helper";

interface Props {
  handleSave: () => void;
}

const SaveButton = (props: Props) => {
  const { handleSave } = props;
  return (
    <button
      onClick={handleSave}
      className="cursor-pointer flex items-center fill-lime-400 bg-white hover:bg-blue-900 active:border active:border-lime-400 rounded-md duration-100 p-2"
    >
      <span className="text-sm hover:text-white text-blue-400 font-bold pr-1">
        {staticTexts.saveButton}
      </span>
    </button>
  );
};

export default SaveButton;

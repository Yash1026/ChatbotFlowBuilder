import React from "react";

interface Props {
  errMessage: string;
}
const ErrorState = (props: Props) => {
  const { errMessage } = props;
  return (
    <div className="text-stone-950 bg-red-300 p-2 rounded">
      <p>{errMessage}</p>
    </div>
  );
};

export default ErrorState;

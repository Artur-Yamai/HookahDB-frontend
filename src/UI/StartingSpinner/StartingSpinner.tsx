import { useEffect, useState } from "react";
import "./StartingSpinner.scss";

interface StartingSpinnerProps {
  loading: boolean;
}

export const StartingSpinner = ({ loading }: StartingSpinnerProps) => {
  const [isLoadingBlock, toggleLoadingBlock] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => toggleLoadingBlock(false), 1000);
  });

  return (
    <>
      {isLoadingBlock && (
        <div className={`spinner ${!loading ? "spinner--hidden" : ""}`} />
      )}
    </>
  );
};

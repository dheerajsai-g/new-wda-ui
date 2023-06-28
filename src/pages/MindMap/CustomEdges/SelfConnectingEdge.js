import React, { useEffect } from "react";
import { BaseEdge, BezierEdge, EdgeProps, SmoothStepEdge } from "reactflow";

export default function SelfConnecting({ props }) {
  // we are using the default bezier edge when source and target ids are different

  useEffect(() => {
    console.log("selfconnecting rendered");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const { sourceX, sourceY, targetX, targetY, id, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 50;
  const edgePath = `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
    targetX + 2
  } ${targetY}`;

  return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
}

import React from "react";
import { BaseEdge, EdgeLabelRenderer, SmoothStepEdge, getBezierPath, getSimpleBezierPath, getSmoothStepPath } from "reactflow";

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CommunicationEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  markerStart,
}) {
  if (source !== target) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    return (
      <>
        <BaseEdge
          path={edgePath}
          markerEnd={markerEnd}
          markerStart={markerStart}
          style={style}
        />
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 4,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <button
              className="communicationbutton"
              onClick={(event) => onEdgeClick(event, id)}
            >
              Select Communication
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  } else {
    const radiusX = (sourceX - targetX) * 0.6;
    const radiusY = 50;
    const edgePath = `M ${
      sourceX - 5
    } ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX + 2} ${targetY}`;

    return (
      <>
        <SmoothStepEdge
          path={edgePath}
          markerEnd={markerEnd}
          markerStart={markerStart}
          style={style}
        />
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${
                sourceX - (sourceX - targetX) / 2
              }px,${targetY - 75}px)`,
              fontSize: 4,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <button
              className="communicationbutton"
              onClick={(event) => onEdgeClick(event, id)}
            >
              Select Communication
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }
}

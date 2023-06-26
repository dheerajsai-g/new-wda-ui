import React, { memo, useEffect } from "react";
import { Handle, Position } from "reactflow";
import elastic from "../../../assets/elastic.jpg";

const logManagementTypes = {
  elastic: elastic,
};

export default memo(({ data, isConnectable }) => {
  useEffect(() => {
    console.log("Client rendered");

    return () => {
      console.log("Component unmounted");
    };
  }, []);
  return (
    <>
      <img
        id="elastic"
        style={{
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          width: "50px",
        }}
        src={logManagementTypes[data.target_id]}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="client"
        isConnectable={isConnectable}
      />
    </>
  );
});


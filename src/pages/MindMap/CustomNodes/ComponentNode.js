import React, { memo, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Container, Box, Stack } from "@mui/material";

export default memo(({ data, isConnectable }) => {
  useEffect(() => {
    console.log("Client rendered");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  if (data.target_id === "client") {
  return (
    <>
      <div style={{ width: "70px" }}>Client</div>

      <Handle
        type="source"
        position={Position.Right}
        id="client"
        style={{ top: "50%" }}
        isConnectable={isConnectable}
      />
    </>
  );
  } else {
      return (
    <>
      <div style={{ width: "70px" }}>Server</div>
      <Handle
        type="target"
        position={Position.Left}
        id="server"
        style={{
          top: "50%",
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="server"
        style={{
          top: "50%",
        }}
        isConnectable={isConnectable}
      />
    </>)
  }

});

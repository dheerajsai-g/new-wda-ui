import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Container, Box, Stack } from "@mui/material";

export default memo(({ data, isConnectable }) => {

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
    </>
  );
});

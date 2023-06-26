import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Container, Box, Stack } from "@mui/material";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div style={{ width: '70px'}} >Client</div>

      <Handle
        type="source"
        position={Position.Right}
        id="client"
        style={{ top: "50%" }}
        isConnectable={isConnectable}
      />

    </>
  );
});

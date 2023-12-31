import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Container, Box, Stack } from "@mui/material";

export default memo(({ data, isConnectable }) => {
  return (
    <div>
      <legend>
        <a
          style={{
            fontSize: "5px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {data.label}
        </a>
      </legend>
      <Handle
        type="source"
        position={Position.Right}
        id="microservicegroup"
        isConnectable={isConnectable}
      />
    </div>
  );
});

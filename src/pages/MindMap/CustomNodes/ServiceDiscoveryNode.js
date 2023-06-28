import React, { memo, useEffect } from "react";
import { Handle, Position } from "reactflow";
import eureka from "../../../assets/eureka.jpg";

const serviceDiscoveryTypes = {
  eureka: eureka,
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
        id={data.target_id}
        style={{
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          width: "70px",
        }}
        src={serviceDiscoveryTypes[data.target_id]}
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

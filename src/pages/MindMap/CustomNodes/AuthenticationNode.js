import React, { memo, useEffect } from "react";
import { Handle, Position } from "reactflow";
import keycloak from "../../../assets/keycloak.svg";

const authenticationTypes = {
  keycloak: keycloak,
};

export default memo(({ data, isConnectable }) => {
  useEffect(() => {
    console.log("auth rendered");

    return () => {
      console.log("Component unmounted");
    };
  }, []);
  return (
    <>
      <img
        id="keycloak"
        style={{
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          width: "70px",
        }}
        src={keycloak}
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

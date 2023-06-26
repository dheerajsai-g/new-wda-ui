import React, { memo } from "react";
import { Position } from "reactflow";
import postgres from "../../../assets/postgresql.svg";
import mongodb from "../../../assets/mongo.png"
import ConnectionLimitHandle from "../CustomHandles/ConnectionLimitHandle";

const databases = {
  postgresDB: postgres,
  mongoDB: mongodb
}

export default memo(({ data, isConnectable }) => {
  return (
    <div>
      <ConnectionLimitHandle
        type="target"
        position={Position.Left}
        id="database"
        style={{ top: "50%" }}
        isConnectable={1}
      />
      <div>
        <img
          style={{
            width: "60px",
          }}
          src={databases[data.target_id]}
        />
      </div>
    </div>
  );
});

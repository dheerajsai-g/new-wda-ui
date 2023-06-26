import React, { memo, useEffect } from "react";

export default memo(({ data, isConnectable }) => {
  useEffect(() => {
    console.log("Client rendered");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  if (data.target_id === "eureka") {
    return (
      <legend>
        <a
          style={{
            fontSize: "5px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          eureka
        </a>
      </legend>
    );
  } else {
    return (
      <legend>
        <a
          style={{
            fontSize: "5px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          in future
        </a>
      </legend>
    );
  }
});

export const example = {
  nodes: [
    {
      id: "jahd5hhudf",
      type: "componentNode",
      position: {
        x: 0,
        y: 0,
      },
      className: "client",
      data: {
        label: "clientNode node",
        target_id: "client",
      },
      width: 92,
      height: 40,
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "dy49tushnh",
      type: "componentNode",
      position: {
        x: 250,
        y: 0,
      },
      className: "server",
      data: {
        label: "serverNode node",
        target_id: "server",
      },
      width: 92,
      height: 40,
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "gm3u6w3f6zf",
      type: "databaseNode",
      position: {
        x: 500,
        y: 0,
      },
      data: {
        label: "databaseNode node",
        target_id: "postgresDB",
      },
      width: 82,
      height: 87,
      targetPosition: "left",
      sourcePosition: "right",
    },
  ],
  edges: [
    {
      source: "jahd5hhudf",
      sourceHandle: "client",
      target: "dy49tushnh",
      targetHandle: "server",
      type: "communicationEdge",
      id: "reactflow__edge-jahd5hhudfclient-dy49tushnhserver",
    },
    {
      source: "dy49tushnh",
      sourceHandle: "server",
      target: "gm3u6w3f6zf",
      targetHandle: "database",
      type: "smoothstep",
      id: "reactflow__edge-dy49tushnhserver-gm3u6w3f6zfdatabase",
    },
  ],
};

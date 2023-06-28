import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEvent,
  ReactDOM,
} from "react";
import ReactFlow, {
  ConnectionLineType,
  useReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  useStoreApi,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import DialogBox from "./util/AlertCheckBox";

import ColorSelectorNode from "./CustomNodes/ColorSelectorNode";
import ClientNode from "./CustomNodes/ClientNode";

import Sidebar from "./Sidebar";

import "./index.css";
import ServerNode from "./CustomNodes/ServerNode";
import DatabaseNode from "./CustomNodes/DatabaseNode";
import AuthenticationNode from "./CustomNodes/AuthenticationNode";
import ServiceDiscoveryNode from "./CustomNodes/ServiceDiscoveryNode";
import LogManagementNode from "./CustomNodes/LogManagementNode";
import ComponentNode from "./CustomNodes/ComponentNode";
import MicroserviceServiceGroupNode from "./CustomNodes/MicroserviceServiceGroupNode";

import CommunicationEdge from "./CustomEdges/CommunicationEdge";
import SelfConnecting from "./CustomEdges/SelfConnectingEdge";

import dagre from "dagre";

import { example } from "./Example";

const initBgColor = "#FFFFFF";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  authenticationNode: AuthenticationNode,
  componentNode: ComponentNode,
  databaseNode: DatabaseNode,
  serviceDiscoveryNode: ServiceDiscoveryNode,
  logManagementNode: LogManagementNode,
  microserviceServiceGroupNode: MicroserviceServiceGroupNode,
};

const edgeTypes = {
  communicationEdge: CommunicationEdge,
  selfConnecting: SelfConnecting,
};

function generateRandomId() {
  return Math.random().toString(36).substring(2);
}

const MIN_DISTANCE = 150;

const nodeWidth = 200;
const nodeHeight = 100;

const parentEdgeColorTypes = {
  serviceDiscoveryNode: "#6fb33e",
  logManagementNode: "#f2cf33",
  authenticationNode: "#b1b1b1",
};

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    if (!node.parentNode) {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    }
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
    if (edge.type === "communicationEdge") {
      const nodeId = "temp" + generateRandomId();
      dagreGraph.setNode(nodeId, { width: nodeWidth, height: nodeHeight });
      dagreGraph.setEdge(edge.source, nodeId);
      dagreGraph.setEdge(nodeId, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.data.targetPosition = isHorizontal ? "left" : "top";
    node.data.sourcePosition = isHorizontal ? "right" : "bottom";

    if (node.parentNode) {
      return node;
    }
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const MindMap = () => {
  const store = useStoreApi();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [components, setComponents] = useState({});
  const { getIntersectingNodes } = useReactFlow();

  const [metaData, setMetaData] = useState({
    nodes: {},
    edges: {},
  });

  const [authNode, setAuthNode] = useState(false);
  const [serviceNode, setServiceNode] = useState(false);
  const [logNode, setLogNode] = useState(false);

  const [groupsList, setGroupsList] = useState({});

  const [testtt, setTesttt] = useState({
    count: 0,
  });

  const onConnect = useCallback((params) => {
    if (
      (params.sourceHandle == "client" || params.sourceHandle == "server") &&
      params.targetHandle == "server"
    ) {
      params.type = "communicationEdge";
      params.markerStart = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
      };
      params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
      };
      params.style = {
        strokeWidth: 2,
      };
    } else if (params.target == params.source) {
      params.type = "selfConnecting";
      params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
      };
      params.style = {
        strokeWidth: 2,
      };
    } else {
      params.type = "smoothstep";
      params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
      };
      params.style = {
        strokeWidth: 2,
      };
    }
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const getClosestEdge = useCallback((node) => {
    const { nodeInternals } = store.getState();
    const storeNodes = Array.from(nodeInternals.values());

    const closestNode = storeNodes.reduce(
      (res, n) => {
        if (n.id !== node.id) {
          const dx = n.positionAbsolute.x - node.positionAbsolute.x;
          const dy = n.positionAbsolute.y - node.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          console.log(dx * dx, dy * dy, d);
          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      }
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource =
      closestNode.node.positionAbsolute.y != node.positionAbsolute.y &&
      closestNode.node.positionAbsolute.x != node.positionAbsolute.x;

    return {
      id: `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
    };
  }, []);

  const onNodeDrag = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);
      const intersections = getIntersectingNodes(node).map((n) => n.id);

      setNodes((ns) =>
        ns.map((n) => ({
          ...n,
          className: intersections.includes(n.id) ? "highlight" : "",
        }))
      );

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          closeEdge.className = "temp";
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges]
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (closeEdge) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge]
  );

  const isValidConnection = (connection) => {
    console.log("connection", { connection });
    return (
      (connection.sourceHandle == "client" &&
        connection.targetHandle == "server") ||
      (connection.sourceHandle == "server" &&
        connection.targetHandle == "server") ||
      (connection.sourceHandle == "client" &&
        connection.targetHandle == "database") ||
      (connection.sourceHandle == "server" &&
        connection.targetHandle == "database")
    );
  };

  const onConnectStart = (_, { nodeId, handleType }) =>
    console.log("on connect start", { nodeId, handleType });
  const onConnectEnd = (event) => console.log("on connect end", event);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  function addParentNodev2(parentNodeId, newNode, nodeHeight, nodeX) {
    const filteredNodes = nodes.filter((node) =>
      Object.keys(components).includes(node.id)
    );

    const filteredSubNodes = nodes.filter((node) => node.parentNode);

    if (filteredSubNodes.length > 0) {
      const unfilteredSubNodes = nodes.filter((node) => !node.parentNode);
    }

    const unfilteredNodes = nodes.filter(
      (node) => !Object.keys(components).includes(node.id)
    );

    const newNodeHeight = filteredNodes.length;

    const updatedNodes = filteredNodes.map((node, idx) => {
      node.parentNode = parentNodeId;
      node.extent = "parent";
      node.position.x = nodeX;
      node.position.y = nodeX * (idx + 1) + 50 * idx;
      console.log(node.position.y);
      return node;
    });

    newNode.style = {
      height: newNodeHeight * nodeHeight,
    };

    setNodes([...unfilteredNodes, ...updatedNodes, newNode]);
  }

  function addParentNodev3(newNode, componentsList) {
    const filteredNodes = nodes.filter((node) =>
      componentsList.includes(node.id)
    );

    const newNodes = [];

    const updatedHeight = [];

    const unfilteredNodes = nodes.filter(
      (node) => !componentsList.includes(node.id)
    );

    let params = {};

    const updatedNodes = filteredNodes.map((node) => {
      node.data.functionalities = {
        ...node.data.functionalities,
        ...newNode.data.functionalities,
      };
      const groupName = Object.keys(node.data.functionalities).join("_");
      console.log(
        stringifiedGroupName,
        "234g34dtwrfw3tf",
        node.data.functionalities
      );
      if (Object.keys(groupsList).includes(groupName)) {
        if (groupsList[groupName].nodesList.includes(node.id)) return node;
        node.position.y =
          groupsList[groupName].nodesList.length * 60 -
          10 * (groupsList[groupName].nodesList.length - 1);
        node.position.x = 10;
        node.parentNode = groupsList[groupName].name;
        node.extent = "parent";
        groupsList[groupName].nodesList.push(node.id);

        groupsList[groupName].height =
          groupsList[groupName].nodesList.length * 40 +
          (groupsList[groupName].nodesList.length + 1) * 10;
        updatedHeight[groupsList[groupName].name] =
          groupsList[groupName].height;
      } else {
        groupsList[groupName] = {
          name: newNode.id,
          nodesList: [node.id],
        };
        groupsList[groupName].height = 60;
        node.parentNode = groupsList[groupName].name;
        node.position.y = 10;
        node.position.x = 10;
        node.extent = "parent";
        const newNodeTest = { ...newNode };
        newNodeTest.id = generateRandomId();
        newNodeTest.type = newNode.type;
        newNodeTest.position = {
          x: newNode.position.x + 300,
          y: newNode.position.y,
        };
        newNode.data = {
          ...newNode.data,
          label: stringifiedGroupName,
        };
        newNode.type = "microserviceServiceGroupNode";
        newNodes.push(newNode);
        newNodes.push(newNodeTest);

        params = {
          source: newNode.id,
          target: newNodeTest.id,
          type: "smoothstep",
        };
      }
      setGroupsList({ ...groupsList });
      return node;
    });

    let finalNodes = [];

    if (newNodes.length !== 0) {
      finalNodes = [...newNodes, ...unfilteredNodes, ...updatedNodes];
    } else {
      finalNodes = [...unfilteredNodes, ...updatedNodes];
    }

    const parentNodes = [];

    finalNodes.reverse().forEach((node) => {
      if (Object.keys(updatedHeight).includes(node.id)) {
        node.style = {
          height: updatedHeight[node.id],
        };
      }

      if (
        node.type === "componentNode" &&
        node.parentNode &&
        !parentNodes.includes(node.parentNode)
      ) {
        parentNodes.push(node.parentNode);
      }
    });

    //     const cleanedNodes = finalNodes.filter((node) => {
    // return !(node.type === "microserviceServiceGroupNode" && !parentNodes.includes(node.id));
    //     });

    setNodes([...finalNodes]);

    if (Object.keys(params).length > 0) {
      setEdges((eds) => addEdge(params, eds));
    }
  }

  function addParentNode(addedNodes, parentNodeId, parentNodeHandle, type) {
    const edgeColor = parentEdgeColorTypes[type];
    addedNodes.forEach((target) => {
      const params = {
        source: target,
        sourceHandle: components[target],
        target: parentNodeId,
        targetHandle: parentNodeHandle,
        animated: true,
        markerStart: {
          type: MarkerType.ArrowClosed,
          width: 10,
          height: 10,
          color: edgeColor,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 10,
          height: 10,
          color: edgeColor,
        },
        style: {
          strokeWidth: 2,
          stroke: edgeColor,
        },
      };

      setEdges((eds) => addEdge(params, eds));
    });
  }

  function addServiceDiscovery(nodesList, parentNode, distance) {
    let updatedNodes = [];
    // setNodes((nodesList) =>
    const updated_nodes = nodesList.map((node, idx) => {
      if (Object.keys(components).includes(node.id)) {
        const tmpNode = { ...parentNode };
        const tmpNodeID = generateRandomId();
        // if (node.parentNode) {
        //   node.parentNode = nodes[]
        // }
        node.parentNode = tmpNodeID;
        node.extent = "parent";
        tmpNode.position = { ...node.position };
        node.position.x = distance;
        node.position.y = 10;
        tmpNode.id = tmpNodeID;
        node.draggable = false;
        node.zIndex = -1;
        updatedNodes = updatedNodes.concat(tmpNode);
      }
      return node;
    });
    // );
    console.log(
      "awdawdawdawdawdawdawd1234565twgf3",
      updatedNodes,
      updated_nodes
    );

    const newList = [...updated_nodes, ...updatedNodes];

    setNodes([...newList]);
  }

  const [popup, setPopup] = useState(false);
  const [tempNode, setTempNode] = useState({});

  function onSubmit(componentsList) {
    addParentNodev3(tempNode, componentsList);
    setPopup(false);
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const target_id = event.dataTransfer.getData("target_id");
      console.log(event);
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeId = generateRandomId();

      const newNode = {
        id: nodeId,
        className: target_id,
        type,
        position,
        data: {
          label: "",
          target_id: target_id,
          functionalities: {},
        },
      };

      if (!metaData.nodes[type]) {
        metaData.nodes[type] = {
          [nodeId]: newNode,
        };
      } else {
        metaData.nodes[type][nodeId] = newNode;
      }
      setMetaData({ ...metaData });

      if (type === "authenticationNode") {
        if (authNode) return;
        newNode.type = "authenticationNode";
        newNode.data.functionalities = { Authentication: true };
        setTempNode(() => newNode);
        setPopup(true);
      } else if (type === "serviceDiscoveryNode") {
        if (serviceNode) return;
        // addParentNodev2(nodeId, newNode, 80, 20);
        // addParentNode(Object.keys(components), nodeId, target_id, type);
        // setServiceNode(true);
        newNode.type = "serviceDiscoveryNode";
        newNode.data.functionalities = { ServiceDiscovery: true };
        setTempNode(() => newNode);
        setPopup(true);
      } else if (type === "logManagementNode") {
        if (logNode) return;
        // addParentNode(Object.keys(components), nodeId, target_id, type);
        // setLogNode(true);
        newNode.type = "logManagementNode";
        newNode.data.functionalities = { LogManagement: true };
        setTempNode(() => newNode);
        setPopup(true);
      } else {
        setComponents({ ...components, ...{ [nodeId]: target_id } });
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [
      reactFlowInstance,
      setNodes,
      setEdges,
      addEdge,
      addServiceDiscovery,
      addParentNode,
      setComponents,
    ]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onNodeDrag={onNodeDrag}
          // onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          style={{ background: bgColor }}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <MiniMap
          // nodeStrokeColor={(n) => {
          //   if (n.type === "input") return "#0041d0";
          //   if (n.type === "selectorNode") return bgColor;
          //   if (n.type === "output") return "#ff0072";
          // }}
          // nodeColor={(n) => {
          //   if (n.type === "selectorNode") return bgColor;
          //   return "#fff";
          // }}
          />
          <Controls />
          <Panel position="top-right">
            <button className="pannel-button" onClick={() => onLayout("LR")}>
              Format layout
            </button>
            <button
              className="pannel-button"
              onClick={() => console.log(edges, nodes, metaData)}
            >
              Print Layout
            </button>
            <button
              className="pannel-button"
              onClick={() =>
                setTesttt((testtt) => ({ count: testtt.count + 1 }))
              }
            >
              Append
            </button>
          </Panel>
        </ReactFlow>
      </div>
      <Sidebar />
      {!popup ? (
        <></>
      ) : (
        <DialogBox
          options={Object.keys(components)}
          open={popup}
          onSubmit={onSubmit}
        ></DialogBox>
      )}
    </div>
  );
};

export default MindMap;

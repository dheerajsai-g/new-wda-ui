import React from "react";
import {
  Container,
  Box,
  Grid,
  Paper,
  Divider,
  Typography,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { BorderColor } from "@mui/icons-material";
import posgresql from "../../assets/postgresql.svg";
import keycloak from "../../assets/keycloak.svg";
import mongo from "../../assets/mongo.png";
import eureka from "../../assets/eureka.jpg";
import elastic from "../../assets/elastic.jpg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    console.log(event);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("target_id", event.target.id);
    event.dataTransfer.event = event;
    event.dataTransfer.effectAllowed = "move";
  };

  const css_node_components = "dndnode components";

  return (
    <Container
      maxWidth={"xs"}
      background={"#f4f4f4"}
      sx={{ overflow: "auto", scrollbarColor: "#fff" }}
      style={{ maxHeight: "80vh" }}
    >
      <Divider sx={{ pt: 2 }}>
        <Typography variant="h6">Components</Typography>
      </Divider>
      <Grid container py={3} spacing={{ md: 1 }} columns={{ md: 12 }}>
        <Grid container item md={4}>
          <Container
            className={css_node_components}
            style={{ borderColor: "#ff0000", backgroundColor: "#ff000040" }}
            onDragStart={(event) => onDragStart(event, "componentNode")}
            id="client"
            draggable
          >
            Client
          </Container>
        </Grid>
        <Grid container item md={4}>
          <Container
            className={css_node_components}
            style={{ borderColor: "#00bfff", backgroundColor: "#00bfff40" }}
            onDragStart={(event) => onDragStart(event, "gatewayNode")}
            draggable
          >
            Gateway
          </Container>
        </Grid>
        <Grid container item md={4}>
          <Container
            className={css_node_components}
            style={{ borderColor: "#0041d0", backgroundColor: "#0041d040" }}
            onDragStart={(event) => onDragStart(event, "componentNode")}
            id="server"
            draggable
          >
            Server
          </Container>
        </Grid>
      </Grid>
      <Divider>
        <Typography variant="h6">Authentication</Typography>
      </Divider>
      <Grid container py={3} spacing={{ md: 1 }} columns={{ md: 12 }}>
        <Grid container item md={4}>
          <Box
            className="dndnode auth"
            style={{ borderColor: "#c5c5c5", backgroundColor: "#ffffff40" }}
            onDragStart={(event) => onDragStart(event, "authenticationNode")}
            draggable
          >
            <img
              id="keycloak"
              style={{
                objectFit: "contain",
                height: "fit-content",
                padding: "10px",
              }}
              src={keycloak}
            />
          </Box>
        </Grid>
      </Grid>
      <Divider>
        <Typography variant="h6">Database</Typography>
      </Divider>
      <Grid container py={3} spacing={{ md: 1 }} columns={{ md: 12 }}>
        <Grid container item md={4}>
          <Box
            className="dndnode database"
            style={{ borderColor: "#c5c5c5", backgroundColor: "#ffffff40" }}
            onDragStart={(event) => onDragStart(event, "databaseNode")}
            draggable
          >
            <img
              id="postgresDB"
              style={{
                objectFit: "contain",
                overflow: "hidden",
                padding: "20px",
              }}
              src={posgresql}
            />
          </Box>
        </Grid>
        <Grid container item md={4}>
          <Box
            className="dndnode database"
            style={{ borderColor: "#c5c5c5", backgroundColor: "#ffffff40" }}
            onDragStart={(event) => onDragStart(event, "databaseNode")}
            draggable
          >
            <img
              id="mongoDB"
              style={{
                objectFit: "contain",
                overflow: "hidden",
              }}
              src={mongo}
            />
          </Box>
        </Grid>
      </Grid>
      <Divider>
        <Typography variant="h6">Service Discovery</Typography>
      </Divider>
      <Grid container py={3} spacing={{ md: 1 }} columns={{ md: 12 }}>
        <Grid container item md={4}>
          <Box
            className="dndnode database"
            style={{ borderColor: "#c5c5c5", backgroundColor: "#ffffff40" }}
            onDragStart={(event) => onDragStart(event, "serviceDiscoveryNode")}
            draggable
          >
            <img
              id="eureka"
              style={{
                objectFit: "contain",
                padding: "20px",
                overflow: "hidden",
              }}
              src={eureka}
            />
          </Box>
        </Grid>
      </Grid>
      <Divider>
        <Typography variant="h6">Log Management</Typography>
      </Divider>
      <Grid container py={3} spacing={{ md: 1 }} columns={{ md: 12 }}>
        <Grid container item md={4}>
          <Box
            className="dndnode database"
            style={{ borderColor: "#c5c5c5", backgroundColor: "#ffffff40" }}
            onDragStart={(event) => onDragStart(event, "logManagementNode")}
            draggable
          >
            <img
              id="elastic"
              style={{
                objectFit: "contain",
                padding: "20px",
                overflow: "hidden",
              }}
              src={elastic}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

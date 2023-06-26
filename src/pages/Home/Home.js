import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/AppBar";
import { Container } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: 'column', height: '100vh' }}>
      {/* <Box height={"10px"} color={"red"}> */}
        <ResponsiveAppBar />
      {/* </Box> */}
      
          <Outlet />

    </Box>
  );
}

export default Dashboard;

import * as React from "react";
import { Container, Grid } from "@mui/material";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import MindMap from "./pages/MindMap";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="*" element={<NotFound/>} /> */}
        {/* <Route path="/" element={<Home1 />} /> */}
        {/* <Route path="/Login" element={<Login />} /> */}
        {/* <Route path="/Register" element={<Register />} /> */}
        <Route path="/" element={<Home />}>
          <Route path="mindmap" element={<MindMap />} />
          {/* <Route path="Organization" element={<Organization />} /> */}
          {/* <Route path="History" element={<History />} /> */}
        </Route>
        {/* <Route path="/Logout" element={<Logout />} />
        <Route path="/Testing" element={<GridTemplateAreas />} /> */}
      </Routes>
    </div>

    // <>
    //   <Grid
    //     container
    //     direction="column"
    //     justifyContent="center"
    //     alignItems="stretch"
    //   >
    //     <Grid item xs>
    //       <ResponsiveAppBar />
    //       <Toolbar />
    //     </Grid>
    //     <Grid item xs>
    //       {/* <Box display="flex" component="div" sx={{ justifyContent:"center", pt: 13, overflow: 'auto' }}> */}
    //       <Routes>
    //         <Route path="*" element={<NotFound />} />
    //         <Route path="/home" element={<Home />} />
    //         <Route path="/mindmap" element={<MindMap />} />
    //         {/* <Route path="/Register" element={<Register />} /> */}
    //         {/* <Route path="/Dashboard" element={<Dashboard />}> */}
    //         {/* <Route path="" element={<DashboardMain />} /> */}
    //         {/* <Route path="Organization" element={<Organization />} /> */}
    //         {/* <Route path="History" element={<History />} /> */}
    //         {/* </Route> */}
    //         {/* <Route path="/Logout" element={<Logout />} /> */}
    //         {/* <Route path="/Testing" element={<GridTemplateAreas />} /> */}
    //       </Routes>
    //       {/* </Box> */}
    //       {/* </Container> */}
    //     </Grid>
    //   </Grid>
    // </>
  );
}

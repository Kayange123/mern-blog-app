import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { SideBar } from "../../containers/index";

const Layout = ({ user }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        user={user}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        drawerWidth="250px"
        isNonMobile={isNonMobile}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

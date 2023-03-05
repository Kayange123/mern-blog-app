import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { setMode } from "../../reducers/globalSlice";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  useTheme,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBox from "../FlexBox";
import { LOGOUT } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { useDecodedToken } from "../../hooks/useDecodedToken";

const Navbar = ({ user, isSideBarOpen, setIsSideBarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const isOpen = Boolean(anchorEl1);
  const decodedToken = useDecodedToken();

  const handleClose = () => setAnchorEl1(null);
  const handleClick = (e) => setAnchorEl1(e.currentTarget);
  const logout = () => {
    dispatch({ type: LOGOUT });
    handleClose();
    localStorage.clear();
    navigate("/popular");
  };

  useEffect(() => {
    if (decodedToken) logout();
  });
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBox>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBox
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            p="0.1rem 1.5rem"
            gap="3rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton onClick={() => {}}>
              <Search />
            </IconButton>
          </FlexBox>
        </FlexBox>
        <FlexBox gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
          {user ? (
            <FlexBox>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Avatar>
                  {user?.result.imageUrl || user?.result.name.charAt(0)}
                </Avatar>
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    fontSize="0.7rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                open={isOpen}
                anchorEl={anchorEl1}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </FlexBox>
          ) : (
            <FlexBox>
              <Button
                onClick={() => navigate("/auth")}
                type="button"
                variant="outlined"
                sx={{
                  color: theme.palette.primary[100],
                  borderColor: theme.palette.primary[200],
                  "&:hover": {
                    borderColor: theme.palette.primary[200],
                  },
                }}
              >
                Login
              </Button>
            </FlexBox>
          )}
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

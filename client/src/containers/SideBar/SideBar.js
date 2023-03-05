import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ChevronLeft,
  SettingsOutlined,
  HomeOutlined,
  AddAPhotoOutlined,
  SearchOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBox from "../../components/FlexBox";

const navList = [
  {
    text: "Home",
    icon: <HomeOutlined />,
  },
  {
    text: "Search",
    icon: <SearchOutlined />,
  },
  {
    text: "Photo",
    icon: <AddAPhotoOutlined />,
  },
  {
    text: "Profile",
    icon: <AccountCircleOutlined />,
  },
];

const SideBar = ({
  user,
  drawerWidth,
  isNonMobile,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          variant="persistent"
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(!isSideBarOpen)}
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              p: "1rem, 2rem",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBox color={theme.palette.secondary.main}>
                <Box display="flex" justifyContent="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Gallery
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBox>
            </Box>
            <List>
              {navList.map(({ icon, text }) => {
                const lowerText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setActive(lowerText);
                        navigate(`/${lowerText}`);
                      }}
                      sx={{
                        backgroundColor:
                          active === lowerText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lowerText
                            ? theme.palette.primary[300]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === lowerText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text}>{}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box bottom="2rem" position="absolute">
            <Divider />
            <FlexBox gap="1rem" textTransform="none" m="1.5rem 2rem 0 3rem ">
              <Avatar>
                {user?.result.imageUrl || user?.result.name.charAt(0)}
              </Avatar>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.result.name}
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>
              </Box>
              <IconButton>
                <SettingsOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </IconButton>
            </FlexBox>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;

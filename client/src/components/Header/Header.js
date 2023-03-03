import React, { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Stack,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddAPhoto, Home } from "@material-ui/icons";
import { LOGOUT } from "../../constants/actionTypes";
import { IconButton } from "@material-ui/core";
import { useDecodedToken } from "../../hooks/useDecodedToken";
import { useStyles } from "../../styles/styles";
const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    navigate("/popular");
  };
  const isTokenExpired = useDecodedToken(user?.token);
  useEffect(() => {
    if (isTokenExpired) logout();
  });
  const profileView = () => {
    navigate(`/users/profile/${user?.result?._id}`);
  };
  return (
    <header id="header">
      <div className="nav-menu">
        <CssBaseline />
        <Toolbar>
          <div>
            <Typography
              component={Link}
              to={user ? "/blogs" : "/popular"}
              variant="h5"
              className="navbar-brand"
            >
              ballEr
            </Typography>
          </div>

          <Box className={classes.toolbar}>
            {user && (
              <Stack direction={"row"}>
                <IconButton color="primary">
                  <Home />
                </IconButton>
                <Tab
                  className="nav-item"
                  LinkComponent={Link}
                  to="/blogs/add"
                  label={<AddAPhoto />}
                />
              </Stack>
            )}
          </Box>
          <Box marginLeft="auto" display="flex">
            {user ? (
              <Toolbar className="dropdown">
                <Typography>{user?.result?.name}</Typography>
                <Button
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Avatar>
                    {user?.result?.imageUrl || user?.result?.name.charAt(0)}
                  </Avatar>
                </Button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={profileView}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </Toolbar>
            ) : (
              <Button
                className="btn btn-primary btn-sm"
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </div>
    </header>
  );
};

export default Header;

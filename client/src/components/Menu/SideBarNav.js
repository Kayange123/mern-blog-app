import { Container } from "@material-ui/core";
import { Home } from "@mui/icons-material";
import React from "react";
import useStyles from "../../styles/styles";
const SideBarNav = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <nav id="navbar" className={classes.nav_menu}>
        <ul>
          <li className={classes.li}>
            <a href="#hero" className={classes.nav_menu_a}>
              <Home />
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link scrollto">
              <i className="bx bx-user"></i> <span>About</span>
            </a>
          </li>
          <li>
            <a href="#resume" className="nav-link scrollto">
              <i className="bx bx-file-blank"></i> <span>Resume</span>
            </a>
          </li>
          <li>
            <a href="#portfolio" className="nav-link scrollto">
              <i className="bx bx-book-content"></i> <span>Portfolio</span>
            </a>
          </li>
          <li>
            <a href="#services" className="nav-link scrollto">
              <i className="bx bx-server"></i> <span>Services</span>
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link scrollto">
              <i className="bx bx-envelope"></i> <span>Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default SideBarNav;

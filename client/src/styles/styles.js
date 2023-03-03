import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    position: "static",
    height: "200",
    minWidth: "100%",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    display: "block",
    maxWidth: "20%",
    margin: "0 2px",
    color: "white",
    textDecoration: "none",
  },
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 9997,
    transition: "all 1.5s",
    padding: 15,
    overflowY: "auto",
  },
  nav_menu: {
    padding: 0,
    display: "block",
  },
  li: {
    position: "relative",
    whiteSpace: "nowrap",
  },
  nav_menu_a: {
    display: "flex",
    alignItems: "center",
    color: "#45505b",
    padding: "10px 18px",
    marginBottom: "8px",
    transition: "0.3s",
    fontSize: "15px",
    borderRadius: "50px",
    background: "#f2f3f5",
    height: "56px",
    width: "100%",
    overflow: "hidden",
  },
}));

export default useStyles;

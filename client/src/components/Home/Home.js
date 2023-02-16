import React from "react";
import { Container } from "@mui/system";
import Blogs from "../Blogs/Blogs";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <Container>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        ></Grid>
      </Container>
    </Container>
  );
};

export default Home;

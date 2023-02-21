import * as React from 'react';
import {Link} from "react-router-dom";
import UserCard from "./UserCard";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const AppBar = () => {
  return (
      <Grid container spacing={2} p={2} alignItems="center">
        <Grid item xs={2}>
          <Box><h3>Employee Polls</h3></Box>
        </Grid>
        <Grid item xs={8} textAlign={"center"}>
          <Button component={Link} to="/" key="home">Home</Button>
          <Button component={Link} to="/add" key="new">Add poll</Button>
          <Button component={Link} to="/leaderboard" key="leaderboard">Leaderboard</Button>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <UserCard/>
          </Box>
        </Grid>
      </Grid>
  );
};
export default AppBar;
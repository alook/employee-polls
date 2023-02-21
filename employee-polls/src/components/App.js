import {useEffect} from "react";
import {connect} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {handleInitialData} from "../actions/shared";
import AppBar from "./AppBar";
import Polls from "./Polls";
import AddPoll from "./AddPoll";
import Poll from "./Poll";
import ProtectedComponent from "./ProtectedComponent";
import Logout from "./Logout"
import Leaderboard from "./Leaderboard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import LoadingBar, {hideLoading, showLoading} from 'react-redux-loading-bar'

const App = (props) => {
  useEffect(() => {
    props.dispatch(showLoading());
    props.dispatch(handleInitialData()).finally(
        () => props.dispatch(hideLoading())
    )
  }, [props]);
  return (
      <Grid container>
        <Grid item xs={12}>
          <LoadingBar />
          <AppBar/>
        </Grid>
        <Grid item xs={12}>
          {props.loading === true ? (
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
              </Box>
          ) : (
              <Routes>
                <Route path="/" exact element={<ProtectedComponent><Polls/></ProtectedComponent>}/>
                <Route path="/question/:id" element={<ProtectedComponent><Poll/></ProtectedComponent>}/>
                <Route path="/add" element={<ProtectedComponent><AddPoll/></ProtectedComponent>}/>
                <Route path="/leaderboard" element={<ProtectedComponent><Leaderboard/></ProtectedComponent>}/>
                <Route path="/logout" element={<Logout/>}/>
              </Routes>
          )}
        </Grid>
      </Grid>
  );
};

const mapStateToProps = ({authedUser, questions, users}) => ({
  authedUser: authedUser,
  loading: Object.keys(questions).length === 0 || Object.keys(users).length === 0
});

export default connect(mapStateToProps)(App);

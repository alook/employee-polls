import {connect} from "react-redux";
import * as React from 'react';
import LeaderboardListItem from "./LeaderboardListItem";
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const Leaderboard = (props) => {

  return (
      <Box sx={{width: '100%'}}>
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
          {props.leaderboardUsers.map((leaderboardUser) => (
              <LeaderboardListItem key={leaderboardUser.id} leaderboardUser={leaderboardUser}/>
          ))}
        </List>
      </Box>
  );
};

const mapStateToProps = ({users}) => {
  if (users !== null) {
    const leaderboardUsers = Object.values(users).map((user) => {
      const numQuestions = user.questions.length
      const numAnswers = Object.keys(user.answers).length
      const numTotal = numQuestions + numAnswers
      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        numQuestions,
        numAnswers,
        numTotal
      }
    })
    return {
      leaderboardUsers: Object.values(leaderboardUsers)
          .sort((u1, u2) => (u2.numTotal - u1.numTotal))
    }
  } else {
    return {
      leaderboardUsers: []
    }
  }
};

export default connect(mapStateToProps)(Leaderboard);
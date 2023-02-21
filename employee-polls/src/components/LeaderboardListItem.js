import * as React from "react";
import {Fragment} from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const LeaderboardListItem = (props) => {
  const {leaderboardUser} = props;
  return (
      <Fragment>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={leaderboardUser.id} src={leaderboardUser.avatarURL}/>
          </ListItemAvatar>
          <ListItemText
              primary={leaderboardUser.name + " (" + leaderboardUser.id + ")"}
              secondary={"Asked: " + leaderboardUser.numQuestions + ", Answered: " + leaderboardUser.numAnswers + ", Total: " + leaderboardUser.numTotal}
          />
        </ListItem>
        <Divider variant="inset" component="li"/>
      </Fragment>
  )
}

LeaderboardListItem.propTypes = {
  leaderboardUser: PropTypes.object.isRequired
};

export default LeaderboardListItem;
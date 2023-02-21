import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import * as React from "react";

const UserCard = (props) => {
  if (props.authedUser === null) {
    return null
  } else return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box sx={{m: 1}}>
          {props.avatarURL !== null ? (
              <Avatar alt={props.authedUser} src={props.avatarURL}/>
          ) : null}
        </Box>
        <Box sx={{m: 1}}>
          {props.authedUser}
        </Box>
        <Box sx={{m: 1}}>
          <Link to="/logout">Logout</Link>
        </Box>
      </Box>
  )
}

const mapStateToProps = ({authedUser, users}) => {
  return {
    authedUser: authedUser,
    avatarURL: users[authedUser]?.avatarURL
  }
}

export default connect(mapStateToProps)(UserCard);
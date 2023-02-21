import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import PropTypes from "prop-types";

const UserCard = (props) => {
  const {authedUser, avatarURL} = props
  if (authedUser === null) {
    return null
  } else return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box sx={{m: 1}}>
          {avatarURL !== null ? (
              <Avatar alt={authedUser} src={avatarURL}/>
          ) : null}
        </Box>
        <Box sx={{m: 1}}>
          {authedUser}
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

UserCard.propTypes = {
  authedUser: PropTypes.string,
  avatarURL: PropTypes.string
};

export default connect(mapStateToProps)(UserCard);
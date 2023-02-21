import {useState} from "react";
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PropTypes from "prop-types";

const Login = ({dispatch, userIds}) => {
  const [userId, setUserId] = useState(userIds[0]);

  const handleChange = (e) => {
    e.preventDefault()
    setUserId(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(userId))
  };

  return (
      <Box sx={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
        <Box>
          <h3 className="center">Select a user and login</h3>
        </Box>
        <Box>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Select value={userId} onChange={handleChange}>
                {userIds.map((user) => (
                    <MenuItem key={user} value={user}>{user}</MenuItem>
                ))}
              </Select>
              <Button type="submit">Login</Button>
            </FormControl>
          </form>
        </Box>
      </Box>
  );
};

const mapStateToProps = ({users}) => {
  return {
    userIds: Object.keys(users)
  };
};

Login.propTypes = {
  userIds: PropTypes.array.isRequired
};
export default connect(mapStateToProps)(Login);
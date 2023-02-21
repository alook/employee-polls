import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
import {useEffect} from "react";
import Box from '@mui/material/Box';

const Logout = ({dispatch}) => {
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(setAuthedUser(null))
    navigate("/")
  })
  return (
      <Box sx={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
        <p>Good bye!</p>
      </Box>
  )
}

export default connect()(Logout);
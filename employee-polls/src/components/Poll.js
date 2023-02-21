import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {formatQuestion} from "../utils/helpers";
import PollOptionBox from "./PollOptionBox";
import Box from '@mui/material/Box';
import PropTypes from "prop-types";

const Poll = (props) => {

  if (props.question === null) {
    return (
        <Box sx={{justifyContent: "center", alignItems: "center", minHeight: "100vh", textAlign: "center"}}>
          <h2>This question doesn't exist</h2>
        </Box>
    )
  }

  const {
    id,
    author,
    avatarURL,
  } = props.question;

  return (
      <Box sx={{justifyContent: "center", alignItems: "center", minHeight: "100vh", textAlign: "center"}}>
        <h2>Poll by {author}</h2>
        <img src={avatarURL} alt={`Avatar of ${author}`} className="avatar"/>
        <h1>Would you rather</h1>
        <Box sx={{display: "flex", margin: "auto"}}>
          <PollOptionBox qid={id} option="optionOne"/>
          <PollOptionBox qid={id} option="optionTwo"/>
        </Box>
      </Box>
  );
};

const withRouter = (Component) => {
  return (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{location, navigate, params}}/>;
  };
};

const mapStateToProps = ({authedUser, questions, users}, props) => {
  const {id} = props.router.params;
  const question = questions[id];
  return {
    id,
    question: question
        ? formatQuestion(question, users[question.author])
        : null,
    authedUser
  };
};

Poll.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.object,
  authedUser: PropTypes.string.isRequired
};
export default withRouter(connect(mapStateToProps)(Poll));
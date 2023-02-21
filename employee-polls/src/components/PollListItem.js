import {Fragment} from "react";
import {connect} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {formatQuestion} from "../utils/helpers";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const PollListItem = (props) => {
  const {id, author, optionOne, optionTwo, avatarURL, timestamp} = props.question;
  const navigate = useNavigate();

  const toQuestion = (e, id) => {
    e.preventDefault();
    navigate(`/question/${id}`);
  };

  return (
      <Fragment>
        <ListItem component={Link} to={"/question/" + id} alignItems="flex-start" onClick={(e) => toQuestion(e, id)}>
          <ListItemAvatar>
            <Avatar alt={author} src={avatarURL}/>
          </ListItemAvatar>
          <ListItemText
              primary={author + " (" + timestamp + ")"}
              secondary={optionOne.text + " / " + optionTwo.text}
          />
        </ListItem>
        <Divider variant="inset" component="li"/>
      </Fragment>
  );
};

const mapStateToProps = ({authedUser, users, questions}, {id}) => {
  const question = questions[id];
  return {
    question: question
        ? formatQuestion(question, users[question.author])
        : null,
  };
};

PollListItem.propTypes = {
  question: PropTypes.object
};

export default connect(mapStateToProps)(PollListItem);
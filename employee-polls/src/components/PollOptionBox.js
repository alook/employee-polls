import {connect} from "react-redux";
import {formatQuestion} from "../utils/helpers";
import {handleAnswerQuestion} from "../actions/questions";
import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

const PollOptionBox = (props) => {
  const {dispatch, question, authedUser, option, answered, ownAnswer, optionPercent, loading} = props;

  const handleAnswer = (event, option) => {
    event.preventDefault();
    dispatch(
        handleAnswerQuestion({
          'qid': question.id,
          'authedUser': authedUser,
          'answer': option
        })
    );
  };

  return (
      loading === true ? (
          <Box sx={{margin: "auto", border: "1px dashed #1976d2"}} p={2}>
            <CircularProgress/>
          </Box>
      ) : (
          <Box sx={{margin: "auto", border: "1px dashed #1976d2"}} p={2}>
            <p>{question[option].text}</p>
            {answered ?
                <Box>
                  <p>
                    {ownAnswer ? <ThumbUpIcon htmlColor="green"/> : <Button disabled>Vote</Button>}
                  </p>
                  <p>{question[option].votes.length} Votes{ownAnswer && ", including you!"} ({optionPercent}%)</p>
                </Box>
                : <Button onClick={(event) => handleAnswer(event, option)}>Vote</Button>
            }
          </Box>
      )
  )
}

const mapStateToProps = ({authedUser, questions, users}, {qid, option}) => {
  const question = questions[qid];
  const user = users[authedUser]
  if (question && user) {
    const votesTotal = question.optionOne.votes.length + question.optionTwo.votes.length
    let optionPercent = 0
    if (votesTotal > 0) {
      optionPercent = question[option].votes.length / votesTotal * 100
    }
    return {
      question: question
          ? formatQuestion(question, user)
          : null,
      option,
      authedUser,
      optionPercent: optionPercent.toFixed(2),
      answered: Object.keys(user.answers).includes(question.id),
      ownAnswer: user.answers[question.id] === option,
      loading: false
    };
  } else {
    return {
      loading: true
    }
  }
};

PollOptionBox.propTypes = {
  qid: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(PollOptionBox);
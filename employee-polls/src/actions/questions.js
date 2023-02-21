import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import {showLoading, hideLoading} from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(authedUser, question) {
  return {
    type: ADD_QUESTION,
    authedUser,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState();
    dispatch(showLoading());
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    }).then((question) => dispatch(addQuestion(authedUser, question)))
        .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({qid, authedUser, answer}) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(answerQuestion(info));
    return saveQuestionAnswer(info)
        .catch((e) => {
          console.warn("Error in handleAnswerQuestion: ", e);
          dispatch(answerQuestion(info));
          alert("The was an error answering the question. Try again.");
        })
        .finally(
            () => dispatch(hideLoading())
        );
  };
}
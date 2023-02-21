import {createAction} from "@reduxjs/toolkit";
import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import {showLoading, hideLoading} from "react-redux-loading-bar";

export const receiveQuestions = createAction("receiveQuestions")
export const addQuestion = createAction("addQuestion", (authedUser, question) => {
  return {
    payload: {
      authedUser,
      question
    }
  }
})
export const answerQuestion = createAction("answerQuestion", (qid, authedUser, answer) => {
  return {
    payload: {
      qid,
      authedUser,
      answer
    }
  }
})

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

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(answerQuestion(info.qid, info.authedUser, info.answer));
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
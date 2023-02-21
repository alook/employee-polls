import {receiveUsers} from "../actions/users";
import {answerQuestion} from "../actions/questions";
import {addQuestion} from "../actions/questions";
import {createReducer} from "@reduxjs/toolkit";

export const usersReducer = createReducer({}, (builder) => {
  builder
      .addCase(receiveUsers, (state, action) => {
        return action.payload
      })
      .addCase(addQuestion, (state, action) => {
        state[action.payload.authedUser].questions.push(action.payload.question)
      })
      .addCase(answerQuestion, (state, action) => {
        state[action.payload.authedUser].answers[action.payload.qid] = action.payload.answer
      })
})
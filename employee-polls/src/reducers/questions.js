import {createReducer} from '@reduxjs/toolkit'
import {receiveQuestions, addQuestion, answerQuestion} from "../actions/questions";

const OPTION_ONE = "optionOne"
const OPTION_TWO = "optionTwo"

export const questionsReducer = createReducer({}, (builder) => {
  builder
      .addCase(receiveQuestions, (state, action) => {
        return action.payload
      })
      .addCase(addQuestion, (state, action) => {
        state[action.payload.question.id] = action.payload.question
      })
      .addCase(answerQuestion, (state, action) => {
        if (action.payload.answer !== OPTION_ONE && action.payload.answer !== OPTION_TWO) {
          console.error("Invalid answer: " + action.payload.answer)
          return state
        }
        const newVotesOptionOne = state[action.payload.qid][OPTION_ONE].votes.filter(username => username !== action.payload.authedUser)
        if (action.payload.answer === OPTION_ONE) {
          newVotesOptionOne.push(action.payload.authedUser)
        }
        const newVotesOptionTwo = state[action.payload.qid][OPTION_TWO].votes.filter(username => username !== action.payload.authedUser)
        if (action.payload.answer === OPTION_TWO) {
          newVotesOptionTwo.push(action.payload.authedUser)
        }
        state[action.payload.qid].optionOne.votes = newVotesOptionOne
        state[action.payload.qid].optionTwo.votes = newVotesOptionTwo
      })
})
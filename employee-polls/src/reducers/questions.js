import {RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION} from "../actions/questions";

const OPTION_ONE = "optionOne"
const OPTION_TWO = "optionTwo"

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ANSWER_QUESTION:
      if (action.answer !== OPTION_ONE && action.answer !== OPTION_TWO) {
        console.error("Invalid answer: " + action.answer)
        return state
      }
      const newVotesOptionOne = state[action.qid][OPTION_ONE].votes.filter(username => username !== action.authedUser)
      if (action.answer === OPTION_ONE) {
        newVotesOptionOne.push(action.authedUser)
      }
      const newVotesOptionTwo = state[action.qid][OPTION_TWO].votes.filter(username => username !== action.authedUser)
      if (action.answer === OPTION_TWO) {
        newVotesOptionTwo.push(action.authedUser)
      }
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [OPTION_ONE]: {
            ...state[action.qid][OPTION_ONE],
            votes: newVotesOptionOne
          },
          [OPTION_TWO]: {
            ...state[action.qid][OPTION_TWO],
            votes: newVotesOptionTwo
          }
        }
      }
    default:
      return state;
  }
}
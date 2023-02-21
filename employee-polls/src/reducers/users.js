import {RECEIVE_USERS} from "../actions/users";
import {ANSWER_QUESTION} from "../actions/questions";
import {ADD_QUESTION} from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      let newQuestions = [...state[action.authedUser].questions];
      newQuestions.push(action.question)
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: newQuestions
        }
      }
    case ANSWER_QUESTION:
      let newAnswers = Object.assign({}, state[action.authedUser].answers);
      newAnswers[action.qid] = action.answer
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: newAnswers
        }
      }
    default:
      return state;
  }
}
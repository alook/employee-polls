import {configureStore} from "@reduxjs/toolkit";
import {authedUserReducer} from "./reducers/authedUser";
import {usersReducer} from "./reducers/users";
import {questionsReducer} from "./reducers/questions";
import {loadingBarReducer} from "react-redux-loading-bar";
import logger from "./middleware/logger";

const store = configureStore({
  reducer: {
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
    loadingBar: loadingBarReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
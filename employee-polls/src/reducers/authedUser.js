import {createReducer} from '@reduxjs/toolkit'
import {setAuthedUser} from "../actions/authedUser";

export const authedUserReducer = createReducer(null, (builder) => {
  builder
      .addCase(setAuthedUser, (state, action) => {
        return action.payload
      })
})
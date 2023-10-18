// ** Axios Imports
import axios from "axios"

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"

const endpoint = "/preliminary-assignment-answer"

export const addAnswer = createAsyncThunk(
  "answer/addAnswer",
  async (param, { getState }) => {
    const data = {
      ...param,
      idModule: getState().module.selectedModule.id,
      idStudent: getState().auth.userData.idStudent
    }
    return await axios.postForm(endpoint, data)
  }
)

export const homeAssignmentAnswerSlice = createSlice({
  name: "answer",
  initialState: {
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAnswer.pending, (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(addAnswer.fulfilled, addAnswer.rejected), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = homeAssignmentAnswerSlice.actions

export default homeAssignmentAnswerSlice.reducer

// ** Axios Imports
import axios from "axios"

// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

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
    answer: [],
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.answer = action.payload
        state.isLoading = false
      })
      .addCase(addAnswer.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addAnswer.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const { } = homeAssignmentAnswerSlice.actions

export default homeAssignmentAnswerSlice.reducer

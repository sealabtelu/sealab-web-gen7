// ** Axios Imports
import axios from "axios"

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"

const endpoint = "/journal-answer"

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

export const getFeedback = createAsyncThunk("journal/getJournal", async () => {
  return await axios.get("/journal-answer/list").then((res) => {
    return res.data.data
  })
})

export const homeAssignmentAnswerSlice = createSlice({
  name: "answer",
  initialState: {
    feedback: [],
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.feedback = action.payload
        state.isLoading = false
      })
      .addMatcher(isAnyOf(addAnswer.pending, getFeedback.pending), (state) => {
        state.isLoading = true
      })
      .addMatcher(
        isAnyOf(
          addAnswer.fulfilled,
          addAnswer.rejected,
          getFeedback.fulfilled,
          getFeedback.rejected
        ),
        (state) => {
          state.isLoading = false
        }
      )
  }
})

export const { } = homeAssignmentAnswerSlice.actions

export default homeAssignmentAnswerSlice.reducer

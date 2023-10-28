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

export const getAnswerList = createAsyncThunk("answer/getAnswerList", async () => {
  return await axios.get(`${endpoint}/list`).then((res) => {
    return res.data.data
  })
})

export const journalAnswerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: [],
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnswerList.fulfilled, (state, action) => {
        const baseURL = `${import.meta.env.VITE_API_BASE_URL}upload/`
        state.answers = action.payload.map((item) => ({
          ...item,
          filePath: `${baseURL}${item.filePath}`
        }))
      })
      .addMatcher(isAnyOf(addAnswer.pending, getAnswerList.pending), (state) => {
        state.isLoading = true
      })
      .addMatcher(
        isAnyOf(
          addAnswer.fulfilled,
          addAnswer.rejected,
          getAnswerList.fulfilled,
          getAnswerList.rejected
        ),
        (state) => {
          state.isLoading = false
        }
      )
  }
})

export const { } = journalAnswerSlice.actions

export default journalAnswerSlice.reducer

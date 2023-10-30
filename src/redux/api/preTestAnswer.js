// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/pre-test-answer'

export const addAnswer = createAsyncThunk('question/addAnswer', async (param, { getState }) => {
  const data = {
    ...param,
    idStudent: getState().auth.userData.idStudent
  }
  return await axios.post(endpoint, data)
})

export const getAnswerList = createAsyncThunk("answer/getAnswerList", async () => {
  return await axios.get(`${endpoint}/list`).then((res) => {
    return res.data.data
  })
})

export const preTestAnswerSlice = createSlice({
  name: 'answer',
  initialState: {
    answers: [],
    isLoading: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAnswerList.fulfilled, (state, action) => {
        state.answers = action.payload
      })
      .addMatcher(isAnyOf(
        addAnswer.pending,
        getAnswerList.pending
      ), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        addAnswer.fulfilled, addAnswer.rejected,
        getAnswerList.fulfilled, getAnswerList.rejected
      ), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = preTestAnswerSlice.actions

export default preTestAnswerSlice.reducer

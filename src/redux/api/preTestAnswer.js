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

export const preTestAnswerSlice = createSlice({
  name: 'answer',
  initialState: {
    isLoading: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(addAnswer.pending, (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        addAnswer.fulfilled, addAnswer.rejected
      ), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = preTestAnswerSlice.actions

export default preTestAnswerSlice.reducer

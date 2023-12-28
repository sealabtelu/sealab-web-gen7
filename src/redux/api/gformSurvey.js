// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/gform-survey'

export const verify = createAsyncThunk("gformSurvey/verify", async (_, { getState }) => {
  return await axios.get(`${endpoint}/verify/${getState().user.profile.idUser}`).then((res) => {
    return res.data.data
  })
})

export const gformSurveySlice = createSlice({
  name: 'gformSurvey',
  initialState: {
    isLoading: false,
    isSurveyFilled: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(verify.fulfilled, (state, action) => {
        state.isSurveyFilled = action.payload.isValid
      })
      .addMatcher(isAnyOf(
        verify.pending
      ), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        verify.fulfilled, verify.rejected
      ), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = gformSurveySlice.actions

export default gformSurveySlice.reducer

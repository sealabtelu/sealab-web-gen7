// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getStudents = createAsyncThunk('user/getStudents', async () => {
  return await axios.get('/student/list').then(res => {
    return res.data.data
  })
})


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    students: [],
    isLoading: false
  },

  extraReducers: builder => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload
        state.isLoading = false
      })
  }
})

export const { } = userSlice.actions

export default userSlice.reducer

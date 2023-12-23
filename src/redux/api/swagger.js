// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/swagger'

export const getSwaggerDoc = createAsyncThunk("swagger/getSwaggerDoc", async () => {
  return await axios.get(`${endpoint}`).then((res) => {
    return res.data
  })
})

export const swaggerSlice = createSlice({
  name: 'swagger',
  initialState: {
    isLoading: false,
    swaggerDoc: {}
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getSwaggerDoc.fulfilled, (state, action) => {
        delete action.payload['info']
        delete action.payload['security']
        delete action.payload['components']['securitySchemes']
        state.swaggerDoc = action.payload
        // state.swaggerDoc = {
        //   ...action.payload,
        //   servers: [{url: import.meta.env.VITE_API_BASE_URL}]
        // }
      })
      .addMatcher(isAnyOf(
        getSwaggerDoc.pending
      ), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        getSwaggerDoc.fulfilled, getSwaggerDoc.rejected
      ), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = swaggerSlice.actions

export default swaggerSlice.reducer

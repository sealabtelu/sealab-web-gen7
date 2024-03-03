// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston"
})

export const getRuntimes = createAsyncThunk("codePlayground/getRuntimes", async (_, { rejectWithValue }) => {
  try {
    return await API.get('/runtimes').then(({ data }) => data)
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const execute = createAsyncThunk("codePlayground/execute", async (data) => {
  return await API.post("/execute", data).then(({ data: { run: result } }) => {
    return result.output
  })
})

export const codePlaygroundSlice = createSlice({
  name: 'codePlayground',
  initialState: {
    output: null,
    snippets: {
      python: `print("Hello world!")`,
      c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello world!");\n\n\treturn 0;\n}`
    },
    isLoading: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(execute.fulfilled, (state, action) => {
        state.output = action.payload
      })
      .addMatcher(isAnyOf(
        getRuntimes.pending,
        execute.pending
      ), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        getRuntimes.fulfilled, getRuntimes.rejected,
        execute.fulfilled, execute.rejected
      ), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = codePlaygroundSlice.actions

export default codePlaygroundSlice.reducer

// ** Axios Imports
import axios from "axios"

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"

export const getStudents = createAsyncThunk("user/getStudents", async () => {
  return await axios.get("/student/list").then((res) => {
    return res.data.data
  })
})

export const editStudent = createAsyncThunk(
  "user/editStudent",
  async (param) => {
    console.log(param)
    return await axios.put("/student", param)
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: {
    students: [],
    isLoading: false
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(
          getStudents.fulfilled,
          editStudent.fulfilled,
          getStudents.rejected,
          editStudent.rejected
        ),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(getStudents.pending, editStudent.pending),
        (state) => {
          state.isLoading = true
        }
      )
  }
})

export const { } = userSlice.actions

export default userSlice.reducer

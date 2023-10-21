// ** Axios Imports
import axios from "axios"

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"

export const getStudents = createAsyncThunk("user/getStudents", async () => {
  return await axios.get("/student/list").then((res) => {
    return res.data.data
  })
})

export const editStudent = createAsyncThunk("user/editStudent", async (param) => {
  return await axios.put("/student", param)
})

export const changePassword = createAsyncThunk("user/changePassword", async (param, { getState, rejectWithValue }) => {
  const data = {
    ...param,
    idUser: getState().auth.userData.idUser
  }
  try {
    return await axios.post("/user/change-password", data)
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

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
      .addCase(editStudent.fulfilled, (state, action) => {
        const userData = JSON.parse(window.localStorage.getItem('userData'))
        localStorage.setItem('userData', JSON.stringify({
          ...userData,
          ...action.meta.arg,
          id: undefined
        }))
      })
      .addMatcher(
        isAnyOf(
          getStudents.fulfilled, getStudents.rejected,
          editStudent.fulfilled, editStudent.rejected,
          changePassword.fulfilled, changePassword.rejected
        ),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(getStudents.pending, editStudent.pending, changePassword.pending),
        (state) => {
          state.isLoading = true
        }
      )
  }
})

export const { } = userSlice.actions

export default userSlice.reducer

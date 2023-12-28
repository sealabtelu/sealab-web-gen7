// ** Axios Imports
import axios from "axios"

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

export const getStudents = createAsyncThunk("user/getStudents", async () => {
  return await axios.get("/student/list").then((res) => {
    return res.data.data
  })
})

export const editStudent = createAsyncThunk("user/editStudent", async (param, { rejectWithValue }) => {
  try {
    return await axios.put("/student", param)
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const changePassword = createAsyncThunk("user/changePassword", async (param, { getState, rejectWithValue }) => {
  const data = {
    ...param,
    idUser: getState().user.profile.idUser
  }
  try {
    return await axios.post("/user/change-password", data)
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const login = createAsyncThunk("user/login", async (param, { rejectWithValue }) => {
  try {
    return await axios.post("/user/login", param)
  } catch (err) {
    return rejectWithValue(err.response)
  }
})

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    students: [],
    profile: initialUser(),
    isLoading: false
  },
  reducers: {
    handleLogin: (state, action) => {
      state.profile = action.payload
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem(config.storageTokenKeyName, action.payload.appToken)
    },
    handleLogout: state => {
      state.profile = {}
      state[config.storageTokenKeyName] = null
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload
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
          login.fulfilled, login.rejected,
          getStudents.fulfilled, getStudents.rejected,
          editStudent.fulfilled, editStudent.rejected,
          changePassword.fulfilled, changePassword.rejected
        ),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(
          login.pending,
          getStudents.pending,
          editStudent.pending,
          changePassword.pending
        ),
        (state) => {
          state.isLoading = true
        }
      )
  }
})

export const { handleLogin, handleLogout } = userSlice.actions

export default userSlice.reducer

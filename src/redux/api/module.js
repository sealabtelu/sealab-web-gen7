// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getModules = createAsyncThunk('module/getModules', async () => {
  await axios.get('module/list').then(res => {
    const data = { ...res.data.data }
    return { data }
  })
})

export const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    module: []
  },
  reducers: {}
})

// export const { handleLogin, handleLogout } = authSlice.actions

export default moduleSlice.reducer

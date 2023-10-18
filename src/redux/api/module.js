// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const endpoint = "/module"

export const getModules = createAsyncThunk('module/getModules', async () => {
  return await axios.get(`${endpoint}/list`).then(res => {
    return res.data.data
  })
})

export const getPASubmissions = createAsyncThunk('question/getPASubmissions', async (_, { getState }) => {
  return await axios.get(`${endpoint}/submission/pa/${getState().auth.userData.idStudent}`).then(res => {
    return res.data.data
  })
})

export const getJSubmissions = createAsyncThunk('question/getJSubmissions', async (_, { getState }) => {
  return await axios.get(`${endpoint}/submission/j/${getState().auth.userData.idStudent}`).then(res => {
    return res.data.data
  })
})

const initialSelectedModule = () => {
  const item = window.localStorage.getItem('selectedModule')
  return item ? JSON.parse(item) : {}
}


export const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    modules: [],
    selectedModule: initialSelectedModule()
  },
  reducers: {
    selectModule: (state, action) => {
      state.selectedModule = action.payload
      localStorage.setItem('selectedModule', JSON.stringify(action.payload))
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getModules.fulfilled, (state, action) => {
      state.modules = action.payload
    })
    .addCase(getPASubmissions.fulfilled, (state, action) => {
      state.modules = action.payload
    })
    .addCase(getJSubmissions.fulfilled, (state, action) => {
      state.modules = action.payload
    })
  }
})

export const { selectModule } = moduleSlice.actions

export default moduleSlice.reducer

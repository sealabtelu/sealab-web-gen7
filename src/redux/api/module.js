// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getModules = createAsyncThunk('module/getModules', async () => {
  return await axios.get('/module/list').then(res => {
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
    builder.addCase(getModules.fulfilled, (state, action) => {
      state.modules = action.payload
    })
  }
})

export const { selectModule } = moduleSlice.actions

export default moduleSlice.reducer

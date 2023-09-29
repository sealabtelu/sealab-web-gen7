// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/seelabs'

export const getListGroup = createAsyncThunk('seelabs/getListGroup', async (param) => {
  return await axios.post(`${endpoint}/score/list-group`, param).then(res => {
    return res.data.data
  })
})

export const getGroupDetail = createAsyncThunk('seelabs/getGroupDetail', async (group, { getState }) => {
  const data = {
    ...getState().seelabs.currentDayShift,
    group
  }
  return await axios.post(`${endpoint}/score/list-group`, data).then(res => {
    return res.data.data
  })
})

const initialGroups = () => {
  const item = window.localStorage.getItem('seelabsGroups')
  return item ? JSON.parse(item) : {}
}

const initialSelectedGroup = () => {
  const item = window.localStorage.getItem('seelabsSelectedGroups')
  return item ? JSON.parse(item) : {}
}

const initialCurrentDayShift = () => {
  const item = window.localStorage.getItem('seelabsCurrentDayShift')
  return item ? JSON.parse(item) : {}
}

export const moduleSlice = createSlice({
  name: 'seelabs',
  initialState: {
    groups: initialGroups(),
    selectedGroup: initialSelectedGroup(),
    currentDayShift: initialCurrentDayShift(),
    isLoading: false,
    dayOptions: [
      { value: 1, label: 'Senin' },
      { value: 2, label: 'Selasa' },
      { value: 3, label: 'Rabu' },
      { value: 4, label: 'Kamis' },
      { value: 5, label: 'Jumat' },
      { value: 6, label: 'Sabtu' }
    ],
    shiftOptions: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' }
    ],
    moduleOptions: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' }
    ]
  },
  extraReducers: builder => {
    builder
      .addCase(getListGroup.fulfilled, (state, action) => {
        state.groups = action.payload
        state.currentDayShift = action.meta.arg
        localStorage.setItem('seelabsCurrentDayShift', JSON.stringify(action.meta.arg))
      })
      .addCase(getGroupDetail.fulfilled, (state, action) => {
        state.currentDayShift = {}
        state.selectedGroup = action.payload
        localStorage.removeItem('currentDayShift')
        localStorage.setItem('seelabsSelectedGroups', JSON.stringify(action.payload))
      })
      .addMatcher(isAnyOf(getListGroup.pending, getGroupDetail.pending), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(getListGroup.fulfilled, getListGroup.rejected, getGroupDetail.fulfilled, getGroupDetail.rejected), (state) => {
        state.isLoading = false
      })
  }
})

export const { selectGroup } = moduleSlice.actions

export default moduleSlice.reducer

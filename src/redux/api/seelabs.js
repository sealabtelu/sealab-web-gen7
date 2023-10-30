// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/seelabs'

export const getBAP = createAsyncThunk('seelabs/getBAP', async (date) => {
  return await axios.get(`${endpoint}/bap`, { params: { date } }).then(res => {
    return res.data.data
  })
})

export const getStudentScore = createAsyncThunk('seelabs/getStudentScore', async () => {
  return await axios.get(`${endpoint}/score/student`).then(res => {
    return res.data.data
  })
})

export const getGroupList = createAsyncThunk('seelabs/getGroupList', async (param) => {
  return await axios.post(`${endpoint}/group/list`, param).then(res => {
    return res.data.data
  })
})

export const getGroupDetail = createAsyncThunk('seelabs/getGroupDetail', async (param) => {
  return await axios.post(`${endpoint}/group/detail`, param).then(res => {
    return res.data.data
  })
})

export const inputScore = createAsyncThunk('seelabs/inputScore', async (param, { getState }) => {
  const data = {
    ...getState().seelabs.currentDSG,
    ...param
  }
  return await axios.post(`${endpoint}/score`, data)
})

export const getInputResult = createAsyncThunk('seelabs/inputResult', async (param) => {
  return await axios.get(`${endpoint}/score`, { params: { ...param } }).then(res => {
    return res.data.data
  })
})

const initialGroupDetail = () => {
  const item = window.localStorage.getItem('seelabsGroupDetail')
  return item ? JSON.parse(item) : {}
}

const initialCurrentDSG = () => {
  const item = window.localStorage.getItem('seelabsCurrentDSG')
  return item ? JSON.parse(item) : {}
}

export const seelabsSlice = createSlice({
  name: 'seelabs',
  initialState: {
    groups: [],
    groupDetail: initialGroupDetail(),
    currentDSG: initialCurrentDSG(),
    bap: [],
    score: [],
    isLoading: false,
    isSubmitLoading: false,
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
      .addCase(getGroupList.fulfilled, (state, action) => {
        state.groups = action.payload
        state.currentDSG = action.meta.arg
        localStorage.setItem('seelabsCurrentDSG', JSON.stringify(action.meta.arg))
      })
      .addCase(getGroupDetail.fulfilled, (state, action) => {
        state.groupDetail = action.payload
        state.currentDSG = action.meta.arg
        state.groups = []
        localStorage.setItem('seelabsGroupDetail', JSON.stringify(action.payload))
        localStorage.setItem('seelabsCurrentDSG', JSON.stringify(action.meta.arg))
      })
      .addCase(getBAP.fulfilled, (state, action) => {
        state.bap = action.payload ?? []
      })
      .addCase(getInputResult.fulfilled, (state, action) => {
        state.groups = action.payload ?? []
      })
      .addCase(getStudentScore.fulfilled, (state, action) => {
        state.score = action.payload ?? []
      })
      .addCase(getStudentScore.rejected, (state) => {
        state.score = []
      })
      .addCase(inputScore.pending, (state) => {
        state.isSubmitLoading = true
      })
      .addMatcher(isAnyOf(
        getGroupList.pending,
        getGroupDetail.pending,
        getBAP.pending,
        getStudentScore.pending,
        getInputResult.pending
      ), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        getGroupList.rejected, getGroupList.fulfilled,
        getGroupDetail.rejected, getGroupDetail.fulfilled,
        inputScore.rejected, inputScore.fulfilled,
        getBAP.rejected, getBAP.fulfilled,
        getStudentScore.rejected, getStudentScore.fulfilled,
        getInputResult.rejected, getInputResult.fulfilled
      ), (state) => {
        state.isSubmitLoading = false
        state.isLoading = false
      })
  }
})

export const { } = seelabsSlice.actions

export default seelabsSlice.reducer

// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/seelabs'

export const getProctorSchedule = createAsyncThunk('seelabs/getProctorSchedule', async () => {
  return await axios.get(`${endpoint}/proctor/schedule`).then(res => {
    return res.data.data
  })
})

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

export const updateScore = createAsyncThunk('seelabs/inputScore', async (param) => {
  return await axios.put(`${endpoint}/score`, param)
})

export const getInputResult = createAsyncThunk('seelabs/inputResult', async (param) => {
  return await axios.get(`${endpoint}/score`, { params: { ...param } }).then(res => {
    return res.data.data
  })
})

export const getInputDetail = createAsyncThunk('seelabs/getInputDetail', async (data) => {
  return await axios.post(`${endpoint}/score/detail`, data).then(res => {
    return res.data.data
  })
})

export const deleteInputResult = createAsyncThunk('seelabs/deleteInputResult', async (param, { rejectWithValue }) => {
  try {
    return await axios.delete(`${endpoint}/score`, { data: { ...param } })
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const getInputPreview = createAsyncThunk('seelabs/inputPreview', async (param) => {
  return await axios.post(`${endpoint}/score/result`, param).then(res => {
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
    proctorSchedule: [],
    inputScoreResult: [],
    inputScorePreview: {},
    inputScoreDetail: {},
    groupDetail: initialGroupDetail(),
    currentDSG: initialCurrentDSG(),
    currentModule: null,
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
  reducers: {
    setModule: (state, action) => {
      state.currentModule = action.payload
    },
    clearInputDetail: (state) => {
      state.inputScoreDetail = []
    }
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
      .addCase(getProctorSchedule.fulfilled, (state, action) => {
        state.proctorSchedule = action.payload ?? []
      })
      .addCase(getBAP.fulfilled, (state, action) => {
        state.bap = action.payload ?? []
      })
      .addCase(getInputResult.fulfilled, (state, action) => {
        state.inputScoreResult = action.payload ?? []
      })
      .addCase(getInputDetail.fulfilled, (state, action) => {
        state.inputScoreDetail = action.payload ?? {}
      })
      .addCase(getInputPreview.fulfilled, (state, action) => {
        state.inputScorePreview = action.payload ?? {}
      })
      .addCase(getStudentScore.fulfilled, (state, action) => {
        state.score = action.payload ?? {}
      })
      .addCase(getStudentScore.rejected, (state) => {
        state.score = []
      })      
      .addCase(getProctorSchedule.rejected, (state) => {
        state.proctorSchedule = []
      })
      .addMatcher(isAnyOf(
        inputScore.pending,
        updateScore.pending
      ), (state) => {
        state.isSubmitLoading = true
      })
      .addMatcher(isAnyOf(
        getProctorSchedule.pending,
        getGroupList.pending,
        getGroupDetail.pending,
        getBAP.pending,
        getStudentScore.pending,
        getInputResult.pending,
        getInputPreview.pending,
        getInputDetail.pending,
        deleteInputResult.pending
      ), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        getProctorSchedule.rejected, getProctorSchedule.fulfilled,
        getGroupList.rejected, getGroupList.fulfilled,
        getGroupDetail.rejected, getGroupDetail.fulfilled,
        inputScore.rejected, inputScore.fulfilled,
        updateScore.rejected, inputScore.fulfilled,
        getBAP.rejected, getBAP.fulfilled,
        getStudentScore.rejected, getStudentScore.fulfilled,
        getInputResult.rejected, getInputResult.fulfilled,
        getInputPreview.rejected, getInputPreview.fulfilled,
        getInputDetail.rejected, getInputDetail.fulfilled,
        deleteInputResult.rejected, deleteInputResult.fulfilled
      ), (state) => {
        state.isSubmitLoading = false
        state.isLoading = false
      })
  }
})

export const { setModule, clearInputDetail } = seelabsSlice.actions

export default seelabsSlice.reducer

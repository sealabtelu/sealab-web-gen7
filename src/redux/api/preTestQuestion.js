// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/pre-test-question'

export const getListQuestion = createAsyncThunk('question/getListQuestion', async (_, { getState }) => {
  return await axios.get(`${endpoint}/module/${getState().module.selectedModule.id}`).then(res => {
    return res.data.data
  })
})

export const addQuestion = createAsyncThunk('question/addQuestion', async (param, { getState }) => {
  const data = {
    ...param,
    idModule: getState().module.selectedModule.id,
    Type: "Text"
  }
  return await axios.post(endpoint, data)
})

export const editQuestion = createAsyncThunk('question/editQuestion', async (param, { getState }) => {
  const data = {
    ...param,
    idModule: getState().module.selectedModule.id,
    id: getState().preTestQuestion.selectedQuestion.id
  }
  return await axios.put(endpoint, data)
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (id) => {
  return await axios.delete(endpoint, { params: id })
})

const initialSelectedQuestion = () => {
  const item = window.localStorage.getItem('selectedPRTQ')
  return item ? JSON.parse(item) : {}
}

export const preTestQuestionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
    loading: false,
    selectedQuestion: initialSelectedQuestion()
  },
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload
      localStorage.setItem('selectedPRTQ', JSON.stringify(action.payload))
    },
    clearSelected: (state) => {
      state.selectedQuestion = {}
      localStorage.removeItem('selectedPRTQ')
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getListQuestion.fulfilled, (state, action) => {
        state.questions = action.payload
        state.loading = false
      })
      .addMatcher(isAnyOf(addQuestion.fulfilled, editQuestion.fulfilled, addQuestion.rejected, editQuestion.rejected), (state) => {
        state.loading = false
      })
      .addMatcher(isAnyOf(addQuestion.pending, editQuestion.pending), (state) => {
        state.loading = true
      })
  }
})

export const { selectQuestion, clearSelected } = preTestQuestionSlice.actions

export default preTestQuestionSlice.reducer

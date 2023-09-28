// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const endpoint = '/pre-test-question'

export const getQuestion = createAsyncThunk('question/getQuestion', async (_, { getState }) => {
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
    selectedQuestion: initialSelectedQuestion()
  },
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload
      localStorage.setItem('selectedPRTQ', JSON.stringify(action.payload))
    }
  },
  extraReducers: builder => {
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.questions = action.payload
    })
  }
})

export const { selectQuestion } = preTestQuestionSlice.actions

export default preTestQuestionSlice.reducer

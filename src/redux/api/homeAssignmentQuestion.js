// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getQuestion = createAsyncThunk('question/getQuestion', async (_, { getState }) => {
  return await axios.get(`/preliminary-assignment-question/module/${getState().module.selectedModule.id}`).then(res => {
    return res.data.data
  })
})

export const addQuestion = createAsyncThunk('question/addQuestion', async (param, { getState }) => {
  const data = {
    ...param,
    idModule: getState().module.selectedModule.id,
    Type: "Text"
  }
  return await axios.postForm('/preliminary-assignment-question', data)
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (id) => {
  return await axios.delete('/preliminary-assignment-question', { params: id })
})

const initialSelectedQuestion = () => {
  const item = window.localStorage.getItem('selectedHAQ')
  return item ? JSON.parse(item) : {}
}

export const homeAssignmentQuestionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
    selectedQuestion: initialSelectedQuestion()
  },
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload
      localStorage.setItem('selectedHAQ', JSON.stringify(action.payload))
    }
  },
  extraReducers: builder => {
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.questions = action.payload
    })
    builder.addCase(deleteQuestion.fulfilled, () => {
      getQuestion()
    })
  }
})

export const { selectQuestion } = homeAssignmentQuestionSlice.actions

export default homeAssignmentQuestionSlice.reducer

// ** Axios Imports
import axios from 'axios'

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'

const endpoint = '/preliminary-assignment-question'

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
  return await axios.postForm(endpoint, data)
})

export const editQuestion = createAsyncThunk('question/editQuestion', async (param, { getState }) => {
  const data = {
    ...param,
    id: getState().homeAssignmentQuestion.selectedQuestion.id
  }
  return await axios.putForm(endpoint, data)
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (id) => {
  return await axios.delete(endpoint, { params: id })
})

const initialSelectedQuestion = () => {
  const item = window.localStorage.getItem('selectedHAQ')
  return item ? JSON.parse(item) : {}
}

export const homeAssignmentQuestionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
    loading: false,
    selectedQuestion: initialSelectedQuestion()
  },
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload
      localStorage.setItem('selectedHAQ', JSON.stringify(action.payload))
    },
    clearSelected: (state) => {
      state.selectedQuestion = {}
      localStorage.removeItem('selectedHAQ')
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

export const { selectQuestion, clearSelected } = homeAssignmentQuestionSlice.actions

export default homeAssignmentQuestionSlice.reducer

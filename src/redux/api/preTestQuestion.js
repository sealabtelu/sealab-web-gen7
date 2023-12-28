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

export const getListQuestionStudent = createAsyncThunk('question/getListQuestionStudent', async (_, { getState, rejectWithValue }) => {
  try {
    return await axios.post(`${endpoint}/student`, {
      idModule: getState().module.selectedModule.id,
      idStudent: getState().user.profile.idStudent
    }).then(res => {
      return res.data.data
    })
  } catch (err) {
    return rejectWithValue(err.response)
  }
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
    isLoading: false,
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
    },
    clearQuestions: (state) => {
      state.questions = []
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(
        getListQuestion.fulfilled,
        getListQuestionStudent.fulfilled
      ), (state, action) => {
        state.questions = action.payload
      })
      .addMatcher(isAnyOf(
        addQuestion.fulfilled, addQuestion.rejected,
        editQuestion.fulfilled, editQuestion.rejected,
        getListQuestion.fulfilled, getListQuestion.rejected,
        getListQuestionStudent.fulfilled, getListQuestionStudent.rejected
      ), (state) => {
        state.isLoading = false
      })
      .addMatcher(isAnyOf(
        addQuestion.pending,
        editQuestion.pending,
        getListQuestion.pending,
        getListQuestionStudent.pending
      ), (state) => {
        state.isLoading = true
      })
  }
})

export const { selectQuestion, clearSelected, clearQuestions } = preTestQuestionSlice.actions

export default preTestQuestionSlice.reducer

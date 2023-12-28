// ** Axios Imports
import axios from "axios"
import { saveAs } from "file-saver"

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"

const endpoint = "/preliminary-assignment-answer"

export const addAnswer = createAsyncThunk(
  "answer/addAnswer",
  async (param, { getState }) => {
    const data = {
      ...param,
      idModule: getState().module.selectedModule.id,
      idStudent: getState().user.profile.idStudent
    }
    return await axios.postForm(endpoint, data)
  }
)

export const getAnswerList = createAsyncThunk("answer/getAnswerList", async () => {
  return await axios.get(`${endpoint}/list`).then((res) => {
    return res.data.data
  })
})

export const downloadSubmission = createAsyncThunk("answer/downloadSubmission", async ({ module, onDownload }) => {
  return await axios.get(`${endpoint}/download-zip/${module}`, {
    responseType: 'blob',
    onDownloadProgress: data => onDownload(data)
  }).then(response => {
    saveAs(response.data, `TP${module}.zip`)
  })
})

export const homeAssignmentAnswerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: [],
    isLoading: false,
    isDownloadLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnswerList.fulfilled, (state, action) => {
        const baseURL = `${import.meta.env.VITE_API_BASE_URL}/upload/`
        state.answers = action.payload.map((item) => ({
          ...item,
          filePath: `${baseURL}${item.filePath}`
        }))
      })
      .addCase(downloadSubmission.pending, (state) => {
        state.isDownloadLoading = true
      })
      .addMatcher(isAnyOf(addAnswer.pending, getAnswerList.pending), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(
        downloadSubmission.fulfilled, downloadSubmission.rejected
      ), (state) => {
        state.isDownloadLoading = false
      })
      .addMatcher(isAnyOf(
        addAnswer.fulfilled, addAnswer.rejected,
        getAnswerList.fulfilled, getAnswerList.rejected
      ), (state) => {
        state.isLoading = false
      })
  }
})

export const { } = homeAssignmentAnswerSlice.actions

export default homeAssignmentAnswerSlice.reducer

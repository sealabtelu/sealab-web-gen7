// ** Axios Imports
import axios from "axios";

// ** Redux Imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";

const endpoint = "/module";

export const getModules = createAsyncThunk("module/getModules", async () => {
  return await axios.get(`${endpoint}/list`).then((res) => {
    return res.data.data;
  });
});

export const getAllSubmissions = createAsyncThunk("question/getAllSubmissions", async (param) => {
  return await axios.post(`${endpoint}/submission/list`, param).then((res) => {
    return res.data.data;
  });
});

export const getPASubmissions = createAsyncThunk("question/getPASubmissions", async (_, { getState }) => {
  return await axios.get(`${endpoint}/submission/pa/${getState().user.profile.idStudent}`).then((res) => {
    return res.data.data;
  });
});

export const getPRTSubmissions = createAsyncThunk("question/getPRTSubmissions", async (_, { getState }) => {
  return await axios.get(`${endpoint}/submission/prt/${getState().user.profile.idStudent}`).then((res) => {
    return res.data.data;
  });
});

export const getJSubmissions = createAsyncThunk("question/getJSubmissions", async (_, { getState }) => {
  return await axios.get(`${endpoint}/submission/j/${getState().user.profile.idStudent}`).then((res) => {
    return res.data.data;
  });
});

export const getFTSubmissions = createAsyncThunk("question/getFTSubmissions", async (_, { getState }) => {
  return await axios.get(`${endpoint}/submission/ft/${getState().user.profile.idStudent}`).then((res) => {
    return res.data.data;
  });
});

export const setPAStatus = createAsyncThunk("module/setPAStatus", async (param) => {
  return await axios.post(`${endpoint}/set-pa-status`, param).then((res) => {
    return res.data.data;
  });
});

export const setPRTStatus = createAsyncThunk("module/setPRTStatus", async (param) => {
  return await axios.post(`${endpoint}/set-prt-status`, param).then((res) => {
    return res.data.data;
  });
});

export const setJStatus = createAsyncThunk("module/setJStatus", async (param) => {
  return await axios.post(`${endpoint}/set-j-status`, param).then((res) => {
    return res.data.data;
  });
});

export const setFTStatus = createAsyncThunk("module/setFTStatus", async (param) => {
  return await axios.post(`${endpoint}/set-ft-status`, param).then((res) => {
    return res.data.data;
  });
});

const initialSelectedModule = () => {
  const item = window.localStorage.getItem("selectedModule");
  return item ? JSON.parse(item) : {};
};

export const moduleSlice = createSlice({
  name: "module",
  initialState: {
    modules: [],
    submissions: [],
    isLoading: false,
    selectedModule: initialSelectedModule(),
  },
  reducers: {
    selectModule: (state, action) => {
      state.selectedModule = action.payload;
      localStorage.setItem("selectedModule", JSON.stringify(action.payload));
    },
    clearSubmissions: (state) => {
      state.submissions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubmissions.fulfilled, (state, action) => {
        const baseURL = `${import.meta.env.VITE_API_BASE_URL}/upload/`;
        state.submissions = action.payload.map((item) => ({
          ...item,
          paFilePath: item.paFilePath && `${baseURL}${item.paFilePath}`,
          jFilePath: item.jFilePath && `${baseURL}${item.jFilePath}`,
        }));
      })
      .addMatcher(
        isAnyOf(
          getModules.fulfilled,
          getPASubmissions.fulfilled,
          getPRTSubmissions.fulfilled,
          getJSubmissions.fulfilled,
          setPAStatus.fulfilled,
          setPRTStatus.fulfilled,
          setJStatus.fulfilled,
          setFTStatus.fulfilled,
          getFTSubmissions.fulfilled
        ),
        (state, action) => {
          state.modules = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getModules.pending,
          getPASubmissions.pending,
          getPRTSubmissions.pending,
          getJSubmissions.pending,
          getAllSubmissions.pending,
          setPAStatus.pending,
          setPRTStatus.pending,
          setJStatus.pending,
          setFTStatus.pending,
          getFTSubmissions.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getModules.fulfilled,
          getModules.rejected,
          getPASubmissions.fulfilled,
          getPASubmissions.rejected,
          getPRTSubmissions.fulfilled,
          getPRTSubmissions.rejected,
          getJSubmissions.fulfilled,
          getJSubmissions.rejected,
          getFTSubmissions.fulfilled,
          getFTSubmissions.rejected,
          getAllSubmissions.fulfilled,
          getAllSubmissions.rejected,
          setPAStatus.fulfilled,
          setPAStatus.rejected,
          setPRTStatus.fulfilled,
          setPRTStatus.rejected,
          setJStatus.fulfilled,
          setJStatus.rejected,
          setFTStatus.fulfilled,
          setFTStatus.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { selectModule, clearSubmissions } = moduleSlice.actions;

export default moduleSlice.reducer;

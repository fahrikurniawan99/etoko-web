import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../lib/axiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await makeRequest.post("/api/auth/local", {
        identifier: email,
        password: password,
      });
      return { username: data.user.username, email: data.user.email };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: null,
      email: null,
    },
    isLoading: false,
    isLogin: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setError: (state, action) => {
      state.isLogin = false;
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.user = {
        username: null,
        email: null,
      };
    },
    solveError: (state) => {
      state.isLogin = false;
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
      state.user = {
        username: null,
        email: null,
      };
    },
    logout: (state) => {
      state.errorMessage = "";
      state.isError = false;
      state.isLoading = false;
      state.isLogin = false;
      state.user = {
        username: null,
        email: null,
      };
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.user = action.payload;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogin = false;
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.user = {
        username: null,
        email: null,
      };
    });
  },
});

export const { setError, solveError, logout } = authSlice.actions;
export default authSlice.reducer;

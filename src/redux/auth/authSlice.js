import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import makeRequest from "../../lib/axiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, setSubmitting }, { rejectWithValue }) => {
    try {
      toast.loading("send data");
      const { data } = await makeRequest.post("/api/auth/local", {
        identifier: email,
        password: password,
      });
      toast.dismiss();
      toast.success("login successfull");
      setSubmitting(false);
      return {
        username: data.user.username,
        email: data.user.email,
        id: data.user.id,
        jwt: data.jwt,
      };
    } catch (error) {
      setSubmitting(false);
      toast.dismiss();
      toast.error("incorect password or email");
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
      id: null,
      jwt: null,
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
        id: null,
        jwt: null,
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
        id: null,
        jwt: null,
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
        id: null,
        jwt: null,
      };
      toast.success("Berhasil logout");
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
      window.location.href = "/";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogin = false;
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.user = {
        username: null,
        email: null,
        id: null,
        jwt: null,
      };
    });
  },
});

export const { setError, solveError, logout } = authSlice.actions;
export default authSlice.reducer;

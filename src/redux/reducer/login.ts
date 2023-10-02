import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "@/interface/Fetch";
import { AppState } from "../store";
import axios from "axios";

export type LoginState = {
  status: FetchState;
  username?: string;
  role?: string;
};

type PayloadLogin = {
  email: string;
  password: string;
};

const initialState: LoginState = {
  status: FetchState.IDLE,
};

async function fetchLogin(body: PayloadLogin) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/login`,
    body,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response;
}

export const login = createAsyncThunk(
  "users/login",
  async (data: PayloadLogin) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const response: any = await fetchLogin(body);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = FetchState.IDLE;
      })
      .addCase(login.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const selectSignIn = (state: AppState) => state.login;

export default LoginSlice.reducer;

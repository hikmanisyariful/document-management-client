import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "@/interface/Fetch";
import { AppState } from "../store";
import axios from "axios";

export type RegisterState = {
  status: FetchState;
};

type PayloadRegister = {
  username: string;
  email: string;
  password: string;
  roleId?: number;
};

const initialState: RegisterState = {
  status: FetchState.IDLE,
};

async function fetchRegister(body: PayloadRegister) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/register`,
    body,
    {
      headers: {
        Accept: "application/json",
      },
      withCredentials: false,
    }
  );
  return response;
}

export const register = createAsyncThunk(
  "users/register",
  async (data: PayloadRegister, { rejectWithValue }) => {
    const body = {
      username: data.username,
      email: data.email,
      password: data.password,
      roleId: data.roleId,
    };

    try {
      const response: any = await fetchRegister(body);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = FetchState.IDLE;
      })
      .addCase(register.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const {} = registerSlice.actions;

export const selectRegister = (state: AppState) => state.register;

export default registerSlice.reducer;

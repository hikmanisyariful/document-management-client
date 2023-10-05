import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "@/interface/Fetch";
import { AppState } from "../store";
import axios from "axios";
import { Cookies } from "react-cookie";

export type LoginState = {
  status: FetchState;
  data?: {
    username: string;
    role: string;
  };
};

type PayloadLogin = {
  email: string;
  password: string;
};

type ResponseLogin = {
  access_token: string;
  username: string;
  role: string;
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
  async (data: PayloadLogin, { rejectWithValue }) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const response: any = await fetchLogin(body);
      return response;
    } catch (error: any) {
      return rejectWithValue;
    }
  }
);

const cookie = new Cookies();

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<ResponseLogin>) => {
      if (action.payload.access_token) {
        cookie.set("key", action.payload.access_token);
      }

      state = {
        ...state,
        data: {
          username: action.payload.username,
          role: action.payload.role,
        },
      };
    },
    clearSession: () => {
      cookie.remove("key");
    },
  },
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

export const { setSession, clearSession } = loginSlice.actions;

export const selectLogin = (state: AppState) => state.login;

export default loginSlice.reducer;

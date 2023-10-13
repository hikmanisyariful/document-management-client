import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "@/interface/Fetch";
import { AppState } from "../store";
import axios from "axios";
import { Cookies } from "react-cookie";

type DataProfile = {
  username: string;
  email: string;
  role: string;
};

export type ProfileState = {
  status: FetchState;
  data?: DataProfile;
};

const initialState: ProfileState = {
  status: FetchState.IDLE,
};

const cookie = new Cookies();

async function fetchProfile(signal?: AbortSignal) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/profile`, {
    headers: {
      access_token: cookie.get("key"),
    },
    withCredentials: false,
    signal,
  });
  return response;
}

export const getProfile = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response: any = await fetchProfile(signal);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(getProfile.fulfilled, (state, action: any) => {
        state.status = FetchState.IDLE;
        state.data = {
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.Role.name,
        };
      })
      .addCase(getProfile.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const {} = profileSlice.actions;

export const selectProfile = (state: AppState) => state.profile;

export default profileSlice.reducer;

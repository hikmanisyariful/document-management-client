import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "@/interface/Fetch";
import { AppState } from "../store";
import axios from "axios";
import { Document } from "./document";
import { Cookies } from "react-cookie";

export type DetailDocumentState = {
  status: FetchState;
  data?: Document;
};

const initialState: DetailDocumentState = {
  status: FetchState.IDLE,
};

const cookie = new Cookies();

async function fetchDetailDocument(id: string, signal?: AbortSignal) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/documents/${id}`,
    {
      headers: {
        access_token: cookie.get("key"),
      },
      signal,
    }
  );
  return response;
}

export const getDetailDocument = createAsyncThunk(
  "users/register",
  async (id: string, { rejectWithValue, signal }) => {
    try {
      const response: any = await fetchDetailDocument(id, signal);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue;
    }
  }
);

export const DetailDocumentSlice = createSlice({
  name: "DetailDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailDocument.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(
        getDetailDocument.fulfilled,
        (state, action: PayloadAction<Document>) => {
          state.status = FetchState.IDLE;
          state.data = action.payload;
        }
      )
      .addCase(getDetailDocument.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const {} = DetailDocumentSlice.actions;

export const selectDetailDocument = (state: AppState) => state.detailDocument;

export default DetailDocumentSlice.reducer;

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

async function fetchDeleteDocument(id: string) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API}/documents/${id}`,
    {
      headers: {
        access_token: cookie.get("key"),
      },
    }
  );
  return response;
}

export const getDetailDocument = createAsyncThunk(
  "document/detail",
  async (id: string, { rejectWithValue, signal }) => {
    try {
      const response: any = await fetchDetailDocument(id, signal);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "document/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: any = await fetchDeleteDocument(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DetailDocumentSlice = createSlice({
  name: "DetailDocument",
  initialState,
  reducers: {
    resetData: (state) => {
      if (!state.data) return;
      state.data = undefined;
    },
  },
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
      })
      .addCase(deleteDocument.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(deleteDocument.fulfilled, (state) => {
        state.status = FetchState.IDLE;
        state.data = undefined;
      })
      .addCase(deleteDocument.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const { resetData } = DetailDocumentSlice.actions;

export const selectDetailDocument = (state: AppState) => state.detailDocument;

export default DetailDocumentSlice.reducer;

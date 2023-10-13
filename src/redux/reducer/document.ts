import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchState } from "@/interface/Fetch";
import { AppState } from "../store";
import axios from "axios";
import { Cookies } from "react-cookie";

export type Document = {
  id: number;
  fileId: string;
  fileName: string;
  fileURL: string;
  fileSize: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  User: {
    id: number;
    username: string;
  };
};

export type LoginState = {
  status: FetchState;
  statusUpload: FetchState;
  data?: Document[];
};

const initialState: LoginState = {
  status: FetchState.IDLE,
  statusUpload: FetchState.IDLE,
};

const cookie = new Cookies();

async function fetchUploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/upload`,
    formData,
    {
      headers: {
        access_token: cookie.get("key"),
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    }
  );
  return response;
}

async function fetchDocuments(signal?: AbortSignal) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/documents`, {
    headers: {
      access_token: cookie.get("key"),
    },
    withCredentials: false,
    signal,
  });
  return response;
}

export const uploadFile = createAsyncThunk(
  "document/uploadFile",
  async (file: File, { rejectWithValue }) => {
    try {
      const response: any = await fetchUploadFile(file);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const getDocuments = createAsyncThunk(
  "document/getDocument",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response: any = await fetchDocuments(signal);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const documentSlice = createSlice({
  name: "Documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.statusUpload = FetchState.LOADING;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.statusUpload = FetchState.IDLE;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.statusUpload = FetchState.FAILED;
      })
      .addCase(getDocuments.pending, (state) => {
        state.status = FetchState.LOADING;
      })
      .addCase(
        getDocuments.fulfilled,
        (state, action: PayloadAction<Document[]>) => {
          state.status = FetchState.IDLE;
          state.data = action.payload.reverse();
        }
      )
      .addCase(getDocuments.rejected, (state) => {
        state.status = FetchState.FAILED;
      });
  },
});

export const {} = documentSlice.actions;

export const selectDocuments = (state: AppState) => state.documents;

export default documentSlice.reducer;

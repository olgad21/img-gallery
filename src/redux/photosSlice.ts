import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiKey, host } from "../constants";
import Photo, { FlickrResponse } from "Interfaces";
import { getData } from "utils/data.utils";
import { RootState } from "./store";

type InitialStateType = {
  photos: Photo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialStateType = {
  photos: [],
  status: "idle",
  error: null,
};

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (searchedText: string = "cat") => {
    try {
      const response = await getData<FlickrResponse>(
        `${host}&api_key=${apiKey}&text=${searchedText}&per_page=100&page=1&format=json&nojsoncallback=1`
      );
      const photos = response.photos.photo;
      return photos;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = action.payload ?? [];
      })
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectStatus = (state: RootState) => state.photos.status;

// export const { addPhotos } = photosSlice.actions;

export default photosSlice.reducer;

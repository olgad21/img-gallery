import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import Photo, { FlickrResponse } from "Interfaces";
import { RootState } from "./store";

type InitialStateType = {
  photos: Photo[];
  // searchValue: string;
  // isLoading: boolean;
};

const initialState: InitialStateType = {
  photos: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
    }
  }
})

export const selectPhotos = (state: RootState) => state.photos.photos;

export const { addPhotos } = photosSlice.actions;

export default photosSlice.reducer;
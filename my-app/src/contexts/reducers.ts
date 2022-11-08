import Photo from "Interfaces";
import { PhotosActionType, UsersActionType } from "./context";

export const photosReducer = (state: Photo[], action: PhotosActionType | UsersActionType) => {
  if (action.type === 'addPhotos') {
    let stateCopy = [...state];
    return stateCopy = action.payload;
  } else {
    return state;
  }
}
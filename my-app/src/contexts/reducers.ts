import { User } from "../constants";
import Photo from "Interfaces";
import { PhotosActionType, UsersActionType } from "./context";

export const photosReducer = (
  state: Photo[],
  action: PhotosActionType | UsersActionType
) => {
  if (action.type === "addPhotos") {
    let stateCopy = [...state];
    return (stateCopy = action.payload);
  } else {
    return state;
  }
};

export const usersReducer = (
  state: User[],
  action: PhotosActionType | UsersActionType
) => {
  if (action.type === "addUsers") {
    return [...state, action.payload];
  } else {
    return state;
  }
};

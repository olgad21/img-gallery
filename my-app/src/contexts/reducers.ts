import { User } from "../constants";
import Photo from "Interfaces";
import {
  PerPageActionType,
  PageCountActionType,
  PhotosActionType,
  SortActionType,
  SortTypes,
  UsersActionType,
  PageActionType,
  SelectedPhotoActionType,
} from "./context";

export const photosReducer = (
  state: Photo[],
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
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
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => {
  if (action.type === "addUsers") {
    return [...state, action.payload];
  } else {
    return state;
  }
};

export const sortReducer = (
  state: SortTypes,
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => {
  if (action.type === "changeSorting") {
    let stateCopy = state;
    return (stateCopy = action.payload);
  } else {
    return state;
  }
};

export const perPageReducer = (
  state: number,
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => {
  if (action.type === "changePerPageCount") {
    let stateCopy = state;
    return (stateCopy = action.payload);
  } else {
    return state;
  }
};

export const pagesCountReducer = (
  state: number,
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => {
  if (action.type === "changePagesCount") {
    let stateCopy = state;
    return (stateCopy = action.payload);
  } else {
    return state;
  }
};

export const pageReducer = (
  state: number,
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => {
  if (action.type === "changePage") {
    let stateCopy = state;
    return (stateCopy = action.payload);
  } else {
    return state;
  }
};

export const selectedPhotoReducer = (
  state: Photo | null,
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => {
  if (action.type === "selectPhoto") {
    let stateCopy = state;
    return (stateCopy = action.payload);
  } else {
    return state;
  }
};

import { User } from "../constants";
import Photo from "Interfaces";
import React, { createContext, ReactNode, useReducer } from "react";
import {
  perPageReducer,
  pagesCountReducer,
  photosReducer,
  sortReducer,
  usersReducer,
  pageReducer,
  selectedPhotoReducer,
} from "./reducers";

export type SortTypes =
  | "date-posted-asc"
  | "date-posted-desc"
  | "interestingness-desc";

type InitialStateType = {
  photos: Photo[];
  users: User[];
  sort: SortTypes;
  perPage: number;
  pagesCount: number;
  page: number;
  selectedPhoto: Photo | null;
};

export type PhotosActionType = {
  type: "addPhotos";
  payload: Photo[];
};

export type UsersActionType = {
  type: "addUsers";
  payload: User;
};

export type SortActionType = {
  type: "changeSorting";
  payload: SortTypes;
};

export type PerPageActionType = {
  type: "changePerPageCount";
  payload: number;
};

export type PageCountActionType = {
  type: "changePagesCount";
  payload: number;
};

export type PageActionType = {
  type: "changePage";
  payload: number;
};

export type SelectedPhotoActionType = {
  type: "selectPhoto";
  payload: Photo | null;
};

const initialState: InitialStateType = {
  photos: [],
  users: [],
  sort: "date-posted-desc",
  perPage: 100,
  pagesCount: 1,
  page: 1,
  selectedPhoto: null,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
  >;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  state: InitialStateType,
  action:
    | PhotosActionType
    | UsersActionType
    | SortActionType
    | PerPageActionType
    | PageCountActionType
    | PageActionType
    | SelectedPhotoActionType
) => ({
  photos: photosReducer(state.photos, action),
  users: usersReducer(state.users, action),
  sort: sortReducer(state.sort, action),
  perPage: perPageReducer(state.perPage, action),
  pagesCount: pagesCountReducer(state.pagesCount, action),
  page: pageReducer(state.page, action),
  selectedPhoto: selectedPhotoReducer(state.selectedPhoto, action),
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

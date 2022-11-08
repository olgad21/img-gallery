import { User } from "../constants";
import Photo from "Interfaces";
import React, { createContext, ReactNode, useReducer } from "react";
import { photosReducer, usersReducer } from "./reducers";

type InitialStateType = {
  photos: Photo[];
  users: User[];
};

export type PhotosActionType = {
  type: "addPhotos";
  payload: Photo[];
};

export type UsersActionType = {
  type: "addUsers";
  payload: User;
};

const initialState: InitialStateType = {
  photos: [],
  users: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<PhotosActionType | UsersActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  state: InitialStateType,
  action: PhotosActionType | UsersActionType
) => ({
  photos: photosReducer(state.photos, action),
  users: usersReducer(state.users, action),
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../constants";
import { RootState } from "./store";

type InitialStateType = {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InitialStateType = {
  users: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;

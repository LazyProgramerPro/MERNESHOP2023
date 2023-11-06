/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../../../types/user.type";
import {
  PayloadAction,
  createSlice
} from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logOut: (state, action) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addDefaultCase((state, action) => {
      // console.log(`action type: ${action.type}`, current(state))
    });
  },
});

export const { loggedInUser, logOut } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;

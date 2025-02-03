import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/general/auth";
import { ResponseLogin } from "../interfaces/response/auth";

// Define a type for the slice state
interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  user: IUser | null;
  status: "idle" | true | false;
}

// Define the initial state using that type
const initialState: AuthState = {
  access_token: "",
  refresh_token: "",
  user: null,
  status: "idle",
};

export const AuthSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ResponseLogin>) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user;
      state.status = true;
    },
    setUnAuth: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.status = false;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const AuthReducer = AuthSlice.reducer;

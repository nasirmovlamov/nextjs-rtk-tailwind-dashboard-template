import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/general/auth";
import { ResponseLogin } from "../interfaces/response/auth";
import { deleteCookie } from "@/app/utils/deleteCookie";
import { setCookie } from "@/app/utils/setCookie";

// Define a type for the slice state
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
  status: "idle" | true | false;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  user: null,
  status: "idle",
};

export const AuthSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ResponseLogin>) => {
      state.accessToken = action.payload?.data?.accessToken;
      state.refreshToken = action.payload?.data?.refreshToken;
      if (action.payload?.data?.user) {
        state.user = action.payload?.data?.user;
      }
      state.status = true;
      setCookie("accessToken", action.payload?.data?.accessToken, 1);
      setCookie("refreshToken", action.payload?.data?.refreshToken, 1);
      setCookie("user", JSON.stringify(action.payload?.data?.user), 1);
    },

    setUnAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.status = false;
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("user");
    },
    
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const AuthReducer = AuthSlice.reducer;

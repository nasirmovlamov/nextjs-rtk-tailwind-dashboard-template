import { IUser } from "../general/auth";

export interface ResponseLogin {
  data: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  };
}

export interface ResponseAuth {
  data: IUser;
}

export interface ResponseLogout {
  data: null;
}

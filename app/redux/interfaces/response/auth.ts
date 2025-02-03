import { IUser } from "../general/auth";

export interface ResponseLogin {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface ResponseAuth {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface ResponseLogout {
  data: null;
}

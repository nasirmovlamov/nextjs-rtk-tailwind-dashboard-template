import { IAuthUser } from '../general/auth';

export interface ResponseLogin {
  data: {
    accessToken: string;
    refreshToken: string;
    user: IAuthUser;
  };
}

export interface ResponseAuth {
  data: IAuthUser;
}

export interface ResponseLogout {
  data: null;
}

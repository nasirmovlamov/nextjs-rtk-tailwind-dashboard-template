export interface IUser {
  id: number;
  username: string;
  email: string;
  roles: {
    roleName: string;
    privilegeNames: string[];
  }[];
}

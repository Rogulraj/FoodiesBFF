import { TokenData } from './auth.interface';

export interface User {
  _id?: string;
  email: string;
  password: string;
  accountType: string;
}

export interface CreateUserResponse {
  _id: string;
  email: string;
  accountType: string;
}

export interface UserLoginResponse {
  _id: string;
  email: string;
  tokenData: TokenData;
}

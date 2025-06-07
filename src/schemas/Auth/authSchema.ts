import { z } from "zod";

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: number;
  };
}

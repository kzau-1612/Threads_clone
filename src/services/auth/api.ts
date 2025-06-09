import apiClient from "../../lib/axios";
import {
  LoginData,
  LoginForm,
  ProfileData,
  RegisterData,
  RegisterFormType,
} from "../../schemas/Auth/authSchema";

export const login = async (data: LoginForm): Promise<LoginData> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterFormType): Promise<RegisterData> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const getProfile = async (): Promise<ProfileData> => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};

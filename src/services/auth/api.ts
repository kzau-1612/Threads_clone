import apiClient from "../../lib/axios";
import { LoginData, LoginForm } from "../../schemas/Auth/authSchema";

export const login = async (data: LoginForm): Promise<LoginData> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

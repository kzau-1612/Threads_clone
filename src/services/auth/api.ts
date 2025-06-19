import apiClient from "../../lib/axios";
import {
  ActiveAccountResponse,
  LoginData,
  LoginForm,
  ProfileData,
  RegisterData,
  RegisterFormType,
  SendEmailData,
  SendEmailResponse,
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

export const sendVerificationEmail = async (data: SendEmailData): Promise<SendEmailResponse> => {
  const response = await apiClient.post(
    "/auth/email/send-verification",
    {
      url_target: data.url_target,
    },
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );
  return response.data;
};

export const activeAccount = async (token: string): Promise<ActiveAccountResponse> => {
  const response = await apiClient.patch("/confirm-account", { token });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

import apiClient from "../../lib/axios";
import {
  ActiveAccountResponse,
  ForgotPasswordData,
  ForgotPasswordResponse,
  LoginData,
  LoginForm,
  ProfileData,
  RefreshTokenResponse,
  RegisterData,
  RegisterFormType,
  ResetPasswordData,
  ResetPasswordResponse,
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

export const forgotPassword = async (data: ForgotPasswordData): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post("/forgot-password", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordData): Promise<ResetPasswordResponse> => {
  const response = await apiClient.patch("/reset-password", data);
  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post("/auth/refresh");
  return response.data;
};

export const getGoogleRedirectUrl = () => {
  const params = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "email profile",
  };
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(params).toString()}`; // Chuyển đổi đối tượng URLSearchParams thành chuỗi URLs
  return url;
};

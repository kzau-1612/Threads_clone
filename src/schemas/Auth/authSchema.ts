import { z } from "zod";
import { MESSAGES } from "../../utils/message";

//login
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

const vietnamPhoneRegex = /(0|\+84)\d{9,10}/;
//Register
export const RegisterForm = z
  .object({
    name: z
      .string()
      .min(1, MESSAGES.AUTH.REGISTER.NAME_REQUIRED)
      .min(MESSAGES.AUTH.REGISTER.NAME_MIN_LENGTH, MESSAGES.AUTH.REGISTER.NAME_MIN_LENGTH_MESSAGE),
    username: z
      .string()
      .min(1, "Vui lòng nhập tên đăng nhập")
      .min(
        MESSAGES.AUTH.REGISTER.USERNAME_MIN_LENGTH,
        MESSAGES.AUTH.REGISTER.USERNAME_MIN_LENGTH_MESSAGE
      ),
    email: z
      .string()
      .min(1, MESSAGES.AUTH.REGISTER.EMAIL_REQUIRED)
      .email(MESSAGES.AUTH.REGISTER.EMAIL_INVALID),
    phone: z
      .string()
      .min(1, MESSAGES.AUTH.REGISTER.PHONE_REQUIRED) // Đảm bảo không rỗng
      .regex(vietnamPhoneRegex, MESSAGES.AUTH.REGISTER.PHONE_INVALID),
    password: z
      .string()
      .min(
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH,
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH_MESSAGE
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;<>,.?~\\/]).+$/,
        MESSAGES.AUTH.REGISTER.PASSWORD_INVALID
      ),
    password_confirmation: z
      .string()
      .min(
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH,
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH_MESSAGE
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;<>,.?~\\/]).+$/,
        MESSAGES.AUTH.REGISTER.PASSWORD_INVALID
      ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: MESSAGES.AUTH.REGISTER.PASSWORD_NOT_MATCH, // Thông báo lỗi khi mật khẩu không khớp
    path: ["password_confirmation"], // Hiển thị lỗi dưới trường `confirmPassword`
  });

export type RegisterFormInput = z.infer<typeof RegisterForm>;
export type RegisterFormType = RegisterFormInput & {
  url_target: string;
};

export interface RegisterData {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: number;
  };
}

interface RegisterErrorDeTail {
  [key: string]: string[]; // Ví dụ: { username: ["Tên đăng nhập đã tồn tại"] }
}

export interface RegisterErrorResponse {
  message?: string; // Tin nhắn lỗi chung, có thể không có
  errors?: RegisterErrorDeTail; // Chi tiết lỗi xác thực, có thể không có
  status?: string;
}

//profile
export interface ProfileData {
  data: {
    id: number;
    name: string;
    email: string;
    avatar_path: { avatar_path: string };
    status: number;
  };
}

//send email
export interface SendEmailData {
  access_token: string;
  url_target: string;
}

export interface SendEmailResponse {
  status: string;
  message: string;
}

//active account
export const confirmTokenSchema = z.object({
  token: z.coerce.string().min(1, "Token is required"),
});
export type ConfirmToken = z.infer<typeof confirmTokenSchema>;

export interface ActiveAccountResponse {
  status: string;
  message: string;
}

//forgot password
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, MESSAGES.AUTH.FORGOT_PASSWORD.EMAIL_REQUIRED)
    .email(MESSAGES.AUTH.FORGOT_PASSWORD.EMAIL_INVALID),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface ForgotPasswordData {
  email: string;
  url_target: string;
}

//reset password
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH,
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH_MESSAGE
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;<>,.?~\\/]).+$/,
        MESSAGES.AUTH.REGISTER.PASSWORD_INVALID
      ),
    password_confirmation: z
      .string()
      .min(
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH,
        MESSAGES.AUTH.REGISTER.PASSWORD_MIN_LENGTH_MESSAGE
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;<>,.?~\\/]).+$/,
        MESSAGES.AUTH.REGISTER.PASSWORD_INVALID
      ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: MESSAGES.AUTH.REGISTER.PASSWORD_NOT_MATCH, // Thông báo lỗi khi mật khẩu không khớp
    path: ["password_confirmation"], // Hiển thị lỗi dưới trường `confirmPassword`
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordData = ResetPasswordInput & {
  token: string;
};

export interface ResetPasswordResponse {
  status: string;
  message: string;
}

//refresh token

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

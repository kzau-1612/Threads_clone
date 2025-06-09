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

export interface ProfileData {
  data: {
    id: number;
    name: string;
    email: string;
    avatar_path: { avatar_path: string };
  };
}

const vietnamPhoneRegex = /(0|\+84)\d{9,10}/;

export const RegisterForm = z
  .object({
    name: z
      .string()
      .min(1, "Vui lòng nhập tên người dùng")
      .min(4, "Tên người dùng phải dài ít nhất 4 kí tự"),
    username: z
      .string()
      .min(1, "Vui lòng nhập đăng nhập")
      .min(4, "Username phải dài ít nhất 4 kí tự"),
    email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
    phone: z
      .string()
      .min(1, "Vui lòng nhập số điện thoại") // Đảm bảo không rỗng
      .regex(vietnamPhoneRegex, "Số điện thoại không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái thường")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái hoa")
      .regex(/\d/, "Mật khẩu phải chứa ít nhất một chữ số")
      .regex(/[!@#$%^&*()_+\-={}[\]:;<>,.?~\\/]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
    password_confirmation: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái thường")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái hoa")
      .regex(/\d/, "Mật khẩu phải chứa ít nhất một chữ số")
      .regex(/[!@#$%^&*()_+\-={}[\]:;<>,.?~\\/]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"), // Đảm bảo trường này không rỗng
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu xác nhận không khớp", // Thông báo lỗi khi mật khẩu không khớp
    path: ["password_confirmation"], // Hiển thị lỗi dưới trường `confirmPassword`
  });

export type RegisterFormType = z.infer<typeof RegisterForm>;

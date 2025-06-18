import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login, register, sendVerificationEmail } from "./api";
import { saveLocalRefreshToken, saveLocalToken } from "../../utils/auth";
import { updateAuthStatus, updateAuthUser } from "../../stores/slices/authSlice";
import { useAppDispatch } from "../../stores/hooks";
import { infoToast } from "../../utils/toast";
import { AxiosError } from "axios";
import { MESSAGES } from "../../utils/message";
import { RegisterErrorResponse } from "../../schemas/Auth/authSchema";
import { ROUTES } from "../../utils/route";

//login
export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      saveLocalToken(data.access_token);
      saveLocalRefreshToken(data.refresh_token);
      if (data.user.status === 0) {
        dispatch(updateAuthUser(data.user));
        navigate({ to: ROUTES.AUTH.VERIFY_ACCOUNT });
        infoToast({ message: MESSAGES.AUTH.LOGIN.SUCCESS });
      } else {
        dispatch(updateAuthStatus(true));
        navigate({ to: "/" });
        infoToast({ message: MESSAGES.AUTH.LOGIN.SUCCESS });
      }
    },
    onError: (error: AxiosError) => {
      console.log(error);
      const status = error.response?.status;
      if (status === 401) {
        infoToast({ message: MESSAGES.AUTH.LOGIN.STATUS_401 });
      } else if (status && status >= 500) {
        infoToast({ message: MESSAGES.AUTH.LOGIN.STATUS_500 });
      } else if (status) {
        infoToast({ message: MESSAGES.AUTH.LOGIN.FAILED });
      } else {
        // Trường hợp network error hoặc không có response
        infoToast({ message: MESSAGES.AUTH.LOGIN.STATUS_OTHER });
      }
    },
  });
};

//register
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
      navigate({ to: "/login" });
      infoToast({ message: MESSAGES.AUTH.REGISTER.SUCCESS });
    },
    onError: (error: AxiosError<RegisterErrorResponse>) => {
      console.log(error);
      const status = error.response?.status;
      const errors = error.response?.data?.errors;

      if (status === 422 && errors) {
        // Lặp qua từng trường (username, email, phone) trong đối tượng errors
        for (const field in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, field)) {
            const fieldErrors = errors[field]; // Lấy mảng lỗi của trường đó
            if (fieldErrors && fieldErrors.length > 0) {
              // Lặp qua từng lỗi trong mảng của trường và hiển thị mỗi lỗi trên một toast riêng
              fieldErrors.forEach((msg) => {
                infoToast({ message: msg });
              });
            }
          }
        }
        // Tạo một thông báo duy nhất từ tất cả các lỗi
      } else {
        infoToast({ message: MESSAGES.AUTH.REGISTER.FAILED });
      }
    },
  });
};

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: (data) => {
      console.log(data);
      infoToast({ message: MESSAGES.AUTH.SEND_VERIFICATION_EMAIL.SUCCESS });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 401) {
        infoToast({ message });
      } else {
        infoToast({ message: MESSAGES.AUTH.SEND_VERIFICATION_EMAIL.FAILED });
      }
    },
  });
};

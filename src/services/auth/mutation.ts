import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "./api";
import { saveLocalRefreshToken, saveLocalToken } from "../../utils/auth";
import { updateAuthStatus } from "../../stores/slices/authSlice";
import { useAppDispatch } from "../../stores/hooks";
import { infoToast } from "../../utils/toast";
import { AxiosError } from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      saveLocalToken(data.access_token);
      saveLocalRefreshToken(data.refresh_token);
      dispatch(updateAuthStatus(true));
      navigate({ to: "/" });
      infoToast({ message: "Đăng nhập thành công" });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      const status = error.response?.status;
      if (status === 401) {
        infoToast({ message: "Sai tên đăng nhập hoặc mật khẩu" });
      } else if (status && status >= 500) {
        infoToast({ message: "Lỗi server, vui lòng thử lại" });
      } else if (status) {
        infoToast({ message: "Đăng nhập thất bại" });
      } else {
        // Trường hợp network error hoặc không có response
        infoToast({ message: "Không thể kết nối đến server" });
      }
    },
  });
};

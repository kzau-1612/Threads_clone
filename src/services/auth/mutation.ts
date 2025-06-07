import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "./api";
import { saveLocalRefreshToken, saveLocalToken } from "../../utils/auth";
import { updateAuthStatus } from "../../stores/slices/authSlice";
import { useAppDispatch } from "../../stores/hooks";

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
    },
    onError: (error) => console.log(error),
  });
};

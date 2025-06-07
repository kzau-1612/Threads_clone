import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";
import { useAppDispatch } from "../../stores/hooks";
import { store } from "../../stores/store";
import { updateAuthStatus } from "../../stores/slices/authSlice";
import { getLocalToken } from "../../utils/auth";

export const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: getProfile,
  staleTime: 5 * 60 * 1000, // Ví dụ: dữ liệu được coi là tươi trong 5 phút
  gcTime: 10 * 60 * 1000, // Thời gian dữ liệu tồn tại trong cache (mặc định 5p
  enabled: !!getLocalToken(),
});

export const useProfile = () => {
  return useQuery({
    ...profileQueryOptions,
  });
};

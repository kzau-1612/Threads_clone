import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";
import { getLocalToken } from "../../utils/auth";

export const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: getProfile,
  enabled: !!getLocalToken(),
});

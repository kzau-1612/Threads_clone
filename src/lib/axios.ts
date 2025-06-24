import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  getLocalRefreshToken,
  getLocalToken,
  removeToken,
  saveLocalRefreshToken,
  saveLocalToken,
} from "../utils/auth";
import { refreshToken } from "../services/auth/api";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean; // Dùng cho logic refresh token
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // **THAY THẾ BẰNG URL CƠ SỞ CỦA API CỦA BẠN**
  timeout: 10000, // Thời gian chờ tối đa 10 giây
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const NO_AUTH_REQUIRED_PATHS: string[] = [
  "/auth/login",
  "/auth/register",
  "/confirm-account",
  "/auth/refresh",
  // Thêm các đường dẫn khác vào đây
];

const REFRESH_TOKEN_PATH = "/auth/refresh";

const PROFILE_PATH = "/auth/profile";

// --- Request Interceptor ---
// Chặn mọi yêu cầu trước khi chúng được gửi đi
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token xác thực từ localStorage hoặc Redux store của bạn
    const token = getLocalToken();
    const refreshToken = getLocalRefreshToken();
    // Hoặc từ một nguồn khác, ví dụ: useSelector((state: RootState) => state.auth.token);

    const requestUrl = config.url;

    // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách loại trừ không
    const isNoAuthRequired = NO_AUTH_REQUIRED_PATHS.some(
      (path) => requestUrl?.includes(path) // Hoặc requestUrl?.endsWith(path) nếu bạn muốn chính xác hơn
    );

    const isRefreshPath = requestUrl === REFRESH_TOKEN_PATH;

    // Chỉ gắn token nếu token tồn tại VÀ đường dẫn không nằm trong danh sách loại trừ
    if (token && !isNoAuthRequired) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (refreshToken && isRefreshPath) {
      config.data = config.data || {};
      config.data.refresh_token = refreshToken;
    }
    // console.log('✅ Yêu cầu đi:', config.url); // Để debug
    return config; // Luôn phải trả về config
  },
  (error: AxiosError) => {
    // Xử lý lỗi xảy ra trước khi yêu cầu được gửi (ví dụ: lỗi mạng, cấu hình)
    console.error("❌ Lỗi yêu cầu:", error.message);
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
// Chặn mọi phản hồi trước khi chúng được xử lý bởi then() hoặc catch()
apiClient.interceptors.response.use(
  (response) => {
    // console.log('✅ Phản hồi về:', response.config.url, response.status); // Để debug
    return response; // Luôn phải trả về response
  },
  async (error: AxiosError) => {
    // Lấy yêu cầu gốc đã gây ra lỗi
    const originalRequest = error.config as AxiosRequestConfig;

    const authRequiredPath = PROFILE_PATH === originalRequest?.url;

    // Xử lý lỗi 401 Unauthorized (ví dụ: token hết hạn hoặc không hợp lệ)
    // `!originalRequest._retry` là cờ để tránh vòng lặp vô hạn khi refresh token
    if (
      error.response?.status === 401 &&
      authRequiredPath &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Đánh dấu là đã thử lại

      try {
        // --- LOGIC REFRESH TOKEN CỦA BẠN SẼ Ở ĐÂY ---
        // Ví dụ:
        const response = await refreshToken();
        if (response) {
          const { access_token, refresh_token } = response;
          saveLocalToken(access_token);
          saveLocalRefreshToken(refresh_token);
          return apiClient.request(originalRequest);
        }

        return Promise.reject(error); // Reject lỗi để chain catch vẫn hoạt động
      } catch (refreshError) {
        console.error("❌ Lỗi khi refresh token hoặc đăng nhập lại:", refreshError);

        removeToken();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

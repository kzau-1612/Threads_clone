import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getLocalToken } from "../utils/auth";

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

// --- Request Interceptor ---
// Chặn mọi yêu cầu trước khi chúng được gửi đi
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token xác thực từ localStorage hoặc Redux store của bạn
    const token = getLocalToken();
    // Hoặc từ một nguồn khác, ví dụ: useSelector((state: RootState) => state.auth.token);

    if (token) {
      // Gắn token vào header Authorization cho mỗi yêu cầu
      config.headers.Authorization = `Bearer ${token}`;
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
// apiClient.interceptors.response.use(
//   (response) => {
//     // console.log('✅ Phản hồi về:', response.config.url, response.status); // Để debug
//     return response; // Luôn phải trả về response
//   },
//   async (error: AxiosError) => {
//     // Khai bao type cho ExtendedAxiosRequestConfig

//     // Lấy yêu cầu gốc đã gây ra lỗi
//     const originalRequest = error.config as AxiosRequestConfig;

//     // Xử lý lỗi 401 Unauthorized (ví dụ: token hết hạn hoặc không hợp lệ)
//     // `!originalRequest._retry` là cờ để tránh vòng lặp vô hạn khi refresh token
//     if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
//       originalRequest._retry = true; // Đánh dấu là đã thử lại

//       try {
//         // --- LOGIC REFRESH TOKEN CỦA BẠN SẼ Ở ĐÂY ---
//         // Ví dụ:
//         // const { data } = await axios.post('/api/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
//         // const newToken = data.accessToken;
//         // localStorage.setItem('authToken', newToken);
//         // // Cập nhật token trong header mặc định của Axios
//         // apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         // // Cập nhật token cho yêu cầu gốc để thử lại
//         // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         // // Thử lại yêu cầu gốc với token mới
//         // return apiClient(originalRequest);
//         // --- KẾT THÚC LOGIC REFRESH TOKEN ---

//         // Nếu bạn không có refresh token hoặc refresh token thất bại:
//         console.warn(
//           "Phiên làm việc đã hết hạn hoặc không được phép. Đang chuyển hướng đến trang đăng nhập..."
//         );
//         // Ví dụ: Xóa token cũ và chuyển hướng người dùng
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("refreshToken"); // Nếu bạn có refresh token
//         // window.location.href = '/login'; // Chuyển hướng cứng hoặc sử dụng router của bạn
//         // Để hiển thị thông báo thân thiện hơn
//         alert("Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.");

//         return Promise.reject(error); // Reject lỗi để chain catch vẫn hoạt động
//       } catch (refreshError) {
//         console.error("❌ Lỗi khi refresh token hoặc đăng nhập lại:", refreshError);
//         // Nếu refresh token thất bại hoặc có lỗi khác trong quá trình xử lý 401,
//         // vẫn chuyển hướng người dùng về trang đăng nhập
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("refreshToken");
//         // window.location.href = '/login';
//         alert("Có lỗi trong quá trình xác thực. Vui lòng đăng nhập lại.");
//         return Promise.reject(refreshError);
//       }
//     }

//     // Xử lý các lỗi HTTP khác (400, 403, 404, 500, v.v.)
//     if (error.response) {
//       // Server đã trả về phản hồi với mã trạng thái lỗi
//       console.error(
//         `❌ Lỗi phản hồi [${error.response.status}] từ ${error.config?.url}:`,
//         error.response.data || error.message
//       );
//       // Bạn có thể hiển thị thông báo lỗi chung cho người dùng ở đây
//       // Ví dụ: alert(`Lỗi: ${error.response.data?.message || 'Đã có lỗi xảy ra.'}`);
//     } else if (error.request) {
//       // Yêu cầu đã được gửi nhưng không nhận được phản hồi (ví dụ: server không hoạt động, lỗi mạng)
//       console.error("❌ Không nhận được phản hồi từ Server:", error.message);
//       // alert('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
//     } else {
//       // Lỗi xảy ra khi thiết lập yêu cầu (ví dụ: cấu hình sai, timeout)
//       console.error("❌ Lỗi thiết lập yêu cầu:", error.message);
//     }

//     return Promise.reject(error); // Luôn reject lỗi để code gọi có thể bắt được
//   }
// );

export default apiClient;

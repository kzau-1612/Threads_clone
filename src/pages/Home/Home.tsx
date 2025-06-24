import { Button } from "@mantine/core";
import { useAppSelector } from "../../stores/hooks";
import styles from "./Home.module.css";
import { useLogout } from "../../services/auth/mutation";

export default function Home() {
  const { isAuth, user, isLoading } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogout();
  // console.log(isAuth, user);
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <span className={styles.spinner}></span>
      <h1>Home</h1>
      {/* Điều kiện ưu tiên 1: Đang tải hoặc đang chờ dữ liệu người dùng */}
      {isAuth && !user ? (
        "Đang tải..."
      ) : /* Điều kiện ưu tiên 2: Đã đăng nhập và có dữ liệu người dùng (có tên) */
      isAuth && user ? ( // Sử dụng user?.name để kiểm tra null/undefined của name
        <div>
          <p>Xin chào: {user.name}</p>
          <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
        </div>
      ) : (
        /* Điều kiện ưu tiên 3: Đã đăng nhập nhưng không có tên (user có nhưng user.name không có) */
        !isAuth && !user && "Chưa đăng nhập"
      )}
    </div>
  );
}

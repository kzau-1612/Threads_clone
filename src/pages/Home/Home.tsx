import { useAppSelector } from "../../stores/hooks";
import styles from "./Home.module.css";

export default function Home() {
  const { isAuth, user, isLoading } = useAppSelector((state) => state.auth);
  console.log(user, isAuth);
  // console.log(isAuth, user);
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <span className={styles.spinner}></span>
      <h1>Home</h1>
      <p>
        {/* Điều kiện ưu tiên 1: Đang tải hoặc đang chờ dữ liệu người dùng */}
        {isAuth && !user
          ? "Đang tải..."
          : /* Điều kiện ưu tiên 2: Đã đăng nhập và có dữ liệu người dùng (có tên) */
            isAuth && user // Sử dụng user?.name để kiểm tra null/undefined của name
            ? `Xin chào: ${user.name}`
            : /* Điều kiện ưu tiên 3: Đã đăng nhập nhưng không có tên (user có nhưng user.name không có) */
              !isAuth && !user && "Chưa đăng nhập"}
      </p>
      <p></p>
    </div>
  );
}

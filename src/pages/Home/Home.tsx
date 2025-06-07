import styles from "./Home.module.css";
import { useAppSelector } from "../../stores/hooks";

export default function Home() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  console.log(isAuth);

  return (
    <div>
      <span className={styles.spinner}></span>
      <h1>Home</h1>
      <p>{isAuth ? "Đã đăng nhập" : "Chua dang nhap"}</p>
    </div>
  );
}

import styles from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { RootState } from "../../stores/store";
import Pending from "../../components/Pending/Pending";

export default function Home() {
  const { isAuth, user, isLoading } = useAppSelector((state: RootState) => state.auth);
  // console.log(isAuth, user);
  if (isLoading) return <Pending />;
  // console.log(profile);

  return (
    <div>
      <span className={styles.spinner}></span>
      <h1>Home</h1>
      <p>{isAuth ? "Đã đăng nhập" : "Chua dang nhap"}</p>
      <p>Xin chào: {user?.name}</p>
    </div>
  );
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import styles from "./auth-layout.module.css";
import imgAvif from "/src/assets/auth_layout/auth_layout_img.avif";
import imgWebp from "/src/assets/auth_layout/auth_layout_img.webp";
import imgPng from "/src/assets/auth_layout/auth_layout_img.png";
import { FaThreads } from "react-icons/fa6";
import { Anchor, List } from "@mantine/core";
import { getLocalToken } from "../../utils/auth";
import { store } from "../../stores/store";
import { ROUTES } from "../../utils/route";

export const Route = createFileRoute("/(auth-layout)/_auth-layout")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    const { isAuth, user } = store.getState().auth;
    const excludePaths = ["/verify-account"];
    if (excludePaths.includes(location.pathname)) {
      if (!isAuth && !user && !getLocalToken()) {
        throw redirect({ to: ROUTES.AUTH.LOGIN });
      }
      if (!isAuth && user && user.status === 0) {
        return;
      }
    }

    if (isAuth && user) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <picture className={styles.picture}>
          <source srcSet={imgAvif} type="image/avif" className={styles.img} />
          <source srcSet={imgWebp} type="image/webp" className={styles.img} />
          <img src={imgPng} className={styles.img} />
        </picture>
        <div className={styles.topIcon}>
          <FaThreads className={styles.icon} />
        </div>
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
      <footer className={styles.footer}>
        <List listStyleType="none" className={styles.list} size="sm">
          <List.Item c="var(--mantine-color-gray-6)">© 2025</List.Item>
          <List.Item>
            <Anchor c="var(--mantine-color-gray-6)" size="sm">
              Điều khoản của Threads
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor c="var(--mantine-color-gray-6)" size="sm">
              Chính sách quyền riêng tư
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor c="var(--mantine-color-gray-6)" size="sm">
              Chính sách cookie
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor c="var(--mantine-color-gray-6)" size="sm">
              Báo cáo sự cố
            </Anchor>
          </List.Item>
        </List>
      </footer>
    </div>
  );
}

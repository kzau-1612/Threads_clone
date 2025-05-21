import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import styles from "./auth-layout.module.css";
import imgAvif from "/src/assets/auth_layout/auth_layout_img.avif";
import imgWebp from "/src/assets/auth_layout/auth_layout_img.webp";
import imgPng from "/src/assets/auth_layout/auth_layout_img.png";

export const Route = createFileRoute("/(auth-layout)/_auth-layout")({
  component: RouteComponent,
  // beforeLoad: ({ context }) => {
  //   const { isLogged } = context.authentication;
  //   if (isLogged()) {
  //     throw redirect({
  //       to: "/",
  //     });
  //   }
  // },
});

function RouteComponent() {
  return (
    <div className={styles.root}>
      <picture>
        <source srcSet={imgAvif} type="image/avif" className={styles.img} />
        <source srcSet={imgWebp} type="image/webp" className={styles.img} />
        <img src={imgPng} className={styles.img} />
      </picture>
      <div className={styles.container}>
        <h1>Hello "/_auth-layout"!</h1>
        <Outlet />
      </div>
    </div>
  );
}

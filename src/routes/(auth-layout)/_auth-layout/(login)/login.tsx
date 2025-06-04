import { createFileRoute, useRouter } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../../../../utils/auth";
import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";
import styles from "./login.module.css";

export const Route = createFileRoute("/(auth-layout)/_auth-layout/(login)/login")({
  component: Login,
  loader: ({ context }) => {
    const { isLogged } = context.authentication;
    const checkLogin = isLogged();
    return checkLogin;
  },
});

function Login() {
  const router = useRouter();
  const checkLogin = Route.useLoaderData();
  return (
    <>
      <form>
        <span className={styles.title}>Đăng nhập với tài khoản Instagram</span>
        <TextInput
          placeholder="Tên người dùng, số điện thoại hoặc email"
          classNames={{ input: styles.input }}
          size="lg"
        />
        <PasswordInput
          placeholder="Mật khẩu"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
        />
        <Button variant="filled" color="black" className={styles.button} mt="md" size="lg" disabled>
          Đăng nhập
        </Button>
      </form>
      <div className={styles.bottom}>
        <Anchor c="var(--mantine-color-gray-6)" size="sm" underline="never">
          Quên mật khẩu?
        </Anchor>
        <div className={styles.or}>
          <span>hoặc</span>
        </div>
      </div>
    </>
  );
}

//  <div>
//     <h2>Login</h2>
//     {/* {checkLogin ? ( */}
//     <>
//       <p>Hello user</p>
//       <button
//         onClick={async () => {
//           signOut();
//           router.navigate({ to: "/" });
//           // await router.invalidate();
//         }}
//       >
//         Sign Out
//       </button>
//     </>
//     {/* ) : ( */}
//     <button
//       onClick={async () => {
//         signIn();
//         await router.navigate({ to: "/" });
//         // await router.invalidate();
//       }}
//     >
//       Sign In
//     </button>
//     {/* )} */}
//   </div>

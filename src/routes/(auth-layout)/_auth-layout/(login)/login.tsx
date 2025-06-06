import { createFileRoute, useRouter } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../../../../utils/auth";
import { Anchor, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import styles from "./login.module.css";
import notification from "/src/assets/css/Notification.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginForm } from "../../../../schemas/Auth/authSchema";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    // notifications.show({ message: "Hello", classNames: notification, withCloseButton: false });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Đăng nhập với tài khoản Instagram</span>
        <TextInput
          placeholder="Tên người dùng, số điện thoại hoặc email"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          {...register("email", { required: true })}
        />
        <PasswordInput
          placeholder="Mật khẩu"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
          {...register("password", { required: true })}
        />
        <Button
          variant="filled"
          color="black"
          className={styles.button}
          mt="md"
          size="lg"
          disabled={!isValid}
          type="submit"
        >
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

      <div className={styles.loginOptions}>
        <Button variant="outline" color="blue" w="100%">
          <span className={styles.icon}>
            <FaFacebookSquare />
          </span>
          <span>Facebook</span>
        </Button>
        <Button variant="outline" color="red" w="100%">
          <span className={styles.icon}>
            <FaGoogle />
          </span>
          <span>Google</span>
        </Button>
      </div>
      <div className={styles.register}>
        <Text>
          Chưa có tài khoản?
          <Anchor c="black" underline="never" ml="xs">
            Đăng ký ngay
          </Anchor>
        </Text>
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

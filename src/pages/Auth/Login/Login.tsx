import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import styles from "./Login.module.css";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { LoginForm } from "../../../schemas/Auth/authSchema";
import { useLogin } from "../../../services/auth/mutation";
import { CustomLink } from "../../../components/CustomLink";
import { ROUTES } from "../../../utils/route";
import { getGoogleRedirectUrl } from "../../../services/auth/api";

export default function Login() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    mutate(data);
  };

  const handleGoogleLogin = () => {
    const redirectUrl = getGoogleRedirectUrl();
    console.log(redirectUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Log in with your Instagram account</span>
        <TextInput
          placeholder="Username, phone or email"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          {...register("email", { required: true })}
        />
        <PasswordInput
          placeholder="Password"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
          {...register("password", { required: true })}
        />

        <Button
          loading={isPending}
          loaderProps={{ type: "custom", size: "lg" }}
          variant="filled"
          color="black"
          className={styles.button}
          mt="md"
          size="lg"
          disabled={!isValid || isPending}
          type="submit"
        >
          Login
        </Button>
      </form>
      <div className={styles.bottom}>
        <CustomLink to={ROUTES.AUTH.FORGOT_PASSWORD} className={styles.forgotPasswordLink}>
          Forgot password?
        </CustomLink>
        <div className={styles.or}>
          <span>hoặc</span>
        </div>
      </div>

      <div className={styles.loginOptions}>
        <Button variant="outline" color="#7c007c" w="100%">
          <span className={styles.icon}>
            <FaGithub />
          </span>
          <span>Github</span>
        </Button>
        <Button variant="outline" color="red" w="100%" onClick={handleGoogleLogin}>
          <span className={styles.icon}>
            <FaGoogle />
          </span>
          <span>Google</span>
        </Button>
      </div>
      <div className={styles.register}>
        <Text>
          Don't have an account?
          <CustomLink to="/register" className={styles.link}>
            Register
          </CustomLink>
        </Text>
      </div>
    </>
  );
}

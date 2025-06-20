import { Button, PasswordInput, Text } from "@mantine/core";
import styles from "./ResetPassword.module.css";
import { useForm } from "react-hook-form";
import { CustomLink } from "../../../components/CustomLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordInput, resetPasswordSchema } from "../../../schemas/Auth/authSchema";
import { useResetPassword } from "../../../services/auth/mutation";
import { ROUTES } from "../../../utils/route";
import { useSearch } from "@tanstack/react-router";

export default function Register() {
  const { token } = useSearch({ from: "/(auth-layout)/_auth-layout/reset-password" });
  const { mutate, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: ResetPasswordInput) => {
    const dataWithToken = {
      ...data,
      token,
    };
    console.log(dataWithToken);
    mutate(dataWithToken);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Reset Password</span>

        <PasswordInput
          placeholder="Password"
          classNames={{ input: styles.input }}
          size="lg"
          error={errors?.password?.message}
          {...register("password", { required: true })}
        />
        <PasswordInput
          placeholder="Password confirmation"
          classNames={{ input: styles.input }}
          size="lg"
          error={errors?.password_confirmation?.message}
          {...register("password_confirmation", { required: true })}
        />

        <Button
          loading={isPending}
          loaderProps={{ type: "custom", size: "lg" }}
          variant="filled"
          color="black"
          className={styles.button}
          disabled={isPending}
          mt="md"
          size="lg"
          type="submit"
        >
          Reset Password
        </Button>
      </form>

      <div className={styles.register}>
        <CustomLink to="/login" className={styles.link}>
          Back to Login
        </CustomLink>
      </div>
    </>
  );
}

import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { CustomLink } from "../../../components/CustomLink";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterForm,
  RegisterFormInput,
  RegisterFormType,
} from "../../../schemas/Auth/authSchema";
import { useRegister } from "../../../services/auth/mutation";
import { ROUTES } from "../../../utils/route";

export default function Register() {
  const { mutate, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterForm),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: RegisterFormInput) => {
    const url = window.location.origin + ROUTES.AUTH.ACTIVE_ACCOUNT;
    const dataWithUrl: RegisterFormType = {
      ...data,
      url_target: url,
    };
    mutate(dataWithUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Register account</span>
        <TextInput
          placeholder="Name"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.name?.message}
          {...register("name", { required: true })}
        />
        <TextInput
          placeholder="Username"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.username?.message || error?.response?.data?.errors?.username}
          {...register("username", { required: true })}
        />
        <TextInput
          placeholder="Email"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.email?.message || error?.response?.data?.errors?.email}
          {...register("email", { required: true })}
        />
        <TextInput
          placeholder="Phone"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.phone?.message || error?.response?.data?.errors?.phone}
          {...register("phone", { required: true })}
        />
        <PasswordInput
          placeholder="Password"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
          error={errors?.password?.message}
          {...register("password", { required: true })}
        />
        <PasswordInput
          placeholder="Password confirmation"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
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
          Register
        </Button>
      </form>

      <div className={styles.register}>
        <Text>
          Have an account?
          <CustomLink to="/login" className={styles.link}>
            Login
          </CustomLink>
        </Text>
      </div>
    </>
  );
}

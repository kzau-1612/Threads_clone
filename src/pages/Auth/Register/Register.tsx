import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { CustomLink } from "../../../components/CustomLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterFormType } from "../../../schemas/Auth/authSchema";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterForm),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: RegisterFormType) => {
    console.log(data);
    // mutate(data);
  };

  const error = "Invalid name";
  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Đăng ký tài khoản</span>
        <TextInput
          placeholder="Tên người dùng"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.name?.message}
          {...register("name", { required: true })}
        />
        <TextInput
          placeholder="Tên đăng nhập"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.username?.message}
          {...register("username", { required: true })}
        />
        <TextInput
          placeholder="Email"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.email?.message}
          {...register("email", { required: true })}
        />
        <TextInput
          placeholder="Số điện thoại"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          error={errors?.phone?.message}
          {...register("phone", { required: true })}
        />
        <PasswordInput
          placeholder="Mật khẩu"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
          error={errors?.password?.message}
          {...register("password", { required: true })}
        />
        <PasswordInput
          placeholder="Xác nhận mật khẩu"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
          error={errors?.password_confirmation?.message}
          {...register("password_confirmation", { required: true })}
        />

        <Button
          //   loading={isPending}
          loaderProps={{ type: "custom", size: "lg" }}
          variant="filled"
          color="black"
          className={styles.button}
          mt="md"
          size="lg"
          type="submit"
        >
          Đăng nhập
        </Button>
      </form>

      <div className={styles.register}>
        <Text>
          Đã có tài khoản?
          <CustomLink to="/login" className={styles.link}>
            Đăng nhập
          </CustomLink>
        </Text>
      </div>
    </>
  );
}

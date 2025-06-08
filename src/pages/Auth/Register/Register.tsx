import { Anchor, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import styles from "./Register.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { CustomLink } from "../../../components/CustomLink";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = async (data) => {
    // mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Đăng ký tài khoản</span>
        <TextInput
          placeholder="Tên người dùng"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          {...register("name", { required: true })}
        />
        <TextInput
          placeholder="Tên đăng nhập"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          {...register("username", { required: true })}
        />
        <TextInput
          placeholder="Email"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          {...register("email", { required: true })}
        />
        <TextInput
          placeholder="Số điện thoại"
          classNames={{ input: styles.input }}
          size="lg"
          autoFocus
          {...register("phone", { required: true })}
        />
        <PasswordInput
          placeholder="Mật khẩu"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
          {...register("password", { required: true })}
        />
        <PasswordInput
          placeholder="Xác nhận mật khẩu"
          classNames={{ input: styles.input, innerInput: styles.innerInput }}
          size="lg"
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
          //   disabled={!isValid || isPending}
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

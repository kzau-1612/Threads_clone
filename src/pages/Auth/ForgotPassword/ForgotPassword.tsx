import { FaArrowLeftLong } from "react-icons/fa6";
import { Anchor, Button, Center, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import classes from "./ForgotPassword.module.css";
import { CustomLink } from "../../../components/CustomLink";
import { ROUTES } from "../../../utils/route";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordData,
  ForgotPasswordInput,
  ForgotPasswordSchema,
} from "../../../schemas/Auth/authSchema";
import { useForgotPassword } from "../../../services/auth/mutation";

export default function ForgotPassword() {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    const url = window.location.origin + ROUTES.AUTH.RESET_PASSWORD;
    const dataWithUrl: ForgotPasswordData = {
      ...data,
      url_target: url,
    };
    mutate(dataWithUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="xxx@gmail.com"
          size="lg"
          classNames={{ input: classes.input }}
          error={errors.email?.message}
          {...register("email")}
        />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <FaArrowLeftLong size={14} />
              <CustomLink to={ROUTES.AUTH.LOGIN} className={classes.loginLink}>
                Back to the login page
              </CustomLink>
            </Center>
          </Anchor>
          <Button
            loading={isPending}
            loaderProps={{ type: "custom", size: "lg" }}
            variant="filled"
            color="black"
            className={classes.control}
            size="md"
            type="submit"
          >
            Reset password
          </Button>
        </Group>
      </Paper>
    </form>
  );
}

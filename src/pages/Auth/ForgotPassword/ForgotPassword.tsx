import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./ForgotPassword.module.css";
import { CustomLink } from "../../../components/CustomLink";
import { ROUTES } from "../../../utils/route";

export default function ForgotPassword() {
  return (
    <Container className={classes.container}>
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
          required
          classNames={{ input: classes.input }}
        />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <FaArrowLeftLong size={12} />
              <CustomLink to={ROUTES.AUTH.LOGIN} className={classes.loginLink}>
                Back to the login page
              </CustomLink>
            </Center>
          </Anchor>
          <Button className={classes.control} bg="black">
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

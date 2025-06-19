import { useEffect } from "react";
import { Alert, Button, Text } from "@mantine/core";
import { useSearch } from "@tanstack/react-router";
import { CiCircleInfo } from "react-icons/ci";
import { useActiveAccount } from "../../../services/auth/mutation";
import { CustomLoader } from "../../../components/Common/CustomLoader";
import { CustomLink } from "../../../components/CustomLink";

export default function ActiveAccount() {
  const { token } = useSearch({ from: "/(auth-layout)/_auth-layout/active-account" });
  const { mutate, isSuccess, isPending, isError } = useActiveAccount();

  useEffect(() => {
    console.log(token);
    if (token && token !== "undefined" && !isPending && !isSuccess) {
      mutate(token);
    }
  }, []);

  const icon = <CiCircleInfo />;

  if (!token || token === "undefined") {
    return (
      <Alert variant="light" color="red" title="Error" icon={icon}>
        <Text>Invalid Token</Text>
        <CustomLink to="/login">
          <Button color="black" mt={"sm"}>
            Back to login
          </Button>
        </CustomLink>
      </Alert>
    );
  }

  if (isPending) {
    return (
      <Alert variant="light" color="blue" title="Pending" icon={icon}>
        <Text>Verifying account...</Text>
        <CustomLoader />
      </Alert>
    );
  }

  if (isError) {
    return (
      <Alert variant="light" color="red" title="Error" icon={icon}>
        <Text>Verified account failed, please try again</Text>

        <CustomLink to="/login">
          <Button color="black" mt={"sm"}>
            Back to login
          </Button>
        </CustomLink>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Alert variant="light" color="green" title="Success" icon={icon}>
        <Text>Verified account successfully, please login again to use our services</Text>
        <CustomLink to="/login">
          <Button color="black" mt={"sm"}>
            Back to login
          </Button>
        </CustomLink>
      </Alert>
    );
  }

  return null; // chưa gọi hoặc đang xử lý
}

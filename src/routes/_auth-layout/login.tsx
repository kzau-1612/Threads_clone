import { createFileRoute, useRouter } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../../utils/auth";

export const Route = createFileRoute("/_auth-layout/login")({
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
    <div>
      <h2>Login</h2>
      {/* {checkLogin ? ( */}
      <>
        <p>Hello user</p>
        <button
          onClick={async () => {
            signOut();
            router.navigate({ to: "/" });
            // await router.invalidate();
          }}
        >
          Sign Out
        </button>
      </>
      {/* ) : ( */}
      <button
        onClick={async () => {
          signIn();
          await router.navigate({ to: "/" });
          // await router.invalidate();
        }}
      >
        Sign In
      </button>
      {/* )} */}
    </div>
  );
}

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../utils/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const router = useRouter();
  return (
    <div>
      <h2>Login</h2>
      {isAuthenticated() ? (
        <>
          <p>Hello user</p>
          <button
            onClick={async () => {
              signOut();
              router.invalidate();
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={async () => {
            signIn();
            router.invalidate();
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

import { createFileRoute, useBlocker } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_layout/profile")({
  component: Profile,
});

function Profile() {
  const [name, setName] = useState("");
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => !!name,
    enableBeforeUnload: !!name,
    withResolver: true,
  });

  console.log(status);

  return (
    <div>
      <h2>Hello "/profile"!</h2>
      {status === "blocked" && (
        <>
          <button onClick={proceed}>Sure</button>
          <button onClick={reset}>cancel</button>
        </>
      )}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

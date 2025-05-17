import { createFileRoute } from "@tanstack/react-router";

const LAST_STEP = 3;

export const Route = createFileRoute("/steps")({
  component: Steps,
  validateSearch: (search: Record<string, unknown>): { username: string; step?: number } => {
    const step = Number(search.step);

    return {
      step: isNaN(step) ? undefined : Math.max(Math.min(LAST_STEP, step), 0),
      username: search.username ? String(search.username) : "Guest",
    };
  },
});

function Steps() {
  const { step = 0, username } = Route.useSearch();
  const navigate = Route.useNavigate();

  const move = (step: number) =>
    navigate({
      search: (prev) => ({ ...prev, step }),
      mask: {
        search: {
          username,
          step: undefined,
        },
      },
    });

  const prev = () => move(step - 1);
  const next = () => move(step + 1);

  return (
    <div className="flex flex-col gap-2">
      <h2>Steps</h2>
      <span>
        Hello <b>{username}</b>. This is a multi-step process. You are currently on step{" "}
        <b>{step}</b>.
      </span>
      <hr />
      <div className="py-8">
        {step === 0 && <Step0 />}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>
      <hr />
      <div className="flex gap-2">
        <button disabled={step <= 0} onClick={prev}>
          Previous
        </button>
        <button disabled={step >= LAST_STEP} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}

const Step0 = () => {
  return (
    <div>
      <h3>Step 0</h3>
      Some data is shown here
    </div>
  );
};

const Step1 = () => {
  return (
    <div>
      <h3>Step 1</h3>
      Some more there
    </div>
  );
};

const Step2 = () => {
  return (
    <div>
      <h3>Step 2</h3>
      Almost there
    </div>
  );
};

const Step3 = () => {
  return (
    <div>
      <h3>Step 3</h3>
      Done!
    </div>
  );
};

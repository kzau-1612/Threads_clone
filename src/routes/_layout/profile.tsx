import { createFileRoute, useBlocker, useRouter } from "@tanstack/react-router";
import { useState } from "react";

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const causeError = (message = "Đây là một lỗi từ component!") => {
  throw new Error(message);
};

export const Route = createFileRoute("/_layout/profile")({
  component: Profile,
  loader: async () => {
    console.log("Loader đang chạy, đợi 5 giây...");
    await delay(10000); // Chờ 5 giây
    console.log("Loader hoàn thành sau 5 giây.");
    // Tiếp tục tải dữ liệu thật của bạn ở đây
    const data = { message: "Dữ liệu đã được tải sau 5 giây!" };
    return data;
  },
});

function Profile() {
  const [name, setName] = useState("");
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => !!name,
    enableBeforeUnload: !!name,
    withResolver: true,
  });
  const router = useRouter();
  const data = Route.useLoaderData();
  console.log(data);

  const [shouldError, setShouldError] = useState(false);

  const handleClick = () => {
    setShouldError(true);
  };

  // Nếu shouldError là true, component này sẽ ném lỗi và errorComponent của route cha sẽ bắt lấy
  if (shouldError) {
    causeError("Lỗi xảy ra do người dùng click nút!");
  }

  // return (
  //   <div>
  //     <h2>Hello "/profile"!</h2>
  //     {status === "blocked" && (
  //       <>
  //         <button onClick={proceed}>Sure</button>
  //         <button onClick={reset}>cancel</button>
  //       </>
  //     )}
  //     <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  //   </div>
  // );
  return (
    <div>
      <h2>Trang của tôi</h2>
      <p>{data.message}</p>
      <button
        onClick={async () => {
          await router.navigate({ to: "/" });
          await router.invalidate();
          router.clearCache();
        }}
      >
        Clear cache
      </button>
      <button onClick={handleClick}>Gây lỗi!</button>
    </div>
  );
}

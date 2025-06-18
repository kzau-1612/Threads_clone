import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomLink } from "../../components/CustomLink";

import { profileQueryOptions } from "../../services/auth/queries";
import { store } from "../../stores/store";
import { resetAuth, updateAuth } from "../../stores/slices/authSlice";
import { getLocalToken } from "../../utils/auth";
import { ROUTES } from "../../utils/route";

export const Route = createFileRoute("/(layout)/_layout")({
  component: MainLayout,
  loader: async ({ context: { queryClient } }) => {
    const token = getLocalToken(); // Lấy token hiện tại
    const { isAuth, user } = store.getState().auth; // Lấy trạng thái đăng nhập
    if (user && user.status === 0) {
      return redirect({ to: ROUTES.AUTH.VERIFY_ACCOUNT });
    }
    if (!token && !isAuth) {
      queryClient.removeQueries({ queryKey: profileQueryOptions.queryKey });
      console.log("No token found. Profile cache cleared.");
      store.dispatch(resetAuth());
      return null; // Không có dữ liệu profile để tải
    }
    try {
      const profileData = await queryClient.ensureQueryData(profileQueryOptions);
      store.dispatch(updateAuth(profileData.data));
      console.log(profileData.data);
      if (profileData.data.status === 0) {
        return redirect({ to: ROUTES.AUTH.VERIFY_ACCOUNT });
      }
    } catch (error) {
      console.log("Profile not available (user not logged in)");
      queryClient.removeQueries({ queryKey: profileQueryOptions.queryKey });
      // Cập nhật trạng thái Redux về chưa xác thực
      store.dispatch(resetAuth());
    }
    return null;
  },
});

function MainLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: "md", collapsed: { desktop: true, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/profile">
              {({ isActive }) => <>Profile {isActive && "-"}</>}
            </CustomLink>
          </li>
          <li>
            <CustomLink to="/pokemon">Pokemons</CustomLink>
          </li>
          <li>
            <CustomLink to="/search">Search</CustomLink>
          </li>
          <li>
            <CustomLink to="/login">Login</CustomLink>
          </li>

          {/* <li>
            <CustomLink
              to="/steps"
              activeOptions={{
                includeSearch: false,
              }}
              search={{ username: "Kim", step: 2 }}
            >
              Steps
            </CustomLink>
          </li> */}
        </ul>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Aside p="md">
        {/* {!checkLogin ? <Text color="red">Bạn cần đăng nhập để xem nội dung này.</Text> : null} */}
      </AppShell.Aside>
    </AppShell>
  );
}

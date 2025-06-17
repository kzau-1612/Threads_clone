import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomLink } from "../../components/CustomLink";

import { profileQueryOptions } from "../../services/auth/queries";
import { store } from "../../stores/store";
import {
  updateAuthStatus,
  updateAuthUser,
  updateLoadingStatus,
} from "../../stores/slices/authSlice";
import { getLocalToken } from "../../utils/auth";

export const Route = createFileRoute("/(layout)/_layout")({
  component: MainLayout,
  loader: async ({ context: { queryClient } }) => {
    const token = getLocalToken(); // Lấy token hiện tại
    const isAuth = store.getState().auth.isAuth; // Lấy trạng thái đăng nhập
    console.log(isAuth);

    if (!token && !isAuth) {
      queryClient.removeQueries({ queryKey: profileQueryOptions.queryKey });
      console.log("No token found. Profile cache cleared.");
      store.dispatch(updateAuthStatus(false));
      store.dispatch(updateAuthUser(null)); // Xóa thông tin người dùng khỏi Redux
      store.dispatch(updateLoadingStatus(false));
      return null; // Không có dữ liệu profile để tải
    }
    try {
      const profileData = await queryClient.ensureQueryData(profileQueryOptions);
      store.dispatch(updateAuthStatus(true));
      store.dispatch(updateAuthUser(profileData.data));
      store.dispatch(updateLoadingStatus(false));
    } catch (error) {
      console.log("Profile not available (user not logged in)");
      queryClient.removeQueries({ queryKey: profileQueryOptions.queryKey });
      // Cập nhật trạng thái Redux về chưa xác thực
      store.dispatch(updateAuthStatus(false));
      store.dispatch(updateAuthUser(null));
      store.dispatch(updateLoadingStatus(false));
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

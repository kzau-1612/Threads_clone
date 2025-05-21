import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, Burger, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomLink } from "../../components/CustomLink";

export const Route = createFileRoute("/(layout)/_layout")({
  component: MainLayout,
  loader: ({ context }) => {
    const { isLogged } = context.authentication;
    const checkLogin = isLogged();
    return checkLogin;
  },
});

function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const checkLogin = Route.useLoaderData();
  // console.log(checkLogin);
  // console.log("reload");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: "md", collapsed: { desktop: checkLogin, mobile: true } }}
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

          <li>
            <CustomLink
              to="/steps"
              activeOptions={{
                includeSearch: false,
              }}
              search={{ username: "Kim", step: 2 }}
            >
              Steps
            </CustomLink>
          </li>
        </ul>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Aside p="md">
        {!checkLogin ? <Text color="red">Bạn cần đăng nhập để xem nội dung này.</Text> : null}
      </AppShell.Aside>
    </AppShell>
  );
}

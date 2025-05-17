import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthContext } from "../hooks/useAuth";
import { CustomLink } from "../components/CustomLink";
import MainLayout from "../layouts/MainLayout/MainLayout";

const activeProps = {
  style: {
    color: "red",
    fontWeight: "bold",
  },
};

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
});

// function RootComponent() {
//   return (
//     <>
//       <h1>My App</h1>
//       <ul>
//         <li>
//           <CustomLink to="/">Home</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/profile">{({ isActive }) => <>Profile {isActive && "-"}</>}</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/pokemon">Pokemons</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/search">Search</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/login">Login</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/dashboard">Dashboard</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/foo">foo</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/bar">bar</CustomLink>
//         </li>
//         <li>
//           <CustomLink to="/settings">Settings</CustomLink>
//         </li>
//         <li>
//           <CustomLink
//             to="/steps"
//             activeOptions={{
//               includeSearch: false,
//             }}
//             search={{ username: "Kim", step: 2 }}
//           >
//             Steps
//           </CustomLink>
//         </li>
//       </ul>
//       <Outlet />
//       <TanStackRouterDevtools />
//     </>
//   );
// }

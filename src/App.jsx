import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import Auth from "./pages/Auth";
import URLProvider from "./context/context";
import RequireAuth from "./components/RequireAuth";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // home page
      {
        path: "/",
        element: <Landing />,
      },
      // dashboard of all urls
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      // login signup
      {
        path: "/auth",
        element: <Auth />,
      },
      // dedicated page of specific url with stats
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      // redirect path the original url
      {
        path: "/:id",
        element: (
          <RequireAuth>
            <RedirectLink />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <URLProvider>
      <RouterProvider router={router} />
    </URLProvider>
  );
}

export default App;

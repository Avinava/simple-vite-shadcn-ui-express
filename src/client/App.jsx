import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { UserList } from "./pages/UserList";
import { UserForm } from "./pages/UserForm";
import Home from "./pages/Home";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "./components/common/Header";

// Layout component that includes common elements
function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "users", element: <UserList /> },
      { path: "users/new", element: <UserForm /> },
      { path: "users/:id", element: <UserForm /> },
    ],
  },
]);

// App component with RouterProvider
function App() {
  return <RouterProvider router={router} />;
}

export default App;

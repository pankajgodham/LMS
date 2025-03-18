import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import HeroSection from "./pages/students/HeroSection";
import MainLayout from "./layout/MainLayout";
import Cources from "./pages/students/Cources";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourceTable from "./pages/admin/Cource/CourceTable";
import AddCource from "./pages/admin/Cource/AddCource";
import EditCource from "./pages/admin/Cource/EditCource";

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Cources/>
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/mylearning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element:<Sidebar/>,
        children:[
          {
            path: "dashboard",
            element:<Dashboard/>
          },
          {
            path: "cources",
            element:<CourceTable/>
          },
          {
            path: "cources/create",
            element:<AddCource/>
          },
          {
            path: "cources/:courceId",
            element:<EditCource/>
          }
        ]
      }
    ],
   
  },
]);
function App() {
  return (
    <main>
      <RouterProvider router={approuter}>

      </RouterProvider>
    </main>
  );
}

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRouteAdmin from "./components/routes/AdminRoute";
import ProtectedRouteUser from "./components/routes/ProtectedRouteUser";
import { auth } from "./firebase";
import { AdminLayout, Category, Product, SubCategory } from "./pages/admin";
import { ForgotPassword } from "./pages/auth/forgot-password";
import { Login } from "./pages/auth/login";
import { loggedInUser } from "./pages/auth/redux/user.slice";
import { Register, RegisterComplete } from "./pages/auth/register";
import { Home, HomeLayout } from "./pages/home";
import UserLayout from "./pages/user/UserLayout";
import { useAppDispatch } from "./redux/store";
import UserApi from "./services/userApi";

import { loader as  getListCategories } from "./pages/admin/components/Category";
import { loader as  getListSubCategories } from "./pages/admin/components/SubCategory";
import { loader as  getListProducts } from "./pages/admin/components/Product";
import { ProductDetails } from "./pages/details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,

      },
      {
        path: 'product/:slug',
        element: <ProductDetails />,

      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "register/complete/*",
        element: <RegisterComplete />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot/password",
        element: <ForgotPassword />,
      },

      {
        path: "user",
        element: (
          <ProtectedRouteUser>
            <UserLayout />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "admin/*",
        element: (
          <ProtectedRouteAdmin>
            <AdminLayout />
          </ProtectedRouteAdmin>
        ),

        children: [
          {
            index: true,
            element:  <h1>Dashboard</h1>,
          },

          { path: 'category', element: <Category />,loader: getListCategories },
          { path: 'sub-category', element: <SubCategory />,loader: getListSubCategories },
          { path: 'product',element: <Product />, loader:getListProducts },
 
        ]
      },
    ],
  },
]);

const App = () => {
  const dispatch = useAppDispatch();

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await dispatch(
          loggedInUser({
            token: idTokenResult,
          })
        );

        await UserApi.getCurrentUser()
          .then((res: any) => {
            dispatch(
              loggedInUser({
                email: res?.email,
                name: res?.name,
                _id: res?._id,
                role: res?.role,
                token: idTokenResult,
              })
            );
          })
          .catch((error) => {
            console.log("result:", error);
          });
      }
    });

    return () => unsubscribe();
  }, [dispatch]); //dispatch

  return <RouterProvider router={router} />;
};

export default App;

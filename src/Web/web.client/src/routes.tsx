import { createBrowserRouter } from "react-router-dom";
import SignInSide from "./pages/sign-in/SignInSide";
import SignUp from "./pages/sign-up/SignUp";
import AuthLayout from "./components/AuthLayout";
import { getUserInfo } from "./authentication/useAuthState";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing-page/LandingPage";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        loader: async () => {
            return getUserInfo();
        },
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/signin",
                element: <SignInSide />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
]);

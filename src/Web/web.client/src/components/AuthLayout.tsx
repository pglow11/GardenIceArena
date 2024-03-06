import { Outlet, useLoaderData } from "react-router-dom";
import { AuthContextProvider } from "../authentication/authContext";

export default function AuthLayout() {
    const user: any = useLoaderData();

    return (
        <AuthContextProvider initialUser={user}>
            <Outlet />
        </AuthContextProvider>
    );
}

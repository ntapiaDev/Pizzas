import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();

    // console.log('Auth actuel', auth);
    return(
        auth?.email
            ? <Outlet />
            : <Navigate to="/register" replace />
    );
}

export default RequireAuth;
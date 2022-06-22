import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from '../hooks/useRefreshToken';
import { useCookies } from "react-cookie";

const RequireAuth = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const [cookies, setCookie] = useCookies(["token"]);    

    // console.log('Auth actuel', auth);
    return(
        cookies?.email
            ? <Outlet />
            : <Navigate to="/register" replace />
    );
}

export default RequireAuth;
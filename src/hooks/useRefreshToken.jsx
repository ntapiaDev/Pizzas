import axios from 'axios';
import useAuth from './useAuth';
import { useCookies } from "react-cookie";

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();
    const [cookies, setCookie] = useCookies(["token"]);

    const refresh = async () => {
        const response = await axios.post('http://localhost:8080/user/refresh', {
            token: cookies.token
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            // return { ...prev, token: response.data.token};
        });
        return response.data.token;
    }

  return refresh;
}

export default useRefreshToken
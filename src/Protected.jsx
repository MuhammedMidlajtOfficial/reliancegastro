import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "./AxiosConfig";


const Protect = ({ Component }) => {
    let navigate = useNavigate()

    const checkToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await Instance.get('/validateToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                navigate('/dashboard')
            }
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div>
            <Component />
        </div>
    )
}
export default Protect;

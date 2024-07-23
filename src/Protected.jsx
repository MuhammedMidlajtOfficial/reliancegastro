import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Protect = ({ Component }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/', { replace: true });
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const currentTimestamp = Math.floor(Date.now() / 1000);

                if (!decodedToken.exp) {
                    console.warn('Token does not have an expiration claim');
                    return;
                }

                if (decodedToken.exp < currentTimestamp) {
                    console.log('Token has expired');
                    localStorage.removeItem('token');
                    navigate('/', { replace: true });
                } else if (location.pathname === '/') {
                    navigate('/overview', { replace: true });
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error decoding token:', error.message);
                } else {
                    console.error('An unknown error occurred while decoding the token');
                }
                localStorage.removeItem('token');
                navigate('/', { replace: true });
            }
        };

        checkToken();
    }, [navigate, location]);

    return <Component />;
};

export default Protect;
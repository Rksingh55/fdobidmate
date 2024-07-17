import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getToken,  } from '../../localStorageUtil';

const LogoutComponent = () => {
    const router = useRouter();
    const [token, setToken] = useState(getToken());

    const handleLogout = async () => {
      
        const res = await fetch('http://10.10.10.212/FDO-bidmate/public/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            router.push('/');
        } else {
            toast.error('Failed to logout');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToken(); // Custom function to remove token from localStorage
            setToken(null); // Trigger re-render by setting token to null
            router.push('/'); // Redirect to the login page
        }, 10000); // 60 seconds in milliseconds

        return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    }, []);

    useEffect(() => {
        if (!token) {
            handleLogout();
        }
    }, [token]);

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutComponent;


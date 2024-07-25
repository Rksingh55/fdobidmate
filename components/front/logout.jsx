import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getToken, } from '../../localStorageUtil';
import { API_BASE_URL, LOGOUT_API_URL } from '@/api.config';

// ----------------this components not used any where--------------
const LogoutComponent = () => {
    const router = useRouter();
    const [token, setToken] = useState(getToken());
    const handleLogout = async () => {
        const res = await fetch(`${API_BASE_URL}${LOGOUT_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            setTimeout(() => {
                router.push('/');
            }, 1000)
        } else {
            toast.error('Failed to logout');
        }
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};
export default LogoutComponent;


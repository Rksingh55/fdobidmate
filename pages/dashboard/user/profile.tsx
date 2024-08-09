import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { getToken } from '@/localStorageUtil';
import Profile_Preview from '@/components/front/Profile_Preview';



function profile() {
    const router = useRouter();
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/');
        }
    }, []);

    return (
        <>
            <Profile_Preview />
        </>
    )
}

export default profile
import React, { useEffect } from 'react'
import { TbEdit, TbEyeDotted } from "react-icons/tb";
import { RxBorderDotted } from "react-icons/rx";
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';
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
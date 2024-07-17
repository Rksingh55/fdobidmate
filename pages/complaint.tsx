import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle, toggleLocale, toggleRTL } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { RootState } from '@/store';
import { useTranslation } from 'react-i18next';
import Complaintheader from '@/components/front/complaintheader';
import Complaintfrom from '@/components/front/complaintfrom';

const Complaint = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Urva Login'));
    });
    const router = useRouter();

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };
    const isRtl = useSelector((state: RootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: RootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    }, []);

    const { t, i18n } = useTranslation();

    return (
        <>
         <Complaintheader/>
         <Complaintfrom ></Complaintfrom>
        </>
    );
};
Complaint.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Complaint;

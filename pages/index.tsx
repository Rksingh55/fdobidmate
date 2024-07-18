import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  toggleRTL } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { RootState } from '@/store';
import Herosection from '@/components/front/herosection'

const Index = () => {
    const dispatch = useDispatch();
  
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


    return (
        <>
            <Herosection />
        </>
    );
};
Index.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Index;

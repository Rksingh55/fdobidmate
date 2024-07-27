import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle, toggleLocale, toggleRTL } from 'store/themeConfigSlice';
import Dropdown from '@/components/Dropdown';
import { RootState } from '@/store';
import { useTranslation } from 'react-i18next';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import { MdArrowDropDown } from 'react-icons/md';


const Language = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
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
            <div className="dropdown ms-auto w-max">
                {flag && (
                    <Dropdown
                        offset={[0, 8]}
                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                        btnClassName="flex items-center gap-1 text-black  px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                        button={
                            <>
                            
                                <div className="text-base font-bold uppercase">{flag}</div>
                                <span className="shrink-0">
                                    <MdArrowDropDown  />
                                </span>
                            </>
                        }
                    >
                        <ul className="flex gap-1 flex-col  !px-2 font-semibold  text-dark dark:text-white-dark dark:text-white-light/90">
                            {themeConfig.languageList.map((item: any) => {
                                return (
                                    <li key={item.code}>
                                        <button
                                            type="button"
                                            className={` w-full  rounded-lg hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                            onClick={() => {
                                                dispatch(toggleLocale(item.code));
                                                i18n.changeLanguage(item.code);
                                                setLocale(item.code);
                                            }}
                                        >
                                            <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </Dropdown>
                )}
            </div>
        </>
    );
};
export default Language;
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { RootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import { MdDashboard, MdHome, MdOutlinePayment, MdPayments } from 'react-icons/md';
import { RiAuctionFill, RiForbidFill } from 'react-icons/ri';
import { PiNewspaperFill, PiOvenDuotone } from "react-icons/pi";
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { TbBlockquote } from 'react-icons/tb';
import { GoListUnordered } from "react-icons/go";
import { LiaFileInvoiceDollarSolid, LiaFileInvoiceSolid } from "react-icons/lia";

import { CgProfile } from "react-icons/cg";
import IconMenuTables from '@/components/Icon/Menu/IconMenuTables';
import { BsBorderAll } from 'react-icons/bs';
import { GrNotes } from 'react-icons/gr';
import { LuTextQuote } from 'react-icons/lu';
import { IoDocumentText } from 'react-icons/io5';
const Sidebar = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: RootState) => state.themeConfig);
    const semidark = useSelector((state: RootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    let u_name = "";
    const [name, setName] = useState(u_name ?? "");
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        const Username = u_name ? u_name.replace(/['"]/g, '') : "";
        setName(Username);
    }, []);

    const [vendorRegisterSuccess, setVendorRegisterSuccess] = useState<boolean | null>(null);

    const checkVendorRegisterSuccess = () => {
        const success = localStorage.getItem("vendorRegistersuccess");
        setVendorRegisterSuccess(success !== null);
    };
    useEffect(() => {
        checkVendorRegisterSuccess();
        const handleStorageChange = () => {
            checkVendorRegisterSuccess();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-[#00A9E2] dark:bg-black  ">
                    <div className="flex items-center justify-between px-2 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img src="/assets/images/dashboard_sidebar_logo.svg" alt="Logo" className="w-[210px]  ml-2 flex-none" />
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">

                            <li className="nav-item">
                                <Link href="/dashboard/user/profile" className="nav-link sv-nav text-light">
                                    <div className="flex items-center">
                                        <MdDashboard className="shrink-0  text-white " />
                                        <span className="text-white ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('Profile')}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/dashboard/vendor-register" className="nav-link sv-nav text-light">
                                    <div className="flex items-center">
                                        <CgProfile className="shrink-0  text-white" />
                                        <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('Update Profile')}
                                        </span>
                                    </div>
                                </Link>
                            </li>

                            {/* {vendorRegisterSuccess && ( */}
                            <>
                                <li className="nav-item">
                                    <Link href="/dashboard" className="nav-link sv-nav text-light">
                                        <div className="flex items-center">
                                            <MdDashboard className="shrink-0 group-hover:!text-primary text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                                {t('Dashboard')}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'tender' ? 'active' : ''} nav-link group w-full `} onClick={() => toggleMenu('tender')}>
                                        <div className="flex items-center">
                                            <IoDocumentText className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Tender')}</span>
                                        </div>

                                        <div className={currentMenu !== 'tender' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'tender' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white rounded-md">
                                            <li>
                                                <Link href="/dashboard/tender" className=''>{t('tender-list')}</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'quotations' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('quotations')}>
                                        <div className="flex items-center">
                                            <LuTextQuote className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Quotations')}</span>
                                        </div>

                                        <div className={currentMenu !== 'quotations' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'quotations' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/dashboard/quotations">{t('quotations')}</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>

                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'purchase-order' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('purchase-order')}>
                                        <div className="flex items-center">
                                            <BsBorderAll className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Purchase-order')}</span>
                                        </div>
                                        <div className={currentMenu !== 'purchase-order' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'purchase-order' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/dashboard/purchase-orders">{t('purchase-order')}</Link>
                                                {/* <Link href="/dashboard/purchase-orders-list">{t('purchase-order-list')}</Link> */}
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>

                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'grn' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('grn')}>
                                        <div className="flex items-center">
                                            <GrNotes className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('GRN')}</span>
                                        </div>
                                        <div className={currentMenu !== 'grn' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'grn' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/dashboard/grn/grn-view">{t('grn')}</Link>
                                                <Link href="/dashboard/grn/grn-list">{t('grn-list')}</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'rfi' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('rfi')}>
                                        <div className="flex items-center">
                                            <IconMenuTables className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('rfi')}</span>
                                        </div>

                                        <div className={currentMenu !== 'rfi' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'rfi' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/dashboard/rfi">{t('rfi')}</Link>
                                            </li>

                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className="flex items-center">
                                            <RiAuctionFill className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('auction')}</span>
                                        </div>

                                        <div className={currentMenu !== 'dashboard' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white bg-white">
                                            <li>
                                                <Link href="/dashboard/auction">{t('auction')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/dashboard/auction/auction-list">{t('auction-list')}</Link>
                                            </li>


                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                        <div className="flex items-center">
                                            <LiaFileInvoiceDollarSolid className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('invoice')}</span>
                                        </div>
                                        <div className={currentMenu !== 'invoice' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/dashboard/invoice">{t('invoice')}</Link>
                                                <Link href="/dashboard/invoice/invoice-list">{t('invoice-list')}</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Payment' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Payment')}>
                                        <div className="flex items-center">
                                            <MdPayments className="shrink-0  text-white" />
                                            <span className="text-white  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payment')}</span>
                                        </div>
                                        <div className={currentMenu !== 'Payment' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className='text-white' />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'Payment' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/dashboard/payment">{t('Payment')}</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </>
                            {/* )} */}



                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav >
        </div >
    );
};

export default Sidebar;

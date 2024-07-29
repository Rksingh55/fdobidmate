import Head from 'next/head'
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Frontheader from './Navbar';
import Footer from '../Layouts/Footer';
import { useEffect, useState } from 'react';
import Herosectionleftimage from "../../public/assets/images/herosection_mainIcon.png";
import Fdomainlogo from "../../public/assets/images/fdo_main_logo.png";
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const { t, i18n } = useTranslation();
    let u_name = "";
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        setName(u_name ?? "");
    }, []);
    const [name, setName] = useState(u_name ?? "");

    return (
        <>
            <ToastContainer />
            <Frontheader />
            <div className="  text-black  md:p-3 flex flex-col gap-5 md:flex-row  items-center z-[100] " style={{
                backgroundImage: "url('/assets/images/homepagebg.svg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }} >

                <div className='md:basis-[60%] flex flex-col  items-center md:justify-end  '>
                    <img src='/assets/images/herosection-leftImg.jpg' className='md:h-[90vh] md:w-[50vw] md:py-8 p-2' />
                </div>
                <div className="  md:p-4 md:basis-[40%]    text-center herosectionbg "  >
                    <p className='md:py-2  md:text-[18px] text-[12px]'>{t('Welcome To FDO Bidmate Auction House')}</p>
                    <h1 className="md:text-[30px] text-[25px] font-bold md:mb-4 py-2 text-[#00A9E2]">
                        {t('Build, Sell & Collect Digital items')}
                    </h1>
                    <p className="mb-6  md:text-[18px] leading-6">
                        {t('The services will provide safe, efficient, economically andenvironmentally sustainable services in innovative ways to Conserve the Environment of Our Beautiful Oman for Future Generations')}
                    </p>
                    <Link href="https://fdo.om/" type='blank'>
                        <button className="bg-[#192B56]  text-white font-semibold py-[12px] px-12 rounded-full mb-6">
                            {t('Explore Now ')}
                        </button>
                    </Link>
                </div>

            </div>
        </>
    )
}

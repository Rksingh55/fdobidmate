import Head from 'next/head'
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Frontheader from './Navbar';
import Footer from '../Layouts/Footer';
import { useEffect, useState } from 'react';
import Herosectionleftimage from "../../public/assets/images/herosection_left_image.png";
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
            <Frontheader />
            {/* ----hersection----- */}
            <div className='herosection   '>
                <ToastContainer />
                <div className="  text-black min-h-[88vh]  flex flex-col gap-5 md:flex-row  items-center  ">
                    <div className='basis-[60%] flex flex-col  items-center  '>
                        <div className=''>
                            <Image
                                src={Fdomainlogo}
                                width={300}
                                height={500}
                                alt="herosection_left_image"
                            />
                        </div>
                        <div className='flex justify-center items-center mt-10'>
                            <Image
                                src={Herosectionleftimage}
                                width={670}
                                height={670}
                                alt="herosection_left_image"
                            />
                        </div>
                    </div>
                    <div className="  p-4 basis-[40%]     text-center herosectionbg max-sm:mt-[-50px]"  >
                        <p className='md:py-2  md:text-[18px] text-[12px]'>{t('Welcome To FDO Bidmate Auction House')}</p>
                        <h1 className="md:text-[30px] text-[25px] font-bold md:mb-4 py-2 text-[#20427F]">
                            {t('Build, Sell & Collect Digital items')}
                        </h1>
                        <p className="mb-6  md:text-[18px] leading-6">
                            {t('The services will provide safe, efficient, economically andenvironmentally sustainable services in innovative ways to Conserve the Environment of Our Beautiful Oman for Future Generations')}
                        </p>
                        <Link href="https://fdo.om/" type='blank'>
                            <button className="bg-[#00A9E2]  text-white font-semibold py-[12px] px-10 rounded-full mb-6">
                                {t('Start Exploring')}
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

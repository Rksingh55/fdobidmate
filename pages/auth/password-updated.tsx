import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import IconMail from '@/components/Icon/IconMail';
import IconLockDots from '@/components/Icon/IconLockDots';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Herosectionleftimage from "../../public/assets/images/fdoIcon_black.png";
import Fdomainlogo from "../../public/assets/images/fdo icon3.png";
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import Loader from '@/components/front/loader';
import { FcApproval, FcOk } from 'react-icons/fc';
import { TiHome } from 'react-icons/ti';
import { SuccessIcon } from '@/public/icons';
import Footer from '@/components/Layouts/Footer';

const Login = () => {
    const router = useRouter()
    const [email, setemail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const handleSubmit = (e: any) => {

    };
    const { t, i18n } = useTranslation();

    const handleChange = (e: any) => {
        if (e.target.name == "email") {
            setemail(e.target.value);
        } else if (e.target.name == "password") {
            setpassword(e.target.value);
        }
    };




    return (
        <div className='max-sm:mt-[20%]'>
            <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <div className=' md:bg-[#FFFEFC] md:p-4 '>
                <div className="  text-black   flex flex-col gap-5 md:flex-row  items-center  ">
                    <div className='md:basis-[60%] flex flex-col  items-center justify-end  max-sm:hidden'>
                        <div className='relative md:w-[50vw] md:h-[90vh] md:rounded-lg' style={{
                            backgroundImage: "url('/assets/images/Authenticationimg.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            paddingBottom: "56.25%",
                        }}>
                            <div className='absolute top-0 left-0 w-full h-full' />
                            <div className='flex flex-col items-center justify-center min-h-screen'>
                                <h1 className="text-xl font-bold !leading-snug text-white md:text-4xl text-center">
                                    Welcome to FDO
                                </h1>
                                <p className="text-md  font-semibold leading-normal text-white py-2 p-3 text-center">
                                    Leading Oman's sustainable fishing and aquaculture, Fisheries Development Oman (FDO) innovates with seven specialized companies. From European seabream to shrimp cultivation, FDO drives marine industry revitalization with large-scale, cutting-edge projects.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="  md:p-4 basis-[40%]     text-center  "  >
                        <div className='justify-center flex ' >
                            <Image
                                src={Herosectionleftimage}
                                width={400}
                                height={300}
                                alt="herosection_left_image"
                            />
                        </div>
                        <Link href="/">
                            <div className='flex justify-end  max-sm:px-6  '>
                                <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                            </div></Link>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                            <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-6">
                                    <h1 className="text-xl font-bold  !leading-snug text-[#00A9E2] md:text-2xl">Successful</h1>
                                    <div className='flex justify-center items-center py-3'>

                                        <SuccessIcon />

                                    </div>
                                    <p className="text-base font-semibold leading-normal text-white-dark py-2">Congratulations!
                                        Your password has been changed.
                                        Click continue to login</p>
                                </div>
                                <Link href="/auth/login">
                                    <input
                                        type="submit"
                                        className={`btn  rounded-full hover:bg-[#20427F] !mt-6 w-full border-2 uppercase ${isPasswordFocused ? 'bg-[#20427F]]  text-white py-3' : 'bg-[#20427F] py-3 shadow-none text-white'}`}
                                        value="Continue"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};
Login.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Login;

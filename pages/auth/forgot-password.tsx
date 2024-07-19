import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import IconMail from '@/components/Icon/IconMail';
import IconLockDots from '@/components/Icon/IconLockDots';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Herosectionleftimage from "../../public/assets/images/herosection_left_image.png";
import Fdomainlogo from "../../public/assets/images/fdo icon3.png";
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import Loader from '@/components/front/loader';
import { AiTwotoneMail } from 'react-icons/ai';
import { TiHome } from 'react-icons/ti';

const Login = () => {
    const router = useRouter()
    const [email, setemail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [error, seterror] = useState("");
    const handleSubmit = (e: any) => {
    };
    const { t, i18n } = useTranslation();

    const handleInputChange = (e: any) => {
        (e.target.name == "email")
        setemail(e.target.value);
    };
    const validateEmail = (email: string): boolean => {
        const isEmailValid = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
        return isEmailValid;
    };

    const FormValididate =
        validateEmail(email);

    const isFormValid = email !== '';

    return (
        <div className='md:p-12  bg-gradient-to-b from-[#C1E9FF] to-[#00A9E2] min-h-[100vh]'>
            <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <div style={{
                backgroundImage: "url('/assets/images/herosection_bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh"
            }} className='  rounded-xl  shadow-2xl'>
                <div className="  text-black   flex flex-col gap-5 md:flex-row  items-center  ">
                    <div className='basis-[60%] flex flex-col  items-center   gap-4 '>
                        <div className=''>
                            <Image
                                src={Fdomainlogo}
                                width={500}
                                height={500}
                                alt="herosection_left_image"
                            />
                        </div>
                        <div className='flex justify-center items-center mt-12'>
                            <Image
                                src={Herosectionleftimage}
                                width={670}
                                height={670}
                                alt="herosection_left_image"
                            />
                        </div>
                    </div>
                    <div className="  p-4 basis-[40%]     text-center  max-sm:mt-[-50px]"  >
                    <Link href="/">
                      <div className='flex justify-end   px-4 '>
                            <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white'/></div>
                        </div></Link>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                            <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-6">
                                    <h1 className="text-xl font-bold  !leading-snug text-[#00A9E2] md:text-2xl">Forgot password</h1>
                                    <p className="text-base font-semibold leading-normal text-white-dark py-2">Please enter your email id to reset the password</p>
                                </div>
                                <form className="space-y-4 dark:text-white" method="post" onSubmit={handleSubmit}>
                                    <div>
                                        {error && <p className='font-bold text-red-500 text-center pb-3'>{error}</p>}

                                        <div className="relative text-white-dark">
                                            <input
                                                value={email}
                                                onChange={handleInputChange}
                                                name="email"
                                                id="Email"
                                                type="email"
                                                placeholder="Email *"
                                                className={`form-input py-3 pl-10 placeholder-text-white-dark rounded-full border-[#FC8404] ${email.trim() === '' || validateEmail(email) ? 'text-green-500' : 'text-red-500'}`}
                                                required
                                            />

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <AiTwotoneMail />
                                            </span>



                                        </div>
                                        {!validateEmail(email) && email.trim() !== '' && (
                                            <p className="text-[13px] text-red-500 text-start py-1">
                                                Only (a to z) & (A to Z) & (0 to 9) & (._-) special characters allowed
                                            </p>
                                        )}
                                    </div>
                                    <Link href="/auth/verify-otp">
                                        <button
                                            type="submit"
                                            className={` rounded-full mt-3  w-full border-2 uppercase border-[#00A9E2]  font-bold py-3 ${!isFormValid ? 'bg-transparent  py-3 border-gray-400 text-black shadow-none cursor-not-allowed' : '  bg-[#00A9E2]  text-white'}`}
                                            disabled={!isFormValid}
                                        >
                                            Submit
                                        </button>
                                    </Link>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
                <div style={{ borderRadius: "0px 0px 10px 10px" }} className='bg-[#20427F]  font-bold  text-center'>
                    <footer className="py-3 md:w-[90%] w-[95%] m-auto">
                        <div className="container mx-auto ">
                            <div className="text-center ">
                                <p className="text-white">© 2024 FDO {t("All rights reserved")} Powered by Amysoftech.com</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

        </div>
    );
};
Login.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Login;

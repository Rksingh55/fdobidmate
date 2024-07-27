import { useState, useRef, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import Herosectionleftimage from "../../public/assets/images/fdoIcon_black.png";
import Fdomainlogo from "../../public/assets/images/fdo icon3.png";
import Image from 'next/image'
import Loader from '@/components/front/loader';
import { TiHome } from 'react-icons/ti';

const Login = () => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [error, setError] = useState<string>('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        console.log('OTP Code:', otpCode);
    };

    return (
        <div className=''>
            <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <div className='  bg-[#FFFEFC] md:p-4'>
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
                    <div className=" md:p-4 basis-[40%]     text-center  max-sm:mt-10 "  >
                        <div className='justify-center flex ' >
                            <Image
                                src={Herosectionleftimage}
                                width={400}
                                height={300}
                                alt="herosection_left_image"
                            />
                        </div>
                        <Link href="/">
                            <div className='flex justify-end px-2 max-sm:px-5  '>
                                <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                            </div>
                        </Link>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                            <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-6">
                                    <h1 className="text-xl font-bold  !leading-snug text-[#00A9E2] md:text-2xl">Check your email</h1>
                                    <p className="text-base font-semibold leading-normal text-white-dark py-2">We sent a OTP to contact@dscode...com
                                        enter 6 digit Number that mentioned in the email</p>
                                </div>
                                <form className="space-y-4 dark:text-white" method="post" onSubmit={handleSubmit}>
                                    <div className=''>
                                        {error && <p className='font-bold text-red-500 text-center'>{error}</p>}
                                        <div className=" flex justify-between mt-2">
                                            {otp?.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    maxLength={1}
                                                    onFocus={() => setIsPasswordFocused(true)}
                                                    className="w-12 h-12 text-center  rounded border-2 border-[#00A9E2]"
                                                    value={digit}
                                                    onChange={(e) => handleChange(e, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Link href="/auth/password-reset">
                                        <input
                                            type="submit"
                                            className={`btn  rounded-full hover:bg-[#20427F] !mt-6 w-full border-2 font-bold   ${isPasswordFocused ? 'bg-[#20427F]    text-white py-3' : 'border-[#00A9E2] py-3  shadow-none text-[#00A9E2]'}`}
                                            value="Verify"
                                            disabled={!isPasswordFocused}
                                        />
                                    </Link>
                                    <div className='flex justify-between'>
                                        <p className=' font-semibold leading-normal text-white-dark py-2'>Haven’t got the OTP yet?           </p>
                                        <button className='text-[#00A9E2]  font-bold'>  Resend OTP</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='  font-bold  text-center'>
                    <footer className="p-2 md:w-[90%]  m-auto">
                        <div className="container mx-auto ">
                            <div className="text-center ">
                                <p className="text-black">© 2024 FDO {("All rights reserved")} Powered by Amysoftech.com</p>
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

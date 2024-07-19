import { useState, useRef, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import Herosectionleftimage from "../../public/assets/images/herosection_left_image.png";
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
        <div className='md:p-12 max-sm:p-3  bg-gradient-to-b from-[#C1E9FF] to-[#00A9E2] min-h-[100vh]  max-sm:flex  max-sm:items-center'>
            <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <div style={{
                backgroundImage: "url('/assets/images/herosection_bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

            }} className='  rounded-xl  shadow-2xl '>
                <div className="  text-black   flex flex-col gap-5 md:flex-row  items-center  ">
                    <div className='md:basis-[60%] w-full flex flex-col   items-center   gap-4 max-sm:hidden '>
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
                    <div className=" md:p-4 basis-[40%]     text-center  max-sm:mt-10 "  >
                    <Link href="/">
                            <div className='flex justify-end px-2   '>
                                <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                            </div></Link>
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
                                                    className="w-12 h-12 text-center border rounded"
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
                                            className={`btn  rounded-full hover:bg-[#00A9E2] !mt-6 w-full border-2 uppercase ${isPasswordFocused ? 'bg-[#00A9E2] border-[#00A9E2] text-white py-3' : 'bg-gray-400 py-3 border-gray-400 shadow-none'}`}
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
                <div style={{ borderRadius: "0px 0px 10px 10px" }} className='bg-[#20427F]  font-bold  text-center'>
                    <footer className="py-3 md:w-[90%] w-[95%] m-auto">
                        <div className="container mx-auto ">
                            <div className="text-center ">
                                <p className="text-white">© 2024 FDO {("All rights reserved")} Powered by Amysoftech.com</p>
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

import { useState } from 'react';
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
import { TiHome } from "react-icons/ti";
import { API_BASE_URL } from '@/api.config';
const Login = () => {
    const router = useRouter()
    const [email, setemail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [password, setpassword] = useState("");
    const [error, setError] = useState<{ type: 'success' | 'error'; text: string }>({ type: 'error', text: '' });

    const LoginapiUrl = "/api/login"
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = { email, password };
        setShowLoader(true)
        if (email == "" || password == "") {
            setError({ type: 'error', text: "Please enter valid email and password" });
        }
        else {
            setError({ type: 'success', text: "Validating please wait...!!" });
        }
        fetch(`${API_BASE_URL}${LoginapiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data.message);
                setError({ type: 'error', text: data.message })
                if (data.status == "success") {
                    router.push('/dashboard/vendor-register')
                    if (data.data && data.data.length > 0) {
                        const firstObject = data.data[0];
                        setShowLoader(false)
                        localStorage.setItem('token', JSON.stringify(firstObject.token))
                        localStorage.setItem('userName', JSON.stringify(firstObject.name))
                        setemail('');
                        setpassword('');
                    }
                }
                else {
                    setError({ type: 'error', text: "Please enter correct email & password" });
                    setShowLoader(false)
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const { t } = useTranslation();
    const handleChange = (e: any) => {
        if (e.target.name == "email") {
            setemail(e.target.value);
        } else if (e.target.name == "password") {
            setpassword(e.target.value);
        }
    };

    const isFormValid = email !== '' && password !== '';


    return (
        <div  className='md:p-12 max-sm:p-3  bg-gradient-to-b from-[#C1E9FF] to-[#00A9E2] min-h-[100vh]  max-sm:flex  max-sm:items-center'>
            <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <div style={{
                backgroundImage: "url('/assets/images/herosection_bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
               
            }} className=' rounded-xl  shadow-2xl '>
                <div className="  text-black  flex flex-col gap-5 md:flex-row  items-center  ">
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
                    <div className="  md:p-4 basis-[40%]     text-center  max-sm:mt-10"  >
                        <Link href="/">
                            <div className='flex justify-end   px-4 '>
                                <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                            </div></Link>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                            <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-6">
                                    <h1 className="text-xl font-bold  !leading-snug text-[#00A9E2] md:text-2xl">Welcome to FDO</h1>
                                    <p className="text-base font-semibold leading-normal text-white-dark py-2">Please provide your email address and password to access your account.</p>
                                </div>
                                <form className="space-y-4 dark:text-white" method="post" onSubmit={handleSubmit}>
                                    <div>

                                        {error && (
                                            <div className={` ${error.type === 'success' ? 'text-green-500' : 'text-red-500'} text-${error.type === 'success' ? 'green' : 'red'}-500 rounded font-bold text-center pb-3`}>
                                                {error.text}
                                            </div>
                                        )}
                                        {/* {error && <p className='font-bold text-red-500 text-center pb-3'>{error}</p>} */}

                                        <div className="relative text-white-dark">
                                            <input type="text" className="form-input py-3 ps-10 placeholder:text-white-dark rounded-full border-[#FC8404]" placeholder="Enter Email" name="email" value={email}
                                                onChange={handleChange} id="Email" />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconMail fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="relative text-white-dark">
                                            <input type="password" className="form-input ps-10 placeholder:text-white-dark rounded-full py-3 border-[#FC8404]" name="password" placeholder="Enter Password" value={password}
                                                onChange={handleChange}

                                                id="Password" />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLockDots fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <input type='checkbox' />
                                            <p>Remember Me</p>
                                        </div>
                                        <Link href="/auth/forgot-password" className=" text-[#00A9E2]     dark:hover:text-white hover:font-bold ">
                                            Forgot Password?
                                        </Link>
                                    </div>


                                    <button
                                        type="submit"
                                        className={` rounded-full   w-full border-2 uppercase border-[#00A9E2] py-3 font-bold ${!isFormValid ? 'bg-transparent  py-3 border-gray-400 text-black shadow-none cursor-not-allowed' : '  bg-[#00A9E2]  text-white'}`}
                                        disabled={!isFormValid}
                                    >
                                        Submit
                                    </button>
                                </form>

                                <div className="text-center dark:text-white mt-8">
                                    Don't have an account ?&nbsp;
                                    <Link href="/auth/register" className=" text-[#00A9E2] hover:font-bold  dark:hover:text-white">
                                        Register
                                    </Link>
                                </div>
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

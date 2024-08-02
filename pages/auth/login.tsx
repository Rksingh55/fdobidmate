import { useState } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Herosectionleftimage from "../../public/assets/images/fdoIcon_black.png";
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import Loader from '@/components/front/loader';
import { TiHome } from "react-icons/ti";
import { API_BASE_URL, LOGIN_API_URL } from '@/api.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { EmailIcon, LoginbuttonIcon, PaswordIcon, RegisterbuttonIcon } from '@/public/icons';

const Login = () => {
    const router = useRouter()
    const [email, setemail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [password, setpassword] = useState("");
    const [error, setError] = useState<{ type: 'success' | 'error'; text: string }>({ type: 'error', text: '' });
    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = { email, password };
        setShowLoader(true)
        if (email == "" || password == "") {
            setError({ type: 'error', text: "Please enter valid email and password" });
        }
        else {
            setError({ type: 'error', text: "Something went wrong, try after some time" });
        }
        fetch(`${API_BASE_URL}${LOGIN_API_URL}`, {
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
                setError({ type: 'error', text: data.message })
                if (data.status == "success") {
                    router.push('/dashboard/vendor-register')
                    setShowLoader(false)
                    if (data.data && data.data.length > 0) {
                        const firstObject = data.data[0];
                        localStorage.setItem('token', JSON.stringify(firstObject.token))
                        localStorage.setItem('userName', JSON.stringify(firstObject.name))
                        localStorage.setItem('email', JSON.stringify(firstObject.email))

                        setemail('');
                        setpassword('');
                    }
                }
                else {
                    setShowLoader(false)
                    setError({ type: 'error', text: "Please enter correct email & password" });
                }
            })
            .catch((error) => {
                setShowLoader(false)
                setError({ type: 'error', text: "Something went wrong! Please try again later." });
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
        <div className='max-sm:mt-[10%]'>
            <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <div className='bg-[#FFFEFC] p-4 '>
                <div className="  text-black  w-d flex flex-col gap-5 md:flex-row  items-center  ">
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
                    <div className=" md:basis-[40%]  w-full    text-center "  >
                        <div className='flex justify-center ' >
                            <Image
                                src={Herosectionleftimage}
                                width={400}
                                height={300}
                                alt="herosection_left_image"
                            />
                        </div>
                        <div className='flex items-center mt-2 gap-2'>
                            <div className='bg-[#00A9E2] md:w-[60%] w-full m-auto flex gap-2 justify-center p-2 rounded-full '>
                                <Link href="/auth/login">
                                    <button className='bg-[#20427F] px-8 py-2 rounded-full text-white font-bold flex gap-2'><LoginbuttonIcon />Login</button>
                                </Link>
                                <Link href="/auth/register">
                                    <button className='hover:bg-[#20427F] px-8 py-2 rounded-full text-white font-bold flex gap-2'>
                                        <RegisterbuttonIcon />Register</button>
                                </Link>
                            </div>
                            <div>
                                <Link href="/">
                                    <div className='flex justify-end   md:px-8 max-sm:py-3'>
                                        <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                                    </div></Link>
                            </div>
                        </div>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 md:px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                            <div className="w-full max-w-[440px] ">
                                <form className="space-y-4 dark:text-white" method="post" onSubmit={handleSubmit}>
                                    <div>

                                        {error && (
                                            <div className={` ${error.type === 'success' ? 'text-green-500' : 'text-red-500'} text-${error.type === 'success' ? 'green' : 'red'}-500 rounded font-bold text-center pb-1`}>
                                                {error.text}
                                            </div>
                                        )}
                                        <p className="text-start py-3 font-semibold">Please Login to Your Account and Explore</p>

                                        {/* {error && <p className='font-bold text-red-500 text-center pb-3'>{error}</p>} */}
                                        <div className="relative text-white-dark">
                                            <input type="text" className="form-input py-3 ps-10 placeholder:text-white-dark rounded-full border-[#00A9E2] border-2" placeholder="Enter Email" name="email" value={email}
                                                onChange={handleChange} id="Email" />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <EmailIcon />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative text-white-dark">
                                            <input
                                                className="form-input ps-10 placeholder:text-white-dark rounded-full py-3 border-[#00A9E2] border-2" name="password" placeholder="Enter Password" value={password}
                                                onChange={handleChange}
                                                id="Password" type={showPassword ? 'text' : 'password'}
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <PaswordIcon />
                                            </span>
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-4 flex items-center pr-3"
                                            >
                                                {showPassword ? (
                                                    <FaEyeSlash className='text-lg' />
                                                ) : (
                                                    <FaEye className='text-lg' />
                                                )}
                                            </button>
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
                                        className={` rounded-full mt-3  w-full border-2    font-bold py-3 ${!isFormValid ? 'bg-transparent  border-gray-500  py-3 text-gray-500   shadow-none cursor-not-allowed' : '  bg-[#20427F]  text-white'}`}
                                        disabled={!isFormValid}
                                    >
                                        Login
                                    </button>
                                </form>
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

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
import { AiTwotoneMail } from 'react-icons/ai';
import { TiHome } from 'react-icons/ti';
import { EmailIcon } from '@/public/icons';
import Footer from '@/components/Layouts/Footer';
import { API_BASE_URL, FORGOT_PASSWORD_API_URL, LOGIN_API_URL, RESEND_API_URL } from '@/api.config';
import Swal from 'sweetalert2';

const Login = () => {
    const router = useRouter()
    const [email, setemail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [error, seterror] = useState("");

    const { t, i18n } = useTranslation();

    const handleInputChange = (e: any) => {
        (e.target.name == "email")
        setemail(e.target.value);
    };
    const validateEmail = (email: string): boolean => {
        const isEmailValid = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
        return isEmailValid;
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}${FORGOT_PASSWORD_API_URL}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: data.message.success || 'Reset link sent on registered email successfully!',
                    customClass: 'sweet-alerts',
                });
            } else {
                seterror(data.message.error);
            }
        } catch (error) {
            seterror("something went wrong ! please try after some time");
        }

    };

    const FormValididate =
        validateEmail(email);
    const isFormValid = email !== '';
    const cancel = () => {
        setemail("")
    }
    return (
        <>
            <div className='max-sm:mt-[10%] '>
                <ToastContainer />
                {showLoader && (
                    <Loader />
                )}
                <div className='md:bg-[#FFFEFC] md:p-4 '>
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
                        <div className="  md:p-4 md:basis-[40%] w-full     text-center  "  >
                            <div className='justify-center flex ' >
                                <Image
                                    src={Herosectionleftimage}
                                    width={400}
                                    height={300}
                                    alt="herosection_left_image"
                                />
                            </div>
                            <Link href="/">
                                <div className='flex justify-end max-sm:px-6   '>
                                    <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                                </div></Link>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                                <div className="w-full max-w-[440px] max-sm:mt-12">
                                    <div className="mb-6 text-center">
                                        <h1 className="text-md font-bold  !leading-snug text-[#00A9E2] md:text-2xl text-center text-xl">Forgot password</h1>
                                        <p className=" py-2">Please enter your email id to reset the password</p>
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
                                                    className={`form-input py-3 border-2 pl-10 placeholder-text-white-dark rounded-full border-[#00A9E2] ${email.trim() === '' || validateEmail(email) ? 'text-green-500' : 'text-red-500'}`}

                                                />

                                                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <EmailIcon />
                                                </span>



                                            </div>
                                            {!validateEmail(email) && email.trim() !== '' && (
                                                <p className="text-[13px] text-red-500 text-start py-1">
                                                    Only (a to z) & (A to Z) & (0 to 9) & (._-) special characters allowed
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            onSubmit={handleSubmit}
                                            className={` rounded-full mt-3  w-full border-2    font-bold py-3 ${!isFormValid ? 'bg-transparent  text-gray-500  py-3 border-gray-500  shadow-none cursor-not-allowed' : '  bg-[#20427F]  text-white'}`}
                                            disabled={!isFormValid}
                                        >
                                            Reset Password
                                        </button>

                                    </form>
                                    <button
                                        className={"rounded-full mt-3  w-full border-2    font-bold py-3  cursor-pointer hover:bg-[#20427F] border-[#00A9E2] text-[#00A9E2] shadow-none  hover:text-white"}
                                        onClick={cancel}
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
Login.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Login;

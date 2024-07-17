import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import IconMail from '@/components/Icon/IconMail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const router = useRouter()
    const [email, setemail] = useState("");
    const [error, seterror] = useState("");
    const handleSubmit = (e: any) => {
    };
    const handleChange = (e: any) => {
        e.target.name == "email"
        setemail(e.target.value);
        console.log();
    };

    return (
        <div className=''>
            <ToastContainer />
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6   dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50  lg:flex-row lg:gap-10 xl:gap-0 lg:h-[568px]">
                    <div className='bg-red-200 w-full max-sm:hidden'>
                        <img className='w-full h-full object-cover' src='https://img.freepik.com/free-photo/young-adult-using-digital-device-while-travelling_23-2149119738.jpg?t=st=1718017242~exp=1718020842~hmac=f39b5aba42af1c7d5b6d7e645ee82f16240f565f93316fd0c3f788fb39abe959&w=900' />
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">

                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Email Validate</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email to send otp </p>
                            </div>
                            <form className="space-y-5 dark:text-white" method="post" onSubmit={handleSubmit}>
                                <div>
                                    {error && <p className='font-bold text-red-500 text-center'>{error}</p>}
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input type="text" className="form-input ps-10 placeholder:text-white-dark" placeholder="Email" name="email" value={email}
                                            onChange={handleChange} id="Email" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>


                                <Link href="/auth/verify-otp">
                                    <input
                                        type="submit"
                                        className='p-2 rounded text-white bg-blue-600 !mt-6 w-full border-2 uppercase '
                                        value="Send Otp"

                                    />
                                </Link>
                            </form>
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

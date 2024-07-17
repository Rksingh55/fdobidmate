import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../store/themeConfigSlice';
import Link from 'next/link';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useTranslation } from 'react-i18next';
import { GrOrganization } from 'react-icons/gr';
import { MdArrowDropDown, MdClose, MdFormatListNumbered, MdPhone } from 'react-icons/md';
import { AiTwotoneHome, AiTwotoneMail } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import Herosectionleftimage from "../../public/assets/images/herosection_left_image.png";
import Fdomainlogo from "../../public/assets/images/fdo icon3.png";
import { BsBuildings } from 'react-icons/bs';
import OtpModal from "@/components/front/OtpModal"
import { TiHome } from 'react-icons/ti';
const RegisterCover = () => {
    const router = useRouter();
    const [message, setmessege] = useState("");
    const [emailvalidate, setemailvalidate] = useState(true);

    const [user, setuser] = useState<any>({
        organization_name: "",
        name: "",
        email: "",
        showVerifyButton: false,
        showOtpInput: false,
        phone_no: "",
        address: "",
        cr_number: " ",
        company_id: [],
    });


    const isFormValid = user.organization_name !== ""
        && user.name !== ""
        && user.email !== ""
        && user.cr_number !== ""
        && user.phone_no !== "";

    const validateEmail = (email: string): boolean => {
        const isEmailValid = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
        return isEmailValid;

    };

    const validatePhoneNumber = (value: string): boolean => {
        return /^\d{8,10}$/.test(value);
    };

    const validateAddress = (value: string): boolean => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 20 && /^[^<>#\[\]{}()?|]+$/.test(value);;
    };

    const FormValididate =
        validateEmail(user.email) &&
        validatePhoneNumber(user.phone_no) &&
        validateAddress(user.address);


    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleInputChange = (e: any) => {
        const emailValue = e.target.value;
        setuser({
            ...user,
            email: emailValue,
            showVerifyButton: emailValue.trim() !== '',

        });
    };

    const handleVerifyClick = async () => {
        const { organization_name, name, email } = user;
        if (!organization_name || !name || !email) {
            toast.error("Please fill in all required fields: organization name, name, and email.");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }
        try {
            const body = {
                organization_name,
                name,
                email,
            };
            const response = await fetch('http://10.10.10.212/FDOBidmateLaravel/public/api/otpRequest', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response?.json();
            const vendorid = data?.data;
            localStorage.setItem("vendor_id", vendorid);
            if (data?.status === "success") {
                setIsOpenModal(true);
                toast.success("OTP sent on email");
            } else {
                toast.error("Email validation failed");
            }
        } catch (error) {
            console.error('Error validating email:', error);
            toast.error("Email already exists! Please use another email.");
        }
    };



    const handleOtpSubmit = (otp: any) => {
        console.log('Submitting OTP:', otp);
        setTimeout(() => {
            setIsOpenModal(false);
        }, 8000)
    };


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Cover'));
    });

    const submitForm = (e: any) => {
        e.preventDefault();

        if (!FormValididate) {
            // toast.error("Please validate required fields")
        } else {
            const vendor_id = localStorage.getItem("vendor_id");
            const payload = {
                ...user,
                id: vendor_id,
            };
            fetch(`http://10.10.10.212/FDOBidmateLaravel/public/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == "success") {
                        toast.success("Registration successfull please login")
                        setTimeout(() => {
                            router.push("/auth/login")
                        }, 2000);
                    }
                    else {
                        toast.error("Registeration failed")
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };
    const { t, i18n } = useTranslation();
    const initialCompanies = [
        { id: 1, name: 'Company A' },
        { id: 2, name: 'Company B' },
        { id: 3, name: 'Company C' },
        { id: 4, name: 'Company D' },
        { id: 5, name: 'Company E' },
        { id: 6, name: 'Company F' }
    ];
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSelectCompany = (selectedCompanyId: number) => {
        const isSelected = user.company_id.includes(selectedCompanyId);

        if (isSelected) {
            setuser({
                ...user,
                company_id: user.company_id.filter((companyId: number) => companyId !== selectedCompanyId)
            });
        } else {
            setuser({
                ...user,
                company_id: [...user.company_id, selectedCompanyId]
            });
        }
    };

    const handleSelectAll = () => {
        const allCompanyIds = initialCompanies.map(company => company.id);
        setuser({ ...user, company_id: allCompanyIds });
    };

    const handleRemoveAll = () => {
        setuser({ ...user, company_id: [] });
    };

    const isAllSelected = initialCompanies.length === user.company_id.length;

    const handleRemoveCompany = (selectedCompanyId: number) => {
        setuser({ ...user, company_id: user.company_id.filter((companyId: number) => companyId !== selectedCompanyId) });
    };


    return (
        <>
            <ToastContainer />
            <div className='md:p-12  bg-gradient-to-b from-[#C1E9FF] to-[#00A9E2] min-h-[100vh]  max-sm:p-3 max-sm:flex  max-sm:items-center'>

                <div className='herosection  rounded-xl  shadow-2xl '>
                    <div className="  text-black  flex flex-col gap-5 md:flex-row  items-center  ">
                        <div className='basis-[60%] flex flex-col  items-center  gap-5 max-sm:hidden '>
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
                        <div className="  md:p-4 basis-[40%]     text-center "  >
                        <Link href="/">
                      <div className='flex justify-end   px-4 '>
                            <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white'/></div>
                        </div></Link>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                                <div className="w-full max-w-[440px] ">
                                    <div className="">
                                        <h1 className="text-xl font-bold  !leading-snug text-[#00A9E2] md:text-2xl">Welcome to FDO</h1>
                                        <p className="text-base font-bold leading-normal text-white-dark py-2">Fill Out the Form Carefully for Registration</p>
                                    </div>

                                    <div className='text-center py-2'>
                                        {message && <p className='text-red-500 font-bold'>{message}*</p>}
                                    </div>
                                    <div className='pb-2'>

                                    </div>
                                    <form className="space-y-3 dark:text-white" onSubmit={submitForm}>

                                        <div className="relative text-white-dark">
                                            <input
                                                onChange={(e) => setuser({ ...user, organization_name: e.target.value })}
                                                id="OrganizationName"
                                                type="text"
                                                placeholder="Organization Name *"
                                                className="form-input py-3 ps-10 placeholder-text-white-dark rounded-full border-[#FC8404]"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <GrOrganization />
                                            </span>
                                        </div>

                                        <div className="relative text-white-dark">
                                            <input
                                                onChange={(e) => setuser({ ...user, name: e.target.value })}
                                                id="ContactPersonName"
                                                type="text"
                                                placeholder="Contact Person Name *"
                                                className="form-input py-3 ps-10 placeholder-text-white-dark rounded-full border-[#FC8404]"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <BsBuildings />
                                            </span>
                                        </div>


                                        <div className="relative text-white-dark">
                                            <input
                                                value={user.email}
                                                onChange={handleInputChange}
                                                name="email"
                                                id="Email"
                                                type="email"
                                                placeholder="Email *"
                                                className={`form-input py-3 pl-10 placeholder-text-white-dark rounded-full border-[#FC8404] ${user.email.trim() === '' || validateEmail(user.email) ? 'text-green-500' : 'text-red-500'}`}
                                                required
                                            />

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <AiTwotoneMail />
                                            </span>

                                            {user.showVerifyButton && (
                                                <button
                                                    type='submit'
                                                    onClick={handleVerifyClick}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-red-500  p- font-bold rounded-full px-3"
                                                >
                                                    Verify OTP
                                                </button>
                                            )}
                                        </div>

                                        {user.email !== '' && !validateEmail(user.email) && user.email.trim() !== '' && (
                                            <p className="text-sm text-red-500 text-start text-[12px]">
                                                Only (a to z) & (A to Z) & (0 to 9) & (._- @) special characters allowed
                                            </p>
                                        )}


                                        {emailvalidate && (
                                            <>
                                                <div className="relative text-white-dark">
                                                    <div
                                                        onClick={toggleDropdown}
                                                        className="flex items-center justify-between cursor-pointer form-input py-3 ps-10 placeholder-text-white-dark rounded-full border-[#FC8404]"
                                                    >
                                                        <input
                                                            type="text"
                                                            className='w-[80%] outline-none cursor-pointer'
                                                            placeholder="Select Companies"
                                                            value={
                                                                user.company_id.length > 0
                                                                    ? initialCompanies.filter(company => user.company_id.includes(company.id)).map(company => company.name).join(', ')
                                                                    : ''
                                                            }
                                                        />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <GrOrganization className='text-white-dark' />
                                                        </span>
                                                        <span>
                                                            <MdArrowDropDown className="text-xl" />
                                                        </span>
                                                    </div>
                                                    {isOpen && (
                                                        <div className="absolute top-full mt-1 border-1 border-[#FC8404] bg-white rounded-lg w-full z-[100]">
                                                            <ul className="py-1 overflow-y-auto max-h-40">
                                                                <li className="px-4 py-2 cursor-pointer flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isAllSelected}
                                                                        onChange={handleSelectAll}
                                                                        className="form-checkbox mr-2 cursor-pointer"
                                                                    />
                                                                    <span>Select All</span>
                                                                </li>
                                                                {initialCompanies.map(company => (
                                                                    <li key={company.id} className="px-4 py-2 flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={user.company_id.includes(company.id)}
                                                                            onChange={() => handleSelectCompany(company.id)}
                                                                            className="form-checkbox mr-2 cursor-pointer"
                                                                        />
                                                                        <span>{company.name}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {user.company_id.length > 0 && (
                                                        <div onClick={handleRemoveAll} className="cursor-pointer absolute flex gap-1 justify-center items-center px-2 end-8 top-1/2 -translate-y-1/2 bg-white text-[#00A9E2] rounded-full p-1 font-bold">
                                                            Remove all
                                                            <MdClose className="text-[#00A9E2]" />
                                                        </div>
                                                    )}
                                                </div>


                                                <div className="flex gap-2 md:flex-row flex-col">
                                                    <div className="relative text-white-dark">
                                                        <input
                                                            onChange={(e) => setuser({ ...user, phone_no: e.target.value })}
                                                            id="ContactNumber"
                                                            type="number"
                                                            placeholder="Contact Number *"
                                                            className={`form-input py-3 ps-10 placeholder-text-white-dark rounded-full border-[#FC8404]  sm:text-sm ${validatePhoneNumber(user.phone_no) ? 'text-green-500' : 'border-red-500 text-red-600'}`}
                                                           
                                                        />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <MdPhone />
                                                        </span>
                                                    </div>


                                                    <div className="relative text-white-dark">
                                                        <input
                                                            onChange={(e) => setuser({ ...user, cr_number: e.target.value })}
                                                            id="cr_number"
                                                            type="number"
                                                            placeholder="CR Number *"
                                                            className="form-input py-3 ps-10 placeholder-text-white-dark rounded-full border-[#FC8404]"
                                                        />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <MdFormatListNumbered />
                                                        </span>
                                                    </div>
                                                </div>

                                                {user.phone_no !== '' && !validatePhoneNumber(user.phone_no) && (
                                                    <p className="text-sm text-red-500 text-start   text-[12px]">Please enter a valid 10-digit phone number.</p>
                                                )}
                                                <div className="relative text-white-dark">
                                                    <input
                                                        onChange={(e) => setuser({ ...user, address: e.target.value })}
                                                        type="text"
                                                        placeholder="Address"
                                                        className={`form-input py-3 ps-10 placeholder-text-white-dark rounded-full border-[#FC8404]   sm:text-sm ${validateAddress(user.address) ? '' : 'text-red-500'}`}
                                                        required
                                                    />
                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                        <AiTwotoneHome />
                                                    </span>
                                                </div>
                                                {user.address !== '' && !validateAddress(user.address) && (
                                                    <p className="text-sm text-red-500 text-start   text-[12px]">
                                                        Please enter a valid address within 20 words without special characters like #, [], { }, (), ?, or |</p>
                                                )}
                                            </>

                                        )}


                                        <div className="flex gap-2">
                                            <input type="checkbox" />
                                            <p>
                                                I have read and accept the{' '}
                                                <span className="underline hover:text-blue-500 cursor-pointer">terms and conditions</span>.
                                            </p>
                                        </div>

                                        <OtpModal
                                            isOpen={isOpenModal}
                                            onClose={() => setIsOpenModal(false)}
                                            onOtpSubmit={handleOtpSubmit}
                                        />


                                        <button
                                            type="submit"
                                            className={` rounded-full   w-full border-2 uppercase border-[#00A9E2]  py-3 font-bold ${!isFormValid ? 'bg-transparent  py-3 border-gray-400 text-black shadow-none cursor-not-allowed' : '  bg-[#00A9E2]  text-white'}`}
                                            disabled={!isFormValid}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                    <div className="text-center dark:text-white mt-3">
                                        Already have an account ?&nbsp;
                                        <Link href="/auth/login" className="uppercase text-[#00A9E2] underline transition hover:font-bold dark:hover:text-white">
                                            LOG IN
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



        </>
    );
};
RegisterCover.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default RegisterCover;

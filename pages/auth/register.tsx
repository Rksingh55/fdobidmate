import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../store/themeConfigSlice';
import Link from 'next/link';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { MdArrowDropDown, MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import Herosectionleftimage from "../../public/assets/images/fdoIcon_black.png";
import Loader from '@/components/front/loader';
import OtpModal from "@/components/front/OtpModal"
import { TiHome } from 'react-icons/ti';
import { API_BASE_URL, COMPANYLIST_API_URL, OTPVALIDATE_API_URL, REGISTER_API_URL } from '@/api.config';
import { AddressIcon, CompanyNameIcon, ConatctNumberIcon, CrNumberIcon, EmailsIcon, FullNameIcon, LoginbuttonIcon, OrganiszationIcon, RegisterbuttonIcon } from '@/public/icons';

const RegisterCover = () => {
    const router = useRouter();
    const [emailvalidate, setemailvalidate] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
    interface ApiResponse {
        status: string;
        message: {
            success?: string;
            error?: string;
        };
        data?: any;
    }
    const [companies, setCompanies] = useState<any[]>([]);
    const fetchCompanyList = async () => {
        const API_URL = `${API_BASE_URL}${COMPANYLIST_API_URL}`;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                setCompanies([]);
                return { data: [] };
            }
            const companydata = await response.json();
            setCompanies(companydata.data);
            return companydata;
        } catch (error) {
            console.error('Error fetching company list:', error);
            setCompanies([]);
            return { data: [] };
        }
    };
    useEffect(() => {
        fetchCompanyList()
    }, [])

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
            setShowLoader(true)

            const response = await fetch(`${API_BASE_URL}${OTPVALIDATE_API_URL}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                setShowLoader(false)
                const errorData: ApiResponse = await response.json();
                throw new Error(errorData.message.error || 'Network response was not ok');
            }
            const data: ApiResponse = await response.json();
            const vendorid = data?.data;
            localStorage.setItem("vendor_id", vendorid);
            if (data?.status === "success") {
                setShowLoader(false)
                setIsOpenModal(true);
                toast.success(data.message.success);
            } else {
                toast.error(data.message.error)
            }
        } catch (error) {
            if (error instanceof Error) {
                setShowLoader(false)
                setErrorMessage(error.message);
            } else {
                setShowLoader(false)
                setErrorMessage("Something went wrong! Please try again later.");
            }
        }
    };
    const handleOtpSubmit = (otp: any) => {
        console.log('Submitting OTP:', otp);
        setTimeout(() => {
            setIsOpenModal(false);
        }, 80000000)
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register'));
    });

    const submitForm = async (e: any) => {
        e.preventDefault();
        if (!isFormValid) return;
        setIsLoading(true);
        setErrorMessage('');
        const vendor_id = localStorage.getItem("vendor_id");
        const payload = {
            ...user,
            id: vendor_id,
        };
        try {
            const response = await fetch(`${API_BASE_URL}${REGISTER_API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.status === "success") {
                toast.success(data.message.success);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                setErrorMessage(data.message.error);

            }
        } catch (error) {
            setErrorMessage("Something went wrong! Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const initialCompanies = companies
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const handleRemoveCompany = (selectedCompanyId: number) => {
        setuser({ ...user, company_id: user.company_id.filter((companyId: number) => companyId !== selectedCompanyId) });
    };

    const isAllSelected = initialCompanies.length === user.company_id.length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div>
                <ToastContainer />
                {showLoader && (
                    <Loader />
                )}
                <div className='  bg-[#FFFEFC] p-4  '>
                    <div className="  text-black  flex flex-col gap-5 md:flex-row    ">
                        <div className='md:basis-[60%] flex flex-col  items-center  max-sm:hidden'>
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
                        <div className=" md:basis-[40%] text-center "  >
                            <div className='justify-center flex ' >
                                <Image
                                    src={Herosectionleftimage}
                                    width={400}
                                    height={300}
                                    alt="herosection_left_image"
                                />
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='bg-[#00A9E2] md:w-[60%] w-full m-auto flex gap-2 justify-center p-2 rounded-full '>
                                    <Link href="/auth/login">
                                        <button className=' hover:bg-[#20427F]  px-8 py-2 rounded-full text-white font-bold flex gap-2'><LoginbuttonIcon />Login</button>
                                    </Link>
                                    <Link href="/auth/register">
                                        <button className='px-8 py-2 bg-[#20427F] rounded-full text-white font-bold flex gap-2'>
                                            <RegisterbuttonIcon />Register</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/">
                                        <div className='flex justify-end   md:px-4 max-sm:py-3'>
                                            <div className='hover:bg-[#00A9E2] bg-[#80d2ee] rounded-full p-2'><TiHome className='text-xl text-white' /></div>
                                        </div></Link>
                                </div>
                            </div>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 md:px-4   sm:px-6 lg:max-w-[667px]">
                                <div className="w-full max-w-[440px] ">
                                   
                                    <div className=' font-bold'>
                                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                                    </div>
                                    <form className="space-y-3 dark:text-white" onSubmit={submitForm}>
                                        <p className="text-start font-semibold">Fill Out the Form Carefully for Registration</p>
                                        <div className="relative text-white-dark">
                                            <input
                                                onChange={(e) => setuser({ ...user, organization_name: e.target.value })}
                                                id="OrganizationName"
                                                type="text"
                                                placeholder="Organization Name *"
                                                className="form-input py-3 ps-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2]"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <OrganiszationIcon />
                                            </span>
                                        </div>

                                        <div className="relative text-white-dark">
                                            <input
                                                onChange={(e) => setuser({ ...user, name: e.target.value })}
                                                id="ContactPersonName"
                                                type="text"
                                                placeholder="Contact Person Name *"
                                                className="form-input py-3 ps-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2]"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <FullNameIcon />
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
                                                className={`form-input py-3 pl-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2] ${user.email.trim() === '' || validateEmail(user.email) ? 'text-green-500' : 'text-red-500'}`}
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <EmailsIcon />
                                            </span>

                                            {user.showVerifyButton && (
                                                <button
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
                                                        className="flex items-center justify-between cursor-pointer form-input py-3 ps-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2]"
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
                                                        <span className="absolute start-4 top-[27px] -translate-y-1/2">
                                                            <CompanyNameIcon />
                                                        </span>
                                                        <span>
                                                            <MdArrowDropDown className="text-xl" />
                                                        </span>
                                                    </div>
                                                    <div className="relative">
                                                        {isOpen && (
                                                            <div
                                                                ref={dropdownRef}
                                                                className="absolute top-full mt-1 border-1 border-[#00A9E2] bg-white rounded-lg w-full z-[100]"
                                                            >
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
                                                            <div
                                                                onClick={handleRemoveAll}
                                                                className="cursor-pointer absolute flex gap-1 justify-center items-center px-2 end-8 md:top-[-25px] max-sm:top-[-28px] -translate-y-1/2 bg-white text-[#00A9E2] rounded-full p-1 font-bold"
                                                            >
                                                                Remove all
                                                                <MdClose className="text-[#00A9E2]" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="flex gap-2 md:flex-row flex-col">
                                                    <div className="relative text-white-dark">
                                                        <input
                                                            onChange={(e) => setuser({ ...user, phone_no: e.target.value })}
                                                            id="ContactNumber"
                                                            type="number"
                                                            placeholder="Contact Number *"
                                                            className={`form-input py-3 ps-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2]  sm:text-sm ${validatePhoneNumber(user.phone_no) ? 'text-green-500' : 'border-[#00A9E2] text-red-600'}`}

                                                        />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <ConatctNumberIcon />
                                                        </span>
                                                    </div>


                                                    <div className="relative text-white-dark">
                                                        <input
                                                            onChange={(e) => setuser({ ...user, cr_number: e.target.value })}
                                                            id="cr_number"
                                                            type="text"
                                                            placeholder="CR Number *"
                                                            className="form-input py-3 ps-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2]"
                                                        />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <CrNumberIcon />
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
                                                        className={`form-input py-3 ps-10 placeholder-text-white-dark border-2 rounded-full border-[#00A9E2]   sm:text-sm ${validateAddress(user.address) ? '' : 'text-red-500'}`}
                                                    />
                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                        <AddressIcon />
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
                                        {/* <button
                                            type="submit"
                                            className={` rounded-full mt-3  w-full border-2    font-bold py-3 ${!isFormValid ? 'bg-transparent  text-gray-500 py-3 shadow-none cursor-not-allowed border-gray-500' : '  bg-[#20427F]  text-white'}`}
                                            disabled={!isFormValid}
                                        >
                                            Submit
                                        </button> */}
                                        <button
                                            type="submit"
                                            className={`rounded-full mt-3 w-full border-2 font-bold py-3 ${isLoading ? 'bg-gray-400 text-white cursor-not-allowed border-gray-400' : (!isFormValid ? 'bg-transparent text-gray-500 shadow-none cursor-not-allowed border-gray-500' : 'bg-[#20427F] text-white')}`}
                                            disabled={!isFormValid || isLoading}
                                        >
                                            {isLoading ? 'Loading...' : 'Submit'}
                                        </button>

                                        <p className='text-black font-bold text-center'>Already Have Account ?  <Link href="/auth/login">
                                            <span className='text-[#00A9E2]'>Login</span></Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
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

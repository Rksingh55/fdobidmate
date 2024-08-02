import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdOutlineClose } from "react-icons/md";
import { RootState } from '@/store';
import { TbAlignRight } from "react-icons/tb";
import { RiAuctionFill } from "react-icons/ri";
import { IoDocumentSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { SiInformatica } from "react-icons/si";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import { BiSolidArrowToTop } from "react-icons/bi";

const Navbar = () => {
    const isRtl = useSelector((state: RootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const { t, i18n } = useTranslation();
    let u_name = "";
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        const Username = u_name ? u_name.replace(/['"]/g, '') : "";
        setName(Username);
    }, []);
    const [name, setName] = useState(u_name ?? "");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);
    return (
        <>

            <header className="myheader shadow-sm border-b-2 ">
                <nav className="navbar navbar-expand-sm  w-[95%] m-auto ">
                    <Link className="navbar-brand" href="/">
                        <img src="/assets/images/fdoIcon_black.png" alt="Logo" className=" md:w-[280px] w-[200px]" />
                    </Link>
                    <TbAlignRight className="text-gray-500 md:text-4xl text-3xl md:hidden" onClick={() => setIsOpen(true)} />

                    {/* --------mobile view------ */}
                    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 bg-opacity-75`}>
                        <div className="fixed left-0 top-0 w-[80%] h-full bg-white shadow-lg p-4">
                            <div className=" flex justify-between  items-center   ">
                                <Link className="navbar-brand" href="/">
                                    <img src="/assets/images/FDO_Logo1.svg" alt="Logo" className=" w-[50px]" />
                                </Link>
                                <MdOutlineClose onClick={() => setIsOpen(false)} className="text-2xl text-gray-500 " />
                            </div>
                            <div className="flex justify-between flex-col  h-[80vh]">
                                <div className="basis-1/2 mt-4">
                                    <ul className=" flex flex-col gap-2 ">
                                        <Link href="/" onClick={togglePopup}><li className=" hover:bg-gray-100 rounded-xl px-2 py-2 flex gap-2"><AiFillHome className="mt-[2px] text-gray-400" /> Home</li></Link>
                                        <Link href="/tender-list" onClick={togglePopup}> <li className=" hover:bg-gray-100 rounded-xl px-2 py-2 flex gap-2"><IoDocumentSharp className="mt-[2px] text-gray-400" />Tenders</li></Link>
                                        <Link href="/rfi" onClick={togglePopup}> <li className=" hover:bg-gray-100 rounded-xl px-2 py-2 flex gap-2"><SiInformatica className="mt-[2px] text-gray-400" />RFI</li></Link>
                                        <Link href="/auction" onClick={togglePopup}> <li className=" hover:bg-gray-100 rounded-xl px-2 py-2 flex gap-2"><RiAuctionFill className="mt-[2px] text-gray-400" />Auction</li></Link>
                                    </ul>
                                </div>
                                <div className="flex justify-center flex-col gap-2 ">
                                    {/* <Link href="/auth/login" passHref>
                                        <button
                                            onClick={togglePopup}
                                            className="bg-[#00A9E2] w-full px-8 py-2 text-white rounded-full"
                                        >
                                            {t('Login')}
                                        </button>
                                    </Link>
                                    <Link href="/auth/register">
                                        <button onClick={togglePopup} className=" bg-[#00A9E2] w-full px-10 py-2 text-white rounded-full ">
                                            {t('Register')}
                                        </button>
                                    </Link> */}

                                    <div className="  text-black   ">
                                        <>
                                            <Dropdown
                                                offset={[0, 8]}
                                                placement={`${isRtl ? 'top-start' : 'top-end'}`}
                                                btnClassName="flex items-center gap-1 text-black  text-white-dark hover:border-primary hover:text-primary dark:bg-black w-full"
                                                button={
                                                    <>
                                                        <div className="bg-[#00A9E2] flex justify-center py-2 text-white rounded-full w-full items-center gap-1">
                                                            <div className="text-base font-bold ">Login</div>
                                                            <span className="shrink-0">
                                                                <BiSolidArrowToTop />
                                                            </span>
                                                        </div>
                                                    </>
                                                }
                                            >
                                                <ul className=" flex flex-col   bg-white border-2 rounded-md gap-1 p-2   ">
                                                    {name !== "" ? (
                                                        <Link href="/dashboard/tender">
                                                            <button className="bg-[#C1E9FF] px-6 py-2 rounded-md hover:bg-[#eceffd] hover:text-primary  ">
                                                                {t("Access Bidmate")}
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <Link href="/auth/login">
                                                            <button className=" bg-[#C1E9FF]  px-6 py-2 rounded-md  w-full hover:bg-[#eceffd] hover:text-primary ">
                                                                {t('Vendor')}
                                                            </button>
                                                        </Link>
                                                    )}
                                                    <Link href="/auth/login">
                                                        <button className=" bg-[#C1E9FF]  px-6 py-2 rounded-md  w-full hover:bg-[#eceffd] hover:text-primary ">
                                                            {t('Employee')}
                                                        </button>
                                                    </Link>
                                                </ul>
                                            </Dropdown>
                                        </>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-collapse max-sm:hidden" id="collapsibleNavId">
                        <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                        </ul>
                        <div className="flex gap-3 items-center"  >
                            <ul className="navbar-nav mt-2 mt-lg-0 flex gap-4">
                                <li className="nav-item border-b-2 border-transparent hover:border-[#00A9E2] transition duration-300">
                                    <Link
                                        className="nav-link uppercase sv-nav text-black hover:font-bold font-semibold"
                                        href="/tender-list"
                                    >
                                        {t('tenders')}
                                    </Link>
                                </li>
                                <li className="nav-item border-b-2 border-transparent hover:border-[#00A9E2] transition duration-300">
                                    <Link
                                        className="nav-link uppercase sv-nav text-black hover:font-bold font-semibold"
                                        href="/rfi"
                                    >
                                        {t('RFI')}
                                    </Link>
                                </li>
                                <li className="nav-item uppercase border-b-2 border-transparent  hover:border-[#00A9E2] transition duration-300">
                                    <Link
                                        className="nav-link sv-nav text-black hover:font-bold font-semibold"
                                        href="/auction"
                                    >
                                        {t('auction')}
                                    </Link>
                                </li>
                            </ul>

                            <div className="input-wrapper ">
                                <button className="icon" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px">
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="black" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="black" d="M22 22L20 20"></path>
                                    </svg>
                                </button>
                                <input placeholder="Search.." className="input" name="text" type="text" />
                            </div>

                            <div className="ml-2"> <Language /></div>

                            <div className="bg-white flex justify-between py-3  m-auto font-semibold ">
                                <div className="">
                                    <div className="  text-black flex  gap-2  ">

                                        <>
                                            <Dropdown
                                                offset={[0, 8]}
                                                btnClassName="flex items-center gap-1 text-black  text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                                button={
                                                    <>
                                                        <div className="bg-[#00A9E2]  px-6 py-2 text-white rounded-full w-full flex items-center gap-1">
                                                            <div className="text-base font-bold ">Login</div>
                                                            <span className="shrink-0">
                                                                <MdArrowDropDown />
                                                            </span>
                                                        </div>
                                                    </>
                                                }
                                            >
                                                <ul className=" flex flex-col bg-white border-2 rounded-md gap-1 p-2  shadow-sm ">
                                                    {name !== "" ? (
                                                        <Link href="/dashboard/tender">
                                                            <button className="bg-[#C1E9FF] px-6 py-2 rounded-md hover:bg-[#eceffd] hover:text-primary  ">
                                                                {t("Access Bidmate")}
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <Link href="/auth/login">
                                                            <button className=" bg-[#C1E9FF]  px-6 py-2 rounded-md  w-full hover:bg-[#eceffd] hover:text-primary ">
                                                                {t('Vendor')}
                                                            </button>
                                                        </Link>
                                                    )}
                                                    <Link href="/auth/login">
                                                        <button className=" bg-[#C1E9FF]  px-6 py-2 rounded-md  w-full hover:bg-[#eceffd] hover:text-primary ">
                                                            {t('Employee')}
                                                        </button>
                                                    </Link>
                                                </ul>
                                            </Dropdown>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header >
        </>
    )
};
export default Navbar;
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { CiHome, CiUser } from "react-icons/ci";
import { TbAlignRight } from "react-icons/tb";
import SearchPopup from '../front/searchpopup';
import IconMenuTables from "../Icon/Menu/IconMenuTables";
import { RiAuctionFill } from "react-icons/ri";
import { IoDocumentSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { SiInformatica } from "react-icons/si";

const Navbar = () => {
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

            <header className="myheader ">
                <nav className="navbar navbar-expand-sm  w-[90%] m-auto j ">
                    <Link className="navbar-brand" href="/">
                        <img src="/assets/images/FDO_Logo1.svg" alt="Logo" className=" w-[50px]" />
                    </Link>
                    <TbAlignRight className="text-gray-500 text-4xl md:hidden" onClick={() => setIsOpen(true)} />

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

                                    <Link href="/auth/login">
                                        <button onClick={togglePopup} className=" bg-[#00A9E2] w-full px-8 py-2 text-white rounded-full ">
                                            {t('Login')}
                                        </button>
                                    </Link>
                                    <Link href="/auth/register">
                                        <button onClick={togglePopup} className=" bg-[#00A9E2] w-full px-10 py-2 text-white rounded-full ">
                                            {t('Register')}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-collapse max-sm:hidden" id="collapsibleNavId">
                        <ul className="navbar-nav mx-auto mt-2 mt-lg-0">

                        </ul>
                        <div className="d-flex gap-3" style={{ alignItems: "center" }} >
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


                            {/* <div className="input-wrapper ">
                                <button className="icon" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px">
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="black" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="black" d="M22 22L20 20"></path>
                                    </svg>
                                </button>
                                <input placeholder="Search.." className="input" name="text" type="text" />
                            </div> */}

                            <div className="ml-2"> <Language /></div>
                            <div className="bg-white ">
                                <div className="bg-white flex justify-between py-3  m-auto font-semibold ">
                                    <div className="">
                                        <div className="  text-black flex  gap-2  ">

                                            {name !== "" ? (
                                                <Link href="/dashboard/tender">
                                                    <button className="bg-[#00A9E2] px-6 py-2 text-white rounded-full">
                                                        {t("Access Bidmate")}
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link href="/auth/login">
                                                    <button className=" bg-[#00A9E2] px-6 py-2 text-white rounded-full ">
                                                        {t('Login')}
                                                    </button>
                                                </Link>
                                            )}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} isSearchOpen={isSearchOpen} />}
                            <div onClick={() => setIsSearchOpen(true)} className=" cursor-pointer bg-[#E0F4FB] p-[12px] rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="black" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="black" d="M22 22L20 20"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </nav>
            </header >




        </>
    )
};
export default Navbar;
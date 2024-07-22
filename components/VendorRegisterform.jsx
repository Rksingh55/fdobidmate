import BlankLayout from '@/components/Layouts/BlankLayout';
import { MdHome, MdOutlineAttachment } from "react-icons/md";
import { FaBuilding, FaMoneyCheckAlt } from "react-icons/fa";
import { RiAccountCircleLine, RiPsychotherapyLine } from "react-icons/ri";
import { LuFileQuestion } from "react-icons/lu";
import GeneralInformationform from "./vendorforms/general-information"
import CompanyDetails from "../components/vendorforms/Company-details"
import TaxBilling from "../components/vendorforms/tax-Billinginfo"
import AccountInformation from "../components/vendorforms/Account-information"
import Questionnaire from "../components/vendorforms/Questionnaire"
import Attehchment from "../components/vendorforms/Attehchment"
import Otherdetails from "../components/vendorforms/Other-details"
import React from 'react'
import { useEffect, useState } from 'react';
import IconUser from '@/components/Icon/IconUser';
import { GrOrganization } from 'react-icons/gr';
import { FcOk } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReviewPopup from "../components/cards/ReviewPopup"


function Index() {
    const [activeTab, setActiveTab] = useState(1);
    const [error, seterror] = useState('')
    const [completedTabs, setCompletedTabs] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [message, setMessage] = useState('Please Verify or recheck all the Information before submit the form');

    const handleButtonClick = () => {
        setCompletedTabs([...completedTabs, activeTab]);
        if (activeTab < tabs?.length) {
            setActiveTab(activeTab + 1);
        } else {
            console.log('Finish');
            setPopupOpen(true);
        }
    };
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };
    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    // const handleTabClick = (tabId) => {
    //     if (!user.org_name.trim() || !user.name.trim() || !user.vendor_type.trim()) {
    //         seterror("Please fill the all required field**")
    //     }
    //     else {
    //         setActiveTab(tabId);
    //     }
    // };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const tabs = [
        {
            id: 1, icon: <MdHome className="text-2xl" />, label: "General Information",
            content: <>
                <GeneralInformationform />
            </>
        },
        {
            id: 2, icon: <FaBuilding className="text-2xl" />, label: "Company details",
            content: <>
                <CompanyDetails />
            </>
        },
        {
            id: 3, icon: <FaMoneyCheckAlt className="text-2xl" />, label: "Tax & Billing info",
            content: <>
                <TaxBilling />
            </>
        },
        {
            id: 4, icon: <RiAccountCircleLine className="text-2xl" />, label: "Account information",
            content: <>
                <AccountInformation />
            </>
        },
        {
            id: 5, icon: <LuFileQuestion className="text-2xl" />, label: "Questionnaire",
            content: <>
                <Questionnaire />
            </>
        },
        {
            id: 6, icon: <MdOutlineAttachment className="text-2xl" />, label: "Attachment",
            content: <>
                <Attehchment />
            </>
        },
        {
            id: 7, icon: <RiPsychotherapyLine className="text-2xl" />, label: "Other details",
            content: <>
                <Otherdetails />
            </>
        },

    ];
    return (
        <>
            <ToastContainer />
            <div className="">
                <ReviewPopup isOpen={isPopupOpen} onClose={handleClosePopup} message={message} />
            </div>
            <div className='animate__animated'>
                <div className='panel'>
                    <div className="">
                        <div className="inline-block w-full">
                            <div className="relative z-[1]">
                                <div
                                    className={`absolute top-[25px] -z-[1] m-auto  bg-blue-800 transition-[width]  ltr:left-[60px] rtl:right-0 md:border-dotted md:border-b-[2.5px]`}
                                    style={{
                                        width: `${(activeTab - 1) * (90 / (tabs?.length - 1))}%`
                                    }}
                                ></div>
                                <ul className=" grid grid-cols-7 ">
                                    {tabs?.map((tab) => (
                                        <li key={tab?.id} className="mx-auto  flex flex-col justify-center items-center">
                                            <button
                                                type="button"
                                                className={`${activeTab === tab?.id ? '!border-primary !bg-primary text-white' : ''}
                                text-xl flex h-12 w-12  items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c] cursor-none ${completedTabs.includes(tab.id) ? 'text-green-500' : ''}`}
                                                onClick={() => handleTabClick(tab.id)}
                                            >
                                                {tab.icon}
                                            </button>
                                            <span className={`${activeTab === tab?.id ? 'text-primary ' : ''}text-center mt-2 block max-sm:hidden`}>{tab?.label}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                            {/* <div className='flex justify-center items-center py-2'><p className='text-red-500  font-bold'>{error}</p></div> */}
                            <div className=' h-[430px]  overflow-y-scroll overflow-x-hidden  md:p-2 rounded-md  '>
                                {tabs?.map((tab) => (
                                    <p key={tab?.id} className="mb-5">{activeTab === tab?.id && tab?.content}</p>
                                ))}
                            </div>

                        </div>

                    </div>
                    <div className=" flex justify-end " >
                        <div className='flex gap-2'>
                            <button
                                type="button"
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ${activeTab === 1 ? 'hidden' : ''}`}
                                onClick={() => setActiveTab(activeTab > 1 ? activeTab - 1 : 1)}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ltr:ml-auto rtl:mr-auto"
                                onClick={handleButtonClick}
                            >
                                {activeTab === tabs?.length ? 'Verify' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}



export default Index;

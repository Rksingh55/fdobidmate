import React, { useEffect, useState } from 'react';
import { TenderdocumentIcon, ItemlistIcon, ApplicablefeesIcon, PayemnentIcon, DepartmentIcon, EntityIcon, StartdateIcon, CurrencyIcon, PerformenceBackGuranteeIcon, OMRIcon, OMRicon, DocumentIcon, IssuedateIcon, BankIcon, PbgdocumentIcon } from '../../../../public/icons';
import { MdCancel, MdCloudDownload, } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_BASE_URL, TENDERPREVIEW_API_URL } from '@/api.config';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenderList } from '../../../../Reducer/tenderlistSlice';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { FcOk } from 'react-icons/fc';
// import Creditcard from "../../../../components/cards/creditcard"
import { FaEdit, FaEye, FaFileDownload } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AiOutlineDelete } from 'react-icons/ai';
import Creditcard from "../../../../components/cards/Creditcard"
import { RiExternalLinkLine } from 'react-icons/ri';
const Tenderdetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [daysToGo, setDaysToGo] = useState<number | null>(null);
    const tenderlist = useSelector((state: RootState) => state.Tenderlist.list || []);
    console.log("tender-tenderlist", tenderlist);

    useEffect(() => {
        dispatch(fetchTenderList());
    }, [dispatch]);

    useEffect(() => {
        if (data?.close_date) {
            const calculateDaysRemaining = () => {
                const today = new Date();
                const closeDate = new Date(data.close_date);
                const timeDiff = closeDate.getTime() - today.getTime();
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return dayDiff;
            };
            setDaysToGo(calculateDaysRemaining());
        }
    }, [data?.close_date]);

    const { id } = router.query;
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (id) {
            fetchData(id as string);
        }
    }, [id]);

    const fetchData = async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}${TENDERPREVIEW_API_URL}?encrypt_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            const [TenderPreviewData] = result.data;
            setData(TenderPreviewData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };


    const array = [{}, {}, {}, {},];

    const [name, setName] = useState<string>('');

    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        setName(u_name ?? "");
    }, []);

    const handletenderapply = () => {
        if (!name) {
            toast.error('You must be logged in to apply tender, Please Login');
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
            return;
        } else {
            // router.push("/dashboard");
            toast.success("Tender Applied successfull")
        }
    };
    const Bank = [
        {}, {}, {}, {},
        {}, {}, {}, {}
    ]

    return (
        <>
            <ToastContainer />
            <Dashboardbredcrumb />
            <div className='flex gap-2 mt-3 md:flex-row flex-col'>
                <div className='basis-[70%]  bg-white rounded-md'>
                    <div className="max-w-4xl mx-auto md:p-3 p-1">
                        <div className='border-2 border-[#00A9E2] rounded-md hover:border-[#FC8404] p-2'>
                            <div className='flex justify-between py-2'>
                                <div className="text-xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">  <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div> Ceo Tender</div>
                            </div>
                            <div className="py-4">
                                <h2 className="text-xl  mb-2 text-[#00A9E2]">Brief Information</h2>
                                <p className='py-2'>
                                    Design And Construction Of Elevated Metro Viaduct Of Length 17.624 Km Between Ch.21256.814 To Ch.38881.7 Including Railway Spans Of Length 79m & 100m And 6-Lane Double-Decker Portion With Vehicular Underpass (Vup) From Ch. 25755.211 To 26895.211 For A Total Length Of 1.14km In Reach-1a Of Nmrp Phase-2
                                </p>
                            </div>
                            <div className='flex md:flex-row justify-between gap-2  max-sm:flex-wrap'>
                                <div className="py-2 flex  gap-2">

                                    <StartdateIcon />
                                    <div className='flex    flex-col '>
                                        <label className='font-bold'>Start Date  </label>
                                        12 /02/2023
                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <StartdateIcon />
                                    <div className='flex    flex-col'>
                                        <label className='font-bold'>Close Date  </label>
                                        12 /02/2023

                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <CurrencyIcon />
                                    <div className='flex    flex-col'>
                                        <label className='font-bold'>Currency  </label>
                                        OMR100
                                    </div>

                                </div>

                                <div className="py-2 flex gap-2">
                                    <EntityIcon />
                                    <div className='flex    flex-col'>
                                        <label className='font-bold'>Entity  </label>
                                        AOH
                                    </div>

                                </div>
                                <div className="py-2 flex gap-2">
                                    <DepartmentIcon />
                                    <div className='flex md:    flex-col'>
                                        <label className='font-bold'>Department  </label>
                                        sdfsf
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='mt-12'>
                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                                <TenderdocumentIcon />
                                Tender Documents
                            </h3>
                            <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Sr. No</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>File Name</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Size</th>
                                        <th className='p-2 bg-[#00A9E2] text-white md:flex md:justify-center'>Download</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td className='p-2'>1.</td>
                                        <td className='p-2'>document1</td>
                                        <td className='p-2'>Pdf</td>
                                        <td className='p-2'>Kb</td>
                                        <td className='p-2 flex justify-center'><MdCloudDownload className='text-[#00A9E2] text-xl cursor-pointer' /></td>
                                    </tr>
                                    <tr>

                                        <td className='p-2'>2.</td>
                                        <td className='p-2'>document2</td>
                                        <td className='p-2'>Docx</td>
                                        <td className='p-2'>Kb</td>
                                        <td className='p-2 flex justify-center'><MdCloudDownload className='text-[#00A9E2] text-xl cursor-pointer' /></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className='mt-12'>
                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2"> <ApplicablefeesIcon />Applicable Fees</h3>
                            <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Amount</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Status</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Payment</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Invoice</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='p-2'>Bid Bond Fees</td>
                                        <td className='p-2'>2000</td>
                                        <td className='p-2 flex gap-2'>--------</td>
                                        <td className='p-2'>
                                            <button className='hover:bg-[#e2a563] bg-[#FC8404] text-white px-3 py-1 rounded-md'>Pay Now</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='p-2'>Tender Fees</td>
                                        <td className='p-2'>7000</td>
                                        <td className='p-2 flex gap-2 '><FcOk className='mt-[3px]' />Done</td>
                                        <td className='p-2'>
                                            <button className='hover:bg-[#e2a563] bg-[#FC8404] text-white px-3 py-1 rounded-md'>Pay Now</button>
                                        </td>
                                        <td className=' '><MdCloudDownload className='text-[#00A9E2] text-xl cursor-pointer' /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-12'>
                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 pb-2"> <PayemnentIcon />Payment</h3>
                            <Creditcard />
                        </div>
                        <div className='flex justify-between  items-center mt-5'>
                            <div>
                                <h1 className='text-2xl font-semibold text-[#00A9E2] flex gap-2'> <ItemlistIcon />Item List</h1>
                            </div>
                            <div className='flex gap-2'>
                                <h1 className='text-[#00A9E2] font-bold'>Total Tender Bid Value :</h1>
                                55555
                            </div>
                        </div>
                        <div className='max-sm:overflow-scroll' >
                            <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Sr. No.</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Category</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Item Name</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>UOM</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Quantity</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Unit Price</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='p-2'>1.</td>
                                        <td className='p-2'>Procurement_Category</td>
                                        <td className='p-2'>Lab Supply Agreement</td>
                                        <td className='p-2'>PCS</td>
                                        <td className='p-2'>20324</td>
                                        <td className='p-2'>
                                            <input className='border-2' />
                                        </td>
                                        <td className='p-2'>xxxxx</td>
                                    </tr>
                                    <tr>
                                        <td className='p-2'>2.</td>
                                        <td className='p-2'>Procurement_Category</td>
                                        <td className='p-2'>Mouse</td>
                                        <td className='p-2'>DOJEN</td>
                                        <td className='p-2'>20324</td>
                                        <td className='p-2'>
                                            <input className='border-2' />

                                        </td>
                                        <td className='p-2'>xxxxx</td>
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                            <div className='flex justify-end'>
                                <button
                                    type="submit"
                                    className="mt-2 px-12 py-2 bg-[#FC8404] text-white font-semibold rounded-md  hover:bg-[#e1a05a]"
                                >
                                    Submit
                                </button>
                            </div>

                    </div>
                </div>
                <div className='basis-[30%] h-[900px]  p-1 bg-white rounded-md'>
                    <div className=''>
                        <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2"> <StartdateIcon />Tender Dates</h3>
                        <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                            <thead>
                                <tr className='bg-[#F4F7FF]'>
                                    <th className='p-2 bg-[#00A9E2] text-white'>Title</th>
                                    <th className='p-2 bg-[#00A9E2] text-white'>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='p-2'>Tender Float Date</td>
                                    <td className='p-2'>25 May, 2024</td>
                                </tr>
                                <tr>
                                    <td className='p-2'>Bid Submission Date</td>
                                    <td className='p-2'>25 May, 2024</td>
                                </tr>
                                <tr>
                                    <td className='p-2'>Clarification End Date  </td>
                                    <td className='p-2'>25 May, 2024</td>
                                </tr>
                                <tr>
                                    <td className='p-2'>Tender End Date</td>
                                    <td className='p-2'>25 May, 2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link href="/dashboard/tender/Performance-Bank-Gurantee">
                        <div className='bg-[#00A9E2] text-white cursor-pointer flex gap-2 mt-4 items-center   p-3 font-bold text-xl rounded-md'>
                            <PerformenceBackGuranteeIcon />
                            Performance Bank Guarantee</div>
                    </Link>
                    <PerfectScrollbar className='h-[1000px]  p-2 '>
                        <h1 className='font-bold text-[#00A9E2] flex gap-2 text-lg py-2'><BankIcon />PBG Details </h1>
                        {
                            Bank?.map(() => (
                                <div className="cursor-pointer mt-2 border-2 rounded-md bg-white    relative   hover:shadow-sm">
                                    <div className='bg-[#00A9E2] p-3  flex justify-between ' style={{ borderRadius: "5px 5px 0px 0px" }}>
                                        <div className='flex flex-row gap-1'>
                                            <PbgdocumentIcon />
                                            <p className='text-white font-bold'>PBG-0002</p>
                                        </div>
                                        <div className='flex flex-row gap-2 text-white text-xl'>
                                            <FaEdit />
                                            <AiOutlineDelete />
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between gap-3 py-2 px-3'>
                                        <div className='border-2 p-2'>
                                            <p className='text-black font-bold flex gap-2'><OMRIcon />OMR 2000</p>
                                        </div>
                                        <div className='border-2 p-2'>
                                            <p className='text-black font-bold flex gap-2'><BankIcon />Bank</p>
                                        </div>
                                        <div className='border-2 p-2'>
                                            <p className='text-black font-bold flex gap-2'><IssuedateIcon />Issue Date</p>
                                        </div>
                                        <div className='border-2 p-2 flex gap-2 justify-between items-center'>
                                            <p className='text-black font-bold flex gap-2'><DocumentIcon />Document</p>
                                            <span className='flex gap-2 text-[#00A9E2] text-md font-bold'>
                                                <FaEye className=' text-xl' />  View</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </PerfectScrollbar>
                </div>

            </div>
        </>
    )
}


export default Tenderdetails;



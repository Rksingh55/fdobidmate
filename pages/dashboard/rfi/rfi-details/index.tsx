import React, { useEffect, useState } from 'react';
import { TenderdocumentIcon, ItemlistIcon, ApplicablefeesIcon, PayemnentIcon, DepartmentIcon, EntityIcon, StartdateIcon, CurrencyIcon, CompanycodeIcon, ProjectIcon, RfidepartmentIcon, OMRIcon, DiscriptionIcon, AdditionalnotesIcon, IssuedateIcon, BidderRequireIcon, } from '../../../../public/icons';
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
import Creditcard from "../../../../components/cards/creditcard"
import { FaCloudUploadAlt } from 'react-icons/fa';

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

    return (
        <>
            <ToastContainer />
            <Dashboardbredcrumb />
            <div className='  bg-white rounded-md mt-4'>
                <div className=" md:p-3 p-1">
                    <div className='border-2 border-[#00A9E2]  rounded-md  hover:border-[#FC8404] p-2'>
                        <div className='flex justify-between py-2'>
                            <div className="text-xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">  <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div>RFI ID</div>
                        </div>
                        <div className='flex md:flex-row justify-between gap-2  max-sm:flex-wrap'>
                            <div className="py-2 flex  gap-2">

                                <CompanycodeIcon />
                                <div className='flex    flex-col '>
                                    <label className='font-bold '> Code  </label>
                                    12 /02/2023
                                </div>
                            </div>
                            <div className="py-2 flex gap-2">
                                <ProjectIcon />
                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Project Id  </label>
                                    12 /02/2023

                                </div>
                            </div>
                            <div className="py-2 flex gap-2">
                                <RfidepartmentIcon />
                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Department  </label>
                                    OMR100
                                </div>
                            </div>

                            <div className="py-2 flex gap-2">
                                <OMRIcon />
                                <div className='flex    flex-col'>
                                    <label className='font-bold'>Currency  </label>
                                    AOH
                                </div>

                            </div>


                        </div>
                    </div>
                    <div className='mt-4'>
                        <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                            <DiscriptionIcon />
                            Description
                        </h3>
                        <textarea className='w-full border-2  p-3 rounded-md' placeholder='Description....' />
                    </div>
                    <div className='mt-4'>
                        <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                            <AdditionalnotesIcon />
                            Additional Notes
                        </h3>
                        <textarea className='w-full border-2  p-3  rounded-md' placeholder='Additional Notes....' />
                    </div>
                    <div className='mt-4'>
                        <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2"> <IssuedateIcon />Important Dates</h3>
                        <table className='rounded-md bg-white mt-3  '>
                            <thead>
                                <tr className='bg-[#F4F7FF]'>
                                    <th className='p-2  '>Clarification End Date</th>
                                    <th className='p-2  '>Submission  Date</th>
                                    <th className='p-2  '>Close  Date</th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='p-2'>24/07/2024</td>
                                    <td className='p-2'>24/07/2024</td>
                                    <td className='p-2 flex gap-2'>24/07/2024</td>

                                </tr>
                                <tr>
                                    <td className='p-2'>24/07/2024</td>
                                    <td className='p-2'>24/07/2024</td>
                                    <td className='p-2 '>24/07/2024</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-4'>
                        <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                            <BidderRequireIcon />
                            Bidder Required Documents
                        </h3>
                        <table className='rounded-md bg-white mt-3 border-2  '>
                            <thead>
                                <tr className='bg-[#F4F7FF]'>
                                    <th className='p-2 bg-[#F3F5F8] '>Sr. No</th>
                                    <th className='p-2 bg-[#F3F5F8] '>Document Name</th>
                                    <th className='p-2 bg-[#F3F5F8] flex flex-col '>Upload Document
                                        <span className='font-bold text-red-500 text-[10px]'>(Only PDF, JPEG, PNG Accepted)</span>
                                    </th>
                                    <th className='p-2 bg-[#F3F5F8] '>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td className='p-2'>1.</td>
                                    <td className='p-2'>document1</td>
                                    <td className='p-2 flex gap-2 items-center cursor-pointer'><FaCloudUploadAlt />Document</td>
                                    <td className='p-2'>--</td>
                                </tr>
                            </tbody>
                        </table>
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
                                    <th className='p-2 bg-[#00A9E2] text-white'>Item No.</th>
                                    <th className='p-2 bg-[#00A9E2] text-white'>Description</th>
                                    <th className='p-2 bg-[#00A9E2] text-white'>Quanity</th>
                                    <th className='p-2 bg-[#00A9E2] text-white'>UOM</th>
                                    <th className='p-2 bg-[#00A9E2] text-white'>Unit</th>
                                    <th className='p-2 bg-[#00A9E2] text-white'>Bidding Price</th>
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
                                </tr>

                            </tbody>

                        </table>
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
            </div>

        </>
    )
}


export default Tenderdetails;



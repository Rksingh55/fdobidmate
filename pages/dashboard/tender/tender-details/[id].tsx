import React, { useEffect, useState } from 'react';
import { TenderdocumentIcon, ItemlistIcon, ApplicablefeesIcon, PayemnentIcon, DepartmentIcon, EntityIcon, StartdateIcon, CurrencyIcon, PerformenceBackGuranteeIcon, OMRIcon, OMRicon, DocumentIcon, IssuedateIcon, BankIcon, PbgdocumentIcon, BidderRequireIcon } from '../../../../public/icons';
import { MdCancel, MdCloudDownload, } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_BASE_URL, INTERESTED_TENDER_VIEW_API_URL, TENDERPREVIEW_API_URL } from '@/api.config';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { FcOk } from 'react-icons/fc';
import { FaCloudUploadAlt, FaEdit, FaEye, FaFileDownload } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AiOutlineDelete } from 'react-icons/ai';
import Creditcard from "../../../../components/cards/Creditcard"
import { getToken } from '@/localStorageUtil';
import { downloadFile } from '@/components/cards/downloadFile';
const Tenderdetails = () => {
    const BASE_URL = 'https://fdo-bidmate.kefify.com';
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const { id } = router.query;
    const [loading, setLoading] = useState<boolean>(true);
    const token = getToken();

    const fetchTenderInterestPreview = async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}${INTERESTED_TENDER_VIEW_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ tender_id: id })
            });
            const result = await response.json();
            setData(result?.data)
        } catch (error) {
            setLoading(false);
            toast.error('Failed to fetch data');
        }
    };
    console.log("wdewew", data)
    useEffect(() => {
        if (id) {
            fetchTenderInterestPreview(id as string);
        }
    }, [id]);

    const Bank = [
        {}, {}, {}, {},
        {}, {}, {}, {}
    ]

    // const BASE_URL = 'https://fdo-bidmate.kefify.com';
    // const handleDownload = (fileName: string) => {
    //     const url = `${BASE_URL}/${"TenderRequiredDocument"}`;
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = fileName; 
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const handleDownload = (documentUrl: string) => {
        const link = document.createElement('a');
        link.href = documentUrl;
        link.download = data?.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <ToastContainer />
            <Dashboardbredcrumb />
            <div className='flex gap-2 mt-3 md:flex-row flex-col'>
                <div className='basis-[70%]  bg-white rounded-md'>
                    <div className="max-w-4xl mx-auto md:p-3 p-1">
                        <div className='border-2 border-[#00A9E2] rounded-md hover:border-[#FC8404] p-2'>
                            <div className='flex justify-between py-2'>
                                <div className="text-xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">  <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div>{data?.title || "N/A"}</div>
                            </div>
                            <div className="py-4">
                                <h2 className="text-xl  mb-2 text-[#00A9E2]">Brief Information</h2>
                                <p className='py-2'>
                                    {data?.description || "Description Not Available"}
                                </p>
                            </div>
                            <div className='flex md:flex-row justify-between gap-2  max-sm:flex-wrap'>
                                <div className="py-2 flex  gap-2">

                                    <StartdateIcon />
                                    <div className='flex    flex-col '>
                                        <label className='font-bold'>Start Date  </label>
                                        {data?.float_date || "N/A"}
                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <StartdateIcon />
                                    <div className='flex    flex-col'>
                                        <label className='font-bold'>Close Date  </label>
                                        {data?.close_date || "N/A"}


                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <CurrencyIcon />
                                    <div className='flex    flex-col'>
                                        <label className='font-bold'>Currency  </label>
                                        {data?.currency?.code || "N/A"}
                                    </div>

                                </div>

                                <div className="py-2 flex gap-2">
                                    <EntityIcon />
                                    <div className='flex    flex-col'>
                                        <label className='font-bold'>Entity  </label>
                                        {data?.company?.name || "N/A"}

                                    </div>

                                </div>
                                <div className="py-2 flex gap-2">
                                    <DepartmentIcon />
                                    <div className='flex md:    flex-col'>
                                        <label className='font-bold'>Department  </label>
                                        {data?.department || "N/A"}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='mt-12'>

                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                                <BidderRequireIcon />
                                Tender Required Documents
                            </h3>
                            <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#F3F5F8] '>Sr. No</th>
                                        <th className='p-2 bg-[#F3F5F8] '>Document Name</th>
                                        <th className='p-2 bg-[#F3F5F8] flex flex-col justify-center '>Download
                                        </th>
                                        <th className='p-2 bg-[#F3F5F8] '>Status</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {Array.isArray(data?.tender_document) ? (
                                        data?.tender_document.map((item: any, index: any) => (
                                            item?.tenderrequireddocument_id ? (
                                                <tr key={item.id}>
                                                    <td className='p-2'>{index + 1}.</td>
                                                    <td className='p-2'>{item.tenderrequireddocument?.name || 'N/A'}</td>
                                                    <td className='p-2 flex'>
                                                        <MdCloudDownload
                                                            className='text-xl cursor-pointer'
                                                            onClick={() => downloadFile(
                                                                BASE_URL,
                                                                item.tenderrequireddocument?.images[0].url,
                                                                item?.tenderrequireddocument?.images[0]?.name
                                                            )}
                                                        />

                                                    </td>
                                                    <td className='p-2'>{item?.tenderrequireddocument?.type || 'N/A'}</td>
                                                </tr>
                                            ) : null
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='p-2'>No data available</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                        <div className='mt-4'>
                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                                <TenderdocumentIcon />
                                Bidder Required Tender Documents
                            </h3>
                            <table className='rounded-md bg-white mt-3 border-2  '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Sr. No</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>File Name</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                        <th className='p-2 bg-[#00A9E2] text-white flex flex-col justify-center'>Upload Document
                                            <span className='font-bold text-red-500 text-[10px]'>(Only PDF, JPEG, PNG Accepted)</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array?.isArray(data?.tender_document) ? (
                                        data?.tender_document?.map((item: any, index: any) => (
                                            item?.bidderrequireddocument_id ? (
                                                <tr key={item.id} >
                                                    <td className='p-2'>{index + 1}.</td>
                                                    <td className='p-2'>{item.name?.toString() || 'N/A'}</td>
                                                    <td className='p-2'>{item.type?.toString() || 'N/A'}</td>
                                                    <td className='p-2 flex '><FaCloudUploadAlt className=' text-xl cursor-pointer' /></td>
                                                </tr>
                                            ) : null
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='p-2'>No data available</td>
                                        </tr>
                                    )}
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
                                    {Array?.isArray(data?.tenderline) ? (
                                        data?.tenderline?.map((item: any) => (
                                            <tr key={item.id}>
                                                <td className='p-2'>{item?.line_no?.toString() || 'N/A'}</td>
                                                <td className='p-2'>{item?.category?.name || 'N/A'}</td>
                                                <td className='p-2'>{item?.product_name?.toString() || 'N/A'}</td>
                                                <td className='p-2'>{item?.unit.name?.toString() || 'N/A'}</td>
                                                <td className='p-2'>{item?.quantity?.toString() || 'N/A'}</td>
                                                <td className='p-2'>
                                                    <input className='border-2' />
                                                </td>
                                                <td className='p-2'>xxxxx</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='p-2'>No data available</td>
                                        </tr>
                                    )}

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
                                    <td className='p-2'>  {data?.float_date || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td className='p-2'>Bid Submission Date</td>
                                    <td className='p-2'>  {data?.bidsubmissiondeadline_date || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td className='p-2'>Clarification End Date  </td>
                                    <td className='p-2'>  {data?.clarificationend_date || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td className='p-2'>Tender End Date</td>
                                    <td className='p-2'>  {data?.close_date || "N/A"}</td>
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



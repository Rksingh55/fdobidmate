import BlankLayout from '@/components/Layouts/BlankLayout';
import Header from '@/components/front/Pageheader';
import Frontheader from '@/components/front/Navbar';
import React, { useEffect, useState } from 'react';
import { OMRIcon, CompanycodeIcon, ProjectIcon, RfidepartmentIcon, DiscriptionIcon, AdditionalnotesIcon, IssuedateIcon, BidderRequireIcon, ItemlistIcon } from '../../../public/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { API_BASE_URL, RFIPREVIEW_API_URL } from '@/api.config';
import Skelotonfull from '@/components/cards/Skeletonfull';
import { FaCloudUploadAlt } from 'react-icons/fa';

const RfiPreview = () => {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [rfidata, setrfidata] = useState<any>()
    useEffect(() => {
        if (data && data?.r_f_idevlopment) {
            setrfidata(data?.r_f_idevlopment);
        }
    }, [data]);
    console.log("data", data)
    const { id } = router.query;
    const [loading, setLoading] = useState<boolean>(true);
    const fetchData = async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}${RFIPREVIEW_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ encrypt_id: id }),
            });
            const result = await response?.json();
            const data = result?.data;
            setData(data);
        } catch (error) {
            setLoading(false);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id as string);
        }
    }, [id]);
    const [name, setName] = useState<string>('');
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        setName(u_name ?? "");
    }, []);

    const handlerfiapply = () => {
        if (!name) {
            toast.error('You must be logged in to apply tender, Please Login');
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
            return;
        } else {
            toast.success("RFI Applied successfull")
        }
    };
    return (
        <>
            <ToastContainer />
            <Frontheader />
            <Header heading="RFI Preview" />
            <div className='w-[90%] m-auto'>
                <div className=' md:p-2 bg-white rounded-md'>
                    {loading ? (
                        <Skelotonfull />

                    ) : (
                        <div className='  bg-white rounded-md mt-4'>
                            <div className=" md:p-3 p-1">
                                <div className='border-2 border-[#00A9E2]  rounded-md  hover:border-[#FC8404] p-2'>
                                    <div className='flex justify-between py-2'>
                                        <div className="text-xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">  <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div>{data?.req_id || "N/A"}</div>
                                    </div>
                                    <div className='flex md:flex-row justify-between gap-2  max-sm:flex-wrap'>
                                        <div className="py-2 flex  gap-2">

                                            <CompanycodeIcon />
                                            <div className='flex    flex-col '>
                                                <label className='font-bold '> Company Code   </label>
                                                {data?.company?.code || "N/A"}
                                            </div>
                                        </div>
                                        <div className="py-2 flex gap-2">
                                            <ProjectIcon />
                                            <div className='flex    flex-col'>
                                                <label className='font-bold'>Project Id  </label>
                                                {rfidata?.need?.project?.name || "N/A"}

                                            </div>
                                        </div>
                                        <div className="py-2 flex gap-2">
                                            <RfidepartmentIcon />
                                            <div className='flex    flex-col'>
                                                <label className='font-bold'>Department  </label>
                                                {rfidata?.need?.department?.name || "N/A"}
                                            </div>
                                        </div>

                                        <div className="py-2 flex gap-2">
                                            <OMRIcon />
                                            <div className='flex    flex-col'>
                                                <label className='font-bold'>Currency  </label>
                                                {rfidata?.need?.currency?.code || "N/A"}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] ">

                                        Description
                                    </h3>
                                    <p> Not Available..</p>

                                </div>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]  ">

                                        Additional Notes
                                    </h3>
                                    <p>{data?.additional_notes || "Not Available.."}</p>
                                </div>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] "> Important Dates</h3>
                                    <table className='rounded-md bg-white mt-3  '>
                                        <thead>
                                            <tr className='bg-[#F4F7FF]'>
                                                <th className='p-2  '>Clarification End Date</th>
                                                <th className='p-2  '>Submission Date</th>
                                                <th className='p-2  '>Close Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='p-2'>  {rfidata?.clarification_endDate || "N/A"}</td>
                                                <td className='p-2'>{rfidata?.submission_date || "N/A"}</td>
                                                <td className='p-2'>  {rfidata?.close_date || "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]  ">
                                        Bidder Required Documents
                                    </h3>
                                    <table className='rounded-md bg-white mt-3 border-2  '>
                                        <thead>
                                            <tr className='bg-[#F4F7FF]'>
                                                <th className='p-2 bg-[#F3F5F8] '>Sr. No</th>
                                                <th className='p-2 bg-[#F3F5F8] '>Document Name</th>
                                                <th className='p-2 bg-[#F3F5F8] flex flex-col '> Document
                                                </th>
                                                <th className='p-2 bg-[#F3F5F8] '>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rfidata?.r_f_i_bidder_document && rfidata?.r_f_i_bidder_document.length > 0 ? (
                                                rfidata.r_f_i_bidder_document?.map((doc: any, index: any) => (
                                                    <tr key={doc.id}>
                                                        <td className='p-2'>{index + 1}.</td>
                                                        <td className='p-2'>
                                                            <div className='mb-2'>
                                                                <p>{doc?.bidder_document?.name || "N/A"}</p>
                                                            </div>
                                                        </td>
                                                        <td className='p-2 flex gap-2 items-center hover:text-blue-500 hover:underline cursor-pointer'>
                                                            <FaCloudUploadAlt />Document
                                                        </td>
                                                        <td className='p-2 text-green-500 font-bold'>
                                                            {doc?.bidder_document?.status || "N/A"}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr >
                                                    <td colSpan={4} className='p-2 text-center text-red-500 font-bold'>No Data Available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <h1 className='text-2xl font-semibold text-[#00A9E2] flex gap-2 py-3'> Item List</h1>
                                </div>

                                <div className='max-sm:overflow-scroll' >
                                    <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                        <thead>
                                            <tr className='bg-[#F4F7FF]'>
                                                <th className='p-2 bg-[#00A9E2] text-white'>Item No.</th>
                                                <th className='p-2 bg-[#00A9E2] text-white'>Description</th>
                                                <th className='p-2 bg-[#00A9E2] text-white'>Quantity</th>

                                                <th className='p-2 bg-[#00A9E2] text-white'>Unit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rfidata?.need?.r_f_iitem_list && rfidata?.need?.r_f_iitem_list.length > 0 ? (
                                                rfidata?.need?.r_f_iitem_list?.map((item: any, index: any) => (
                                                    <tr key={item.id}>
                                                        <td className='p-2'>{index + 1}.</td>
                                                        <td className='p-2'>
                                                            <div className='mb-2'>
                                                                <p>{item?.category?.description || "N/A"}</p>
                                                            </div>
                                                        </td>
                                                        <td className='p-2 flex gap-2 items-center cursor-pointer'>
                                                            {item?.quantity || "N/A"}
                                                        </td>
                                                        <td className='p-2 '>
                                                            {item?.unit?.name || "N/A"}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr >
                                                    <td colSpan={4} className='p-2 text-center text-red-500 font-bold'>No Data Available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='flex justify-end py-3 mb-12'>
                                    <button
                                        onClick={handlerfiapply}
                                        type="submit"
                                        className="mt-2 px-12 py-2 bg-[#192B56] text-white font-semibold rounded-md  hover:bg-[#e1a05a]"
                                    >
                                        Apply Now
                                    </button>
                                </div>

                            </div>
                        </div>

                    )}

                </div>

            </div>
        </>
    )
}

RfiPreview.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default RfiPreview;
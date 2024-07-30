import BlankLayout from '@/components/Layouts/BlankLayout';
import Header from '@/components/front/Pageheader';
import Frontheader from '@/components/front/Navbar';
import React, { useEffect, useState } from 'react';
import { StartdateIcon, OMRIcon, TenderDepartmentIcon, TenderEntityIcon, CompanycodeIcon, ProjectIcon, RfidepartmentIcon, DiscriptionIcon, AdditionalnotesIcon, IssuedateIcon, BidderRequireIcon, ItemlistIcon } from '../../../public/icons';
import { MdCloudDownload, } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { API_BASE_URL, RFIPREVIEW_API_URL, TENDERPREVIEW_API_URL } from '@/api.config';
import Skelotonfull from '@/components/cards/Skeletonfull';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';

const RfiPreview = () => {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [rfidata, setrfidata] = useState<any>()
    useEffect(() => {
        if (data && data.r_f_idevlopment) {
            setrfidata(data.r_f_idevlopment);
        }
      }, [data]);

    console.log("ssss", rfidata)
    console.log("data", data)

    
    const [daysToGo, setDaysToGo] = useState<number | null>(null);

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
            console.log("-------", data)
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

    const handletenderapply = () => {
        if (!name) {
            toast.error('You must be logged in to apply tender, Please Login');
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
            return;
        } else {
            toast.success("Tender Applied successfull")
        }
    };

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
        <>      <ToastContainer />

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
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                                        <DiscriptionIcon />
                                        Description
                                    </h3>
                                    <p> Not Availabe..</p>

                                </div>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                                        <AdditionalnotesIcon />
                                        Additional Notes
                                    </h3>
                                    <p>{rfidata?.additional_note || "Not Availabe.."}</p>
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
                                                <td className='p-2'>  {rfidata?.clarification_endDate || "N/A"}</td>
                                                <td className='p-2'>{rfidata?.submission_date || "N/A"}</td>
                                                <td className='p-2'>  {rfidata?.close_date || "N/A"}</td>

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
                                                <td className='p-2'>
                                                <IoIosLock className='text-2xl cursor-pointer'  />
                                                </td>
                                            </tr>
                                        </tbody> 
                                    </table>
                                </div>
                                <div>
                                    <h1 className='text-2xl font-semibold text-[#00A9E2] flex gap-2 py-3'> <ItemlistIcon />Item List</h1>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='p-2'>1.</td>
                                                <td className='p-2'>Procurement_Category</td>
                                                <td className='p-2'>Lab Supply Agreement</td>
                                                <td className='p-2'>PCS</td>
                                                <td className='p-2'>20324</td>

                                            </tr>
                                            <tr>
                                                <td className='p-2'>2.</td>
                                                <td className='p-2'>Procurement_Category</td>
                                                <td className='p-2'>Mouse</td>
                                                <td className='p-2'>DOJEN</td>
                                                <td className='p-2'>20324</td>

                                            </tr>

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
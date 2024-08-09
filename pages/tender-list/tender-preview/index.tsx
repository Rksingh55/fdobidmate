import BlankLayout from '@/components/Layouts/BlankLayout';
import Header from '@/components/front/Pageheader';
import Frontheader from '@/components/front/Navbar';
import React, { useEffect, useState } from 'react';
import { StartdateIcon, OMRIcon, TenderDepartmentIcon, TenderEntityIcon, TenderfeesIcon } from '../../../public/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_BASE_URL, TENDER_INTEREST_API_URL, TENDERPREVIEW_API_URL } from '@/api.config';
import Skelotonfull from '@/components/cards/Skeletonfull';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTenderList } from '../../../Reducer/tenderlistSlice';
import { getToken } from '@/localStorageUtil';
import Loader from '@/components/front/loader';
import { FaLock } from 'react-icons/fa';

const TenderPreview = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [data, setData] = useState<any>([]);
    const [daysToGo, setDaysToGo] = useState<number | null>(null);
    const [showLoader, setShowLoader] = useState(false);
    const tenderlist = useSelector((state: RootState) => state.Tenderlist.list || []);
    const fetchTenderData = (page: number) => {
        dispatch(fetchTenderList(page));
    };
    useEffect(() => {
        fetchTenderData(1);
    }, [dispatch]);

    useEffect(() => {
        if (data[0]?.close_date) {
            const calculateDaysRemaining = () => {
                const today = new Date();
                const closeDate = new Date(data[0]?.close_date);
                const timeDiff = closeDate?.getTime() - today.getTime();
                const dayDiff = Math?.ceil(timeDiff / (1000 * 3600 * 24));
                return dayDiff;
            };
            setDaysToGo(calculateDaysRemaining());
        }
    }, [data[0]?.close_date]);

    const token = getToken();
    // const { id } = router.query;
    const id = sessionStorage.getItem('sdfkheifsnccsd0223!@#94dssdcscjdshcdscsc1@$!@');
    const [loading, setLoading] = useState<boolean>(true);
    const fetchData = async (id: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}${TENDERPREVIEW_API_URL}?encrypt_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
            }
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

    const Tenderapply = async () => {
        setShowLoader(true)
        try {
            const response = await fetch(`${API_BASE_URL}${TENDER_INTEREST_API_URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ doc_type: "Tender", doc_id: id }),
            });
            if (!response.ok) {
                setShowLoader(false)
                const errorResult = await response.json();
                toast.error(errorResult?.message?.error || 'An error occurred');
                return;
            }
            const result = await response.json();
            console.log(result)
            if (result?.status === "success") {
                toast.success(result?.message?.success);
                router.push("/dashboard/tender");
                setShowLoader(false)
            } else {
                toast.error(result?.message?.error || 'An error occurred');
            }
            setData(data);
        } catch (error) {
            if (error instanceof Error) {
                setShowLoader(false)
                toast.error(error.message || 'Failed to fetch data');
            } else {
                setShowLoader(false)
                toast.error('Failed to fetch data');
            }
        }
    };
    const [name, setName] = useState<string>('');
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        setName(u_name ?? "");
    }, []);
    const handletenderapply = () => {
        const Id = data[0]?.id
        if (!name) {
            if (Id) {
                sessionStorage.setItem("TenderId", Id)
            }
            toast.error('You must be logged in to apply tender, Please Login');
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
            return;
        } else {
            Tenderapply();
        }
    };

    const handleViewRecenetTender = (id: string) => {
        if (id) {
            sessionStorage.setItem("sdfkheifsnccsd0223!@#94dssdcscjdshcdscsc1@$!@", id)
            router.push("/tender-list/tender-preview")
        }
    }
    return (
        <>      <ToastContainer />
            {showLoader && (
                <Loader />
            )}
            <Frontheader />
            <Header heading="Tender Preview" />
            <div className='w-[90%] m-auto'>
                <div className='flex gap-2 mt-3 md:flex-row flex-col'>
                    <div className='basis-[70%] md:p-2 bg-white rounded-md'>
                        {loading ? (
                            <Skelotonfull />

                        ) : (
                            <div className="max-w-4xl mx-auto md:p-3 p-1">
                                <div className='flex justify-between py-2'>
                                    <div className="text-xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">  <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div> {data[0]?.title}</div>
                                    <button className='bg-[#FC8404] text-white font-semibold rounded-sm px-4 shadow-md'>
                                        {daysToGo !== null ? `${daysToGo} Days to go` : 'Calculating...'}
                                    </button>
                                </div>
                                <div className='flex md:flex-row justify-between gap-2 py-2 max-sm:flex-wrap'>
                                    <div className="py-2 flex  gap-2">
                                        <StartdateIcon />
                                        <div className='flex    flex-col '>
                                            <label className='font-bold'>Start Date  </label>
                                            {/* {new Date(data[0]?.publish_date)?.toISOString()?.split('T')[0]} */}
                                            {data[0]?.publish_date}

                                        </div>
                                    </div>
                                    <div className="py-2 flex gap-2">
                                        <StartdateIcon />
                                        <div className='flex    flex-col'>
                                            <label className='font-bold'>Close Date  </label>
                                            {/* {new Date(data[0]?.close_date)?.toISOString()?.split('T')[0]} */}
                                            {data[0]?.close_date}


                                        </div>
                                    </div>
                                    <div className="py-2 flex gap-2">
                                        <OMRIcon />
                                        <div className='flex    flex-col'>
                                            <label className='font-bold'>Currency  </label>
                                            {data[0]?.currency?.code}
                                        </div>

                                    </div>

                                    <div className="py-2 flex gap-2">
                                        <TenderEntityIcon />
                                        <div className='flex    flex-col'>
                                            <label className='font-bold'>Entity  </label>
                                            {data[0]?.company?.name}
                                        </div>

                                    </div>
                                    <div className="py-2 flex gap-2">
                                        <TenderDepartmentIcon />
                                        <div className='flex md:    flex-col'>
                                            <label className='font-bold'>Department  </label>
                                            {data[0]?.department?.code}
                                        </div>
                                    </div>

                                </div>

                                <div className="py-10">
                                    <h2 className="text-xl font-semibold mb-2 text-[#00A9E2]">Brief Information</h2>
                                    <p className='py-2'>
                                        {data[0]?.description || 'No Description available'}
                                    </p>
                                </div>

                                <div className='mt-3'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]">Tender Dates</h3>
                                    <table className='rounded-md bg-white mt-3 border-[4px] border-[#192B56] '>
                                        <thead className=''>
                                            <tr className=''>
                                                <th className='p-2 bg-[#192B56] text-white'>Title</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            <tr>
                                                <td className='p-2'>Tender Float Date</td>
                                                <td className='p-2'>
                                                    {data[0]?.float_date}
                                                    {/* {new Date(data[0]?.float_date)?.toISOString()?.split('T')[0]} */}

                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-2'>Bid Submission Date</td>
                                                <td className='p-2'>
                                                    {data[0]?.bidsubmissiondeadline_date}
                                                    {/* {new Date(data[0]?.bidsubmissiondeadline_date)?.toISOString()?.split('T')[0]} */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-2'>Clarification End Date</td>
                                                <td className='p-2'>
                                                    {data[0]?.clarificationend_date}
                                                    {/* {new Date(data[0]?.clarificationend_date)?.toISOString()?.split('T')[0]} */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-2'>Tender End Date</td>
                                                <td className='p-2'>
                                                    {/* {new Date(data[0]?.close_date)?.toISOString()?.split('T')[0]} */}
                                                    {data[0]?.close_date}

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='mt-12'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]">Applicable Fees</h3>
                                    <table className='rounded-md bg-white mt-3 border-[4px] border-[#192B56] '>
                                        <thead>
                                            <tr className='bg-[#F4F7FF]'>
                                                <th className='p-2 bg-[#192B56] text-white'>Type</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='p-2'>Bid Bond Fees</td>
                                                <td className='p-2'>
                                                    {data[0]?.bidbondfeepercentage
                                                        ? `${data[0]?.bidbondfeepercentage}%`
                                                        : data[0]?.bidbondfeeamount || 'N/A'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-2'>Tender Fees</td>
                                                <td className='p-2'>
                                                    {data[0]?.tenderfeepercentage
                                                        ? `${data[0]?.tenderfeepercentage}%`
                                                        : data[0]?.tenderfeeamount || 'N/A'}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='mt-12'>
                                    <h3 className="text-xl font-semibold mb-2 text-[#00A9E2]">Tender Documents</h3>
                                    <table className='rounded-md bg-white mt-3 border-[4px] border-[#192B56] '>
                                        <thead>
                                            <tr className='bg-[#F4F7FF]'>
                                                <th className='p-2 bg-[#192B56] text-white'>Sr. No</th>
                                                <th className='p-2 bg-[#192B56] text-white'>File Name</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Type</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Status</th>
                                                <th className='p-2 bg-[#192B56] text-white md:flex md:justify-center'>Download</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array?.isArray(data[0]?.tender_document) ? (
                                                data[0]?.tender_document?.map((item: any, index: any) => (
                                                    <tr key={item.id} >
                                                        <td className='p-2'>{index + 1}</td>
                                                        <td className='p-2'>{item.name?.toString() || 'N/A'}</td>
                                                        <td className='p-2'>{item.type?.toString() || 'N/A'}</td>
                                                        <td className='p-2'>{item.status?.toString() || 'N/A'}</td>
                                                        <td className='p-2 flex justify-center'><FaLock className='cursor-pointer' /></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className='p-2'>No data[0] available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <h1 className='text-xl font-semibold mt-12 text-[#00A9E2]'>Item List</h1>
                                <div className='max-sm:overflow-scroll'>
                                    <table className='rounded-md bg-white mt-3 border-[4px] border-[#192B56] '>
                                        <thead>
                                            <tr className='bg-[#F4F7FF]'>
                                                <th className='p-2 bg-[#192B56] text-white'>Sr. No.</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Category</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Item Name</th>
                                                <th className='p-2 bg-[#192B56] text-white'>UOM</th>
                                                <th className='p-2 bg-[#192B56] text-white'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array?.isArray(data[0]?.tenderline) ? (
                                                data[0]?.tenderline?.map((item: any) => (
                                                    <tr key={item.id}>
                                                        <td className='p-2'>{item?.line_no?.toString() || 'N/A'}</td>
                                                        <td className='p-2'>{item?.item_no?.toString() || 'N/A'}</td>
                                                        <td className='p-2'>{item?.product_name?.toString() || 'N/A'}</td>
                                                        <td className='p-2'>{item?.unit.name?.toString() || 'N/A'}</td>
                                                        <td className='p-2'>{item?.quantity?.toString() || 'N/A'}</td>
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
                                <div className='py-8 flex justify-end'>
                                    <button onClick={handletenderapply} className='bg-[#192B56] text-white px-6 py-2 rounded-sm'>Apply Now</button>
                                </div>
                            </div>

                        )}

                    </div>
                    <div className='md:basis-[30%] h-[900px]  p-1 bg-white rounded-md'>
                        <div className='bg-[#00A9E2] text-white flex gap-2 items-center  p-3 font-bold text-xl ' style={{ borderRadius: "5px 5px 0px 0px" }}>
                            <div className='h-[40px] w-[5px] bg-[#FC8404]'></div>
                            Recent Tenders</div>
                        <div>
                            {loading ? (
                                <Skelotonfull />

                            ) : (
                                <div className="">
                                    {tenderlist?.slice(0, 4)?.map((item) => (

                                        <div onClick={() => handleViewRecenetTender(item?.encrypt_id)} className="cursor-pointer mt-2 border-2 rounded-md bg-white border-[#1E3567] hover:border-[#FC8404]  relative md:p-9 p-3 hover:shadow-md">
                                            <h3 className="text-xl font-semibold py-1 text-[#00A9E2]">{item?.title}</h3>
                                            <p className='py-2'><strong>Tender ID :</strong>{item?.code}</p>

                                            <div className='flex flex-wrap justify-between gap-3 py-2'>
                                                <div>
                                                    <p className='flex gap-1 text-[#4b4949]'><span className='text-[#00A9E2]'><StartdateIcon /></span> Start Date :
                                                        {new Date(item?.publish_date).toISOString().split('T')[0]}

                                                    </p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1 text-[#4b4949]'><span className='text-[#00A9E2]'><StartdateIcon /></span> End Date :
                                                        {new Date(item?.close_date).toISOString().split('T')[0]}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1 text-[#4b4949]'><span className='text-[#00A9E2]'><OMRIcon /></span> Currency : {item?.curr_code}</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1 text-[#4b4949]'><span className='text-[#00A9E2]'><TenderfeesIcon /></span> Tender Fees : ${item?.tenderfeeamount}</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1 text-[#4b4949]'><span className='text-[#00A9E2]'><TenderEntityIcon /></span> Entity : {item?.company}</p>
                                                </div>
                                                <div>
                                                    <p className='flex gap-1 text-[#4b4949]'><span className='text-[#00A9E2]'><TenderDepartmentIcon /></span> Department : {item?.department}</p>
                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </div>
                            )}
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

TenderPreview.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default TenderPreview;
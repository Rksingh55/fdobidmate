import { AppDispatch, RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { TiWorld } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import Base64Image from '../front/Base64Image';
function Profile_Preview() {
    const dispatch = useDispatch<AppDispatch>();
    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);
    const status = useSelector((state: RootState) => state.vendordata.status);
    const [data, setdata] = useState<any>();
    const [profileImg, setProfileImg] = useState<any>()
    useEffect(() => {
        dispatch(fetchvendordata());
    }, [dispatch]);

    useEffect(() => {
        setdata(vendorInformationList)
        setProfileImg(data?.profile_img)
    }, [vendorInformationList]);
    console.log(data);
    const Img = profileImg;

    return (
        <div className=''>
            <div className='flex gap-2 flex-col md:flex-row '>
                <div className='md:basis-[40%] w-full bg-white  rounded-md py-2 px-4 border-2'>
                    <div className='flex   gap-4'>
                        {/* <img className='w-[80px] h-[80px] rounded-full  border-[4px] border-blue-200 object-cover' src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1718089035~exp=1718092635~hmac=a9d2525204492fd8f06e926b959f12bd7592c3988c9450691b5c6c8d8ba97298&w=900" /> */}
                        <Base64Image base64String={Img} alt="Profile Image" width={100} height={100} />
                        <div>
                            <h1 className='text-xl font-bold'> {data?.name}</h1>
                            <h1 className='py-2 font-bold'>{data?.phone_no}</h1>
                        </div>
                    </div>
                    <div className='  py-2 mt-2   flex flex-col gap-3  text-justify'>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Vendor  Id</span>{data?.vendor_request_id}</h1>

                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Email id</span> {data?.email}</h1>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Company Name</span> amysoftech</h1>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Vendor Type</span> {data?.vendor_type}</h1>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2 '><TiWorld className=' text-lg' />Nationality</span> Zimbabwe</h1>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Billing address</span> {data?.billing_address}</h1>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Primary address</span> {data?.primary_address}</h1>
                        <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TiWorld className=' text-lg' />Currency </span> UAE Dirham</h1>
                    </div>
                </div>

                {/* ------personal information------ */}
                <div className='md:basis-[60%] w-full  bg-white  rounded-md '>
                    <h1 className='font-semibold text-xl text-[#00A9E2] '>Company Details</h1>
                    <div className='py-2'>
                        <div className=' w-full border-2 bg-white  rounded-md p-3 flex justify-between'>
                            <div className='flex flex-col gap-3'>
                                <p className='flex justify-between gap-10 '><span className='font-bold'> Company Founding year</span> 1997</p>
                                <p className='flex justify-between gap-10'> <span className='font-bold'>CR Number </span> 25</p>
                                <p className='flex justify-between gap-10'><span className='font-bold'>Type of Business </span> V-0000000XX</p>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className='flex justify-between gap-10 '><span className='font-bold'> Website</span> work@email.com</p>
                                <p className='flex justify-between gap-10'> <span className='font-bold'>Number of employee</span> 300</p>
                                <p className='flex justify-between gap-10'><span className='font-bold'>Quality and safety organization</span> Yes</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h1 className='font-semibold text-xl py-2 text-[#00A9E2]'>Account Information</h1>
                        {data?.vendor_bank_details?.map((item:any)=>(
                            <div className=' w-full border-2 bg-white  rounded-md p-3 flex justify-between'>
                            <div className='flex flex-col gap-3'>
                                <p className='flex justify-between gap-10 '><span className='font-bold'> Account Number</span> {item?.account_no}</p>
                                <p className='flex justify-between gap-10'> <span className='font-bold'>Swift Code</span> {item?.swift_code}</p>
                                <p className='flex justify-between gap-10'><span className='font-bold'>Bank Branch & Address</span> {item?.bank_name}</p>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className='flex justify-between gap-10 '><span className='font-bold'>Account Holder Name</span> {item?.account_holder_name}</p>
                                <p className='flex justify-between gap-10'> <span className='font-bold'>IBAN</span> {item?.iban}</p>
                            </div>
                        </div>
                        ))}
                        
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2 md:flex-row flex-col rounded-md'>
                {/* -------Tax & Billing info-------- */}
                <div className='md:basis-[40%] w-full '>
                    <h1 className='font-semibold text-xl text-[#00A9E2]'>Tax & Billing Info</h1>
                    <div className='md:basis-[40%] w-full bg-white  border-2   rounded-md mt-2 px-2'>
                        <p className='flex justify-between px-2 py-3'><span className='font-bold'>TAX Registration Number </span>  {data?.tax_no}</p>
                        <p className='flex justify-between px-2 py-3'><span className='font-bold'>Terms of Paymentr </span>  10% d</p>
                        <p className='flex justify-between px-2 py-3'><span className='font-bold'>Delivery Terms </span>  1 day</p>
                        <p className='flex justify-between px-2 py-3'><span className='font-bold'>Method of Payment </span>  card</p>
                    </div>
                </div>

                {/* ------Documents------- */}
                <div className='md:basis-[60%]  w-full   '>
                    <h1 className='font-semibold text-xl text-[#00A9E2]'>Documents</h1>
                    <div className=' bg-white  border-2   rounded-md  mt-2'>
                        <table className=''>
                            <tr className='bg-[#F3F5F8] '>
                                <th className='px-2 py-2'>S.No</th>
                                <th className='px-2 py-2'>Document Name</th>
                                <th className='flex flex-col px-2 py-2'>Format <span className='text-red-500 text-[6px]'>(Only PDF, JPEG, PNG Accepted)</span></th>
                                <th className='px-2 py-2'>Size</th>
                                <th className='px-2 py-2'>Status</th>


                            </tr>
                            <tr >
                                <td className='px-2 py-3'>1.</td>
                                <td className='px-2 py-3'>Company Certificate</td>
                                <td className='px-2 py-3'>Pdf</td>
                                <td className='px-2 py-3'>6 mb</td>
                                <td className='cursor-pointer flex font-bold px-2 py-3'><FaEye /></td>
                            </tr>
                            <tr>
                                <td className='px-2 py-3'>2.</td>
                                <td className='px-2 py-3'>Company Certificate</td>
                                <td className='px-2 py-3'>Pdf</td>
                                <td className='px-2 py-3'>6 mb</td>
                                <td className='cursor-pointer flex font-bold px-2 py-3'><FaEye /></td>
                            </tr>
                            <tr>
                                <td className='px-2 py-3'>3.</td>
                                <td className='px-2 py-3'>Company Certificate</td>
                                <td className='px-2 py-3'>Pdf</td>
                                <td className='px-2 py-3'>6 mb</td>
                                <td className='cursor-pointer flex font-bold px-2 py-3'><FaEye /></td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile_Preview
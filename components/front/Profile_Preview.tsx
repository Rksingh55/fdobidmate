import { AppDispatch, RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt, FaEye } from 'react-icons/fa'
import { TiWorld } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import Base64Image from '../front/Base64Image';
import { AccountholderIcon, AccountInformationIcon, AccountNumberIcon, BankbranchIcon, BillingIcon, CalenderIcon, CrnumberIcon, DelieveryIcon, DepartmentIcon, EmailIcon, IbancodeIcon, IdIcon, NationlityIcon, NumberofemployeeIcon, OMRIcon, OMRicon, PayementMethodIcon, PaymentcardIcon, PrimaryAdressIcon, ProfileIcon, QualityandsaftyIcon, SwiftCodeIcon, TaxbillingIcon, TaxRegisterationIcon, TenderDepartmentIcon, TenderdocumentIcon, TypeofbussinessIcon, VendorTypeIcon, WebsiteIcon } from '@/public/icons';
import Skelotonfull from '../cards/Skeletonfull';

function Profile_Preview() {

    const dispatch = useDispatch<AppDispatch>();
    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);
    const status = useSelector((state: RootState) => state.vendordata.status);
    const error = useSelector((state: RootState) => state.vendordata.error);

    const [data, setdata] = useState<any>();

    const [profileImg, setProfileImg] = useState<any>()
    useEffect(() => {
        dispatch(fetchvendordata());
    }, [dispatch]);

    useEffect(() => {
        setdata(vendorInformationList)
        setProfileImg(data?.profile_img)
    }, [vendorInformationList]);
    console.log("all data", data);
    const Img = profileImg;

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleViewImage = (imageBase64: string) => {
        setSelectedImage(imageBase64);
    };
    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    return (
        <>
            {status === 'loading' && (
                <Skelotonfull />
            )}
            {status === 'failed' && <div className="text-red-500 text-center mt-12 font-bold">  {error}</div>}
            {status === 'succeeded' && (
                <div className=''>

                    <div className='flex gap-2 flex-col md:flex-row '>
                        <div className='md:basis-[40%] w-full bg-white  rounded-md py-2 px-4 border-2'>
                            <div className='flex   gap-4'>
                                {profileImg ? (
                                    <ProfileIcon />
                                ) : (
                                    <Base64Image base64String={Img} alt="Profile Image" width={100} height={100} />
                                )}
                                <div>
                                    <h1 className='text-xl font-bold'> {data?.name || "N/A"}</h1>
                                    <h1 className='py-2 font-bold'>{data?.phone_no || "N/A"}</h1>
                                </div>
                            </div>
                            <div className='  py-2 mt-2   flex flex-col gap-3  text-justify'>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><IdIcon />Vendor  Id</span>{data?.vendor_request_id || "N/A"}</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><EmailIcon />Email id</span> {data?.email || "N/A"}</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><TenderDepartmentIcon />Company Name</span> {data?.company_id || "N/A"}</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><VendorTypeIcon />Vendor Type</span> {data?.vendor_type || "N/A"}</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2 '><NationlityIcon />Nationality</span> Zimbabwe</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><BillingIcon />Billing address</span> {data?.billing_address || "N/A"}</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><PrimaryAdressIcon />Primary address</span> {data?.primary_address || "N/A"}</h1>
                                <h1 className='flex justify-between'><span className='font-bold flex gap-2'><OMRIcon />Currency </span> {data?.currency?.code || "N/A"}</h1>
                            </div>
                        </div>

                        {/* ------personal information------ */}
                        <div className='md:basis-[60%] w-full  bg-white  rounded-md '>
                            <h1 className='font-semibold text-xl text-[#00A9E2] flex items-center gap-2'><DepartmentIcon />Company Details</h1>
                            <div className='py-2'>
                                <div className=' w-full border-2 bg-white  rounded-md p-3 flex md:flex-row flex-col gap-3  justify-between'>
                                    <div className='flex flex-col gap-3'>
                                        <p className='flex justify-between gap-10   '><span className='font-bold flex items-center gap-1'><CalenderIcon /> Company Founding year</span> {data?.founding_year || "N/A"}</p>
                                        <p className='flex justify-between gap-10'> <span className='font-bold flex items-center gap-1'><CrnumberIcon /> CR Number </span>  {data?.cr_number || "N/A"}</p>
                                        <p className='flex justify-between gap-10'><span className='font-bold flex items-center gap-1'><TypeofbussinessIcon /> Type of Business </span>  {data?.type_of_business_id || "N/A"}</p>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <p className='flex justify-between gap-10 '><span className='font-bold  flex items-center gap-1' ><WebsiteIcon />  Website</span>  {data?.website || "N/A"}</p>
                                        <p className='flex justify-between gap-10'> <span className='font-bold flex items-center gap-1'><NumberofemployeeIcon /> Number of employee</span>  {data?.number_of_employee || "N/A"}</p>
                                        <p className='flex justify-between gap-10'><span className='font-bold flex items-center gap-1'><QualityandsaftyIcon /> Quality and safety organization</span>  {data?.quality_safety || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h1 className='font-semibold text-xl py-2 text-[#00A9E2] flex items-center gap-2'><AccountInformationIcon />Account Information</h1>

                                {data?.vendor_bank_details && data?.vendor_bank_details.length > 0 ? (
                                    data?.vendor_bank_details?.map((item: any) => (
                                        <div className=' w-full border-2 bg-white  rounded-md p-3 flex md:flex-row flex-col gap-3 justify-between'>
                                            <div className='flex flex-col gap-3'>
                                                <p className='flex justify-between gap-10 '><span className='font-bold flex items-center gap-1'><AccountNumberIcon />  Account Number</span> {item?.account_no || "N/A"}</p>
                                                <p className='flex justify-between gap-10'> <span className='font-bold flex items-center gap-1'><SwiftCodeIcon /> Swift Code</span> {item?.swift_code || "N/A"}</p>
                                                <p className='flex justify-between gap-10'><span className='font-bold flex items-center gap-1'><BankbranchIcon /> Bank Branch & Address</span> {item?.bank_name || "N/A"}</p>
                                            </div>
                                            <div className='flex flex-col gap-3'>
                                                <p className='flex justify-between gap-10 '><span className='font-bold flex items-center gap-1'><AccountholderIcon /> Account Holder Name</span> {item?.account_holder_name || "N/A"}</p>
                                                <p className='flex justify-between gap-10'> <span className='font-bold flex items-center gap-1'><IbancodeIcon /> IBAN</span> {item?.iban || "N/A"}</p>
                                            </div>
                                        </div>
                                    ))) : (
                                    <div className=' w-full border-2 bg-white  rounded-md p-3 flex md:flex-row flex-col gap-3  justify-between'>

                                        <td colSpan={4} className='p-2 text-center text-red-500 font-bold'>No Data Available</td>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 mt-4 md:flex-row flex-col rounded-md '>
                        {/* -------Tax & Billing info-------- */}
                        <div className='md:basis-[40%] w-full '>
                            <h1 className='font-semibold text-xl text-[#00A9E2] flex items-center gap-2'><TaxbillingIcon />Tax & Billing Info</h1>
                            <div className='md:basis-[40%] w-full bg-white  border-2   rounded-md mt-2 px-2'>
                                <p className='flex justify-between px-2 py-3'><span className='font-bold flex gap-2 items-center'><TaxRegisterationIcon />TAX Registration Number </span>  {data?.tax_no || "N/A"}</p>
                                <p className='flex justify-between px-2 py-3'><span className='font-bold flex gap-2 items-center'><PaymentcardIcon />Terms of Paymentr </span>  {data?.termsofpayment?.name || "N/A"}</p>
                                <p className='flex justify-between px-2 py-3'><span className='font-bold flex gap-2 items-center'><DelieveryIcon />Delivery Terms </span>  {data?.termsofpayment_id || "N/A"}</p>
                                <p className='flex justify-between px-2 py-3'><span className='font-bold flex gap-2 items-center'><PayementMethodIcon />Method of Payment </span> {data?.modeofpayment?.name || "N/A"}</p>
                            </div>
                        </div>

                        {/* ------Documents------- */}
                        <div className='md:basis-[60%]  w-full   '>
                            <h1 className='font-semibold text-xl text-[#00A9E2] flex items-center gap-2'> <TenderdocumentIcon />Documents</h1>
                            <div className=' bg-white  border-2   rounded-md  mt-2 overflow-y-auto h-[300px]'>
                                <table className=' '>
                                    <thead>
                                        <tr className='bg-[#F3F5F8] '>
                                            <th className='px-2 py-2'>S.No</th>
                                            <th className='px-2 py-2'>Document Name</th>
                                            <th className='flex flex-col px-2 py-2'>Format </th>
                                            <th className='px-2 py-2'>Size</th>

                                            <th className='px-2 py-2'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {data?.vt_documents && data?.vt_documents.length > 0 ? (
                                            data?.vt_documents?.map((doc: any, index: any) => (
                                                <tr key={doc.id} className=''>
                                                    <td className='p-2'>{index + 1}.</td>
                                                    <td className='p-2'>
                                                        <div className='mb-2'>
                                                            <p>{doc?.attechmentType || "N/A"}</p>
                                                        </div>
                                                    </td>
                                                    <td className='p-2 flex gap-2 items-center'>
                                                        <p className='cursor-pointer' onClick={() => handleViewImage(doc?.name)}>View</p>
                                                    </td>
                                                    <td className='p-2  font-bold'>
                                                        --
                                                    </td>
                                                    <td className='p-2 text-green-500 font-bold'>
                                                        Active
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
                        </div>

                    </div>

                </div>
            )
            }
            {selectedImage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md">
                        <button
                            className="absolute top-2 right-2 text-white bg-orange-500 p-2 "
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <Base64Image base64String={selectedImage} alt="PBG Document" width={600} height={400} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile_Preview
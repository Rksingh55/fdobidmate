import React, { useEffect, useState } from 'react';
import { TenderdocumentIcon, ItemlistIcon, ApplicablefeesIcon, PayemnentIcon, DepartmentIcon, EntityIcon, StartdateIcon, CurrencyIcon, PerformenceBackGuranteeIcon, OMRIcon, OMRicon, DocumentIcon, IssuedateIcon, BankIcon, PbgdocumentIcon, BidderRequireIcon, CreditCardIcon } from '../../../../public/icons';
import { MdCancel, MdCloudDownload, } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { API_BASE_URL, INTERESTED_TENDER_VIEW_API_URL, TENDER_DELETEPBG_API_URL, TENDER_PAYMENT_API_URL, TENDER_PBGLIST_API_URL, TENDER_SUBMISSION_API_URL, TENDER_UPLOAD_REQUIRED_DOCS_API_URL, VENDORATTACHMENT_API_URL } from '@/api.config';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { FcOk } from 'react-icons/fc';
import { FaCloudUploadAlt, FaEdit, FaEye, FaFileDownload } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AiOutlineDelete } from 'react-icons/ai';
import { getToken } from '@/localStorageUtil';
import { downloadFile } from '@/components/cards/downloadFile';
import Swal from 'sweetalert2';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import Base64Image from '../../../../components/front/Base64Image';
import Loader from '@/components/front/loader';
import UploadDocumentPopup from '@/components/documentupload/UploadDocumentPopup';
import ViewDocumentPopup from '@/components/documentupload/ViewDocumentPopup';

interface Document {
    type: string;
    files: File[];
    id: any
}
const Tenderdetails = () => {
    const BASE_URL = 'https://fdo-bidmate.kefify.com';
    const router = useRouter();
    // const { id } = router.query;
    const id = sessionStorage.getItem('sdgasuidaiusgdad!#@!nx@#$1dsvs');

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState(false);
    const token = getToken();
    const [showCreditCard, setShowCreditCard] = useState(false);
    const [PbgList, setPbgList] = useState<any>()
    // -------fetch pbg list -------
    const fetchpbgList = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${TENDER_PBGLIST_API_URL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            setPbgList(result?.data || [])
        } catch (error) {
            toast.error('Failed to fetch data');
        }
    };
    // useEffect(() => {
    //     fetchpbgList()
    // }, [])
    // -------delete pbg -------
    const deletePbg = async (pbgId: string) => {
        setShowLoader(true)
        try {
            const response = await fetch(`${API_BASE_URL}${TENDER_DELETEPBG_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ pbg_id: pbgId })
            });
            const result = await response.json();
            if (response.ok) {
                setShowLoader(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result?.message?.success || 'PBG deleted successfully',
                    customClass: 'sweet-alerts',
                });
                fetchpbgList();
            } else {
                setShowLoader(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: result?.message?.error || 'Failed To Delete PBG ',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            setShowLoader(false)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to Delete PBG',
                customClass: 'sweet-alerts',
            });
        }
    };


    const PerformenceBackGuranteeRoute = (id: string, companyId: string, Tender_vendorid: string) => {
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("company_id", companyId);
        sessionStorage.setItem("Tender_vendorid", Tender_vendorid);
        router.push("/dashboard/tender/Performance-Bank-Gurantee");
    };

    const handlePayNowClick = () => {
        setShowCreditCard(true);
    };
    const handleCloseClick = () => {
        setShowCreditCard(false);
    };
    const fetchTenderInterestPreview = async (id: string) => {
        try {
            setShowLoader(true);
            const response = await fetch(`${API_BASE_URL}${INTERESTED_TENDER_VIEW_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ tender_id: id })
            });
            const result = await response.json();
            setData(result?.data || [])
            if (response.ok) {
                setShowLoader(false)
            } else{
                setShowLoader(false)

            }
           
        } catch (error) {
            setShowLoader(false);
            toast.error('Failed to fetch data');
        }
    };
    console.log("tenderdataa", data)
    useEffect(() => {
        if (id) {
            fetchTenderInterestPreview(id as string);
        }
    }, [id]);
    const [cardnumber, setCardNumber] = useState('');
    const [cardholdername, setcardholdername] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const email = localStorage.getItem("email")?.replace(/['"]/g, '');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!cardnumber || !cardholdername || !expiryMonth || !expiryYear || !cvv) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please fill out all fields.',
                customClass: 'sweet-alerts',
            });
            return;
        }
        setShowLoader(true)
        const formData = {
            type: "Tender",
            payment_type: "tender_fee",
            vendor_id: data?.tender_send?.vendor_id,
            doc_id: id,
            email: email,
            amount: data?.tenderfeeamount,
            currency: data?.currency?.code,
            company_id: data?.company_id,
            cardnumber,
            cardholdername,
            expiry: `${expiryMonth}/${expiryYear}`,
            cvv
        };
        try {
            const response = await fetch(`${API_BASE_URL}${TENDER_PAYMENT_API_URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            console.log("ssss", responseData)
            if (response.ok) {
                setShowLoader(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: responseData?.message?.success || 'Payment successful!',
                    customClass: 'sweet-alerts',
                });
            } else {
                setShowLoader(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: responseData?.message?.error || 'Payment failed!',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            setShowLoader(false)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Payment failed.',
                customClass: 'sweet-alerts',
            });
        }
    };
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleViewImage = (imageBase64: string) => {
        setSelectedImage(imageBase64);
    };
    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const [unitPrices, setUnitPrices] = useState<Record<number, number>>({});
    const [totalAmount, setTotalAmount] = useState(0);

    const handleUnitPriceChange = (id: number, value: number) => {
        setUnitPrices((prevPrices) => ({
            ...prevPrices,
            [id]: value
        }));
    };

    const calculateTotals = () => {
        let total = 0;
        const updatedData = data?.tenderline?.map((item: any) => {
            const quantity = item?.quantity || 0;
            const unitPrice = unitPrices[item.id] || 0;
            const totalPrice = quantity * unitPrice;
            total += totalPrice;
            return {
                tenderline_id: item?.id,
                price: unitPrice,
                quantity,
                total: totalPrice
            };
        });
        setTotalAmount(total);
        return updatedData;
    };

    const handleSubmitTenderValue = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const tenderLines = calculateTotals();
        console.log(tenderLines)
        const payload = {
            tender_submission: tenderLines,
            vendor_id: data?.tender_send?.vendor_id,
            tender_id: data?.id,
            company_id: data?.company_id
        };
        const condition = data?.tender_fee === "Done" &&
            (data?.bidbondfee_applicable === "Yes" &&
                (Array?.isArray(data?.p_b_g) && data?.p_b_g?.length > 0)) || data?.tender_fee === "Done" && data?.bidbondfee_applicable === "No";

        if (condition) {
            try {
                const response = await fetch(`${API_BASE_URL}${TENDER_SUBMISSION_API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                if (response.ok) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: result?.message?.success || 'Tender Submitted Successfully',
                        customClass: 'sweet-alerts',
                    });

                } else {
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: result?.message?.error || 'Error To Submit Tender',
                        customClass: 'sweet-alerts',
                    });
                }
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to submit data. Please try again later.',
                    customClass: 'sweet-alerts',
                });
            }
        } else {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Applicable Fees Is Not Completed',
                customClass: 'sweet-alerts',
            });
        }

    };


    const ViewInvoice = () => {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Invoice Not Available!',
            customClass: 'sweet-alerts',
        });
    }

    // ------upload tender docs-------
    const [isUploadPopupVisible, setIsUploadPopupVisible] = useState(false);
    const [isViewPopupVisible, setIsViewPopupVisible] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [viewDocument, setViewDocument] = useState<File | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedDocumentId, setSelectedDocumentId] = useState<any>(null);

    const handleOpenUploadPopup = (type: string, id: any) => {
        setSelectedType(type);
        setSelectedDocumentId(id);
        setIsUploadPopupVisible(true);
    };

    const handleCloseUploadPopup = () => {
        setIsUploadPopupVisible(false);
    };
    const handleUploadDocuments = async (type: string, files: File[], id: any) => {
        const encodeFileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        };
        try {
            const base64FilesPromises = files.map(file => encodeFileToBase64(file));
            const base64Files = await Promise.all(base64FilesPromises);
            const formData = new FormData();
            formData.append('attachement_type', type);
            formData.append('doc_id', id);
            formData.append('vendor_id', data?.tender_send?.vendor_id || '');
            formData.append('bid_files', JSON.stringify(base64Files));
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}${TENDER_UPLOAD_REQUIRED_DOCS_API_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            const Data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: Data?.message?.success || 'Tender Docs submitted successful',
                    customClass: 'sweet-alerts',
                });
                setDocuments((prevDocuments) => {
                    const existingDocument = prevDocuments.find(doc => doc.type === type);
                    if (existingDocument) {
                        existingDocument.files = [];
                        return [...prevDocuments];
                    } else {
                        return prevDocuments;
                    }
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorData?.message?.error || 'An error occurred. Please try again.',
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error uploading documents',
                padding: '2em',
                customClass: 'sweet-alerts',
            });


        }
    };
    const handleDeleteDocument = (type: string, index: number) => {
        setDocuments((prevDocuments) => {
            const documentIndex = prevDocuments.findIndex(doc => doc.type === type);
            if (documentIndex !== -1) {
                prevDocuments[documentIndex].files.splice(index, 1);
            }
            return [...prevDocuments];
        });
    };
    const handleViewDocument = (file: File) => {
        setViewDocument(file);
        setIsViewPopupVisible(true);
    };
    const handleCloseViewPopup = () => {
        setIsViewPopupVisible(false);
        setViewDocument(null);
    };

    return (
        <>
            {showLoader && (
                <Loader />
            )}
            <ToastContainer />
            <Dashboardbredcrumb />
            <div className='flex gap-2 mt-3 md:flex-row flex-col'>
                <div className='basis-[70%]  bg-white rounded-md'>
                    <div className="max-w-4xl mx-auto md:p-3 p-1">
                        <div className='border-2 border-[#00A9E2] rounded-md hover:border-[#FC8404] p-2'>
                            <div className='flex justify-between py-2'>
                                <div className="text-xl flex gap-2 items-center font-semibold mb-2 text-[#00A9E2]">
                                    <div className='h-[40px] w-[5px] bg-[#00A9E2]'></div>
                                    {data?.title || "N/A"}

                                </div>
                            </div>
                            <div className="py-4">
                                <h2 className="text-xl mb-2 text-[#00A9E2]">Brief Information</h2>
                                <p className='py-2'>
                                    {data?.description || "Description Not Available"}
                                </p>
                            </div>
                            <div className='flex md:flex-row justify-between gap-2 max-sm:flex-wrap'>
                                <div className="py-2 flex gap-2">
                                    <StartdateIcon />
                                    <div className='flex flex-col'>
                                        <label className='font-bold'>Start Date</label>
                                        {data?.float_date || "N/A"}
                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <StartdateIcon />
                                    <div className='flex flex-col'>
                                        <label className='font-bold'>Close Date</label>
                                        {data?.close_date || "N/A"}
                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <CurrencyIcon />
                                    <div className='flex flex-col'>
                                        <label className='font-bold'>Currency</label>
                                        {data?.currency?.code || "N/A"}
                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <EntityIcon />
                                    <div className='flex flex-col'>
                                        <label className='font-bold'>Entity</label>
                                        {data?.company?.name || "N/A"}
                                    </div>
                                </div>
                                <div className="py-2 flex gap-2">
                                    <DepartmentIcon />
                                    <div className='flex flex-col'>
                                        <label className='font-bold'>Department</label>
                                        {data?.department?.name || "N/A"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-12'>

                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">
                                Tender Required Documents
                            </h3>
                            <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#F3F5F8] '>Sr. No</th>
                                        <th className='p-2 bg-[#F3F5F8] '>Document Name</th>
                                        <th className='p-2 bg-[#F3F5F8] '>Type</th>
                                        <th className='p-2 bg-[#F3F5F8] flex flex-col justify-center '>Download
                                        </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {Array.isArray(data?.tender_document) ? (
                                        data?.tender_document.map((item: any, index: any) => (
                                            item?.tenderrequireddocument_id ? (
                                                <tr key={item.id}>
                                                    <td className='p-2'>{index + 1}.</td>
                                                    <td className='p-2'>{item.tenderrequireddocument?.name || 'N/A'}</td>
                                                    <td className='p-2'>{item?.tenderrequireddocument?.type || 'N/A'}</td>
                                                    <td className='p-2 flex'>
                                                        <MdCloudDownload
                                                            className='text-xl cursor-pointer'
                                                            onClick={() => downloadFile(
                                                                BASE_URL,
                                                                item?.tenderrequireddocument?.images[0].url,
                                                                item?.tenderrequireddocument?.images[0]?.name
                                                            )}
                                                        />

                                                    </td>

                                                </tr>
                                            ) : null
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='p-2 '>No data available</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                        <div className='mt-4'>
                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2 ">

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
                                                    <td className='p-2 flex '>
                                                        <FaCloudUploadAlt onClick={() => handleOpenUploadPopup(item?.name, item?.id)} className=' text-xl cursor-pointer' />

                                                    </td>
                                                </tr>
                                            ) : null
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='p-2'>No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                                <UploadDocumentPopup
                                    isVisible={isUploadPopupVisible}
                                    onClose={handleCloseUploadPopup}
                                    onUploadDocuments={handleUploadDocuments}
                                    onViewDocument={handleViewDocument}
                                    documentType={selectedType}
                                    documentId={selectedDocumentId}
                                />
                                <ViewDocumentPopup
                                    isVisible={isViewPopupVisible}
                                    onClose={handleCloseViewPopup}
                                    document={viewDocument}
                                />
                                <div className="mt-4">
                                    {documents?.map((doc) => (
                                        <div key={doc.type} className="mb-4">
                                            <h3 className="text-lg font-semibold mb-2">{doc.type}:</h3>
                                            {doc?.files?.map((file, index) => (
                                                <div key={index} className="flex justify-between items-center mb-2">
                                                    <span>{file?.name}</span>
                                                    <div>
                                                        <button
                                                            onClick={() => handleViewDocument(file)}
                                                            className="bg-blue-500 text-white p-1 rounded mr-2"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDocument(doc.type, index)}
                                                            className="bg-red-500 text-white p-1 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </table>
                        </div>

                        <div className='mt-12'>
                            <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2"> Applicable Fees</h3>
                            <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2] '>
                                <thead>
                                    <tr className='bg-[#F4F7FF]'>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Type</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Amount</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Payment</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Status</th>
                                        <th className='p-2 bg-[#00A9E2] text-white'>Invoice</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='p-2'>Bid Bond Fees</td>
                                        <td className='p-2'>
                                            {data?.bidbondfeeamount || "N/A"}
                                        </td>
                                        <td className='p-2 flex gap-2'>
                                            {data?.bidbondfee_applicable === "Yes" ? (
                                                <button onClick={() => PerformenceBackGuranteeRoute(data.id, data?.company_id, data?.tender_send?.vendor_id)} className='hover:bg-[#e2a563] bg-[#FC8404] text-white px-3 py-1 rounded-md'>
                                                    Add PBG
                                                </button>
                                            ) : (
                                                <p>No Need To Add PBG</p>
                                            )}
                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='p-2'>Tender Fees</td>
                                        <td className='p-2'>{data?.tenderfeeamount || "N/A"}</td>
                                        <td className='p-2'>
                                            {data?.tenderfee_applicable === "Yes" ? (
                                                <button onClick={handlePayNowClick} className='hover:bg-[#e2a563] bg-[#FC8404] text-white px-3 py-1 rounded-md'>
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <p>No Need To Pay</p>
                                            )}
                                        </td>
                                        <td className='p-2 flex gap-2 '>
                                            {data?.tender_fee || "N/A"}
                                        </td>
                                        <td className=' '><MdCloudDownload onClick={ViewInvoice} className='text-[#00A9E2] text-xl cursor-pointer' /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {showCreditCard && (
                            <div className='mt-12'>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold text-[#00A9E2] flex gap-2 items-center">
                                        <PayemnentIcon /> Payment
                                    </h3>
                                    <button
                                        className="text-red-500 hover:text-red-700 font-bold"
                                        onClick={handleCloseClick}
                                    >
                                        Cancel Payement
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className='bg-[#C1E9FF] border-1 rounded-md p-3'>
                                        <div className='flex flex-row justify-between'>
                                            <div>
                                                <h1 className='text-xl font-bold'>Card Details</h1>
                                            </div>
                                            <CreditCardIcon />
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex md:flex-row flex-col gap-4 py-3'>
                                                <div>
                                                    <h1 className='text-lg font-bold'>Card number</h1>
                                                    <p className='text-[#5E5E5E]'>Enter the 16-digit card number on the card</p>
                                                </div>
                                                <input
                                                    className='bg-white border-1 rounded-md px-4 max-sm:py-2'
                                                    type='number'
                                                    placeholder='xxxx xxxx xxxx xxxx'
                                                    value={cardnumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                />
                                                <div className='flex items-center text-3xl'>
                                                    <FcOk className='max-sm:hidden' />
                                                </div>
                                            </div>
                                            <div className='flex gap-4 py-3 md:flex-row flex-col'>
                                                <div>
                                                    <h1 className='text-lg font-bold'>Card owner</h1>
                                                    <p className='text-[#5E5E5E]'>Enter the name on the card</p>
                                                </div>
                                                <input
                                                    className='bg-white border-1 rounded-md px-4 max-sm:py-2'
                                                    type='text'
                                                    placeholder='Name'
                                                    value={cardholdername}
                                                    onChange={(e) => setcardholdername(e.target.value)}
                                                />
                                                <div className='flex items-center text-3xl'></div>
                                            </div>
                                            <div className='flex gap-4 py-3 md:flex-row flex-col'>
                                                <div>
                                                    <h1 className='text-lg font-bold'>Expiry date</h1>
                                                    <p className='text-[#5E5E5E]'>Enter the expiration date</p>
                                                </div>
                                                <div className='flex justify-between gap-3'>
                                                    <input
                                                        className='bg-white border-1 rounded-md w-[120px] px-4'
                                                        type='number'
                                                        placeholder='MM'
                                                        value={expiryMonth}
                                                        onChange={(e) => setExpiryMonth(e.target.value)}
                                                    />
                                                    <span className='flex items-center justify-center font-extrabold text-2xl'>/</span>
                                                    <input
                                                        className='bg-white border-1 rounded-md w-[120px] px-2'
                                                        type='number'
                                                        placeholder='YY'
                                                        value={expiryYear}
                                                        onChange={(e) => setExpiryYear(e.target.value)}
                                                    />
                                                    <span>
                                                        <h1 className='text-lg font-bold'>CVV2</h1>
                                                        <p className='text-[#5E5E5E]'>Security code</p>
                                                    </span>
                                                    <input
                                                        className='bg-white border-1 rounded-md w-[120px] px-2'
                                                        type='number'
                                                        placeholder='xxx'
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex items-center text-3xl'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            type="submit"
                                            className="mt-2 px-12 py-2 bg-[#FC8404] text-white font-semibold rounded-md hover:bg-[#e1a05a]"
                                        >
                                            Pay
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className='flex justify-between  items-center mt-5'>
                            <div>
                                <h1 className='text-2xl font-semibold text-[#00A9E2] flex gap-2'>Item List</h1>
                            </div>
                            <div className='flex gap-2'>
                                <h1 className='text-[#00A9E2] font-bold'>Total Tender Bid Value :</h1>
                                {totalAmount.toFixed(2)}
                            </div>
                        </div>
                        <div className='max-sm:overflow-scroll' >
                            <form onSubmit={handleSubmitTenderValue}>
                                <table className='rounded-md bg-white mt-3 border-[4px] border-[#00A9E2]'>
                                    <thead>
                                        <tr className='bg-[#F4F7FF]'>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Sr. No.</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Category</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Item Name</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>UOM</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Quantity</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Unit Price</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Total Price</th>
                                            <th className='p-2 bg-[#00A9E2] text-white'>Previous Submitted Value</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(data?.tenderline) ? (
                                            data?.tenderline.map((item: any) => (
                                                <tr key={item.id}>
                                                    <td className='p-2'>{item?.line_no || 'N/A'}</td>
                                                    <td className='p-2'>{item?.category?.name || 'N/A'}</td>
                                                    <td className='p-2'>{item?.product_name || 'N/A'}</td>
                                                    <td className='p-2'>{item?.unit?.name || 'N/A'}</td>
                                                    <td className='p-2'>{item?.quantity || 'N/A'}</td>
                                                    <td className='p-2'>
                                                        <input
                                                            type="number"
                                                            className='border-2'
                                                            value={unitPrices[item.id] || ''}
                                                            onChange={(e) => handleUnitPriceChange(item.id, parseFloat(e.target.value))}
                                                        />
                                                    </td>
                                                    <td className='p-2'>
                                                        {item?.quantity ? (item?.quantity * (unitPrices[item.id] || 0)).toFixed(2) : '0.00'}
                                                    </td>
                                                    <td className='p-2 text-green-400 font-bold'>
                                                        {item?.tender_line_reply?.price || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className='p-2'>No data available</td>
                                            </tr>
                                        )}
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
                            </form>
                        </div>


                    </div>
                </div>
                <div className='basis-[30%] h-[900px]  p-1 bg-white rounded-md'>
                    <div className=''>
                        <h3 className="text-xl font-semibold mb-2 text-[#00A9E2] flex gap-2"> Tender Dates</h3>
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

                    {data?.bidbondfeeamount == null ? (
                        null
                    ) : (
                        <>
                            <div onClick={() => PerformenceBackGuranteeRoute(data.id, data?.company_id, data?.tender_send?.vendor_id)} className='bg-[#00A9E2] text-white cursor-pointer flex gap-2 mt-4 items-center   p-3 font-bold text-xl rounded-md'>
                                <PerformenceBackGuranteeIcon />
                                Performance Bank Guarantee</div>

                            <PerfectScrollbar className='h-[1000px]  p-2 '>
                                <h1 className='font-bold text-[#00A9E2] flex gap-2 text-lg py-2'><BankIcon />PBG Details </h1>
                                {
                                    data?.p_b_g?.length > 0 ? (
                                        data?.p_b_g?.map((item: any) => (
                                            <div className="cursor-pointer mt-2 border-2 rounded-md bg-white relative hover:shadow-sm" key={item.id}>
                                                <div className='bg-[#00A9E2] p-3 flex justify-between' style={{ borderRadius: "5px 5px 0px 0px" }}>
                                                    <div className='flex flex-row gap-1'>
                                                        <PbgdocumentIcon />
                                                        <p className='text-white font-bold'>{item?.pbg_num || "N/A"}</p>
                                                    </div>
                                                    <div className='flex flex-row gap-2 text-white text-xl'>
                                                        <AiOutlineDelete onClick={() => deletePbg(item.id)} />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col justify-between gap-3 py-2 px-3'>
                                                    <div className='border-2 p-2'>
                                                        <p className='text-black font-bold flex gap-2'><OMRIcon />{item?.currency?.name || "N/A"}</p>
                                                    </div>
                                                    <div className='border-2 p-2'>
                                                        <p className='text-black font-bold flex gap-2'><BankIcon />{item?.bank_address || "N/A"}</p>
                                                    </div>
                                                    <div className='border-2 p-2'>
                                                        <p className='text-black font-bold flex gap-2'><IssuedateIcon />{item?.date_of_issue || "N/A"}</p>
                                                    </div>
                                                    <div className='border-2 p-2 flex gap-2 justify-between items-center'>
                                                        <p className='text-black font-bold flex gap-2'><DocumentIcon />Document</p>
                                                        <span
                                                            className='flex gap-2 text-[#00A9E2] text-md font-bold cursor-pointer'
                                                            onClick={() => handleViewImage(item?.pbg_photo)}
                                                        >
                                                            <FaEye className='text-xl' /> View
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='bg-red-100 rounded-md py-2'>
                                            <p className='text-red-500 font-bold text-center p-2 flex justify-center items-center gap-1'>No PBG Added <HiOutlineEmojiSad className='text-xl' /></p>
                                        </div>
                                    )
                                }


                            </PerfectScrollbar>
                        </>
                    )}
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
                </div>
            </div>
        </>
    )
}


export default Tenderdetails;



import React, { useEffect, useState } from 'react';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb";
import axios from 'axios';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Swal from 'sweetalert2';
import { API_BASE_URL, QUATATION_DELETE_API_URL, QUATATION_SAVE_API_URL, QUATATION_SUBMIT_API_URL, QUATATION_UPDATE_STATUS_VIEW_API_URL, QUATATION_VIEW_API_URL } from '@/api.config';
import { getToken } from '@/localStorageUtil';
import Loader from '@/components/front/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from 'react-icons/md';
import { fetchModeofDeliveryList } from '../../../Reducer/ModeofdeliverySlice';
import { fetchTermsofDeliveryList } from '../../../Reducer/termsofDeliverySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

type Item = {
    id: string;
    line_no: string;
    item_no: string;
    category: {
        name: string;
    };
    product_name: string;
    delivery_date: string;
    quantity: number;
    unit: {
        name: string;
    };
    unit_price: number;
    total_amount: number;
    comment: string;
    yourcomment: string;
    quotation_line_id: any;
    quotation_send_line: any
};

function QuetationViews() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchTermsofDeliveryList());
        dispatch(fetchModeofDeliveryList());

    }, [dispatch]);

    const termsofdelivery = useSelector((state: RootState) => state.termsofDelivery.list);
    const Modeofdelivery = useSelector((state: RootState) => state.Modeofdelivery.list);
    console.log("termsofdelivery-----", termsofdelivery)
    console.log("Modeofdelivery-----", Modeofdelivery)


    const token = getToken();
    const [showLoader, setShowLoader] = useState(false);
    const [data, setData] = useState<any>(null);
    console.log("---->", data)
    const [quotationline, setQuotationLine] = useState<Item[]>([]);
    const [editData, setEditData] = useState<Item[]>([]);
    const [deliveryDate, setDeliveryDate] = useState<string>("");
    const [modeOfDelivery, setModeOfDelivery] = useState<string>("");
    const [termsOfDelivery, setTermsOfDelivery] = useState<string>("");

    const id = sessionStorage.getItem('akdhadhadhakdhadfafa!#@#kshfdskfk!@#!@#');

    const fetchQuotationDetail = async (id: string) => {
        setShowLoader(true);
        try {
            const response = await fetch(`${API_BASE_URL}${QUATATION_VIEW_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ quotation_id: id })
            });
            const result = await response.json();
            if (response.ok) {
                setData(result?.data || []);
                setDeliveryDate(result?.data?.delivery_date || "");
                setModeOfDelivery(result?.data?.mode_of_delivery?.name || "");
                setTermsOfDelivery(result?.data?.termsofdelivery?.name || "");
                setQuotationLine(result?.data?.quotation_send_line || []);
                setEditData(result?.data?.quotation_send_line || []);
                setShowLoader(false);
            } else {
                toast.error(result?.message?.error);
                setShowLoader(false);
            }
        } catch (error) {
            toast.error('Failed to fetch data');
            setShowLoader(false);
        }
    };
    useEffect(() => {
        if (id) {
            fetchQuotationDetail(id as string);
        }
    }, [id]);

    useEffect(() => {
        if (data && data.quotation_send_line) {
            setEditData(data.quotation_send_line);
        }
    }, [data]);


    const handleFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        const { value } = e.target;
        switch (field) {
            case 'delivery_date':
                setDeliveryDate(value);
                updateListWithNewDeliveryDate(value);
                break;
            case 'mode_of_delivery':
                setModeOfDelivery(value);
                break;
            case 'terms_of_delivery':
                setTermsOfDelivery(value);
                break;
        }
        if (field === 'terms_of_delivery') {
            setTermsOfDelivery(value);
        } else if (field === 'mode_of_delivery') {
            setModeOfDelivery(value);
        } else if (field === 'delivery_date') {
            setDeliveryDate(value);
        }
    };


    const updateListWithNewDeliveryDate = (newDate: string) => {
        const updatedList = editData.map(item => ({
            ...item,
            delivery_date: newDate
        }));
        setEditData(updatedList);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index: number,
        field: string
    ) => {
        const value = 'value' in e.target ? e.target.value : '';
        const updatedEditData = [...editData];
        if (field.startsWith('category.name')) {
            updatedEditData[index].category = {
                ...updatedEditData[index].category,
                name: value,
            };
        } else if (field.startsWith('unit.name')) {
            updatedEditData[index].unit = {
                ...updatedEditData[index].unit,
                name: value,
            };
        } else {
            (updatedEditData[index] as any)[field] = value;
        }
        setEditData(updatedEditData);
    };



    const handleSave = async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}${QUATATION_SAVE_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quotation_id: id,
                    delivery_date: deliveryDate,
                    modeofdelivery_id: modeOfDelivery,
                    termsofdelivery_id: termsOfDelivery,
                    data: editData,
                })
            });
            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result?.message?.success || 'Changes saved successfully',
                    customClass: 'sweet-alerts',
                });
                setQuotationLine(editData);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: result?.message?.error || 'Failed to save changes',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save changes',
                customClass: 'sweet-alerts',
            });
        }
    };

    const handleDelete = async (id: string, quotation_line_id: any) => {
        setShowLoader(true)
        try {
            const response = await fetch(`${API_BASE_URL}${QUATATION_DELETE_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quotation_id: id,
                    quotation_sendline_id: quotation_line_id
                })
            });
            const result = await response.json();
            if (response.ok) {
                setShowLoader(false)
                setQuotationLine(quotationline.filter(item => item.id !== id));

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result?.message?.success || 'PBG deleted successfully',
                    customClass: 'sweet-alerts',
                });
                fetchQuotationDetail(id);
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


    const showAlert = async (id: string, quotation_line_id: string) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Do you really want to delete this item?",
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            padding: '2em',
            customClass: 'sweet-alerts',
        });

        if (result.isConfirmed) {
            handleDelete(id, quotation_line_id);
        }
    };
    const handleAcceptQuotation = async (id: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}${QUATATION_UPDATE_STATUS_VIEW_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quotation_id: id,
                    status: "Accepted"
                })
            });
            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result?.message?.success || 'Quotation Aceepted successfully',
                    customClass: 'sweet-alerts',
                });
                fetchQuotationDetail(id);
            } else {
                setShowLoader(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: result?.message?.error || 'Failed To Add Quotation  ',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            setShowLoader(false)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something Went Wrong, Please Try After SomeTime',
                customClass: 'sweet-alerts',
            });
        }

    }
    const handleRejectQuotation = async (id: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}${QUATATION_UPDATE_STATUS_VIEW_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quotation_id: id,
                    status: "Rejected"
                })
            });
            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result?.message?.success || 'Quotation Rejected successfully',
                    customClass: 'sweet-alerts',
                });
                fetchQuotationDetail(id);
            } else {
                setShowLoader(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: result?.message?.error || 'Failed To Rejected Quotation  ',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            setShowLoader(false)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something Went Wrong, Please Try After SomeTime',
                customClass: 'sweet-alerts',
            });
        }
    }
    const handleSubmit = async (id: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}${QUATATION_SUBMIT_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quotation_id: id,
                })
            });
            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result?.message?.success || 'Quotation Submitted successfully',
                    customClass: 'sweet-alerts',
                });
                fetchQuotationDetail(id);
            } else {
                setShowLoader(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: result?.message?.error || 'Failed To Submit Quotation  ',
                    customClass: 'sweet-alerts',
                });
            }
        } catch (error) {
            setShowLoader(false)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something Went Wrong, Please Try After SomeTime',
                customClass: 'sweet-alerts',
            });
        }
    }



    return (
        <>
            {showLoader && <Loader />}
            <Dashboardbredcrumb />
            <div className="panel p-4 border-2  mt-3">
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Quotation Id <span className='text-red-600'>*</span></h1>
                        <p>{data?.quotation?.code || "N/A"}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Quotation case <span className='text-red-600'>*</span></h1>
                        <p>{data?.case_no || "N/A"}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Delivery Date <span className='text-red-600'>*</span></h1>
                        <div className="col-lg-6 col-md-6  ">
                        </div>
                        <input
                            type="date"
                            className='border-2 px-2 p-2 rounded-sm'
                            value={deliveryDate}
                            onChange={(e) => handleFieldChange(e, 'delivery_date')}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Mode of Delivery <span className='text-red-600'>*</span></h1>
                        <div className="form-group form-float">
                            <select
                                name="mode_of_delivery"
                                id="mode_of_delivery"
                                className={`form-input form-select cursor-pointer`}
                                value={modeOfDelivery}
                                onChange={(e) => handleFieldChange(e, 'mode_of_delivery')}
                            >
                                {Modeofdelivery.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Terms of Delivery <span className='text-red-600'>*</span></h1>
                        <div className="form-group form-float">
                            <select
                                name="terms_of_delivery"
                                id="terms_of_delivery"
                                className={`form-input form-select cursor-pointer`}
                                value={termsOfDelivery}
                                onChange={(e) => handleFieldChange(e, 'terms_of_delivery')}
                            >
                                {termsofdelivery.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between mt-5'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Expiration Date <span className='text-red-600'>*</span></h1>
                        <p>{data?.expiration_date || "N/A"}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Title <span className='text-red-600'>*</span></h1>
                        <p>{data?.title || "N/A"}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Purchase Order Number <span className='text-red-600'>*</span></h1>
                        <p>{data?.purchaseorder || "N/A"}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold'>Currency <span className='text-red-600'>*</span></h1>
                        <p>{data?.currency?.code || "N/A"}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">

                {data?.status === "Sent" ? (
                    <>
                        <button onClick={() => handleAcceptQuotation(data?.id)} className='px-8 py-2 border-1 hover:bg-green-500 hover:text-white rounded-md text-[#00A9E2] border-[#00A9E2] hover:border-none'>Accept</button>

                        <button onClick={() => handleRejectQuotation(data?.id)} className='px-8 py-2 border-1 hover:bg-red-500 hover:text-white rounded-md text-[#00A9E2] border-[#00A9E2] hover:border-none'>Reject</button>
                    </>
                ) : null}
                {data?.status === "Accepted" || data?.status === "Responded" || data?.status === "Save & Draft" ? (
                    <>
                        <button
                            onClick={() => handleSave(data?.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                    </>
                ) : null}
                {data?.status === "Responded" || data?.status === "Save & Draft" ? (
                    <>
                        <button
                            onClick={() => handleSave(data?.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => handleSubmit(data?.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>

                    </>
                ) : null}




            </div >
            <div className=" panel p-2 border-2 mt-4">
                <PerfectScrollbar>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Line No</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Item No</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Category</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Product Name</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Delivery Date</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Quantity</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Unit</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Unit Price</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Total Amount</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Comment</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Your Comment</th>
                                <th className="bg-[#00A9E2] py-2 text-left  font-bold text-white  ">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {editData?.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.line_no}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.item_no}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                        {item?.category?.name || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="text"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item?.product_name || ""}
                                            onChange={(e) => handleChange(e, index, 'product_name')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="date"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item?.delivery_date || ""}
                                            onChange={(e) => handleChange(e, index, 'delivery_date')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="number"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item?.quantity || ""}
                                            onChange={(e) => handleChange(e, index, 'quantity')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                        {item?.unit?.name || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="number"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item.unit_price || "N/A"}
                                            onChange={(e) => handleChange(e, index, 'unit_price')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="number"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item?.total_amount || ""}
                                            onChange={(e) => handleChange(e, index, 'total_amount')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="text"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item?.comment || ""}
                                            onChange={(e) => handleChange(e, index, 'comment')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="text"
                                            className='border-2 px-2 p-2 rounded-sm'
                                            value={item?.yourcomment || ""}
                                            onChange={(e) => handleChange(e, index, 'yourcomment')}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                                        <MdDelete onClick={() => showAlert(data?.id, item.id)} className='text-red-500 text-2xl cursor-pointer' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </PerfectScrollbar>
            </div>
            <ToastContainer />
        </>
    );
}

export default QuetationViews;

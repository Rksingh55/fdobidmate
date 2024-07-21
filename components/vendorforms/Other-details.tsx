import { API_BASE_URL, OTHERDETAILS_API_URL } from '@/api.config';
import { getToken } from '@/localStorageUtil';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircle } from 'react-icons/io';
import { MdAddBox } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import SuccessPopup from '../front/SuccessPopup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OtherDetails() {
    const router = useRouter()
    const { t, i18n } = useTranslation();
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [vendorlist, setvendorlist] = useState<any>();

    const [financialInformation, setFinancialInformation] = useState([
        { company_name: '', contact_person: '', contact_no: '', client: '' },
    ]);
    const [referenceInformation, setReferenceInformation] = useState([
        { contactperson: '', relation: '', designation: '', contactno: '' },
    ]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchvendordata());
    }, [dispatch]);
    const [user, setUser] = useState({
        company_name: "",
        contact_no: "",
        contact_person: "",
        client: "",
    });
    const [user2, setUser2] = useState({
        contactperson: "",
        relation: "",
        designation: "",
        contactno: "",
    });
    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);
    useEffect(() => {
        setvendorlist(vendorInformationList)
        console.log("vendorlist other-informationpage", vendorlist?.vendor_reference)
        if (vendorlist?.vendor_reference) {
            const firstReference = vendorlist.vendor_reference[0] || {};
            setUser({
                company_name: firstReference.company_name || "",
                contact_no: firstReference.contact_no || "",
                contact_person: firstReference.contact_person || "",
                client: firstReference.client || "",

            });
        }
        if (vendorlist?.vendor_reference) {
            const firstReference2 = vendorlist.vendor_reference[1] || {};
            console.log("llll", firstReference2)
            setUser2({
                contactperson: firstReference2.contactperson || "",
                relation: firstReference2.relation || "",
                designation: firstReference2.designation || "",
                contactno: firstReference2.contactno || "",
            });
        }
    }, [vendorInformationList]);

    const handleAddRow = (setFunction: React.Dispatch<React.SetStateAction<any[]>>, defaultRow: any) => {
        setFunction(prev => [...prev, defaultRow]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, setFunction: React.Dispatch<React.SetStateAction<any[]>>, field: string) => {
        const { value } = e.target;
        setFunction(prev => {
            const newData = [...prev];
            newData[index][field] = value;
            return newData;
        });
    };


    const submitForm = async (e: any) => {
        const token = getToken();
        e.preventDefault();
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');
        const payload = {
            ...user,
            financial_information: financialInformation,
            reference_information: referenceInformation,
            vendor_profile_id: vendor_profile_id,
        };
        try {
            const response = await fetch(`${API_BASE_URL}${OTHERDETAILS_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),

            });
            if (response.ok) {
                const responseData = await response.json();
                const venderregitserd = "success";
                localStorage.setItem("vendorRegistersuccess", venderregitserd);
                setMessage(responseData.message.success);
                setShowPopup(true);
                setTimeout(() => {
                    window.dispatchEvent(new Event('storage'));
                    router.push("/dashboard/tender")
                }, 2000);

            } else {
                const errorData = await response.json();
                toast.error(errorData.message.error)

            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }


    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <ToastContainer />
            <SuccessPopup
                message={message}
                show={showPopup}
                onClose={handleClosePopup}
            />
            <form className="space-y-3 dark:text-white" onSubmit={submitForm}>
                {/* Financial Information Section */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="title mb-0">{t('financial-information')}</div>
                            <MdAddBox className='text-2xl text-green-600 cursor-pointer' onClick={() => handleAddRow(setFinancialInformation, { company_name: '', contact_person: '', contact_no: '', client: '' })} />

                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="table-responsive">
                                <table className="table   table-bordered">
                                    <thead>
                                        <tr>
                                            <th>{t('sr-no')}</th>
                                            <th>{t('company-name')}</th>
                                            <th>{t('contact-name')}</th>
                                            <th>{t('contact-no')}</th>
                                            <th>{t('client-since')}</th>
                                            <th>{t('action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {financialInformation.map((row, index) => (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className=''><input className='bg-blue-50 cursor-text py-2 w-full px-3 border' type="text" value={row.company_name} onChange={(e) => handleInputChange(e, index, setFinancialInformation, 'company_name')} /></td>
                                                <td><input type="text" className='bg-blue-50 cursor-text py-2 w-full px-3 border' value={row.contact_person} onChange={(e) => handleInputChange(e, index, setFinancialInformation, 'contact_person')} /></td>
                                                <td><input type="text" className='bg-blue-50 cursor-text py-2 w-full px-3 border' value={row.contact_no} onChange={(e) => handleInputChange(e, index, setFinancialInformation, 'contact_no')} /></td>
                                                <td><input type="text" className='bg-blue-50 cursor-text py-2 w-full px-3 border' value={row.client} onChange={(e) => handleInputChange(e, index, setFinancialInformation, 'client')} /></td>
                                                {financialInformation && (
                                                    <td className='flex justify-center text-xl'><RiDeleteBin5Fill className='text-red-600 cursor-pointer' onClick={() => setFinancialInformation(prev => prev.filter((_, i) => i !== index))} /></td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reference Information Section */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <div className="title mb-0">Declaration of Conflict of Interest</div>
                                <p className="mb-0">Insert details of relatives/family members working with Sheraa or any friend you known at Sheraa, outside of the client-supplier relationship. (Relevant for Owners, Sponsors, Senior Management, Contact Persons and Authorized Signatories of the Supplier)</p>
                            </div>
                            <MdAddBox className='text-4xl text-green-600 cursor-pointer' onClick={() => handleAddRow(setReferenceInformation, { contactperson: '', relation: '', designation: '', contactno: '' })} />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>{t('sr-no')}</th>
                                            <th>Contact name</th>
                                            <th>Relation</th>
                                            <th>Designation</th>
                                            <th>Contact number</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {referenceInformation.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><input className='bg-blue-50 cursor-text py-2 w-full px-3 border' type="text" value={row.contactperson} onChange={(e) => handleInputChange(e, index, setReferenceInformation, 'contactperson')} /></td>
                                                <td><input className='bg-blue-50 cursor-text py-2 w-full px-3 border' type="text" value={row.relation} onChange={(e) => handleInputChange(e, index, setReferenceInformation, 'relation')} /></td>
                                                <td><input className='bg-blue-50 cursor-text py-2 w-full px-3 border' type="text" value={row.designation} onChange={(e) => handleInputChange(e, index, setReferenceInformation, 'designation')} /></td>
                                                <td><input className='bg-blue-50 cursor-text py-2 w-full px-3 border' type="text" value={row.contactno} onChange={(e) => handleInputChange(e, index, setReferenceInformation, 'contactno')} /></td>
                                                {referenceInformation && (
                                                    <td className='flex justify-center text-xl'><RiDeleteBin5Fill className='text-red-600 cursor-pointer' onClick={() => setReferenceInformation(prev => prev.filter((_, i) => i !== index))} /></td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-start mt-10'>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                        {t('submit')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OtherDetails;

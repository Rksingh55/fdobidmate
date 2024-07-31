import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { fetchCurrencyList } from '../../Reducer/currencySlice';
import { fetchCountryList } from '../../Reducer/countrySlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { getToken } from '@/localStorageUtil';
import { fetchVendorTpeList } from '../../Reducer/vendorTypeSlice';
import SuccessPopup from '../front/SuccessPopup';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import { API_BASE_URL, GENERAL_INFORMATION_FORM_API_URL } from '@/api.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSkeltonloader from "../cards/FormSkeletonloader"
import Swal from 'sweetalert2';

interface User {
    suppliertype_id: string;
    vendor_request_id: string;
    vendor_type: string;
    organization_name: string;
    name: string;
    phone_no: string;
    email_id: string;
    alternative_contact?: string;
    alternative_email?: string;
    nationalityid?: string;
    profile_img: string | null;
    primary_address: string;
    billing_address: string;
    bycheckbox: boolean;
    currency_id: string;
    business_activity: string;
    amy_countries_id: string;
}

const GeneralInformation: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [vendorlist, setvendorlist] = useState<any>();
    const [message, setMessage] = useState('');
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCurrencyList());
        dispatch(fetchCountryList());
        dispatch(fetchVendorTpeList());
        dispatch(fetchvendordata());
    }, [dispatch]);

    const currencyList = useSelector((state: RootState) => state.currency.list);
    const countryList = useSelector((state: RootState) => state.country.list);
    const vendorType = useSelector((state: RootState) => state.vendortype.list);
    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);
    const status = useSelector((state: RootState) => state.vendordata.status);


    useEffect(() => {
        setvendorlist(vendorInformationList)
        if (vendorlist) {
            setUser({
                suppliertype_id: vendorlist.suppliertype_id || "",
                vendor_request_id: vendorlist.vendor_request_id || "",
                vendor_type: vendorlist.vendor_type || "",
                organization_name: vendorlist.organization_name || "",
                name: vendorlist.name || "",
                phone_no: vendorlist.phone_no || "",
                email_id: vendorlist.email || "",
                alternative_email: vendorlist.alternative_email || "",
                primary_address: vendorlist.primary_address || "",
                billing_address: vendorlist.billing_address || "",
                bycheckbox: vendorlist.bycheckbox || false,
                currency_id: vendorlist.currency_id || "",
                business_activity: vendorlist.business_activity || "",
                nationalityid: vendorlist.amy_countries_id || "",
                amy_countries_id: vendorlist.amy_countries_id || "",
                profile_img: vendorlist.profile_img || ""
            });
        }
    }, [vendorInformationList]);

    const [user, setUser] = useState<User>({
        suppliertype_id: " ",
        vendor_request_id: " ",
        vendor_type: " ",
        organization_name: " ",
        name: " ",
        phone_no: " ",
        email_id: " ",
        alternative_contact: " ",
        alternative_email: " ",
        nationalityid: " ",
        profile_img: null,
        primary_address: " ",
        billing_address: " ",
        bycheckbox: false,
        currency_id: " ",
        business_activity: " ",
        amy_countries_id: "",
    }
    );



    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!user.vendor_type) {
            newErrors.vendor_type = t('field-required');
        }
        if (!user.suppliertype_id) {
            newErrors.suppliertype_id = t('field-required');
        }
        if (!user.primary_address) {
            newErrors.primary_address = t('field-required');
        }
        if (!user.currency_id) {
            newErrors.currency_id = t('field-required');
        }
        if (!user.organization_name) {
            newErrors.organization_name = t('field-required');
        }
        if (!user.name) {
            newErrors.name = t('field-required');
        }
        if (!user.phone_no) {
            newErrors.phone_no = t('field-required');
        } else if (!/^\d{10,15}$/.test(user.phone_no)) {
            newErrors.contact = t('valid-contact');
        }
        if (user.alternative_contact && !/^\d{8,10}$/.test(user.alternative_contact)) {
            newErrors.alternative_contact = t('valid-contact');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            setUser({ ...user, profile_img: base64 });
        } else {
            setUser({ ...user, profile_img: null });
        }
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();
        const token = getToken();
        try {
            const response = await fetch(`${API_BASE_URL}${GENERAL_INFORMATION_FORM_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("vendorId", responseData.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: responseData?.message?.success || 'General data submitted successful!',
                    customClass: 'sweet-alerts',
                });
            } else {
                const errorData = await response.json();
                if (errorData && errorData.errors) {
                    Object.keys(errorData.errors).forEach(field => {
                        const errorMessage = errorData.errors[field][0];
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: errorMessage || 'An error occurred. Please try again.',
                            padding: '2em',
                            customClass: 'sweet-alerts',
                        });
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to submit form. Please try again later.',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }

    };

    return (
        <div>
            <ToastContainer />
            <SuccessPopup
                message={message}
                show={showPopup}
                onClose={handleClosePopup}
            />
            <form className=" dark:text-white" onSubmit={handleSubmit} encType="multipart/form-data">
                {status === 'loading' && (
                    <FormSkeltonloader />
                )}
                {status === 'succeeded' && (
                    <>
                        <div className='row'>
                            {/* Vendor Request ID */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="vendor_requestid" className="mb-0">{t('vendor-request-id')}</label>
                                    <input
                                        type="text"
                                        id="vendor_request_id"
                                        className={`form-input bg-gray-100  placeholder:text-white-dark ${errors.vendor_request_id ? 'border-red-500' : ''}`}
                                        maxLength={10}
                                        value={user.vendor_request_id}
                                        readOnly
                                        onChange={(e) => setUser({ ...user, vendor_request_id: e.target.value })}
                                    />
                                    {errors?.vendor_request_id && (
                                        <p className="text-red-500 text-sm">{errors.vendor_request_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Vendor Type */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="vendor_type" className="mb-0">{t('vendor-type')} <span className="text-red-700 relative">*</span></label>
                                    <select
                                        id="vendor_type"
                                        className={`form-input ${errors.vendor_type ? 'border-red-500' : ''}`}
                                        onChange={(e) => setUser({ ...user, vendor_type: e.target.value })}
                                        value={user.vendor_type}
                                    >
                                        <option value="" disabled>{t('choose-option')}</option>
                                        <option value="Person">Person</option>
                                        <option value="Organisation">Organisation</option>

                                    </select>
                                    {errors.vendor_type && (
                                        <p className="text-red-500 text-sm">{errors.vendor_type}</p>
                                    )}
                                </div>
                            </div>

                            {/* Company Name */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="company_name" className="mb-0">{t('company-name')} <span className="text-red-700 relative">*</span></label>
                                    <input
                                        type="text"
                                        id="company_name"
                                        className={`form-input  placeholder:text-white-dark ${errors.organization_name ? 'border-red-500' : ''}`}
                                        maxLength={50}
                                        value={user.organization_name}
                                        onChange={(e) => setUser({ ...user, organization_name: e.target.value })}
                                    />
                                    {errors.organization_name && (
                                        <p className="text-red-500 text-sm">{errors.organization_name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Person Name */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="contact_person" className="mb-0">{t('contact-person-name')}<span className="text-red-700 relative">*</span></label>
                                    <input
                                        type="text"
                                        id="contact_person"
                                        className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                                        maxLength={50}
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">{errors.name}</p>
                                    )}
                                </div>
                            </div>
                            {/* supplier id */}
                            <div className="col-lg-6 col-md-6 mb-2 ">
                                <div className="form-group form-float">
                                    <label htmlFor="" className="mb-0">
                                        {t('supplier-type')}
                                    </label>
                                    <select
                                        name="supplier_type_id"
                                        id="supplier_type_id"
                                        className={`form-input  placeholder:text-white-dark ${errors.suppliertype_id ? 'border-red-500' : ''}`}
                                        onChange={(e) => setUser({ ...user, suppliertype_id: e.target.value })}
                                        value={user.suppliertype_id}
                                    >
                                        {vendorType?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.suppliertype_id && (
                                        <p className="text-red-500 text-sm">{errors.suppliertype_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Number */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="contact" className="mb-0">{t('contact-no')}<span className="text-red-700 relative">*</span></label>
                                    <input
                                        type="text"
                                        id="contact"
                                        className={`form-input ${errors.phone_no ? 'border-red-500' : ''}`}
                                        maxLength={15}
                                        value={user.phone_no}
                                        onChange={(e) => setUser({ ...user, phone_no: e.target.value })}
                                    />
                                    {errors.phone_no && (
                                        <p className="text-red-500 text-sm">{errors.phone_no}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email ID */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="email_id" className="mb-0">{t('email-id')}<span className="text-red-700 relative">*</span></label>
                                    <input
                                        type="email"
                                        id="email_id"
                                        className={`form-input bg-gray-100`}
                                        value={user.email_id}
                                        readOnly
                                        onChange={(e) => setUser({ ...user, email_id: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Alternative Email ID */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="alternative_email" className="mb-0">{t('alternative-email-id')}</label>
                                    <input
                                        type="email"
                                        id="alternative_email"
                                        className="form-input"
                                        value={user.alternative_email}
                                        onChange={(e) => setUser({ ...user, alternative_email: e.target.value })}
                                    />
                                    {errors.alternative_email && (
                                        <p className="text-red-500 text-sm">{errors.alternative_email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Nationality */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="amy_countries_id" className="mb-0">{t('nationality')}</label>
                                    <select
                                        id="amy_countries_id"
                                        className="form-input form-select"
                                        onChange={(e) => setUser({ ...user, amy_countries_id: e.target.value })}
                                        value={user.amy_countries_id || ''}
                                    >

                                        {countryList?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}

                                    </select>
                                    {errors.amy_countries_id && (
                                        <p className="text-red-500 text-sm">{errors.amy_countries_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Upload Photo */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="upload_picture" className="mb-0">{t('upload-photo')}</label>
                                    <input
                                        type="file"
                                        id="upload_picture"
                                        className="form-input"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>



                            {/* Billing Address */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="billing_address" className="mb-0">{t('billing-address')}</label>
                                    <textarea
                                        id="billing_address"
                                        className="form-input"
                                        rows={3}
                                        value={user.billing_address}
                                        onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            {/* Primary Address */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="primary_address">{t('primary-address')}</label>
                                    <textarea
                                        id="primary_address"
                                        className={`form-input ${errors.primary_address ? 'border-red-500' : ''}`}
                                        rows={3}
                                        value={user.primary_address}
                                        onChange={(e) => setUser({ ...user, primary_address: e.target.value })}
                                    ></textarea>
                                    {errors.primary_address && (
                                        <p className="text-red-500 text-sm">{errors.primary_address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Business Activities */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="business_activity" className="mb-0">{t('business-activities-as-per-trade-license')}</label>
                                    <textarea
                                        id="business_activity"
                                        className="form-input"
                                        rows={3}
                                        value={user.business_activity}
                                        onChange={(e) => setUser({ ...user, business_activity: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Currency */}
                            <div className="col-lg-6 col-md-6 mb-2">
                                <div className="form-group form-float">
                                    <label htmlFor="currency" className="mb-0">{t('currency')} <span className="text-red-700 relative">*</span></label>
                                    <select
                                        id="currency"
                                        className={`form-input form-select ${errors.currency_id ? 'border-red-500' : ''}`}
                                        onChange={(e) => setUser({ ...user, currency_id: e.target.value })}
                                        value={user.currency_id}
                                    >

                                        {currencyList?.map((item: any) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.currency_id && (
                                        <p className="text-red-500 text-sm">{errors.currency_id}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                                {user.email_id ? 'Update' : 'submit'}
                            </button>
                        </div>
                    </>
                )}


            </form>
        </div>
    );
}


export default GeneralInformation;
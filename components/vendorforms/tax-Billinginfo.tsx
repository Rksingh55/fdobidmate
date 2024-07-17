import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { fetchModeofPaymentList } from '../../Reducer/modeofpaymentSlice';
import { fetchTermsofPaymentList } from '../../Reducer/termsofPaymentSlice';
import { fetchTermsofDeliveryList } from '../../Reducer/termsofDeliverySlice';
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '@/localStorageUtil';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import SuccessPopup from '../front/SuccessPopup';
import { API_BASE_URL } from '@/api.config';

function TaxBillinginfo() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [vendorlist, setvendorlist] = useState<any>();
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchTermsofDeliveryList());
        dispatch(fetchTermsofPaymentList());
        dispatch(fetchModeofPaymentList());
        dispatch(fetchvendordata());
    }, [dispatch]);

    const termsofdelivery = useSelector((state: RootState) => state.termsofDelivery.list);
    const modeofpayment = useSelector((state: RootState) => state.modeofpayment.list);
    const termsofpayment = useSelector((state: RootState) => state.termsofpayment.list);
    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);


    const [pagevalidate, setpagevalidate] = useState();
    interface User {
        tax_no: string;
        vat_no: string;
        licence_no: string;
        termsofpayment_id: string;
        modeofpayment_id: string;
        termsofdelivery_id: string;
        other_govt_document_no: string;
        salestaxgroup_id: string;
    }
    useEffect(() => {
        setvendorlist(vendorInformationList)
        console.log("vendorlist", vendorlist)
        if (vendorlist) {
            setUser({
                tax_no: vendorlist.tax_no || "",
                vat_no: vendorlist.vat_no || "",
                licence_no: vendorlist.licence_no || "",
                termsofpayment_id: vendorlist.termsofpayment_id || "",
                modeofpayment_id: vendorlist.modeofpayment_id || "",
                termsofdelivery_id: vendorlist.termsofdelivery_id || "",
                other_govt_document_no: vendorlist.other_govt_document_no || "",
                salestaxgroup_id: vendorlist.salestaxgroup_id || "",
            });
        }
    }, [vendorInformationList]);

    const [user, setUser] = useState<User>({
        tax_no: "",
        vat_no: "",
        licence_no: "",
        other_govt_document_no: "",
        termsofpayment_id: "",
        modeofpayment_id: "",
        termsofdelivery_id: "",
        salestaxgroup_id: "",
    });

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!user.tax_no) {
            newErrors.tax_no = t('field-required');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const TaxbillingapiUrl = "/api/vendor/tax_billing"
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = getToken();
        const isValid = validateForm();
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');;
        const payload = {
            ...user,
            vendor_profile_id: vendor_profile_id,
        };
        if (isValid) {
            try {
                const response = await fetch(`${API_BASE_URL}${TaxbillingapiUrl}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });


                if (response.ok) {
                    const responseData = await response.json();
                    console.log("response", responseData);
                    setMessage('Tax & Billing details data submitted');
                    setShowPopup(true);
                } else {
                    const errorData = await response.json();
                    console.error('API error:', errorData);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <div>
            <SuccessPopup
                message={message}
                show={showPopup}
                onClose={handleClosePopup}
            />
            <form className="space-y-3 dark:text-white" onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor="">{t('TAX-registration-number')}  <span className="text-red-700 relative">*</span></label>
                            <input
                                type="text"
                                className={`form-input ${errors.tax_no ? 'border-red-500' : ''
                                    }`}
                                onChange={(e) =>
                                    setUser({ ...user, tax_no: e.target.value })
                                }
                                name="TAXregistrationnumber"
                                id="TAXregistrationnumber"
                                value={user.tax_no}
                                maxLength={20}
                            />
                            {errors.tax_no && (
                                <p className="text-red-500 text-sm">{errors.tax_no}</p>
                            )}

                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor="">{t('VAT-registration-number')}</label>
                            <input type="text" className="form-control" onChange={(e) => setUser({ ...user, vat_no: e.target.value })} value={user.vat_no} name="VATregistrationnumber" maxLength={16} id="VATregistrationnumber" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor="">{t('license-number')}</label>
                            <input type="text" className="form-control" value={user.licence_no} onChange={(e) => setUser({ ...user, licence_no: e.target.value })} maxLength={16} name="licence_no" id="licence_no" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor="">{t('other-government-id')}</label>
                            <input type="text" className="form-control" value={user.other_govt_document_no} onChange={(e) => setUser({ ...user, other_govt_document_no: e.target.value })} maxLength={16} name="other_govt_document_no" id="other_govt_document_no" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h5 className="col-xl-12 col-md-12 col-xl-12 p-2"> <b>{t('billing-information')}</b></h5>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor="">{t('terms-of-payment')}</label>
                            <select name="terms_of_payment_id" id="terms_of_payment_id" onChange={(e) => setUser({ ...user, termsofpayment_id: e.target.value })} className="form-control"

                                value={user.termsofpayment_id}
                            >
                                {termsofpayment?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor=""> {t('method-of-payment')}</label>
                            <select name="method_of_payment_id" id="method_of_payment_id" onChange={(e) => setUser({ ...user, modeofpayment_id: e.target.value })} className="form-control"
                                value={user.modeofpayment_id}
                            >

                                {modeofpayment?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                        <div className="form-group form-float">
                            <label className="mb-1" htmlFor="">{t('delivery-terms')}</label>
                            <select name="delivery_terms_id" id="delivery_terms_id" onChange={(e) => setUser({ ...user, termsofdelivery_id: e.target.value })} className="form-control"
                                value={user.termsofdelivery_id}
                            >

                                {termsofdelivery?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
                <div className='flex justify-end mt-10'>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                        {t('submit')}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaxBillinginfo

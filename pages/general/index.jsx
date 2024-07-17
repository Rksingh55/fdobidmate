import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import BlankLayout from '@/components/Layouts/BlankLayout';
import axios from 'axios';
import { useSelector } from 'react-redux';
function GeneralInformation() {
    const { t } = useTranslation();
    const [user, setUser] = useState({
        vendor_requestid: "",
        vendor_type: "",
        compny_name: "",
        contact_person: "",
        contact: "",
        email_id: "",
        alternative_contact: "",
        alternative_email_id: "",
        nationalityid: "",
        uploadphoto: "",
        primary_address: "",
        billing_address: "",
        bycheckbox: false,
        currency: "",
        businessactivity: ""
    });
    const [errors, setErrors] = useState({});


    const Authorization = localStorage.getItem("token");
    const token = Authorization ? Authorization.replace(/['"]/g, '') : "";
    // console.log(token)


    const fetchCurrencylist = async () => {
        try {
            const response = await axios.get('https://fdo-bidmate.kefify.com/api/master/Currency-list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response?.data?.data;
            setcurrencylist(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchCountrylist = async () => {
        try {
            const response = await axios.get('https://fdo-bidmate.kefify.com/api/master/Country-list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response?.data?.data;
            setcountrylistlist(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchCurrencylist();
        fetchCountrylist();
    }, []);


    const validateForm = () => {
        const newErrors = {};
        if (!user.vendor_type) {
            newErrors.vendor_type = t('field-required');
        }
        if (!user.currency) {
            newErrors.currency = t('field-required');
        }
        if (!user.compny_name) {
            newErrors.compny_name = t('field-required');
        }
        if (!user.contact_person) {
            newErrors.contact_person = t('field-required');
        }
        if (!user.contact) {
            newErrors.contact = t('field-required');
        } else if (!/^\d{10,15}$/.test(user.contact)) {
            newErrors.contact = t('valid-contact');
        }
        if (!user.email_id) {
            newErrors.email_id = t('field-required');
        } else if (!/\S+@\S+\.\S+/.test(user.email_id)) {
            newErrors.email_id = t('valid-email');
        }
        if (user.alternative_contact && !/^\d{10,15}$/.test(user.alternative_contact)) {
            newErrors.alternative_contact = t('valid-contact');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            try {
                const response = await axios.post(
                    'https://fdo-bidmate.kefify.com/api/master/Country-list',
                    JSON.stringify(user),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const [currencylist, setcurrencylist] = useState();
    const [countrylist, setcountrylistlist] = useState();






    return (
        <div>
            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                <div className='row'>
                    {/* Vendor Request ID */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="vendor_requestid" className="mb-0">{t('vendor-request-id')}</label>
                            <input
                                type="text"
                                id="vendor_requestid"
                                className={`form-input ps-10 placeholder:text-white-dark ${errors.vendor_requestid ? 'border-red-500' : ''}`}
                                maxLength="50"
                                value={user.vendor_requestid}
                                readOnly
                            />
                            {errors.vendor_requestid && (
                                <p className="text-red-500 text-sm">{errors.vendor_requestid}</p>
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
                                <option value="" disabled selected>{t('choose-option')}</option>
                                <option value="test">Test</option>
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
                                className={`form-input ps-10 placeholder:text-white-dark ${errors.compny_name ? 'border-red-500' : ''}`}
                                maxLength="50"
                                value={user.compny_name}
                                onChange={(e) => setUser({ ...user, compny_name: e.target.value })}
                            />
                            {errors.compny_name && (
                                <p className="text-red-500 text-sm">{errors.compny_name}</p>
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
                                className={`form-input ${errors.contact_person ? 'border-red-500' : ''}`}
                                maxLength="50"
                                value={user.contact_person}
                                onChange={(e) => setUser({ ...user, contact_person: e.target.value })}
                            />
                            {errors.contact_person && (
                                <p className="text-red-500 text-sm">{errors.contact_person}</p>
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
                                className={`form-input ${errors.contact ? 'border-red-500' : ''}`}
                                maxLength="15"
                                value={user.contact}
                                onChange={(e) => setUser({ ...user, contact: e.target.value })}
                            />
                            {errors.contact && (
                                <p className="text-red-500 text-sm">{errors.contact}</p>
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
                                className={`form-input ${errors.email_id ? 'border-red-500' : ''}`}
                                value={user.email_id}
                                onChange={(e) => setUser({ ...user, email_id: e.target.value })}
                            />
                            {errors.email_id && (
                                <p className="text-red-500 text-sm">{errors.email_id}</p>
                            )}
                        </div>
                    </div>

                    {/* Alternative Contact Number */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="alternative_contact" className="mb-0">{t('alternative-no')}</label>
                            <input
                                type="text"
                                id="alternative_contact"
                                className={`form-input ${errors.alternative_contact ? 'border-red-500' : ''}`}
                                maxLength="15"
                                value={user.alternative_contact}
                                onChange={(e) => setUser({ ...user, alternative_contact: e.target.value })}
                            />
                            {errors.alternative_contact && (
                                <p className="text-red-500 text-sm">{errors.alternative_contact}</p>
                            )}
                        </div>
                    </div>

                    {/* Alternative Email ID */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="alternative_email_id" className="mb-0">{t('alternative-email-id')}</label>
                            <input
                                type="email"
                                id="alternative_email_id"
                                className="form-input"
                                value={user.alternative_email_id}
                                onChange={(e) => setUser({ ...user, alternative_email_id: e.target.value })}
                            />
                            {errors.alternative_contact && (
                                <p className="text-red-500 text-sm">{errors.alternative_email_id}</p>
                            )}
                        </div>
                    </div>

                    {/* Nationality */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="nationality_id" className="mb-0">{t('nationality')}</label>
                            <select
                                id="nationality_id"
                                className="form-input form-select"
                                onChange={(e) => setUser({ ...user, nationalityid: e.target.value })}
                                value={user.nationalityid}
                            >
                                <option value="" disabled selected>{t('choose-option')}</option>
                                {countrylist?.map((item) => (
                                    <option key={item.id} value={item.code}>
                                        {item?.name}
                                    </option>
                                ))}

                            </select>
                            {errors.alternative_contact && (
                                <p className="text-red-500 text-sm">{errors.nationalityid}</p>
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
                                onChange={(e) => setUser({ ...user, uploadphoto: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    {/* Primary Address */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="primary_address" className="mb-0">{t('primary-address')}</label>
                            <textarea
                                id="primary_address"
                                className="form-input"
                                rows="3"
                                value={user.primary_address}
                                onChange={(e) => setUser({ ...user, primary_address: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="billing_address" className="mb-0">{t('billing-address')}</label>
                            <textarea
                                id="billing_address"
                                className="form-input"
                                rows="3"
                                value={user.billing_address}
                                onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    {/* Billing Address Checkbox */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group">
                            <label className="fancy-checkbox">
                                <input
                                    type="checkbox"
                                    id="myCheck"
                                    checked={user.bycheckbox}
                                    onChange={(e) => setUser({ ...user, bycheckbox: e.target.checked })}
                                    data-parsley-errors-container="#error-checkbox"
                                />
                                <span>{t('billing-address-same-as-primary-address')}</span>
                            </label>
                        </div>
                    </div>

                    {/* Currency */}
                    <div className="col-lg-6 col-md-6 mb-2">
                        <div className="form-group form-float">
                            <label htmlFor="currency" className="mb-0">{t('currency')} <span className="text-red-700 relative">*</span></label>
                            <select
                                id="currency"
                                className={`form-input ${errors.currency ? 'border-red-500' : ''}`}
                                onChange={(e) => setUser({ ...user, currency: e.target.value })}
                                value={user.currency}
                            >
                                <option value="" disabled>{t('choose-option')}</option>
                                {currencylist?.map((item) => (
                                    <option key={item.id} value={item.code}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>

                            {errors.currency && (
                                <p className="text-red-500 text-sm">{errors.currency}</p>
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
                                rows="3"
                                value={user.businessactivity}
                                onChange={(e) => setUser({ ...user, businessactivity: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {t('submit')}
                </button>
            </form>
        </div>
    );
}


GeneralInformation.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default GeneralInformation;

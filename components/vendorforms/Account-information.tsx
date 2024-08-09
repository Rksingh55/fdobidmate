import { ACCOUNTDETAIL_API_URL, API_BASE_URL } from '@/api.config';
import { getToken } from '@/localStorageUtil';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SuccessPopup from '../front/SuccessPopup';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdAddBox } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
interface BankAccount {
    bank_name: string;
    account_holder_name: string;
    account_no: string;
    swift_code: string;
    iban: string;
    bank_address: string;
}

interface BusinessReference {
    year: string;
    gross_income: string;
}

function AccountInformation() {
    const { t, i18n } = useTranslation();
    const [vendorlist, setvendorlist] = useState<any>();
    const [user, setUser] = useState({
        website: '',
    });
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchvendordata());
    }, [dispatch]);

    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);
    useEffect(() => {
        setvendorlist(vendorInformationList);
        if (vendorlist) {
            setUser({
                website: vendorlist.website || "",
            });
        }
    }, [vendorInformationList]);

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([{ bank_name: '', account_holder_name: '', account_no: '', swift_code: '', iban: '', bank_address: '' }]);
    const handleAddBankAccount = () => {
        setBankAccounts(prev => [...prev, { bank_name: '', account_holder_name: '', account_no: '', swift_code: '', iban: '', bank_address: '' }]);
    };

    const handleBankAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof BankAccount) => {
        const { value } = e.target;
        setBankAccounts(prev => {
            const newData = [...prev];
            newData[index][field] = value;
            return newData;
        });
    };
    const handleDeleteBankAccount = (index: number) => {
        setBankAccounts(prev => prev.filter((_, idx) => idx !== index));
    };
    const [businessReferences, setBusinessReferences] = useState<BusinessReference[]>([{ year: '', gross_income: '' }]);
    const [businessReferenceFiles, setBusinessReferenceFiles] = useState<string[]>([]);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleReferenceAttachmentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const base64Files = await Promise.all(Array.from(files).map(file => convertToBase64(file)));
            setBusinessReferenceFiles(base64Files);

        }
    };


    const handleAddReference = () => {
        setBusinessReferences(prev => [...prev, { year: '', gross_income: '' }]);
    };

    const handleReferenceInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof BusinessReference) => {
        const { value } = e.target;
        setBusinessReferences(prev => {
            const newData = [...prev];
            newData[index][field] = value;
            return newData;
        });
    };



    const handleDeleteReference = (index: number) => {
        setBusinessReferences(prev => prev.filter((_, idx) => idx !== index));
        setBusinessReferenceFiles(prev => prev.filter((_, idx) => idx !== index));
    };

    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [bussinessreferenceerror, setBusinessReferenceError] = useState<any>([])

    const validateBusinessReferences = (): boolean => {
        const isValid = businessReferences.length >= 3 &&
            businessReferences.every(ref => ref.year.trim() !== '' && ref.gross_income.trim() !== '');

        if (!isValid) {
            setBusinessReferenceError('Please fill at least 3 years of business references.');
        } else {
            setBusinessReferenceError(null);
        }

        return isValid;
    };

    const submitForm = async () => {
        console.log(businessReferenceFiles)
        const token = getToken();
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');
        if (!validateBusinessReferences()) {
            setBusinessReferenceError('Please fill at least 3 years of business references.');
            return;
        }
        const payload = {
            ...user,
            account_info: bankAccounts,
            business_reference: businessReferences,
            vendor_profile_id: vendor_profile_id,
            attachement_type: "Business Reference File",
            business_reference_file: businessReferenceFiles
        };

        try {
            const response = await fetch(`${API_BASE_URL}${ACCOUNTDETAIL_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("vendorId", responseData.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: responseData?.message?.success || 'Account Information submitted successfully!',
                    customClass: 'sweet-alerts',
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
            console.error('Error submitting form:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error submitting form',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
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

            <form className="space-y-3 dark:text-white">
                <div className='border-1 p-2 rounded-md flex flex-col gap-2'>
                    <div className="row">
                        <div className="col-lg-12 justify-end flex ">
                            <MdAddBox className='text-3xl text-green-600 cursor-pointer' onClick={handleAddBankAccount} />
                        </div>
                    </div>
                    {bankAccounts?.map((bankAccount, index) => (
                        <div key={index} className='border-1 p-2 rounded-md'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="add-form-detail">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="form-group form-float">
                                                    <label className="mb-1">{t('account-info')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bankAccount?.bank_name}
                                                        maxLength={50}
                                                        onChange={(e) => handleBankAccountInputChange(e, index, 'bank_name')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="form-group form-float">
                                                    <label className="mb-1">{t('account-holder-name')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bankAccount.account_holder_name}
                                                        maxLength={16}
                                                        onChange={(e) => handleBankAccountInputChange(e, index, 'account_holder_name')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="form-group form-float">
                                                    <label className="mb-1">{t('account-number')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bankAccount.account_no}
                                                        maxLength={20}
                                                        onChange={(e) => handleBankAccountInputChange(e, index, 'account_no')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="form-group form-float">
                                                    <label className="mb-1">{t('swift-code')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bankAccount.swift_code}
                                                        maxLength={8}
                                                        onChange={(e) => handleBankAccountInputChange(e, index, 'swift_code')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="form-group form-float">
                                                    <label className="mb-1">{t('IBAN')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bankAccount.iban}
                                                        maxLength={10}
                                                        onChange={(e) => handleBankAccountInputChange(e, index, 'iban')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-2">
                                                <div className="form-group form-float">
                                                    <label className="mb-1">{t('bank-branch-address')}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bankAccount.bank_address}
                                                        maxLength={50}
                                                        onChange={(e) => handleBankAccountInputChange(e, index, 'bank_address')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {bankAccounts.length > 1 && index > 0 && (
                                                <div className="flex justify-end py-2">
                                                    <RiDeleteBin5Fill
                                                        className="text-red-600 cursor-pointer text-3xl"
                                                        onClick={() => handleDeleteBankAccount(index)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

            </form>
            <br />
            <hr />

            {/* Business References Section */}
            <form className="space-y-3 dark:text-white">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between py-4">
                            {bussinessreferenceerror && <p className='text-red-600 font-bold'>Please fill at least 3 years of business references*.</p>}
                            <div className="row">
                                <div className="col-lg-4">
                                    <label className="mb-1" htmlFor="">{t('upload-attachment')}</label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                        multiple
                                        onChange={handleReferenceAttachmentChange}
                                    />
                                </div>
                            </div>
                            <MdAddBox className='text-3xl text-green-600 cursor-pointer' onClick={handleAddReference} />

                        </div>
                        <hr />
                    </div>
                </div>

                {businessReferences.map((reference, index) => (
                    <div key={index} className="row mb-3 flex  gap-2 border-1 p-2 rounded-md ">
                        <div className="col-lg-2">
                            <label htmlFor="">{t('year')}</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                className="form-control"
                                maxLength={4}
                                value={reference.year}
                                onChange={(e) => handleReferenceInputChange(e, index, 'year')}
                                name={`itemYear[${index}]`}
                                required
                            />
                        </div>
                        <div className="col-lg-2 mt-2">
                            <label htmlFor="">{t('gross-income')}</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                className="form-control"
                                maxLength={16}
                                value={reference.gross_income}
                                onChange={(e) => handleReferenceInputChange(e, index, 'gross_income')}
                                name={`itemIncome[${index}]`}
                                required
                            />
                        </div>
                        {businessReferences.length > 1 && index > 0 && (
                            <div className="flex justify-end py-2 ">
                                <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-3xl' onClick={() => handleDeleteReference(index)} />
                            </div>
                        )}
                    </div>
                ))}

                <div className="row ">
                    <div className="col-lg-12 flex justify-start">
                        <button type="button" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AccountInformation;

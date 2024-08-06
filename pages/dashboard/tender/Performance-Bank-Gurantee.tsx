import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCurrencyList } from '../../../Reducer/currencySlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { getToken } from '@/localStorageUtil';
import SuccessPopup from '../../../components/front/SuccessPopup';
import { API_BASE_URL, TENDER_ADDPBG_API_URL } from '@/api.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import { FiSave } from "react-icons/fi";
import { GrPowerReset } from 'react-icons/gr';
import Swal from 'sweetalert2';
import Loader from '@/components/front/loader';

interface User {
  pbg_num: string;
  date_of_issue: string;
  currency_id: string;
  amount: string;
  valid_upto: string;
  claim_date_upto: string;
  bank_of_issue?: string;
  bank_email?: string;
  bank_address?: string;
  pbg_photo: string | null;
  swift_code: string;
  ibn_code: string;
  bycheckbox: boolean;
  tender_id: any;
  company_id: any;
}

const GeneralInformation: React.FC = () => {
  const id = sessionStorage.getItem("id")
  const company_id = sessionStorage.getItem("company_id")
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCurrencyList());
  }, [dispatch]);
  const currencyList = useSelector((state: RootState) => state.currency.list);

  const [user, setUser] = useState<User>({
    pbg_num: " ",
    date_of_issue: " ",
    amount: " ",
    currency_id: " ",
    valid_upto: " ",
    claim_date_upto: " ",
    bank_of_issue: " ",
    bank_email: " ",
    bank_address: " ",
    pbg_photo: null,
    swift_code: " ",
    ibn_code: " ",
    bycheckbox: false,
    tender_id: id,
    company_id: company_id
  }
  );
  const resetUser = () => {
    setUser({
      pbg_num: "",
      date_of_issue: "",
      currency_id: "",
      amount: "",
      valid_upto: "",
      claim_date_upto: "",
      bank_of_issue: "",
      bank_email: "",
      bank_address: "",
      pbg_photo: null,
      swift_code: "",
      ibn_code: "",
      bycheckbox: false,
      tender_id: "",
      company_id: "",
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!user.currency_id) {
      newErrors.currency_id = t('field-required');
    }
    if (!user.date_of_issue) {
      newErrors.date_of_issue = t('field-required');
    }
    if (!user.pbg_num) {
      newErrors.pbg_num = t('field-required');
    }
    if (!user.bank_of_issue) {
      newErrors.bank_of_issue = t('field-required');
    }
    if (!user.swift_code) {
      newErrors.primary_address = t('field-required');
    }
    if (!user.currency_id) {
      newErrors.currency_id = t('field-required');
    }
    if (!user.amount) {
      newErrors.amount = t('field-required');
    }
    if (!user.pbg_photo) {
      newErrors.pbg_photo = t('field-required');
    }
    if (!user.valid_upto) {
      newErrors.valid_upto = t('field-required');
    }
    if (!user.ibn_code) {
      newErrors.ibn_code = t('field-required');
    }
    if (!user.claim_date_upto) {
      newErrors.claim_date_upto = t('field-required');
    } else if (!/^\d{10,15}$/.test(user.claim_date_upto)) {
      newErrors.contact = t('valid-contact');
    }
    if (user.bank_of_issue && !/^\d{8,10}$/.test(user.bank_of_issue)) {
      newErrors.bank_of_issue = t('bank_of_issue');
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
      setUser({ ...user, pbg_photo: base64 });
    } else {
      setUser({ ...user, pbg_photo: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    // if (!isValid) {
    //   return;
    // }
    setShowLoader(true)
    const Tender_vendorid = sessionStorage.getItem("Tender_vendorid")
    const payload = {
      ...user,
      vendor_id: Tender_vendorid,
    };
    const token = getToken();
    try {
      const response = await fetch(`${API_BASE_URL}${TENDER_ADDPBG_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const responseData = await response.json();
        setShowLoader(false)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: responseData?.message?.success || 'PBG added successfully',
          customClass: 'sweet-alerts',
        });

      } else {
        const errorData = await response.json();
        if (errorData && errorData.errors) {
          Object.keys(errorData.errors).forEach(field => {
            const errorMessage = errorData.errors[field][0];
            setShowLoader(false)
            toast.error(`${errorMessage}`);
          });

        }
      }
    } catch (error) {
      setShowLoader(false)
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
      {showLoader && (
        <Loader />
      )}
      <Dashboardbredcrumb />
      <ToastContainer />

      <SuccessPopup
        message={message}
        show={showPopup}
        onClose={handleClosePopup}
      />
      <form className=" dark:text-white bg-[#F3F5F8] p-3 rounded-md" onSubmit={handleSubmit} encType="multipart/form-data">
        <>
          <div className='row'>
            {/* PBG Number*/}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="pbg_num" className="mb-0">{t('PBG Number')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="text"
                  id="pbg_num"
                  placeholder='PBG Number'
                  className={`form-input  ${errors.pbg_num ? 'border-red-500' : ''}`}
                  value={user.pbg_num}
                  onChange={(e) => setUser({ ...user, pbg_num: e.target.value })}
                />
                {errors?.pbg_num && (
                  <p className="text-red-500 text-sm">{errors.pbg_num}</p>
                )}
              </div>
            </div>

            {/* Date of Issue*/}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="date_of_issue" className="mb-0">{t('Date of Issue')} <span className="text-red-700 relative">*</span></label>
                <input
                  type="date"
                  id="date_of_issue"
                  className={`form-input  ${errors.date_of_issue ? 'border-red-500' : ''}`}
                  value={user.date_of_issue}
                  placeholder='Select date'
                  onChange={(e) => setUser({ ...user, date_of_issue: e.target.value })}
                />
                {errors.date_of_issue && (
                  <p className="text-red-500 text-sm">{errors.date_of_issue}</p>
                )}
              </div>
            </div>

            {/* Currency */}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="currency" className="mb-0">{t('Currency')} <span className="text-red-700 relative">*</span></label>
                <select
                  id="currency"
                  className={`form-input  form-select ${errors.currency_id ? 'border-red-500' : ''}`}
                  onChange={(e) => setUser({ ...user, currency_id: e.target.value })}
                  value={user.currency_id}
                  placeholder='choose option'

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


            {/* PBG Amount*/}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="amount" className="mb-0">{t('PBG Amount')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="number"
                  id="amount"
                  placeholder='PBG Amount'
                  className={`form-input  ${errors.amount ? 'border-red-500' : ''}`}
                  value={user.amount}
                  onChange={(e) => setUser({ ...user, amount: e.target.value })}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">{errors.amount}</p>
                )}
              </div>
            </div>
            {/* PBG Valid Upto * */}
            <div className="col-lg-6 col-md-6 mb-3 ">
              <div className="form-group form-float">
                <label htmlFor="" className="mb-0">
                  {t('PBG Valid Upto')}<span className="text-red-700 relative">*</span>
                </label>
                <input
                  type="date"
                  id="valid_upto"
                  className={`form-input  ${errors.valid_upto ? 'border-red-500' : ''}`}
                  placeholder='Select date'
                  value={user.valid_upto}
                  onChange={(e) => setUser({ ...user, valid_upto: e.target.value })}
                />
                {errors?.valid_upto && (
                  <p className="text-red-500 text-sm">{errors.valid_upto}</p>
                )}
              </div>
            </div>

            {/* Claim Date * */}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="claim_date_upto" className="mb-0">{t('Claim Date')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="date"
                  id="claim_date_upto"
                  placeholder='Select date'
                  className={`form-input  ${errors.claim_date_upto ? 'border-red-500' : ''}`}
                  value={user.claim_date_upto}
                  onChange={(e) => setUser({ ...user, claim_date_upto: e.target.value })}
                />
                {errors.claim_date_upto && (
                  <p className="text-red-500 text-sm">{errors.claim_date_upto}</p>
                )}
              </div>
            </div>

            {/*Issuing Bank**/}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="bank_of_issue" className="mb-0">{t('Issuing Bank')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="text"
                  id="bank_of_issue"
                  placeholder='Issuing Bank'
                  className={`form-input  ${errors.bank_of_issue ? '' : ''}`}
                  value={user.bank_of_issue}
                  onChange={(e) => setUser({ ...user, bank_of_issue: e.target.value })}
                />
              </div>
            </div>

            {/* Email ID of Bank* */}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="bank_email" className="mb-0">{t('Email ID of Bank')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="email"
                  id="bank_email"
                  className={`form-input  ${errors.bank_email ? 'border-red-500' : ''}`}
                  placeholder='Email ID of Bank'
                  value={user.bank_email}
                  onChange={(e) => setUser({ ...user, bank_email: e.target.value })}
                />
                {errors.bank_email && (
                  <p className="text-red-500 text-sm">{errors.bank_email}</p>
                )}
              </div>
            </div>

            {/* Bank Address* */}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="bank_address" className="mb-0">{t('Bank Address')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="text"
                  id="bank_address"
                  className={`form-input  ${errors.bank_address ? 'border-red-500' : ''}`}
                  placeholder='Adress of Bank'
                  value={user.bank_address}
                  onChange={(e) => setUser({ ...user, bank_address: e.target.value })}
                />
                {errors.bank_address && (
                  <p className="text-red-500 text-sm">{errors.bank_address}</p>
                )}
              </div>
            </div>


            {/* Swift Code* */}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="swift_code" className="mb-0">{t('Swift Code')} <span className="text-red-700 relative">*</span></label>
                <input
                  type="text"
                  id="swift_code"
                  className={`form-input  ${errors.swift_code ? 'border-red-500' : ''}`}
                  value={user.swift_code}
                  placeholder='Enter Swift Code'

                  onChange={(e) => setUser({ ...user, swift_code: e.target.value })}
                />
                {errors.swift_code && (
                  <p className="text-red-500 text-sm">{errors.swift_code}</p>
                )}
              </div>
            </div>
            {/* IBAN**/}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="ibn_code" className="mb-0">{t('IBAN')} <span className="text-red-700 relative">*</span></label>
                <input
                  type="text"
                  id="ibn_code"
                  className={`form-input  ${errors.ibn_code ? 'border-red-500' : ''}`}
                  placeholder='Enter IBAN'

                  value={user.ibn_code}
                  onChange={(e) => setUser({ ...user, ibn_code: e.target.value })}
                />
                {errors.ibn_code && (
                  <p className="text-red-500 text-sm">{errors.ibn_code}</p>
                )}
              </div>
            </div>
            {/* Copy of PBG* */}
            <div className="col-lg-6 col-md-6 mb-3">
              <div className="form-group form-float">
                <label htmlFor="pbg_photo" className="mb-0">{t('Copy of PBG')}<span className="text-red-700 relative">*</span></label>
                <input
                  type="file"
                  id="pbg_photo"
                  className={`form-input  ${errors.pbg_photo ? 'border-red-500' : ''}`}
                  onChange={handleFileChange}
                />
                {errors.pbg_photo && (
                  <p className="text-red-500 text-sm">{errors.pbg_photo}</p>
                )}
              </div>
            </div>
          </div>
        </>
        <div className='flex gap-2 justify-end py-2'>
          <span onClick={resetUser} className="bg-[#00A9E2]  cursor-pointer text-white font-bold py-2 px-4 flex gap-1 items-center rounded-md">
            <GrPowerReset />
            Reset
          </span>
          <button type="submit" className="bg-[#00A9E2]  text-white font-bold py-2 px-4  flex gap-1 items-center rounded-md">
            <FiSave />
            Save
          </button>
        </div>
      </form>
    </div>
  );
}


export default GeneralInformation;
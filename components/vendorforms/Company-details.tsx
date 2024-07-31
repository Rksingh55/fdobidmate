import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { fetchVendorTpeList } from '../../Reducer/vendorTypeSlice';
import { fetchCategoryList } from '../../Reducer/categorySlice';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import SuccessPopup from '../front/SuccessPopup';
import { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '@/localStorageUtil';
import { API_BASE_URL, COMPANYDETAIL_API_URL } from '@/api.config';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


interface User {
    founding_year: string;
    website: string;
    cr_number: string;
    number_of_employee: string;
    type_of_business: any;
    category: [];
    quality_safety: string;

}

const Companydetails: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [vendorlist, setvendorlist] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchVendorTpeList());
        dispatch(fetchCategoryList());
        dispatch(fetchvendordata());
    }, [dispatch]);

    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);
    useEffect(() => {
        setvendorlist(vendorInformationList)
        console.log("vendor", vendorlist)
        if (vendorlist) {
            setUser({
                website: vendorlist.website || "",
                founding_year: vendorlist.founding_year || "",
                cr_number: vendorlist.cr_number || "",
                number_of_employee: vendorlist.number_of_employee || "",
                type_of_business: vendorlist.type_of_business || "",
                category: vendorlist.category || "",
                quality_safety: vendorlist.quality_safety || "",
            });
        }
    }, [vendorInformationList]);


    const [user, setUser] = useState<User>({
        founding_year: '',
        website: '',
        cr_number: '',
        number_of_employee: '',
        type_of_business: '',
        category: [],
        quality_safety: "",

    });
    const [errors, setErrors] = useState<Partial<User>>({});
    const [years, setYears] = useState<number[]>([]);
    useEffect(() => {
        const getYears = (): number[] => {
            const startYear: number = 1995;
            const currentYear: number = new Date().getFullYear();
            const yearsArray: number[] = [];
            for (let year = startYear; year <= currentYear; year++) {
                yearsArray.push(year);
            }
            return yearsArray;
        };

        setYears(getYears());
    }, []);
    const vendorType = useSelector((state: RootState) => state.vendortype.list);
    const category = useSelector((state: RootState) => state.Category.list);

    const options5 = category.map(item => ({
        value: item.id,
        label: item.name
    }));


    const handleCategoryChange = (selectedOptions: any) => {
        const selectedCategoryIds = selectedOptions.map((option: any) => option.value);
        setUser({
            ...user,
            category: selectedCategoryIds,
        });
    };


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!user.cr_number) {
            newErrors.crnumber = t('field-required');
        }
        if (!user.founding_year) {
            newErrors.founding_year = t('field-required');
        }
        if (!user.type_of_business) {
            newErrors.typeofbusiness = t('field-required');
        }
        if (!user.category) {
            newErrors.category = t('field-required');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = getToken();
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');;
        const payload = {
            ...user,
            vendor_profile_id: vendor_profile_id,
        };

        try {
            const response = await fetch(`${API_BASE_URL}${COMPANYDETAIL_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const responseData = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: responseData?.message?.success || 'Company data submitted successful!',
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
        <>
            <ToastContainer />
            <div>
                <SuccessPopup
                    message={message}
                    show={showPopup}
                    onClose={handleClosePopup}
                />
                <form className="" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-2">
                            <div className="form-group form-float">
                                <label htmlFor="" className="mb-0">
                                    {t('company-founding-year')}
                                </label>
                                <input
                                    type="hidden"
                                    id="existing_founding_year"
                                    name="existing_founding_year"
                                />
                                <select
                                    id="founding_year"
                                    name="founding_year"
                                    onChange={(e) =>
                                        setUser({ ...user, founding_year: e.target.value })
                                    }
                                    className={`form-input ${errors.founding_year ? 'border-red-500' : ''}`}
                                    value={user.founding_year}
                                >
                                    {years?.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                {errors?.founding_year && (
                                    <p className="text-red-500 text-sm">{errors?.founding_year}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                            <div className="form-group form-float">
                                <label htmlFor="" className="mb-0">
                                    {t('website')}
                                </label>
                                <input

                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, website: e.target.value })}
                                    name="website"
                                    id="website"
                                    value={user.website}
                                    maxLength={100}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                            <div className="form-group form-float">
                                <label htmlFor="" className="mb-0">
                                    {t('cr-number')}{' '}
                                    <span className="text-red-700 relative">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-input bg-gray-200 outline-none ${errors.cr_number ? 'border-red-500' : ''
                                        }`}
                                    onChange={(e) =>
                                        setUser({ ...user, cr_number: e.target.value })
                                    }
                                    name="cr_number"
                                    readOnly
                                    id="cr_number"
                                    value={user.cr_number}
                                    maxLength={20}
                                />
                                {errors?.cr_number && (
                                    <p className="text-red-500 text-sm">{errors?.cr_number}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                            <div className="form-group form-float">
                                <label htmlFor="" className="mb-0">
                                    {t('number-of-employee')}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setUser({ ...user, number_of_employee: e.target.value })
                                    }

                                    name="number_of_employee"
                                    id="number_of_employee"
                                    value={user.number_of_employee}
                                    maxLength={5}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="typebusiness">
                                    {t('type-of-business')}{' '}
                                    <span className="text-red-700 relative">*</span>
                                </label>
                                <select
                                    name="typeofbusiness"
                                    className={`form-input ${errors.type_of_business ? 'border-red-500' : ''
                                        }`}
                                    onChange={(e) =>
                                        setUser({ ...user, type_of_business: parseInt(e.target.value, 10) })
                                        // setUser({ ...user, type_of_business: e.target.value })
                                    }
                                    value={user.type_of_business}
                                    id="typebusiness"
                                >

                                    <option value={1}>
                                        {t('corporation-company')}
                                    </option>
                                    <option value={2}>{t('subsidiary')}</option>
                                    <option value={3}>{t('division')}</option>
                                    <option value={4}>{t('partnership')}</option>
                                </select>
                                {errors.type_of_business && (
                                    <p className="text-red-500 text-sm">{errors.type_of_business}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 mb-2">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="qualitysafetyval">
                                    {t('quality-and-safety-organization')}
                                    <span className="text-red-700 relative">*</span>
                                </label>
                                <select
                                    name="qualitysafety"
                                    id="qualitysafetyval"
                                    className={`form-input ${errors.quality_safety ? 'border-red-500' : ''}`}
                                    onChange={(e) =>
                                        setUser({ ...user, quality_safety: e.target.value })
                                    }
                                    value={user.quality_safety}
                                >
                                    <option disabled selected>
                                        {t('choose-option')}
                                    </option>
                                    <option value="yes">{t('yes')}</option>
                                    <option value="no">{t('no')}</option>
                                </select>
                                {errors?.quality_safety && (
                                    <p className="text-red-500 text-sm">{errors?.quality_safety}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 mb-2 ">
                            <label htmlFor="category" className="mb-0">
                                What kind of product
                            </label>
                            <Select
                                id="category"
                                name="category"
                                className={`form-input form-control pl-0  border-none form-select cursor-pointer ${errors.category ? 'border-red-500' : ''}`}
                                placeholder="Select an option"
                                options={options5}
                                isMulti={true}
                                isSearchable={false}
                                // value={user.category} 
                                onChange={handleCategoryChange}
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm">{errors.category}</p>
                            )}
                        </div>



                    </div>
                    <div className='flex justify-start mt-10'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                            {user.cr_number ? 'Update' : 'submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
};



export default Companydetails
// "use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const Complaintfrom = () => {


    // State for the selects
    const [governorate, setGovernorate] = useState([]);
    const [govSelect, setGovSelect] = useState('');
    const [wilayatSelectOptions, setWilayatSelectOptions] = useState([]);
    const [wilayatSelect, setWilayatSelect] = useState('');
    const [citySelectOptions, setCitySelectOptions] = useState([]);
    const [citySelect, setCitySelect] = useState('');
    const [issueSelect, setIssueSelect] = useState('');
    const [serviceItemsSelectOptions, setServiceItemsSelectOptions] = useState([]);
    const [serviceItemsSelect, setServiceItemsSelect] = useState('');


    // Options for the governorate select
    useEffect((): any => {
        fetch('https://www.urvaapi.kefify.com/public/api/auth/governorate', {
            method: 'POST'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "0") {
                    console.log(data.message);
                } else {
                    setGovernorate(data.governerate)
                }

            })
    }, []);

    // Function to get options for the wilayat select
    const getWilayatSelectOptions = (value: any) => {
        fetch('https://www.urvaapi.kefify.com/public/api/auth/wilayat', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'id': value }),
        })
            .then((res) => res.json())
            .then((data) => {
                setWilayatSelectOptions([]);
                if (data.status == "0") {
                    console.log(data.message);
                } else {
                    // console.log(data.wilayat);
                    setWilayatSelectOptions(data.wilayat);
                }
            })
    };
    // Function to get options for the city select
    const getCitySelectOptions = (value: any) => {
        fetch('https://www.urvaapi.kefify.com/public/api/auth/city', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'id': value }),
        })
            .then((res) => res.json())
            .then((data) => {
                setCitySelectOptions([]);
                //console.log(data);
                if (data.status == "0") {
                    console.log(data.message);
                } else {
                    // console.log(data.cities);
                    setCitySelectOptions(data.cities);
                }

            })
    };

    // Function to get options for the servvice items select
    const getServiceItemsSelectOptions = (value: any) => {
        fetch('https://www.urvaapi.kefify.com/public/api/auth/service_item', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'id': value }),
        })
            .then((res) => res.json())
            .then((data) => {
                setServiceItemsSelectOptions([]);
                if (data.status == "0") {
                    console.log(data.message);
                } else {
                    //console.log(data.Service_items);
                    setServiceItemsSelectOptions(data.Service_items);
                }
            })
    };



    // Fetching the wilayat opption after governorate selected
    // useEffect((): any => {
    //     //console.log('governorate selected');
    //     fetch('https://www.urvaapi.kefify.com/public/api/auth/wilayat', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ 'id': govSelect }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             //console.log('wilayat data');
    //             //console.log(data.wilayat);

    //             // setWilayatSelectOptions(data.wilayat);
    //         })
    // }, [govSelect]);


    // Function to handle the governorate select change
    const handleGovSelectChange = (event: any) => {
        console.clear();

        const selectedGov = event.target.value;
        setGovSelect(selectedGov);
        console.log(selectedGov);
        // Determine the options for the wilayat selection based on the first select's value
        const options = getWilayatSelectOptions(selectedGov);
    };
    // Function to handle the wilayat select change
    const handleWilayatSelectChange = (event: any) => {
        const selectedWil = event.target.value;
        setWilayatSelect(selectedWil);
        console.log(selectedWil);
        // Determine the options for the city selection based on the first select's value
        const options = getCitySelectOptions(selectedWil);


    };
    // Function to handle the City select change
    const handleCitySelectChange = (event: any) => {
        const selectedCity = event.target.value;
        setCitySelect(selectedCity);
        console.log(selectedCity);


    };
    // Function to handle the isuue select change
    const handleIssueSelectChange = (event: any) => {
        const selectedIssue = event.target.value;
        setIssueSelect(selectedIssue);
        console.log(selectedIssue);

        const options = getServiceItemsSelectOptions(selectedIssue);
    };
    // Function to handle the service item select change
    const handleServiceItemsSelectChange = (event: any) => {
        const selectedItem = event.target.value;
        setServiceItemsSelect(selectedItem);
        console.log(selectedItem);
    };

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact_no, setContact_no] = useState('')
    const [binNumber, setBinNumber] = useState('')
    const [caseTitle, setCaseTitle] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [files, setAttachment] = useState('')
    const [description, setDescription] = useState('')



    //set the value of each form item
    const handleChange = (e: any) => {
        if (e.target.name == "name") {
            setName(e.target.value);
        }
        else if (e.target.name == "email") {
            setEmail(e.target.value);
        }
        else if (e.target.name == "contact_no") {
            setContact_no(e.target.value);
        }
        else if (e.target.name == "bin_number") {
            setBinNumber(e.target.value);
        }
        else if (e.target.name == "case_title") {
            setCaseTitle(e.target.value);
        }
        else if (e.target.name == "latitude") {
            setLatitude(e.target.value);
        }
        else if (e.target.name == "longitude") {
            setLongitude(e.target.value);
        }
        else if (e.target.name == "attachment") {
            setAttachment(e.target.value);
        }
        else if (e.target.name == "description") {
            setDescription(e.target.value);
        }
        //console.log();
    };


    //send form data
    const sendData = async (e: any) => {
        e.preventDefault()
        const id = localStorage.getItem('id');



        const data = {
            'name': name,
            'email': email,
            'contact_no': contact_no,
            'governorate_id': govSelect,
            'wilayat_id': wilayatSelect,
            'city_id': citySelect,
            'case_type_id': issueSelect,
            'service_item_id': serviceItemsSelect,
            'case_title': caseTitle,
            binNumber,
            'latitude': latitude,
            'longitude': longitude,
            // files,
            description,
            'id': id
        };

        console.log(data);

        let token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch(`http://127.0.0.1:8000/api/auth/complaintCreate`,
            {
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),

            })
            .then((response) => response.json())
        console.log(response);

        console.log("sending data");
    };

    const { t, i18n } = useTranslation();
    return (
        <>
            <section className="mb-5">
                <div className="container">
                    {/* <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 p-0"> */}
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="compl-img">
                                <img src="assets/images/Notification.svg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="text-center">
                                <h4 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white"> {t('we-are-here-to-assist-you')}</h4>
                                <p className="mb-4">{t('please-complete-the-form-below-for-your-complaints')} </p>
                            </div>
                            <div className="comp-card">
                                <div className="card-body">
                                    <form
                                        onSubmit={sendData}
                                        className="custom-validation"
                                        // action="{{ route('complaint-store') }}"
                                        encType="multipart/form-data"
                                    >

                                        <div className="row">
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('names')} <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    required
                                                    value={name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('email')} <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    required
                                                    value={email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('contact-no')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    maxLength={10}
                                                    name="contact_no"
                                                    required
                                                    value={contact_no}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('governorate')}
                                                    <span className="text-danger">*</span>
                                                </label>

                                                <select className="form-control font-select" required name="governorate_id" id="governorate_id" value={govSelect} onChange={handleGovSelectChange}>
                                                    <option value="">Select an option</option>
                                                    {governorate.map((option: any) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('wilayat')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <select className="form-control font-select" required name="wilayat_id" id="wilayat_id" value={wilayatSelect} onChange={handleWilayatSelectChange}>
                                                    <option value="">Select an option</option>
                                                    {wilayatSelectOptions.map((option: any) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('city')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <select className="form-control font-select" required name="city_id" id="city_id" value={citySelect} onChange={handleCitySelectChange}>
                                                    <option value="">Select an option</option>
                                                    {citySelectOptions.map((option: any) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('issue-type')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className="form-control font-select"
                                                    id="case_type_id"
                                                    name="case_type_id"
                                                    required
                                                    value={issueSelect} onChange={handleIssueSelectChange}
                                                >
                                                    <option value="">Select an option</option>
                                                    <option value="1">
                                                        Request for Service
                                                    </option>
                                                    <option value="2">
                                                        Complaints
                                                    </option>

                                                </select>
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('service-item-list')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    name="service_item_id"
                                                    id="service_item_id"
                                                    className="form-control font-select"
                                                    required
                                                    value={serviceItemsSelect} onChange={handleServiceItemsSelectChange}
                                                >
                                                    <option value="">Select an option</option>
                                                    {serviceItemsSelectOptions.map((option: any) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('issue-title')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="case_title"
                                                    value={caseTitle}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('bin-no')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="bin_number"
                                                    value={binNumber}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('latitude')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="latitude"
                                                    id="latitude"
                                                    className="form-control"
                                                    value={latitude}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">

                                                    {t('longitude')}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="longitude"
                                                    id="longitude"
                                                    className="form-control"
                                                    value={longitude}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4  mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('case.attachment')}
                                                    <span className="text-danger" style={{ fontSize: 9 }}>
                                                        {t('file-guide')}
                                                    </span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    name="attachment"
                                                    multiple
                                                    value={files}
                                                    onChange={handleChange}
                                                    accept="image/png, image/jpeg"

                                                />
                                            </div>
                                            <div className="col-lg-12 col-md-12 mb-3">
                                                <label htmlFor="exampleFormControlInput1">
                                                    {t('description')}

                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    value={description}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="col-lg-12 col-md-12 mb-3 d-flex justify-content-between">
                                                <div className="col-lg-6 col-md-6">
                                                    <h6 data-bs-toggle="modal" data-bs-target="#firstmodal">

                                                        {t('click-for-google-maps')}

                                                    </h6>
                                                </div>
                                                <div className="col-lg-6 col-md-6 text-end">
                                                    <button type="submit" className="btn btn-gradient ">
                                                        {t('submit')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div>
                                </div>
                            </div> */}
                </div>
            </section>
        </>
    )
};
export default Complaintfrom;

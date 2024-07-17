import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
const submitForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Validation'));
    });
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });


const submitForm4 = Yup.object().shape({
    firstname: Yup.string().required('Please fill the first name'),
    lastname: Yup.string().required('Please fill the last name'),
    username: Yup.string().required('Please choose a userName'),
    city: Yup.string().required('Please provide a valid city'),
    state: Yup.string().required('Please provide a valid state'),
    zip: Yup.string().required('Please provide a valid zip'),
    agree: Yup.bool().oneOf([true], 'You must agree before submitting.'),
});
return (

                <div className="panel" id="tooltips">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Tooltips</h5>

                    </div>
                    <div className="mb-5">
                        <Formik
                            initialValues={{
                                firstname: 'Shaun',
                                lastname: 'Park',
                                username: '',
                                city: '',
                                state: '',
                                zip: '',
                                agree: false,
                            }}
                            validationSchema={submitForm4}
                            onSubmit={() => {}}
                        >
                            {({ errors, submitCount, touched }) => (
                                <Form className="space-y-5">
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                        <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="firstname">First Name </label>
                                            <Field name="firstname" type="text" id="firstname" placeholder="Enter First Name" className="form-input mb-2" />

                                            {submitCount ? (
                                                errors.firstname ? (
                                                    <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.firstname}</div>
                                                ) : (
                                                    <div className="inline-block rounded bg-[#1abc9c] py-1 px-2 text-white">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>

                                        <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="lastName">Last name </label>
                                            <Field name="lastname" type="text" id="lastname" placeholder="Enter Last Name" className="form-input mb-2" />

                                            {submitCount ? (
                                                errors.lastname ? (
                                                    <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.lastname}</div>
                                                ) : (
                                                    <div className="inline-block rounded bg-[#1abc9c] py-1 px-2 text-white">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>

                                        <div className={submitCount ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="username">Username</label>
                                            <div className="flex">
                                                <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    @
                                                </div>

                                                <Field name="username" type="text" id="username" placeholder="Enter Username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                            </div>
                                            <div className="mt-2">
                                                {submitCount ? (
                                                    errors.username ? (
                                                        <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.username}</div>
                                                    ) : (
                                                        <div className="inline-block rounded bg-[#1abc9c] py-1 px-2 text-white">Looks Good!</div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                                        <div className={`md:col-span-2 ${submitCount ? (errors.city ? 'has-error' : 'has-success') : ''}`}>
                                            <label htmlFor="customeCity">City</label>
                                            <Field name="city" type="text" id="city" placeholder="Enter City" className="form-input mb-2" />

                                            {submitCount ? (
                                                errors.city ? (
                                                    <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.city}</div>
                                                ) : (
                                                    <div className="inline-block rounded bg-[#1abc9c] py-1 px-2 text-white">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>

                                        <div className={submitCount ? (errors.state ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="customeState">State</label>
                                            <Field name="state" type="text" id="customeState" placeholder="Enter State" className="form-input mb-2" />
                                            {submitCount ? (
                                                errors.state ? (
                                                    <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.state}</div>
                                                ) : (
                                                    <div className="inline-block rounded bg-[#1abc9c] py-1 px-2 text-white">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>

                                        <div className={submitCount ? (errors.zip ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="customeZip">Zip</label>
                                            <Field name="zip" type="text" id="customeZip" placeholder="Enter Zip" className="form-input mb-2" />
                                            {submitCount ? (
                                                errors.zip ? (
                                                    <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.zip}</div>
                                                ) : (
                                                    <div className="inline-block rounded bg-[#1abc9c] py-1 px-2 text-white">Looks Good!</div>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>

                                    <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                                        <div className="flex">
                                            <Field name="agree" id="agree2" type="checkbox" className="form-checkbox" />
                                            <label htmlFor="agree2" className="font-semibold text-white-dark">
                                                Agree to terms and conditions
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            {submitCount ? errors.agree ? <div className="inline-block rounded bg-danger py-1 px-2 text-white">{errors.agree}</div> : '' : ''}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary !mt-6"
                                        onClick={() => {
                                            if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                                submitForm();
                                            }
                                        }}
                                    >
                                        Submit Form
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>

);
};

submitForm.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default submitForm;

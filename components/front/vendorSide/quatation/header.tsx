import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IconUser from '@/components/Icon/IconUser';
import { GrOrganization } from 'react-icons/gr';
import { MdPhone } from 'react-icons/md';
import { AiTwotoneHome, AiTwotoneMail } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { fetchQuestionList } from '../../../../Reducer/questionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';

function QuatationHeader() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [message, setmessege] = useState("")
    const [pagevalidate, setpagevalidate] = useState();
    const [user, setuser] = useState({
        vendor_requestid: "",
        vendor_type: "",
    });
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchQuestionList());

    }, [dispatch]);
    const question = useSelector((state: RootState) => state.question.list);

    const submitForm = () => {
        console.log(user)
    }
    return (
        <div>
            <form className="space-y-3 dark:text-white" >
            <div className="row">
                <div className="col-xl-12">

                             <div className="row">
                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="code">{t('quotation') } <span className="text-danger">*</span>  </label>
                                    <input readOnly={true} type="text" className="form-control" disabled required/>
                                </div>
								</div>

								<div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="code">{t('quotation-case') }<span className="text-danger">*</span>  </label>
                                    <input readOnly={true} type="text" className="form-control" disabled required
                                       maxLength={8} />
                                </div>
								</div>

                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="delivery_date">{t('delivery-date') }<span className="text-danger">*</span> </label>
                                    <input type="date" name="delivery_date" id="delivery_date" className="form-control" value="" required />
                                </div>
								</div>

							</div>
                            <div className="row">

                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="email">{t('mode-of-delivery') }<span
                                            className="text-danger">*</span> </label>
                                    <select name="modeofdelivery_id" className="form-control disabled" required>
                                        <option value="">{t('chooseoption') }</option>

                                    </select>
                                </div>
								</div>


                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="expiration_date">{t('expiration-date') }<span
                                            className="text-danger">*</span> </label>
                                    <input type="date" disabled className="form-control" value="" required />
                                </div>
								</div>

                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="project">{t('terms-Of-Delivery') }<span
                                            className="text-danger">*</span> </label>
                                    <select name="termsofdelivery_id" className="form-control disabled" required>
                                        <option value="">{t('chooseoption')}</option>

                                    </select>
                                </div>
								</div>

							</div>
							<div className="row">

                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="title">{t('title') }<span className="text-danger">*</span> </label>
                                    <input disabled type="text" className="form-control" value="" />
                                </div>
								</div>



                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="status">{t('po-no') }<span className="text-danger">*</span>
                                        </label>
                                    <input type="text" className="form-control" disabled value="" />
                                </div>
								</div>


                                <div className="col-sm-4">
								<div className="mb-3">
                                    <label htmlFor="email">{t('currency') }<span
                                            className="text-danger">*</span> </label>
                                    <input disabled type="text" className="form-control disabled" value="" />
                                </div>
								</div>



                            </div>


                </div>
                </div>
            </form>
        </div>
    )
}

export default QuatationHeader

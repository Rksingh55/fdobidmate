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

function QuatationLine() {
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
                <div className="col-xl-12">
                    <div className="iq-card-header d-flex flex-wrap justify-content-between">
                        <div className="iq-header-title">
                            <h5 className="card-title">{t('quotation-line')}
                            </h5>
                        </div>
                        <div className="text-end">
                            <div className='flex gap-2'>
                                <button type="button" className="btn btn-success btn-sm submit_butt" ><i className="mdi mdi-check-circle-outline"></i> {t('Accepted')} </button>
                                <button type="button" className="btn btn-danger btn-sm submit_butt"><i className="mdi mdi-check-circle-outline"></i> {t('Rejected')} </button>
                                <button type="button" className="btn btn-danger btn-sm submit_butt"><i className="mdi mdi-check-circle-outline"></i> {t('Cancelled')} </button>
                                <button type="button" className="btn btn-success btn-sm submit_butt"><i className="mdi mdi-check-circle-outline"></i> {t('submit')} </button>
                                <button type="submit" className="btn btn-secondary btn-sm"><i className="mdi mdi-content-save-alert-outline"></i> {t('save')} </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive table-card card-body">
                    <table className="table table-hover dt-responsive align-middle mb-0 nowrap">
                        <thead className="bg-light">
                            <tr>
                                <th>{t('line-no')} </th>
                                <th>{t('item-no')} </th>
                                <th>{t('category')}</th>
                                <th>{t('product-name')}</th>
                                <th>{t('delivery-date')}</th>
                                <th>{t('quantity')}</th>
                                <th>{t('unit')}</th>
                                <th>{t('unit-price')}</th>
                                <th>{t('total-price')}</th>
                                <th>{t('comment')}</th>
                                <th>{t('your-comment')}</th>
                            </tr>

                            <tr>
                                <td>S no .1</td>
                                <td> Item No 1 </td>
                                <td>Category</td>
                                <td> Product Name </td>
                                <td><input type="date" readOnly value="" name="delivery_dates[]" className="form-control disabled delivery_dates" /></td>
                                <td><input type="text" value="" name="quantity[]" className="form-control disabled" /></td>
                                <td> unit name </td>
                                <td><input type="text" value="" name="price[]" maxLength={10} className="form-control disabled" /></td>
                                <td><input type="text" value="" name="total[]" maxLength={10} className="form-control disabled" readOnly /></td>
                                <td><input type="text" value="" name="comment[]" className="form-control disabled" maxLength={30} readOnly /></td>
                                <td><input type="text" value="" name="yourcomment[]" className="form-control disabled" maxLength={30} /></td>
                            </tr>

                        </thead>
                    </table>

                </div>
            </form>
        </div>
    )
}

export default QuatationLine

import React from 'react'
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import IconUser from '@/components/Icon/IconUser';
import { GrOrganization } from 'react-icons/gr';
import { MdPhone } from 'react-icons/md';
import { AiTwotoneHome, AiTwotoneMail } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { Tab } from '@headlessui/react';

function PurchaseorderView() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [message, setmessege] = useState("")
    const [pagevalidate, setpagevalidate] = useState();
    const [user, setuser] = useState({
        vendor_requestid: "",
        vendor_type: "",
    });
    const submitForm = () => {
        console.log(user)
    }
    return (
        <div className="panel p-4 border-white-light dark:border-[#1b2e4b] mt-3">
            <form className="space-y-3 dark:text-white" >
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card-body  pt-2">
                            <h5 className="card-title"> PO-000002 : Request of laptop </h5>
                            <div className="col-lg-12 col-xl-12 col-md-12">
                                <div className="row">
                                    <div
                                        className="col-lg-4 col-xl-4 col-md-6 col-sm-12 d-flex flex-wrap justify-content-between border-right">
                                        <label htmlFor=""
                                            className="col-lg-6 mb-2 border-bottom pb-2 p-0">{t('vendor-name')}</label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">lalsingh </p>
                                        <label htmlFor=""
                                            className="col-lg-6 mb-2 border-bottom pb-2 p-0">{t('vendor-account')}</label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                        <label htmlFor="" className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                            {t('expiration-date')} </label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                    </div>
                                    <div
                                        className="col-lg-4 col-xl-4 col-md-6 col-sm-12 d-flex flex-wrap justify-content-between border-right">
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                        <label htmlFor="" className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                            {t('ModeOfDelivery')}</label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                        <label htmlFor=""
                                            className="col-lg-6 mb-2 border-bottom pb-2 p-0">{t('.currency')}</label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                        <label htmlFor="" className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                            {t('delivery-date')}</label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                    </div>
                                    <div
                                        className="col-lg-4 col-xl-4 col-md-6 col-sm-12 d-flex flex-wrap justify-content-between">
                                        <label htmlFor=""
                                            className="col-lg-6 mb-2 border-bottom pb-2 p-0">{t('TermsOfDelivery')}
                                        </label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                        <label htmlFor=""
                                            className="col-lg-6 mb-2 border-bottom pb-2 p-0">{t('.title')}</label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">  </p>

                                        <label htmlFor="" className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                            {t('.total-tax-amount')} </label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>

                                        <label htmlFor="" className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                            {t('.po-total-amount')} </label>
                                        <p className="col-lg-6 mb-2 border-bottom pb-2 p-0">
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                    className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                     {t('overview')}
                                     </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                    className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                    {t('details')}
                                </button>
                                    
                                )}
                            </Tab>
                           
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active">
                                <div className="table-responsive">
                                        <table className="table table-hover dt-responsive align-middle mb-0 nowrap">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>{t('line-no')} </th>
                                                    <th>{t('item-no')} </th>
                                                    <th>{t('category')}</th>
                                                    <th>{t('product-name')}</th>
                                                    <th>{t('quantity')}</th>
                                                    <th>{t('unit')}</th>
                                                    <th>{t('unit-price')}</th>
                                                    <th>{t('tax-amount')}</th>
                                                    <th>{t('total-amount')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td> 2332</td>
                                                    <td></td>
                                                    <td> </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td> </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <div className="flex items-start">
                                    <div className="table-responsive">
                                        <table className="table table-hover dt-responsive align-middle mb-0 nowrap">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>{t('line-no')} </th>
                                                    <th>{t('item-no')} </th>
                                                    <th>{t('category')}</th>
                                                    <th>{t('SalesTaxGroup')}</th>
                                                    <th>{t('ItemSalesTaxGroup')}</th>
                                                    <th>{t('grn-rem-quantity')}</th>
                                                    <th>{t('inv-rem-quantity')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>344</td>
                                                    <td>234567</td>
                                                    <td>dsdasd</td>
                                                    <td> </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                           
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </form>
        </div>
    )
}

export default PurchaseorderView

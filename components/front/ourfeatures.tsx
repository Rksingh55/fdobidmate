import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
const Ourfeatures = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section className="features-sec pt-5 pb-5 xl">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center mb-5">{t('our-features')}</h1>
                            <div className="row">
                                <div className="col-lg-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="fe-back">
                                                <div className="fea-img">
                                                    <img src="build/images/Customer_service_blue.svg" alt="" />
                                                </div>
                                                <div className="fea-white">
                                                    <img
                                                        src="build/images/Customer_service_white.svg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <h4>{t('customer-service-management')}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="fe-back">
                                                <div className="fea-img">
                                                    <img src="build/images/Case_Management.svg" alt="" />
                                                </div>
                                                <div className="fea-white">
                                                    <img
                                                        src="build/images/Case_Management _white.svg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <h4>{t('case-management')}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="fe-back">
                                                <div className="fea-img">
                                                    <img src="build/images/E-Services.svg" alt="" />
                                                </div>
                                                <div className="fea-white">
                                                    <img src="build/images/E-Services_white.svg" alt="" />
                                                </div>
                                            </div>
                                            <h4>{t('eservices-management')}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="fe-back">
                                                <div className="fea-img">
                                                    <img src="build/images/Contract.svg" alt="" />
                                                </div>
                                                <div className="fea-white">
                                                    <img src="build/images/Contract_white.svg" alt="" />
                                                </div>
                                            </div>
                                            <h4>Contract &amp; Account Management</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="fe-back">
                                                <div className="fea-img">
                                                    <img src="build/images/Admin.svg" alt="" />
                                                </div>
                                                <div className="fea-white">
                                                    <img src="build/images/Admin_white.svg" alt="" />
                                                </div>
                                            </div>
                                            <h4>Admin &amp; Operations Management</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="fe-back">
                                                <div className="fea-img">
                                                    <img src="build/images/Reporting.svg" alt="" />
                                                </div>
                                                <div className="fea-white">
                                                    <img src="build/images/Reporting_white.svg" alt="" />
                                                </div>
                                            </div>
                                            <h4>Reporting &amp; Dashboards</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
};
export default Ourfeatures;
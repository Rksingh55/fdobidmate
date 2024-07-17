import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
const FrontContact = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section className="level-up pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <h2 className="mb-4">Level Up Your Bussiness With URVA</h2>
                                <p className="text-white mb-4">
                                    Collect more leads,and convert them to clients with URVA Powerful
                                    <br />
                                    CRM for business and sales,and marketing automation
                                </p>
                                <a href="https://beah.om/web/guest/contact" target="_blank">
                                    <button className="me-2 button-level" type="button">
                                        Contact Us
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default FrontContact;
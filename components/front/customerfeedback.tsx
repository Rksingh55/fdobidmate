import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
const Customerfeedback = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section className="feedback bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 feed-margin p-5">
                            <h2 className="">Customer Interaction and Feedback</h2>
                            <p>
                                Design and implement a personalized customer interaction platform with
                                customizable feedback forms.
                            </p>
                            <p>
                                Develop a sophisticated Incident Reporting system with custom fields
                                and analytics capabilities for in-depth incident analysis.
                            </p>
                        </div>
                        <div className="col-lg-6 feed-margin">
                            <div className="feed-img">
                                <img src="build/images/Customer_Interaction.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 feed-margin">
                            <div className="feed-img">
                                <img src="build/images/Notification.svg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 feed-margin" style={{ marginTop: 70 }}>
                            <h2 className="">Notification and Communication</h2>
                            <p>
                                Develop a robust custom communication system allowing the client to
                                define and manage various notification templates and communication
                                channels.
                            </p>
                            <p>
                                Provide customization options for Customer, Operator, and
                                Contract-related communications to align with specific communication
                                strategies.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 feed-margin" style={{ marginTop: 80 }}>
                            <h2 className="">Additional Waste Collection/Services</h2>
                            <p>
                                Design a custom module for handling additional waste collection and
                                services, offering configurable options to accommodate various service
                                types and pricing structures
                            </p>
                        </div>
                        <div className="col-lg-6 feed-margin">
                            <div className="feed-img">
                                <img src="build/images/Additional.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 feed-margin">
                            <div className="feed-img">
                                <img src="build/images/SLA_implementation.svg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 feed-margin" style={{ marginTop: 80 }}>
                            <h2 className="">SLA Implementation</h2>
                            <p>
                                Implement a custom SLA management system, allowing the client to
                                define, modify, and manage SLAs dynamically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
};
export default Customerfeedback;
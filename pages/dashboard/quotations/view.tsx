import React from 'react'
import { useRouter } from 'next/router';
import Dashboardbredcrumb from "@/components/dashboardbredcrumb"
import Header from '@/components/front/vendorSide/quatation/header';
import Line from '@/components/front/vendorSide/quatation/line';
import { useTranslation } from 'react-i18next';

function QuetationViews() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    return (
        <>
        <Dashboardbredcrumb />
            <div className="panel p-4 border-white-light dark:border-[#1b2e4b] mt-3 ">
                <div className="invoice-table">
                    <Header />
                    <Line />
                </div>
            </div>
        </>
    )
}

export default QuetationViews

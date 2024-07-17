import Link from "next/link";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className='bg-[#20427F]  font-bold  text-center '>
            <footer className="py-3 md:w-[90%] w-[95%] m-auto">
                <div className="container mx-auto ">
                    <div className="text-center ">
                        <p className="text-white">© 2024 FDO {t("All rights reserved")} Powered by Amysoftech.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

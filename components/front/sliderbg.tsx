import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
const Sliderbg = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
        <section className="features-sec pt-5 pb-5">
           <div className="slider-bg">
                <div className="container">
                    <div className="main-head">
                        <h1 className="text-white">

                            <b>
                                {t('simple-crm-solution')} <br /> {t('for-your-business')}
                            </b>
                        </h1>
                        <p className="mb-5">
                           {t('by-hamessing-the-power-of-customer')}
                            <br />
                            {t('stramline-operation-enhance-customer')}
                        </p>
                        <div className="main-img">
                            <img src="build/images/main_img.png" />
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
};
export default Sliderbg;
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Language from '@/components/language/language';
const Complaintheader = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <header className="myheader-complaint">
        <nav className="navbar navbar-expand-sm">
          <div className="container py-2">
            <a className="navbar-brand" href="#">
              <div className="urv-logo">
                <img src="assets/images/urva_white.svg" alt="" />
              </div>
            </a>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
            </button>
            <div className="navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                <li className="nav-item px-3">
                  <a
                    className="nav-link active text-light"
                    href="https://beah.om/"
                    aria-current="page"
                    target="blank"
                  >
                    {t('dashboard')}
                  </a>
                </li>
                <li className="nav-item px-3 ">
                  <a
                    className="nav-link sv-nav text-light"
                    href="https://beah.om/web/guest/contact"
                    target="blank"
                  >
                    {t('contacts')}
                  </a>
                </li>
              </ul>
              <div className="d-flex" style={{ alignItems: "center" }}>
                <ul className="navbar-nav mt-2 mt-lg-0">
                  <li className="nav-item px-3">

                    <Link
                      className="nav-link sv-nav text-light"
                      href="\auth\register"
                    >
                      {t('register')}
                    </Link>
                  </li>
                  <li className="nav-item px-3">

                    <Link
                      className="nav-link sv-nav text-light"
                      href="\login"
                    >
                      {t('login')}
                    </Link>
                  </li>
                  <li className="nav-item px-3">


                  </li>
                  <li className="nav-item px-3">
                    <Link href="\auth\register" className="head-btn">
                      {t('raise-a-complaint')}
                    </Link>
                  </li>
                </ul>
                <Language></Language>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section className="mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 p-0">
              <div className="compl-bg">
                <h1 className="mb-2 text-4xl font-extrabold font-semibold text-white">
                  {/* <h1 className="text-center mb-5"> */}
                  <b>
                    {t('raise-your-complaint')}

                  </b>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
};
export default Complaintheader;
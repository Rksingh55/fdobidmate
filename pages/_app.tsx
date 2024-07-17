import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, Suspense, useEffect } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { Provider } from 'react-redux';
import store from '../store/index';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from 'ni18n.config.ts';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'public/build/css/all.min.css';
import 'public/build/css/custom.css';
import 'public/build/css/bootstrap.css';
import '../styles/tailwind.css';
import { NextPage } from 'next';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import "@/styles/layout.css"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/index';
import { useRouter } from 'next/router';
import { getToken } from '@/localStorageUtil';
import '@mantine/core/styles.css';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const router = useRouter();
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        })
        const token = getToken();
        if (!token) {
            router.replace('/auth/login');
        }
    }, [])



    const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

    return (
        <Provider store={store}>
            <MantineProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <Head>
                        <title>FDO Bidmate - Powered By Amy Softech</title>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/assets/images/FDO_Logo1.svg" />
                    </Head>

                    {getLayout(<Component {...pageProps} />)}
                </PersistGate>
            </MantineProvider>
        </Provider>
    );
};
export default appWithI18Next(App, ni18nConfig);

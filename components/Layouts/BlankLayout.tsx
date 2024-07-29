import { PropsWithChildren } from 'react';
import App from '../../App';
import Footer from './Footer';

const BlankLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <div className="min-h-screen text-black dark:text-white-dark">{children} </div>
            <Footer />

        </App>
    );
};

export default BlankLayout;

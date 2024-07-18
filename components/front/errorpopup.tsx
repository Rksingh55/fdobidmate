import React, { useState, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';

interface SuccessPopupProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <>
            {show && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white px-[120px] py-12 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
                        <img className='h-[120px] w-[120px]' src='https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png' />
                        <p className='py-2 text-red-500 font-bold text-xl'>{message}</p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white  hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SuccessPopup;
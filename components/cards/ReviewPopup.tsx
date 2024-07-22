import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface ReviewPopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className="  text-black rounded "
                    >
                        <IoMdClose className='text-2xl' />
                    </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">Review Message</h2>
                <p className="mb-4">Please Verify or recheck all the Information before submit the form</p>

                <div className='justify-end flex'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ltr:ml-auto rtl:mr-auto'>
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReviewPopup;

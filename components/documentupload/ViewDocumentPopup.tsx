import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ViewDocumentPopupProps {
    isVisible: boolean;
    onClose: () => void;
    document: File | null;
}

const ViewDocumentPopup: React.FC<ViewDocumentPopupProps> = ({ isVisible, onClose, document }) => {
    if (!isVisible || !document) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg md:w-[80%] h-[90%] w-full">
                <div className='flex justify-end'>
                    <button onClick={onClose} className=" text-black text-2xl ">
                        <AiOutlineClose />
                    </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">{document.name}</h2>
                <iframe src={URL.createObjectURL(document)} className="w-full h-[80%] mb-4" />
                <div className="flex justify-end">
                </div>
            </div>
        </div>
    );
};

export default ViewDocumentPopup;

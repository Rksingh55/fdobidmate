import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';

interface PopupProps {
    isVisible: boolean;
    onClose: () => void;
    onUploadDocuments: (type: string, files: File[]) => Promise<void>;
    onViewDocument: (file: File) => void;
    documentType: string;
}

const UploadDocumentPopup: React.FC<PopupProps> = ({
    isVisible,
    onClose,
    onUploadDocuments,
    onViewDocument,
    documentType,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleDeleteFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        await onUploadDocuments(documentType, selectedFiles);
        setSelectedFiles([]);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg md:w-[50%] ">
                <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
                <form >
                    <input type="file" multiple onChange={handleFileChange} className="mb-4 w-full border p-2" />
                </form>

                <div className="mt-4">
                    {selectedFiles.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2">Selected Files :</h3>
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex justify-between items-center mb-2 border-1  rounded-md p-2">
                                    <span className=''>{index + 1}. {file.name}</span>
                                    <div className='flex gap-4'>
                                        <button
                                            onClick={() => onViewDocument(file)}

                                        >
                                            <FaRegEye className='text-blue-700 text-xl cursor-pointer' />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFile(index)}

                                        >
                                            <RiDeleteBin2Fill className='text-red-500 text-xl cursor-pointer' />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 mr-2">
                        Close
                    </button>
                    <button onClick={handleUpload} className="bg-green-500 text-white py-2 px-4">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDocumentPopup;

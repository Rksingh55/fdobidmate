import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
            setError(null);
        }
    };

    const handleDeleteFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setError('Please select at least one document before uploading.');
            toast.error('Please select at least one document before uploading.');
            return;
        }
        setUploading(true);
        setMessage(null);
        setError(null);
        try {
            await onUploadDocuments(documentType, selectedFiles);
            setMessage({ type: 'success', text: 'Upload successful!' });
            setSelectedFiles([]);
            onClose();
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
        } finally {
            setUploading(false);
        }
    };
    if (!isVisible) return null;
    return (
        <>
            <ToastContainer />

            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg md:w-[50%]">
                    <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
                    {error && (
                        <div className="mt-4 text-2xl p-2 bg-red-200 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <form>
                        <input type="file" multiple onChange={handleFileChange} className="mb-4 w-full border p-2" />
                    </form>
                    <div className="mt-4">
                        {selectedFiles.length > 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-2">Selected Files :</h3>
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="flex justify-between items-center mb-2 border-1 rounded-md p-2">
                                        <span>{index + 1}. {file.name}</span>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => onViewDocument(file)}>
                                                <FaRegEye className="text-blue-700 text-xl cursor-pointer" />
                                            </button>
                                            <button type="button" onClick={() => handleDeleteFile(index)}>
                                                <RiDeleteBin2Fill className="text-red-500 text-xl cursor-pointer" />
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
                        <button
                            onClick={handleUpload}
                            className={`bg-green-500 text-white py-2 px-4 ${uploading ? 'opacity-20  cursor-not-allowed' : ''}`}
                            disabled={uploading || selectedFiles.length === 0}
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadDocumentPopup;

import React, { useState } from 'react';
import UploadDocumentPopup from '../../components/documentupload/UploadDocumentPopup';
import ViewDocumentPopup from '../../components/documentupload/ViewDocumentPopup';
import { getToken } from '@/localStorageUtil';
import { API_BASE_URL, VENDORATTACHMENT_API_URL } from '@/api.config';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessPopup from '../front/SuccessPopup';
interface Document {
    type: string;
    files: File[];
}

const HomePage: React.FC = () => {
    const [isUploadPopupVisible, setIsUploadPopupVisible] = useState(false);
    const [isViewPopupVisible, setIsViewPopupVisible] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [viewDocument, setViewDocument] = useState<File | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const documentTypes = [
        "Type of Business",
        "Commercial Registration",
        "Licenses",
        "TAX Registration",
        // "VAT Registration", ---as per requirement its not required
        "Agency Certificate",
        "Bank Certificate",
        "Local Company Certificate",
        "Quality and Safety Organization",
        "Other Document"
    ];
    const requiredDocumentTypes = documentTypes.filter(
        (type) => type !== "Quality and Safety Organization" && type !== "Other Document"
    );

    const handleOpenUploadPopup = (type: string) => {
        setSelectedType(type);
        setIsUploadPopupVisible(true);
    };

    const handleCloseUploadPopup = () => {
        setIsUploadPopupVisible(false);
    };

    const handleUploadDocuments = async (type: string, files: File[]) => {
        const encodeFileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        };
        try {
            const base64FilesPromises = files.map(file => encodeFileToBase64(file));
            const base64Files = await Promise.all(base64FilesPromises);
            // base64Files.forEach((base64File, index) => {
            //     console.log(`vendor_files ${index}:`, files[index]);
            //     console.log(`Base64 ${index}:`, base64File);
            // });
            const formData = new FormData();
            formData.append('attachement_type', type);
            const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');
            formData.append('vendor_profile_id', vendor_profile_id || '');
            formData.append('vendor_files', JSON.stringify(base64Files));
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}${VENDORATTACHMENT_API_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                const Data = await response.json();
                setMessage(Data.message.success);
                setShowPopup(true);
                setDocuments((prevDocuments) => {
                    const existingDocument = prevDocuments.find(doc => doc.type === type);
                    if (existingDocument) {
                        existingDocument.files = [];
                        return [...prevDocuments];
                    } else {
                        return prevDocuments;
                    }
                });
            } else {
                const errorData = await response.json();
                toast.error(errorData.message.error)
            }
        } catch (error) {
            toast.error('Error uploading documents')

        }
    };


    const handleDeleteDocument = (type: string, index: number) => {
        setDocuments((prevDocuments) => {
            const documentIndex = prevDocuments.findIndex(doc => doc.type === type);
            if (documentIndex !== -1) {
                prevDocuments[documentIndex].files.splice(index, 1);
            }
            return [...prevDocuments];
        });
    };

    const handleViewDocument = (file: File) => {
        setViewDocument(file);
        setIsViewPopupVisible(true);
    };

    const handleCloseViewPopup = () => {
        setIsViewPopupVisible(false);
        setViewDocument(null);
    };

    return (
        <div className="">
            <ToastContainer />
            <SuccessPopup
                message={message}
                show={showPopup}
                onClose={handleClosePopup}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="py-2 px-4 text-left text-gray-600">S. No</th>
                            <th className="py-2 px-4 text-left text-gray-600">Document Name</th>
                            <th className="py-2 px-4 text-left text-gray-600">Action</th>
                            <th className="py-2 px-4 text-center text-gray-600">Total Uploaded Documents</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {documentTypes?.map((type, index) => (
                            <tr key={type} className="border-b">
                                <td>{index + 1}.</td>
                                <td className="py-2 px-4 text-gray-800">{type}
                                    {requiredDocumentTypes?.includes(type) && (
                                        <span className="text-red-500 ml-2 font-extrabold">*</span>
                                    )}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleOpenUploadPopup(type)}
                                        className='border-1 hover:bg-slate-200 rounded-md p-2 flex items-center gap-2'
                                    >
                                        <FaCloudUploadAlt className='text-xl' />
                                        Upload
                                    </button>
                                </td>
                                <td className=" text-gray-800 text-center">
                                    Static data -  ( 2 )
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <UploadDocumentPopup
                isVisible={isUploadPopupVisible}
                onClose={handleCloseUploadPopup}
                onUploadDocuments={handleUploadDocuments}
                onViewDocument={handleViewDocument}
                documentType={selectedType}
            />
            <ViewDocumentPopup
                isVisible={isViewPopupVisible}
                onClose={handleCloseViewPopup}
                document={viewDocument}
            />
            <div className="mt-4">
                {documents.map((doc) => (
                    <div key={doc.type} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{doc.type}:</h3>
                        {doc.files.map((file, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                                <span>{file.name}</span>
                                <div>
                                    <button
                                        onClick={() => handleViewDocument(file)}
                                        className="bg-blue-500 text-white p-1 rounded mr-2"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDocument(doc.type, index)}
                                        className="bg-red-500 text-white p-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

import React, { useState } from 'react';
import UploadDocumentPopup from '../../components/documentupload/UploadDocumentPopup';
import ViewDocumentPopup from '../../components/documentupload/ViewDocumentPopup';
import { getToken } from '@/localStorageUtil';
import { API_BASE_URL } from '@/api.config';
import { FaCloudUploadAlt } from 'react-icons/fa';

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

    const documentTypes = [
        "Type of Business",
        "Quality and Safety Organization",
        "Commercial Registration",
        "Licenses",
        "TAX Registration",
        "VAT Registration",
        "Agency Certificate",
        "Bank Certificate",
        "Local Company Certificate",
        "Other Document"
    ];
    const handleOpenUploadPopup = (type: string) => {
        setSelectedType(type);
        setIsUploadPopupVisible(true);
    };

    const handleCloseUploadPopup = () => {
        setIsUploadPopupVisible(false);
    };


    const VendorAttachmentApiUrl = "/api/vendor/vendor_attachements"
    const handleUploadDocuments = async (type: string, files: File[]) => {
        console.log("selected files------->", files)
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files[]", file);
        });
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log("File Name:", file.name);
                console.log("File Size:", file.size);
                console.log("File Type:", file.type);
                console.log("File Content:", event.target?.result);
            };
            reader.readAsDataURL(file);
        });
        formData.append('attachment_type', type);
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');
        formData.append('vendor_profile_id', vendor_profile_id || '');
        const token = getToken();
        try {
            const response = await fetch(`${API_BASE_URL}${VendorAttachmentApiUrl}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                alert("Document upload success");
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
                console.error('Error uploading documents:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading documents:', error);
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
            {documentTypes.map((type) => (
                <button key={type} onClick={() => handleOpenUploadPopup(type)} className='border-1 hover:bg-slate-200 rounded-md p-2 py-2 m-2'>
                    <span className='flex gap-2'> <FaCloudUploadAlt className=' text-xl' /> Upload  {type} documents</span>
                </button>
            ))}
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

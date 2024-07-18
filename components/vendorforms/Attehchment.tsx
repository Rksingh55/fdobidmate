import React, { useState } from 'react';
import UploadDocumentPopup from '../../components/documentupload/UploadDocumentPopup';
import ViewDocumentPopup from '../../components/documentupload/ViewDocumentPopup';
import { getToken } from '@/localStorageUtil';
import { API_BASE_URL } from '@/api.config';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    // const handleUploadDocuments = async (type: string, files: File[]) => {
    //     console.log("selected filesssssss------->", files)
    //     const formDataEntries: [string, FormDataEntryValue][] = [];
    //     const formData = new FormData();
    //     formData.append('attachment_type', type);
    //     const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');
    //     formData.append('vendor_profile_id', vendor_profile_id || '');
    //     files.forEach((files, index) => {
    //         formData.append(`files[${index}]`, files);
    //         formDataEntries.push([`files[${index}]`, files]);
    //     });

    //     console.log("FormData Entries:", formDataEntries);
    //     const token = getToken();
    //     try {
    //         const response = await fetch("https://httpbin.org/post", {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'contentType': 'application/octet-stream',
    //             },
    //             body: formData,
    //         });
    //         if (response.ok) {
    //             alert("Document upload success");
    //             setDocuments((prevDocuments) => {
    //                 const existingDocument = prevDocuments.find(doc => doc.type === type);
    //                 if (existingDocument) {
    //                     existingDocument.files = [];
    //                     return [...prevDocuments];
    //                 } else {
    //                     return prevDocuments;
    //                 }
    //             });
    //         } else {
    //             console.error('Error uploading documents:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading documents:', error);
    //     }
    // };
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
            const response = await fetch(`${API_BASE_URL}${VendorAttachmentApiUrl}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                toast.success("Document upload successful");
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
            <ToastContainer />

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

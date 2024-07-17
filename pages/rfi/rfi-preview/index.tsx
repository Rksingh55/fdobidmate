import BlankLayout from '@/components/Layouts/BlankLayout';
import React, { useEffect } from 'react'
import Frontheader from '@/components/front/Navbar';
import Header from '@/components/front/Pageheader';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdClose } from "react-icons/io";
import { FcApproval } from 'react-icons/fc';
import { FaRegEye } from 'react-icons/fa';
import Footer from '@/components/Layouts/Footer';

function Rfipreview() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    let u_name = "";
    useEffect(() => {
        const u_name = localStorage.getItem("userName");
        setName(u_name ?? "");
    }, []);
    const [name, setName] = useState(u_name ?? "");


    const handleLogin = (): void => {

        if (!name) {
            toast.error('You must be logged in to view rfi detail, Please Login');
            setTimeout(() => {
                router.push("/auth/login")
            }, 3000);
            return;
        } else {
            setIsLoggedIn(true)
        }
    };

    const maskedClass = isLoggedIn ? 'blur-none	' : 'blur-sm';

    const [documents, setDocuments] = useState([
        { id: 1, name: 'Company Certificate', file: null, isLoading: false, isUploaded: false, filename: '', description: '' },
        { id: 2, name: 'Gst Number', file: null, isLoading: false, isUploaded: false, filename: '', description: '' },
        { id: 3, name: 'Employee details', file: null, isLoading: false, isUploaded: false, filename: '', description: '' },
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const [currentDocId, setCurrentDocId] = useState(null);
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    const togglePopup = (id: any) => {
        setCurrentDocId(id);
        setIsOpen(!isOpen);
    };

    const handleFileChange = (e: any, id: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if ((selectedFile.type === 'application/pdf' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') && selectedFile.size <= MAX_FILE_SIZE) {
                setDocuments((prevDocs) =>
                    prevDocs?.map((doc) =>
                        doc?.id === id
                            ? { ...doc, file: selectedFile, filename: selectedFile.name, isUploaded: false }
                            : doc
                    )
                );
            } else {
                if (selectedFile.size > MAX_FILE_SIZE) {
                    toast.error('File size must be less than 2MB');
                } else {
                    toast.error('Only PDF, PNG or JPEG files are allowed');
                }
                e.target.value = null;
            }
        }
    };

    const handleUpload = async () => {
        const docIndex = documents.findIndex(doc => doc.id === currentDocId);
        if (docIndex === -1 || !documents[docIndex].file) {
            toast.error('Please select  file and description');
            return;
        }

        setDocuments((prevDocs) =>
            prevDocs.map((doc, index) =>
                index === docIndex ? { ...doc, isLoading: true } : doc
            )
        );

        try {
            togglePopup(null);
            await new Promise((resolve) => setTimeout(resolve, 6000));
            setDocuments((prevDocs) =>
                prevDocs.map((doc, index) =>
                    index === docIndex ? { ...doc, isLoading: false, isUploaded: true, description: '' } : doc
                )
            );
            // toast.success('Document uploaded successfully!');
        } catch (error) {
            setDocuments((prevDocs) =>
                prevDocs.map((doc, index) =>
                    index === docIndex ? { ...doc, isLoading: false } : doc
                )
            );
            toast.error('Failed to upload file');
        }
    };

    const handleDescriptionChange = (e: any, id: any) => {
        const description = e.target.value;
        setDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === id ? { ...doc, description } : doc
            )
        );
    };


    const [bidamount, setbidamount] = useState('');
    const [messege, setmessege] = useState('')

    const bidamountchange = (e: any) => {
        if (e.target.name === "number") {
            setbidamount(e.target.value);
        }
    };

    const handlesubmitbid = (e: any) => {
        e.preventDefault();
        const allDocumentsUploaded = documents.every(doc => doc?.file !== null);
        console.log("allDocumentsUploaded", allDocumentsUploaded)

        if (!allDocumentsUploaded) {
            setmessege("Please upload above all required documents")

        } else {
            if (!bidamount) {
                setmessege("Please add your bid amount..!!")
            } else {
                setmessege("Your bid amount submit successfully ")
                console.log(bidamount)
                setbidamount('');
            }
        }
    };



    return (
        <>
            <ToastContainer />
            <Frontheader />
            <Header heading="RFI Preview " />
            <div className='w-[90%] m-auto py-8 '>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className=" mb-6">
                        <h1 className="text-2xl font-semibold">View RFI</h1>

                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">General Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 ">
                            <div className='flex flex-col gap-2 md:border-r-2'>
                                <p><strong>Request ID :</strong> <span>RFI-0000000004</span></p>
                                <p><strong>Location :</strong> <span>Oman</span></p>
                                <p><strong>Type :</strong> <span className={maskedClass}>Pre-Qualification</span></p>
                                <p><strong>Description : </strong > <span>Add</span></p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p><strong>Department : </strong > <span className={maskedClass}>CEO Office</span></p>
                                <p><strong>Project : </strong> <span className={maskedClass}>PRJ-000133</span></p>
                                <p><strong>Currency : </strong> <span className={maskedClass}> INR</span></p>
                                <p><strong>Instruction : </strong> <span> </span></p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Important Dates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 ">
                            <div className='flex flex-col gap-2 md:border-r-2'>
                                <p><strong>Publish Date :</strong> <span>2024-05-23 11:45:00</span></p>
                                <p><strong>Clarification End Date : </strong> <span className={maskedClass}>2024-05-30 11:46:00</span></p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p><strong>Float Date :</strong> <span className={maskedClass}>2024-05-24 11:45:00</span></p>
                                <p><strong>Close Date : </strong> <span className={maskedClass}>2024-05-31 11:47:00</span></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Bidding Documents</h2>
                        <div className="overflow-x-auto py-3">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b-2">SN</th>
                                        <th className="py-2 px-4 border-b-2">Document Name</th>
                                        <th className="py-2 px-4 border-b-2">Upload Document<br />
                                            <span className="text-red-500">Only PDF, JPEG, PNG Accepted</span>
                                        </th>
                                        <th className="py-2 px-4 border-b-2">Uploaded File</th>
                                        <th className="py-2 px-4 border-b-2">Status</th>
                                        <th className="py-2 px-4 border-b-2">Action</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {documents?.map((doc, index) => (
                                        <tr key={doc?.id}>
                                            <td className="py-2 px-4 border-b">{index + 1}</td>
                                            <td className="py-2 px-4 border-b" ><span className={maskedClass}>{doc?.name}</span></td>
                                            <td className="py-2 px-4 border-b">
                                                <i className="fas fa-cloud-upload-alt mr-1"></i>
                                                <span className='cursor-pointer' onClick={() => togglePopup(doc?.id)}>Document</span>
                                            </td>
                                            <td className="py-2 px-4 border-b font-bold">{doc?.filename || 'No file chosen'}</td>
                                            <td className="py-2 px-4 border-b">
                                                {doc?.isLoading ? (
                                                    <div className="loaderBar"></div>
                                                ) : doc?.isUploaded ? (
                                                    <div className='flex items-center '>
                                                        <FcApproval className='text-xl' />
                                                    </div>
                                                ) : (
                                                    <p className='text-red-500 font-bold'>Pending</p>
                                                )}
                                            </td>
                                            <td className='py-2 px-4 border-b font-bold'>
                                                <FaRegEye className='cursor-pointer ' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="fixed inset-2 flex items-center justify-center z-[1000]">
                            <div className="fixed inset-0 bg-black opacity-50" onClick={() => togglePopup(null)}></div>
                            <div className="bg-white rounded-lg p-6 z-10 mx-auto">
                                <div className='flex justify-end'>
                                    <IoMdClose onClick={() => togglePopup(null)} className='text-2xl cursor-pointer' />
                                </div>
                                <div className='upload-document p-4'>
                                    <ToastContainer />
                                    <label>Add Document</label>
                                    <input
                                        className='border-2 p-2 rounded-md w-full'
                                        type='file'
                                        accept='application/pdf, image/jpeg'
                                        onChange={(e) => handleFileChange(e, currentDocId)}
                                    />
                                    <span className="text-red-500 font-bold py-3 text-[12px]">Only PDF, JPEG, PNG Accepted, File size less than 2 Mb</span>
                                    <div className='mt-2'>
                                        <label>Add Description</label>
                                        <textarea
                                            placeholder='Describe about your document'
                                            className='border-2 py-3 px-2 w-full rounded-md'
                                            value={documents.find(doc => doc.id === currentDocId)?.description || ''}
                                            onChange={(e) => handleDescriptionChange(e, currentDocId)}
                                        />
                                    </div>
                                    <div className='flex justify-end mt-2'>
                                        <button
                                            className={`bg-blue-400 py-2 px-8 text-white rounded-md ${documents.find(doc => doc.id === currentDocId)?.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={handleUpload}
                                            disabled={documents.find(doc => doc.id === currentDocId)?.isLoading}
                                        >
                                            {documents.find(doc => doc.id === currentDocId)?.isLoading ? (<div className="custom-loader"></div>) : 'Upload'}
                                        </button>
                                    </div>

                                </div>


                                <div className='uploaded document   mt-2  '>
                                    <h1 className='py-2'>Uploaded document</h1>
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b-2">SN</th>
                                                <th className="py-2 px-4 border-b-2">Document Name</th>

                                                <th className="py-2 px-4 border-b-2">File Name</th>
                                                <th className="py-2 px-4 border-b-2">Status</th>
                                                <th className="py-2 px-4 border-b-2">Action</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {documents?.map((doc, index) => (
                                                <tr key={doc?.id}>
                                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                                    <td className="py-2 px-4 border-b" ><span className={maskedClass}>{doc?.name}</span></td>

                                                    <td className="py-2 px-4 border-b font-bold">{doc?.filename || 'No file chosen'}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        {doc?.isLoading ? (
                                                            <div className="loaderBar"></div>
                                                        ) : doc?.isUploaded ? (
                                                            <div className='flex items-center '>
                                                                <FcApproval className='text-xl' />
                                                            </div>
                                                        ) : (
                                                            <p className='text-red-500 font-bold'>Pending</p>
                                                        )}
                                                    </td>

                                                    <td className='py-2 px-4 border-b font-bold'>
                                                        <FaRegEye className='cursor-pointer ' />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}



                    {isLoggedIn && (
                        <div>
                            <h2 className="text-xl font-semibold ">Bid Information</h2>
                            <div className='py-3'>
                                <h1>Bid Value </h1>
                                {messege && <p className='text-red-500 font-bold py-2'>{messege}</p>}
                                <form onSubmit={handlesubmitbid}>
                                    <input
                                        onChange={bidamountchange}
                                        type='number'
                                        name='number'
                                        value={bidamount}
                                        placeholder='Enter your bid amount...'
                                        className='border-2 rounded-sm py-2 mt-2 px-3'
                                    />
                                    <button className='rounded-sm p-2 mt-2 ml-2 bg-blue-400 text-white'>
                                        Submit
                                    </button>
                                </form>

                            </div>
                        </div>
                    )
                    }

                    {!isLoggedIn && (
                        <div className="mt-6">
                            <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded-md">Apply Now</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}


Rfipreview.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default Rfipreview
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Profile_Preview from '../front/Profile_Preview';
import Link from 'next/link';
import { getToken } from '@/localStorageUtil';
import { useRouter } from 'next/router';
import { API_BASE_URL, VENDOR_APPROVAL_API_URL } from '@/api.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ReviewPopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}
const ReviewPopup: React.FC<ReviewPopupProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    const [user, setUser] = useState<any>({
    });
    const router = useRouter()
    const Applyapproval = async (e: any) => {
        const token = getToken();
        e.preventDefault();
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');
        const payload = {
            ...user,
            vendor_profile_id: vendor_profile_id,
        };
        try {
            const response = await fetch(`${API_BASE_URL}${VENDOR_APPROVAL_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const responseData = await response?.json();
                // toast?.success(responseData?.message?.success);
                alert(responseData?.message?.success);

                setTimeout(() => {
                    router.push("/dashboard/tender")
                }, 2000)
            } else {
                const errorData = await response.json();
                // toast?.error(errorData?.message?.error)
                alert(errorData?.message?.error)


            }
        } catch (error) {
            // toast?.error('something went wrong, please try after some time.')
            alert('something went wrong, please try after some time.')


        }
    };


    return (
        <>
            <ToastContainer />
            <div className="fixed h-full  inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg ">
                    <div className='flex justify-between'>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Review Your Details</h2>
                        </div>
                        <div>
                            <button
                                onClick={onClose}
                                className="  text-black rounded "
                            >
                                <IoMdClose className='text-2xl' />
                            </button>
                        </div>
                    </div>
                    <div className='md:h-[72vh] w-full h-full md:w-[80vw] overflow-y-scroll'>
                        <Profile_Preview />
                    </div>
                    {/* <p className="mb-4">{message}</p> */}
                    <div className=' flex justify-end py-2'>
                        <div className='flex gap-2'>
                            <button onClick={onClose} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  ltr:ml-auto rtl:mr-auto'>
                                Cacel
                            </button>
                            <Link href="/dashboard/vendor-register">
                                <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4  ltr:ml-auto rtl:mr-auto'>
                                    Edit
                                </button>
                            </Link>
                            <button onClick={Applyapproval} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ltr:ml-auto rtl:mr-auto'>
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ReviewPopup;

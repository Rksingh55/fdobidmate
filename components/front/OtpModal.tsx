import { API_BASE_URL, OTPVALIDATE_API_URL, OTPVERIFY_API_URL, RESEND_API_URL } from '@/api.config';
import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOtpSubmit: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onOtpSubmit }) => {
    const [otp, setOtp] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = replaceAtIndex(otp, index, value);
            setOtp(newOtp);
            if (index < 5 && value !== '') {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = replaceAtIndex(otp, index, '');
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };


    const replaceAtIndex = (str: string, index: number, value: string): string => {
        return str.substring(0, index) + value + str.substring(index + 1);
    };

    const handleSubmit = async () => {
        if (otp.length !== 6) {
            setResponseMessage('OTP must be exactly 6 digits.');
            return;
        }
        onOtpSubmit(otp);
        try {
            const vendor_id = localStorage.getItem("vendor_id");
            const response = await fetch(`${API_BASE_URL}${OTPVERIFY_API_URL}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: parseInt(otp, 10), vendor_id: vendor_id }),
            });
            const data = await response.json();
            console.log("response", data);
            if (response.ok) {
                if (data?.status === "success") {
                    setResponseMessage("OTP validation successful");
                    setTimeout(() => {
                        setOtp("")
                        onClose();
                    }, 2000)
                } else {
                    setResponseMessage("OTP validation failed");
                    setTimeout(() => {
                        setOtp("")
                    }, 2000)
                }
            } else {
                setResponseMessage(data.message.error);
            }
        } catch (error) {
            setResponseMessage("something went wrong ! please try after some time");
            setTimeout(() => {
                setOtp("")
            }, 3000)
        }

        setTimeout(() => {
            setResponseMessage(null);
            onClose();
        }, 8000000);

    };
    const ResendOTP = async () => {
        try {
            const vendor_id = localStorage.getItem("vendor_id");
            const response = await fetch(`${API_BASE_URL}${RESEND_API_URL}${vendor_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("response", data);
            if (response.ok) {
                setResponseMessage(data.message.success);
            } else {
                setResponseMessage(data.message.error);
            }
        } catch (error) {
            setResponseMessage("something went wrong ! please try after some time");
        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-[-12px] left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-12">
                <h2 className="text-base font-semibold leading-normal text-gray-800 py-3">
                    Enter 6 digit OTP from email
                </h2>
                {responseMessage && (
                    <div className=" text-center font-bold text-blue-400 p-1">
                        {responseMessage}
                    </div>
                )}
                <div className="flex justify-between mt-2 gap-2">
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border rounded"
                            value={otp[index] || ''}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <div className='flex justify-end py-3'>
                    <button className='font-bold text-[#00A9E2]' onClick={ResendOTP}>Resend OTP</button>
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleSubmit}
                        className="btn w-full uppercase bg-[#00A9E2] hover:bg-[#0077cc] text-white py-3 rounded-full"
                    >
                        Submit OTP
                    </button>
                    <button onClick={onClose} className="text-red-500 font-bold">
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OtpModal;

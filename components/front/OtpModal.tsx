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
            const response = await fetch('http://10.10.10.212/FDOBidmateLaravel/public/api/verifyotp', {
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
                } else {
                    setResponseMessage("OTP validation failed");
                }
            } else {
                setResponseMessage(data.message.error);
            }
        } catch (error) {
            console.error('Error validating OTP:', error);
            setResponseMessage("Error validating OTP");
        }

        setTimeout(() => {
            setResponseMessage(null);
            onClose();
        }, 4000);

    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-[-12px] left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-12">
                <h2 className="text-base font-semibold leading-normal text-gray-800 py-3">
                    Enter 6 digit OTP from email
                </h2>
                {responseMessage && (
                    <div className=" text-center font-bold text-blue-400 bg-blue-100 p-1">
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
                <div className="flex flex-col gap-3 mt-4">
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
